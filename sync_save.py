import json
from palworld_save_tools.gvas import GvasFile
from palworld_save_tools.palsav import decompress_sav_to_gvas
from palworld_save_tools.paltypes import PALWORLD_CUSTOM_PROPERTIES, PALWORLD_TYPE_HINTS
from palworld_save_tools.json_tools import CustomEncoder
import argparse

def main():
    parser = argparse.ArgumentParser(
        prog="palworld-save-tools",
        description="Converts Palworld save files to and from JSON",
    )
    parser.add_argument("filename")
    parser.add_argument(
        "--output",
        "-o",
        help="Output file (default: <filename>.json or <filename>.sav)",
    )
    args = parser.parse_args()
    filename=args.filename
    output_path=args.output
    with open(filename, "rb") as f:
        data = f.read()
        raw_gvas, _ = decompress_sav_to_gvas(data)
    custom_properties_keys=[".worldSaveData.GroupSaveDataMap", ".worldSaveData.CharacterSaveParameterMap.Value.RawData"]
    custom_properties = {}
    for prop in PALWORLD_CUSTOM_PROPERTIES:
        if prop in custom_properties_keys:
            custom_properties[prop] = PALWORLD_CUSTOM_PROPERTIES[prop]
    gvas_file = GvasFile.read(
        raw_gvas, PALWORLD_TYPE_HINTS, custom_properties, allow_nan=False
    )
    with open(output_path, "w", encoding="utf8") as f:
        dumped = gvas_file.dump()
        properties = dumped.get('properties')
        worldSaveData = properties.get('worldSaveData').get('value')
        ret = {
            "CharacterSaveParameterMap": worldSaveData.get('CharacterSaveParameterMap'),
            "GroupSaveDataMap": worldSaveData.get('GroupSaveDataMap'),
            "GameTimeSaveData": worldSaveData.get('GameTimeSaveData')
        }
        json.dump(
            ret, f, indent=None, cls=CustomEncoder, allow_nan=False
        )


if __name__ == "__main__":
    main()

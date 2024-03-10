import UUID from "uuid";
// import { CityHash64 } from "cityhash";

// function generateNewUUID(srcUUID: string): string {
//   const srcUUIDBytes = Buffer.from(UUID.parse(srcUUID).toString('hex'), 'hex').slice(0, 4);
//   const newUUIDString = playerUidToSteamId(srcUUIDBytes.readInt32LE()) + '-0000-0000-0000-000000000000';
//   return toUUID(newUUIDString);
// }

function toUUID(uuidStr: string): string {
  if (typeof uuidStr === "string" && UUID.validate(uuidStr)) {
    return uuidStr;
  }
  return UUID.parse(uuidStr).toString();
}

/**
 * Convert player uid to steamid
 * @param uuid
 * @returns
 */
export default function playerUidToSteamId(playerUid: string) {
  const srcUUIDBytes = Buffer.from(
    (UUID.parse(playerUid) as any).toString("hex"),
    "hex"
  ).subarray(0, 4);
  // const newUUIDString = PlayerUid2NoSteam(srcUUIDBytes.readInt32LE()) + '-0000-0000-0000-000000000000';
  const unrealHashType = srcUUIDBytes.readInt32LE();
  let a: number = u32(
    u32(unrealHashType << 8) ^ u32(2654435769 - unrealHashType)
  );
  let b: number = u32((a >> 13) ^ u32(-(unrealHashType + a)));
  let c: number = u32((b >> 12) ^ u32(unrealHashType - a - b));
  let d: number = u32(u32(c << 16) ^ u32(a - c - b));
  let e: number = u32((d >> 5) ^ (b - d - c));
  let f: number = u32((e >> 3) ^ (c - d - e));
  let result: number = u32(
    (u32(u32(f << 10) ^ u32(d - f - e)) >> 15) ^
      (e - (u32(f << 10) ^ u32(d - f - e)) - f)
  );
  return result.toString(16).toUpperCase().padStart(8, "0");
}

// function steamIdToPlayerUid(uid: string): string {
//   const hashVal: number = CityHash64(Buffer.from(uid, 'utf-16-le'));
//   const uuidBytes: Array<number> = [
//     ...u32(u32(hashVal) + (hashVal >> 32) * 23).toBytes().reverse(),
//     ...Array(12).fill(0),
//   ];
//   return Buffer.from(uuidBytes).toString('hex').toUpperCase();
// }

function u32(x: number): number {
  return x >>> 0;
}

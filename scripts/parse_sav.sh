#!/bin/bash
set -e
output_file="save.json"

# find save file
filedir=$(find . --name "$SAVE_FILE_DIR")
tmpdir=/tmp

echo $filedir

if command -v palworld-save-tools &> /dev/null; then
  echo "palworld-save-tools is installed. Pass"
else
  pip3 install palworld-save-tools
fi

# parse save file
rm -rf $output_file
palworld-save-tools $filedir --to-json --output $output_file
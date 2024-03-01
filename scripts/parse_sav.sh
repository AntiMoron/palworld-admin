#!/bin/bash
set -e

filedir=$1
output_file=$2

tmpdir=/tmp

echo $filedir

if command -v palworld-save-tools &> /dev/null; then
  echo "palworld-save-tools is installed. Pass"
else
  /root/py/bin/pip install palworld-save-tools -y
fi

# parse save file
rm -rf $output_file

echo "/root/py/bin/sync_save $filedir --output $output_file
/root/py/bin/sync_save $filedir --output $output_file
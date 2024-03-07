#!/bin/bash
set -e

filedir=$1
output_file=$2

tmpdir=/tmp

echo $filedir
# parse save file
rm -rf $output_file

BIN_PATH=/root/py/bin

if [ "$DEV" = "true" ]; then
  BIN_PATH=./
fi

echo "$BIN_PATH/sync_save $filedir --output $output_file"
$BIN_PATH/sync_save $filedir --output $output_file
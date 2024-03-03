#!/bin/bash
set -e

filedir=$1
output_file=$2

tmpdir=/tmp

echo $filedir
# parse save file
rm -rf $output_file

echo "./sync_save $filedir --output $output_file"
./sync_save $filedir --output $output_file
#!/bin/bash
set -e

filedir=$1
output_file=$2

tmpdir=/tmp

echo $filedir
# parse save file
rm -rf $output_file

echo "/root/py/bin/sync_save $filedir --output $output_file"
/root/py/bin/sync_save $filedir --output $output_file
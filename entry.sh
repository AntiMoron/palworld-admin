#!/bin/bash
config_file="pa_config"
echo "MAX_OLD_SPACE_SIZE=$MAX_OLD_SPACE_SIZE" >> $config_file
echo "SAVE_FILE_DIR=$SAVE_FILE_DIR" >> $config_file
echo "RCON_LOCATION=$RCON_LOCATION" >> $config_file
echo "RCON_ADMIN_PASSWORD=$RCON_ADMIN_PASSWORD" >> $config_file

copy_only=$1

if [ $copy_only = "copy-only" ]
then
    echo "Copy only"
    exit 0
fi

# create db
bash ./scripts/init_db.sh
# generate crontab
bash ./scripts/cron.sh
cp ./sync.cron /etc/cron.d/sync.cron

npm run start
#!/bin/bash
config_file="pa_config"
rm -rf $config_file

random_token() {
    if [[ "$(uname)" == "Darwin" ]]; then
        # For macOS
        token=$(cat /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 30 | head -n 1)
    else
        # For Linux
        token=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 30 | head -n 1)
    fi
    echo $token
}

echo "MAX_OLD_SPACE_SIZE=$MAX_OLD_SPACE_SIZE" >> $config_file
echo "SAVE_FILE_DIR=$SAVE_FILE_DIR" >> $config_file
echo "RCON_LOCATION=$RCON_LOCATION" >> $config_file
echo "RCON_ADMIN_PASSWORD=$RCON_ADMIN_PASSWORD" >> $config_file
echo "ADMIN_PANEL_PASSWORD=$ADMIN_PANEL_PASSWORD" >> $config_file
echo "SAVE_SYNC_CRONTAB=$SAVE_SYNC_CRONTAB" >> $config_file
echo "RCON_SYNC_CRONTAB=$RCON_SYNC_CRONTAB" >> $config_file
echo "SYNC_TOKEN=$(random_token)" >> $config_file

copy_only=$1

bash ./scripts/init_db.sh

if [ $copy_only = "copy-only" ]
then
    echo "Copy only"
    exit 0
fi

# create db
bash ./scripts/init_db.sh
# generate crontab
nohup node ./scripts/cron.js &
# start server
npm run start
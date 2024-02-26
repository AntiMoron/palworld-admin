#!/bin/bash
echo $MAX_OLD_SPACE_SIZE
echo $SAVE_FILE_DIR
echo $RCON_LOCATION
echo $RCON_ADMIN_PASSWORD

# create db
bash ./scripts/init_db.sh
# generate crontab
bash ./scripts/cron.sh
cp ./sync.cron /etc/cron.d/sync.cron

npm run start
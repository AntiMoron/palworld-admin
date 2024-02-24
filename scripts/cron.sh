#!/bin/bash
cron_tab_file=sync.cron

rm -f $cron_tab_file

echo -n "$RCON_SYNC_CRONTAB " >> $cron_tab_file
echo "curl http://localhost:3000/api/schedule/sync/rcon" >> $cron_tab_file
echo -n "$SAVE_SYNC_CRONTAB " >> $cron_tab_file
echo "curl http://localhost:3000/api/schedule/sync/save" >> $cron_tab_file

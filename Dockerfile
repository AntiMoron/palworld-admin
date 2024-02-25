FROM nikolaik/python-nodejs:python3.9-nodejs21

WORKDIR /root
# install python
RUN python -m venv /root/py
RUN /root/py/bin/pip install palworld-save-tools
RUN echo "export PATH=$PATH:/root/py/bin" >> /root/.bashrc

# cache node_modules by package.json
COPY ./package.json /root/
RUN npm install
# sync codes
COPY ./ /root/

ARG save_file_dir=/game
ARG rcon_location=http://127.0.0.1:1234
ARG rcon_admin_password=1234
ARG max_old_space_size=256
ARG rcon_sync_crontab="*/1 * * * *"
ARG save_sync_crontab="*/5 * * * *"

ENV MAX_OLD_SPACE_SIZE=$max_old_space_size
ENV SAVE_FILE_DIR=$save_file_dir
ENV RCON_ADMIN_PASSWORD=${rcon_admin_password}
ENV RCON_LOCATION=${rcon_location}
ENV RCON_SYNC_CRONTAB=$rcon_sync_crontab
ENV SAVE_SYNC_CRONTAB=$save_sync_crontab

# build it
RUN npm run build
# generate crontab
RUN scripts/cron.sh
# create db
RUN scripts/init_db.sh

RUN cp ./sync.cron /etc/cron.d/sync.cron

# run the server
ENTRYPOINT [ "npm", "run", "start" ]
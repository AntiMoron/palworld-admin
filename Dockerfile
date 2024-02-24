FROM node:latest

WORKDIR /root
# install python
RUN apt-get update 
RUN apt-get install python3-full -y
RUN mkdir -p /root/py
RUN python3 -m venv /root/py
RUN /root/py/bin/pip install palworld-server-toolkit palworld-save-tools
RUN echo "export PATH=$PATH:/root/py/bin" >> /root/.bashrc

# cache node_modules by package.json
COPY ./package.json /root/
RUN yarn
# sync codes
COPY ./ /root/

ARG save_file_dir=/game
ARG save_file_sync_time=120
ARG rcon_sync_time=60
ARG rcon_location=http://127.0.0.1:1234
ARG rcon_admin_password=1234
ARG max_old_space_size=256
ARG rcon_sync_crontab="*/2 * * * *"
ARG save_sync_crontab="*/5 * * * *"

ENV MAX_OLD_SPACE_SIZE=$max_old_space_size
ENV SAVE_FILE_DIR=$save_file_dir
ENV RCON_ADMIN_PASSWORD=${rcon_admin_password}
ENV RCON_SYNC_TIME=${rcon_sync_time}
ENV SAVE_FILE_SYNC_TIME=${save_file_sync_time}
ENV RCON_LOCATION=${rcon_location}
ENV RCON_SYNC_CRONTAB=$rcon_sync_crontab
ENV SAVE_SYNC_CRONTAB=$save_sync_crontab

# build it
RUN yarn build
RUN scripts/cron.sh

COPY ./sync.cron /etc/cron.d/sync.cron

# run the server
ENTRYPOINT [ "yarn", "start" ]
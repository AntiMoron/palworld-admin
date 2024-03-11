# Save file parser
FROM python:3.9 as pybuild

WORKDIR /root
RUN python -m venv /root/py
# For CN Region
RUN /root/py/bin/pip config set global.index-url http://mirrors.aliyun.com/pypi/simple
RUN /root/py/bin/pip config set install.trusted-host mirrors.aliyun.com
RUN pip install pyinstaller
COPY ./palworld-save-tools /root/
COPY ./sync_save.py /root/
RUN pyinstaller --onefile sync_save.py

# Everything else
FROM nikolaik/python-nodejs:python3.9-nodejs21

WORKDIR /root

RUN mkdir -p /etc/apt/
RUN apt-get -y update
RUN apt-get install sqlite3 libsqlite3-dev -y

# install python
RUN python -m venv /root/py
# For CN Region
COPY --from=pybuild /root/dist/sync_save /root/py/bin/sync_save
RUN echo "export PATH=$PATH:/root/py/bin" >> /root/.bashrc

# cache node_modules by package.json
COPY ./package.json /root/
RUN npm install
COPY ./ /root/
# For CN Region
# aliyun source
# RUN npm config set registry https://registry.npm.taobao.org
# tencent source
RUN npm config set registry http://mirrors.cloud.tencent.com/npm/
RUN npm install
# sync codes
COPY ./ /root/

ENV MAX_OLD_SPACE_SIZE=256
ENV SAVE_FILE_DIR=/game
ENV RCON_ADMIN_PASSWORD=1234
ENV RCON_LOCATION=127.0.0.1:1234
ENV RCON_SYNC_CRONTAB="*/1 * * * *"
ENV SAVE_SYNC_CRONTAB="*/5 * * * *"

# build it
RUN npm run build

# run the server
ENTRYPOINT [ "bash", "./entry.sh" ]
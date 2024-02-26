FROM nikolaik/python-nodejs:python3.9-nodejs21

WORKDIR /root
# install python
RUN python -m venv /root/py
# For CN Region
RUN pip3 config set global.index-url http://mirrors.aliyun.com/pypi/simple
RUN pip3 config set install.trusted-host mirrors.aliyun.com

RUN /root/py/bin/pip install palworld-save-tools
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
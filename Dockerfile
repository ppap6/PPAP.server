FROM node:alpine

RUN mkdir -p /home/docker/PPAP_server

COPY . /home/docker/PPAP_server/
WORKDIR /home/docker/PPAP_server/

RUN yarn global add nodemon --registry=https://registry.npm.taobao.org \
    && yarn --registry=https://registry.npm.taobao.org \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

EXPOSE 2333

CMD ["yarn", "dev"]
FROM node:alpine

RUN mkdir -p /home/docker/PPAP_server

COPY . /home/docker/PPAP_server/
WORKDIR /home/docker/PPAP_server/

RUN yarn --registry=https://registry.npm.taobao.org

EXPOSE 2333

CMD ["yarn", "start"]
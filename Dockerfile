FROM node:alpine

RUN mkdir -p /home/docker/PPAP_server

WORKDIR /home/docker/PPAP_server
COPY package.json *.lock .

RUN yarn --registry=https://registry.npm.taobao.org

COPY . .

EXPOSE 2333

CMD ["yarn", "start"]
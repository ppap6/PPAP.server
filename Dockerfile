FROM node:alpine

COPY . /home/docker/PPAP_server/
WORKDIR /home/docker/PPAP_server/

EXPOSE 2333

CMD ["yarn"]
CMD ["yarn", "start"]
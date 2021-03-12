FROM node:alpine

WORKDIR /usr/local/app
COPY ./ .
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add --update openssl && \
    rm -rf /var/cache/apk/*
RUN yarn  --registry=https://registry.npm.taobao.org
RUN yarn apidoc
RUN yarn cache clean
RUN rm -rf /usr/local/lib/node_modules/npm
ENV NODE_ENV production
EXPOSE 3000 

CMD ["yarn", "start"]
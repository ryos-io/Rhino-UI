FROM nginx:1.17.6-alpine
MAINTAINER Mustafa Caylak <mustafa.caylak@web.de>

RUN apk add --update nodejs-current nodejs-npm

# bc security
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir /app
COPY . /app

RUN rm -rf /app/node_modules
RUN cd /app/ && npm i -D && npm run build && cp -r dist/* /usr/share/nginx/html

RUN chmod 755 /usr/share/nginx/html
RUN chmod 644 /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html

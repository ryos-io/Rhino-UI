FROM nginx:1.17.6-alpine
MAINTAINER Mustafa Caylak <mustafa.caylak@web.de>

# bc security
RUN rm /etc/nginx/conf.d/default.conf

#
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html

RUN chmod 755 /usr/share/nginx/html
RUN chmod 644 /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html

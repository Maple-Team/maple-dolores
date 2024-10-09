FROM nginx:1.27.1

MAINTAINER liutsing <liutsingluo@gmail.com>

# 设置时区， 接口请求默认返回的是GMT时间，也就是UTC时间
RUN rm -f /etc/localtime && ln -sv /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone

RUN mkdir -p /app
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

WORKDIR /app

COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist /app/

EXPOSE 80

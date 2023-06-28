FROM nginx:1.23

MAINTAINER liutsing <liutsingluo@gmail.com>

RUN rm -f /etc/localtime && ln -sv /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone

RUN mkdir -p /app
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

WORKDIR /app

COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist /app/
COPY localhost+3-key.pem /app/
COPY localhost+3.pem /app/

#容器内暴露端口
EXPOSE 443

# 定义容器启动执行的命令，注意：在docker run使用这个镜像，镜像后禁止追加命令，否则会导致CMD指令不生效
#CMD ps -ef|grep nginx

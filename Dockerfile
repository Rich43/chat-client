FROM nginx:latest
COPY build /usr/share/nginx/html
COPY nginx /etc/nginx/conf.d

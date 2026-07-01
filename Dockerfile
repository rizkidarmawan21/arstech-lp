FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY logo.png /usr/share/nginx/html/logo.png
COPY dashboard-preview.png /usr/share/nginx/html/dashboard-preview.png
COPY pos-preview.png /usr/share/nginx/html/pos-preview.png
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

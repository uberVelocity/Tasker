FROM node:lts-alpine as build-stage

# Copy the respective nginx configuration files
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
# COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf

# Make 'client' the current working directory
WORKDIR frontend

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory
COPY . .

# build app for production with minification
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage frontend/dist /usr/share/nginx/html

# COPY nginx_config/prod.conf /temp/prod.conf
# RUN envsubst frontend < /temp/prod.conf > /etc/nginx/conf.d/prod.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



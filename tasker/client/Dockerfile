FROM node:lts-alpine as build-stage

# Make 'client' the current working directory
WORKDIR /client

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
COPY --from=build-stage /client/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



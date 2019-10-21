FROM node:10

# Create app directory
WORKDIR gw_sensor

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3002

CMD ["node", "server/index.js"]

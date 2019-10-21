FROM node:10

# Create app directory
WORKDIR co2_sensor

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001

CMD ["node", "server/index.js"]

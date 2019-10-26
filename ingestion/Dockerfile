FROM node:10

# Create app directory
WORKDIR ingestion

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 4003

CMD ["node", "server/index.js"]

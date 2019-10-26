FROM node:10

# Create app directory
WORKDIR backend

# Install app dependencies
COPY package*.json ./

RUN npm install --verbose

# Bundle app source
COPY . .

EXPOSE 5000

CMD ["node", "server/index.js"]


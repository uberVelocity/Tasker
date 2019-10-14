FROM node:10

# Create app directory
WORKDIR back-end

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD ["node", "server/index.js"]


FROM node:10

# Create app directory
WORKDIR history_retriever

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 4001

CMD ["node", "server/index.js"]

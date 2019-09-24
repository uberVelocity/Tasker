FROM node:10

# Create app directory
WORKDIR /home/merkel/Documents/University/wacc/full-stack/tasker

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD ["node", "server/index.js", "--host", "0.0.0.0"]


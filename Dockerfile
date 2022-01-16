FROM node:16-alpine
RUN apk update
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
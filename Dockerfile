FROM node:16.13.1-alpine

WORKDIR /app
COPY package-lock.json /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
EXPOSE 3000/tcp
CMD ["npm", "run", "start"]
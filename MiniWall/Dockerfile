<<<<<<< HEAD
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

=======
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

>>>>>>> 0651e3fdb1d95af6e0c4602acc4f1ff9b6c87fbb
CMD ["node", "src/server.js"]
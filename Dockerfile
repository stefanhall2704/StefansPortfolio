FROM node:18.15.0-alpine3.15
WORKDIR /app
RUN npm install react node tailwindcss Sidebar inview
COPY . /app
CMD ["npm", "start"]

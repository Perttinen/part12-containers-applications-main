FROM node:16

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

RUN npm ci

RUN CI=true npm test

CMD ["npm", "start"]
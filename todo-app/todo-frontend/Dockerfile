FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL="http://localhost:3001/"

RUN npm install

RUN CI=true npm test

CMD ["npm", "start"]
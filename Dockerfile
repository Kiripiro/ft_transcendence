FROM node:17

COPY backend .

WORKDIR backend

CMD npm run start

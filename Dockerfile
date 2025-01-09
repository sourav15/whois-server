FROM node AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .
COPY .env ./

RUN yarn build

FROM node:slim

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package.json yarn.lock .env ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
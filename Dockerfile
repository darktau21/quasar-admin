FROM node:21-alpine3.18 as loader
WORKDIR /app
COPY ./ ./
RUN npm ci

FROM node:21-alpine3.18 as dev
WORKDIR /app
COPY --from=loader /app ./
CMD [ "npm", "run", "dev" ]

FROM node:21-alpine3.18 as builder
WORKDIR /app
COPY --from=loader /app ./
RUN npm run build

FROM node:21-alpine3.18 as prod
WORKDIR /app
COPY --from=loader /app/.output ./
RUN ["node", "./.output/server/index.mjs"]

FROM node:8.12-alpine as build

WORKDIR /workspace

COPY ./ ./

RUN npm install -g yarn
RUN yarn install
RUN yarn run prod:build

FROM node:8.12-alpine

WORKDIR /workspace

RUN npm install -g yarn

COPY --from=build /workspace/package.json ./
COPY --from=build /workspace/yarn.lock ./
COPY --from=build /workspace/public ./public
COPY --from=build /workspace/build ./build
COPY --from=build /workspace/config ./config

RUN yarn install --production=true

EXPOSE 3000
ENTRYPOINT [ "yarn", "run", "prod:run" ]

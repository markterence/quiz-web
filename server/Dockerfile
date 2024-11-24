FROM node:14.16-slim as install-package
RUN mkdir /app
WORKDIR /app
COPY ./package.json /app/.
RUN yarn install


# Final Build
FROM node:14.16-slim
LABEL maintainer="https://keybase.io/coffeekitkat"

RUN mkdir /app
WORKDIR /app

COPY --from=install-package /app/node_modules /app/node_modules
COPY . .

RUN chmod +x /app/scripts/wait-for-it.sh
EXPOSE 1337

CMD ["npm","start"]

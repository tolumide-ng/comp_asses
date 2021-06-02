FROM node:14.16.1-alpine3.10
RUN apk update && apk add bash
RUN mkdir /app
WORKDIR /app
COPY . /app
ENV AES_KEY AES_KEY
ENV IV_KEY IV_KEY
RUN yarn install
RUN yarn run build
RUN ls -a
# EXPOSE 3000
CMD ["yarn", "run", "start"]



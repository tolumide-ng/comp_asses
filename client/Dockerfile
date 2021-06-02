FROM node:14.16.1-alpine3.10
RUN apk update && apk add bash
RUN mkdir /app
WORKDIR /app
COPY . /app
ENV BASE_URL BASE_URL
RUN yarn install
RUN yarn run build
RUN ls -a
EXPOSE 8080
CMD ["yarn", "run", "start"]


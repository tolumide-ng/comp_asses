FROM node:14
# RUN apk update && apk add bash && apk add yarn
# RUN apk add git
RUN npm install yarn
RUN yarn
RUN mkdir /app
WORKDIR /app
COPY . /app
ENV BASE_URL BASE_URL
RUN yarn install
RUN yarn run build
RUN ls -a
EXPOSE 8080
CMD ["yarn", "run", "start"]


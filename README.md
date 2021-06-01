## Maily FE

## How to Setup this project

### Using your local machine's environment:

--- Prequisites: `at least node version 14, npm` installed on your local machine

1. Clone the repository
2. Cd into the project
3. Run `npm install` to install all packages
4. Create you local `.env` file and Add Environment variables as listed on the `.env.sample` file (You could use the deployed backend on heroku as the `BASE_URL: "https://maily-tolu-be.herokuapp.com/"`)
5. Start the project with `npm run dev` to run in development mode
6. To run the production version of the application run
   i. `npm run build`
   ii. `npm run start`
   iii. Open you browser and checkout `http://localhost:8080/`

### Using the application with docker

-- Prerequisites: `docker, docker-compose`

1. Clone the repository
2. Cd into the application
3. Create a local `.env` file and Add Environment variables as listed on the `.env.sample` file:
   i. Your `BASE_URL` should be: `http://localhost:9000/` (check the docker-compose.yml file to see why),
   ii. It is compulsory that each of the keys (i.e AES_KEY & IV_KEY) have an exact length of 16
4. Run `docker compose up` or `docker-compose up`
5. Open your browser and checkout `http://localhost:50000`
6. To shut down the application
   i. `CMD + C `
   ii. `docker compose down` or `docker-compose down`

Enter your "yahoo" associated email address and password to access your mails
Checkout how to generate passwords for third party applications on [yahoo](https://help.yahoo.com/kb/generate-third-party-passwords-sln15241.html)

## Subtle Notes:

Refreshing the application would cause you to lose your authentication. Hence you would need to reconnect to access your mails.

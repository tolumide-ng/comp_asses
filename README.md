## Maily FE

## How to Setup this project

### Using your local machine's environment:

--- Prequisites: Have `node, npm` installed on your local machine

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

-- Prerequisites: Habe

1. Clone the repository
2. Cd into the application
3. Clone the [backend](https://github.com/tolumide-ng/maily_be) and please follow all the instructions there (relating to launching with docker)
4. Create a local `.env` file and Add Environment variables as listed on the `.env.sample` file (Your `BASE_URL` should be: `http://localhost:9000/` (check the docker-compose.yml file to see why))
5. Run `docker compose up`
6. Open your browser and checkout `http://localhost:50000`

Enter your "yahoo" associated email address and password to access your mails
Checkout how to generate passwords for third party applications on [yahoo](https://help.yahoo.com/kb/generate-third-party-passwords-sln15241.html)

## Subtle Notes:

Refreshing the application would cause you to lose your authentication. Hence you would need to reconnect to access your mails.

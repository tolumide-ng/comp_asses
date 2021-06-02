## Maily BE

### Endpoints

| #   | Description               | Endpoint   | Request Body                         | Request Header |
| --- | ------------------------- | ---------- | ------------------------------------ | -------------- |
| 1   | Get all user Emails       | `/all`     | email, password, encType, serverType | NA             |
| 2   | Get a Specific user Email | `/one/:id` | encType, serverType                  | userKey        |

## How to Setup this project

### Using your local machine's environment:

--- Prequisites: Have `node, npm` installed on your local machine

1. Clone the repository
2. Cd into the project
3. Run `npm install` to install all packages
4. Create you local `.env` file and Add Environment variables as listed on the `.env.sample` file (It is compulsory that each of the keys have an exact length of 16)
5. Start the project with `npm run dev` to run in development mode: checkout `localhost:4000`
6. To run the production version of the application run `npm run start`: checkout `localhost:4000`
7. The available endpoints of the application are documented above

### Using the application with docker

-- Prerequisites: `docker, docker-compose`

1. Clone the repository
2. Cd into the application
3. Create a local `.env` file and Add Environment variables as listed on the `.env.sample` file (Your `BASE_URL` should be: `http://localhost:9000/` (check the docker-compose.yml file to see why)):
   i. It is compulsory that each of the keys (i.e AES_KEY & IV_KEY) have an exact length of 16
4. Run `docker compose up` or `docker-compose up`
5. Open your browser and checkout `http://localhost:9000`
6. To shut down the application
   i. `CMD + C `
   ii. `docker compose down` or `docker-compose down`

## Maily

### Endpoints

| #   | Description               | Endpoint   | Request Body                         | Request Header |
| --- | ------------------------- | ---------- | ------------------------------------ | -------------- |
| 1   | Get all user Emails       | `/all`     | email, password, encType, serverType | NA             |
| 2   | Get a Specific user Email | `/one/:id` | encType, serverType                  | userKey        |

## How to Setup this project

-- Prerequisites: `docker, docker-compose`

1. Clone the repository
2. Cd into the application
3. Run `docker compose up` to start the application
4. Check the page on `localhost:5000` on your browser

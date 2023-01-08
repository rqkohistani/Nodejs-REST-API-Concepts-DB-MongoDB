# Nodejs-REST-API-Concepts-DB-Json

Built a secure NodeJs REST API uses best API practice. Implemented JWT "AccessToken, refreshToken" and "Roles and permissions". The data are stored in JSON file.

## Description

This REST API allows you to create, read, update and delete employees and users data. The employees file is located in the `./model/employees.json` file and the users file is located in the `./model/users.json` file.
The employees json won't be updated. That is I designed it. However, the users json file will be updated. You can add, edit and delete users.

<!-- Check out MongoDb repo -->
## [2. Nodejs-REST-API-Concepts-DB-MongoDB](https://github.com/rqkohistani/Nodejs-REST-API-Concepts-DB-MongoDB)

## Run the project

1. Clone the project
1. Run `npm install`
1. Run `npm run dev`
1. Open your browser and go to `http://localhost:3500/`

### import postman collection

You can import the postman collection from the `./postmanCollection` folder.

#### Available users

1. login with one of the user below

    1.http://localhost:3500/auth

        {
          user: "UserOnly"
          pwd: "Aa$12345"
        }

        {
          user: "UserEditor"
          pwd: "Aa$12345"
        }

        {
          user: "UserEditorAdmin"
          pwd: "Aa$12345"
        }
1. Other endpoints

        .../register
        .../refresh
        .../logout

#### Employee endpoints

    1. get all employees
    1. get employee by id
    1. create employee
    1. update employee
    1. delete employee

### User Roles

1. *UserOnly*: can only view the data and can not edit it.
1. *UserEditor*: can view and edit the data.
1. *UserEditorAdmin*: can view, edit and delete the data.

1. JWT implementation
    1. access token
    1. refresh token

1. Authentication
1. Authorization
1. Roles and permissions

1. Database
    1. JSON files

#### Thank you for reading this documentation. I hope you enjoyed it

## [My linkedIn](https://www.linkedin.com/in/rashed-qazizada-1b64b68a/)

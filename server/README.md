# quizdb-server

> quizdb-server server powered by [Sails v1](https://sailsjs.com).

## Getting Started

### Setting up your development environment

Here's a rundown on how to get a development environment up.

There are few different options to get started:

#### 1. Manual setup (using an existing development environment)

Recommended Node.js version is 10.16 above.

- Create environment variables
- Run `yarn` to install dependencies
- Manually create the database
- Run `yarn knex migrate:latest` to start the database migration
- Run `yarn knex seed:run` to seed the database.
- Run `yarn dev` to start development server in watch mode, otherwise run `yarn start`.

#### 2. Using Docker

- First, make sure that you have Docker and Docker-Compose installed.
  - If you don't have docker kindly install Docker and [Docker-Compose](https://docs.docker.com/compose/install/).
  - [Install Docker Desktop on Windows](https://docs.docker.com/docker-for-windows/install/)
  - [Get started with Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
  - [Get Docker Engine - Community for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- Create the `.env` configuration file. See [Configure `.env` file](#configure-env-file)
- Create the container:
  - Run `docker-compose up -d` in the project's root directory.
- Setup the container:
  - Run `docker-compose exec app yarn install` to install the dependencies.
  - Run `docker-compose exec app yarn knex migrate:latest` to run database migration
  - Run `docker-compose exec app yarn knex seed:run` to seed the database.
- Run `docker-compose exec app node app.js` to start the server.
- To stop the containers, run `docker-compose stop`.
- To destroy containers, run `docker-compose down -v`. If you do this, you need to setup the containers again.

## Development

### Migration

- [KnexJS](https://knexjs.org/)
- Make sure sails models and migration files are synced.
- Create a migration file by running `npm run knex:make` in the command line

```bash
# will create a migration file named pet under db/migrations/
npm run knex:make -- pet
```

### Testing

Jest is configured in this project using it `jest.config.js` and sometimes it breaks.

Please fallback to mocha (https://sailsjs.com/documentation/concepts/testing)

### Links

- [KnexJS](https://knexjs.org/)
- [Get started](https://sailsjs.com/get-started)
- [Sails framework documentation](https://sailsjs.com/documentation)
- [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
- [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)

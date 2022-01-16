# NodeJS Brief: Tournament API

This API enables your client to interact with the Tournament's dataset.   Please note, this is a read-only API and you will require an API key to get started.

 1. [Objectives](#objectives)
 2. [Installation](#installation)
 3. [Using Docker](#using-docker)
 4. [Troubleshooting](#troubleshooting)
 5. [Routes](#routes)
 6. [API Specification](#api-specification) 
 7. [Testing](#testing)
 8. [Validation](#validation)
 9. [To Do](#todo)

## Objectives

With this API, you will be able to retrieve stats on each **Player** and **Team** which took part in the Tournament, as well as all **Results** for each game. 

## Installation

1. You will need [NodeJS](https://nodejs.org/en/download/) installed to host this API.  In your terminal or command line application, type in `node -v` and press Enter to show which version is installed.   A response of `v14.0.0` or above will work. 
2. Clone or download this project, and then navigate to the project folder in your terminal.
3. Still in your terminal, type `npm i` and press Enter to begin installing the project's dependencies.
4. In the project's root folder, create a copy of `.env.example` and rename it `.env`.  In this file, you will need to set the **LEAGE_API_KEY** to your API key.
5. Type `npm run serve` and press Enter to start the server for development, or
6. Type `npm run start` and press Enter to start the server for production.

## Using Docker

If you prefer using Docker, use the following commands from the project root:

1. `docker build -t nodejs-brief:latest .`
2. `docker run -p 8099:8099 nodejs-brief:latest`

## Troubleshooting

If your `.env` file is missing or incorrectly set, you will see this message:
>Error: Missing Environment Variables: LEAGUE_SERVER_PORT,LEAGUE_SOURCE_ROOT_URL,LEAGUE_API_KEY

Make sure you copy `.env.example` and set the API key correctly.  Default values for the server port and source root should be sufficient.

## Routes

You will find the following endpoints in this API:
|Route  |Description  |
|--|--|
|`/teams`|Lists all teams in the tournament.|
|`/teams/:ids`|Lists one or more teams in the tournament using the given ID(s).  IDs can be comma-separated.|
|`/teams/:ids/stats`|Lists one or more team's statistics in the tournament using the given ID(s).  IDs can be comma-separated.|
|`/players`|Lists all players in the tournament|
|`/players/:ids`|Lists one or more players in the tournament using the given ID(s).  IDs can be comma-separated.|
|`/players/:ids/stats`|Lists one or more player's statistics in the tournament using the given ID(s).  IDs can be comma-separated.|
|`/results`|Lists all results for games played including players and points scored|

For a comprehensive schema, see the [next section](#api-specification).

## API Specification

The file `openapi.yaml` is an OpenAPI definition and is included in the project root.  Copy and Paste the contents of the file into the editor hosted on https://editor.swagger.io/ to view the specification and try out the API from your browser.  You will need to set the API key using the Authorize button.

Alternatively, a Postman collection has also been included in the project's root.  You will need to set the **x-api-key** variable to your API key in the collection's variables tab. 

## Testing

Use the command `npm test` to run the test suite and view code coverage.

## Validation

Use the command `npm run validate` to run Imagination's preset validation script.

## To Do

- Logging
- Metrics
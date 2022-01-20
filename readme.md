# NodeJS Brief: Tournament API

This API enables your client to read the Tournament's dataset.

 1. [Objectives](#objectives)
 2. [Installation](#installation)
 3. [Using Docker](#using-docker)
 4. [Troubleshooting](#troubleshooting)
 5. [Routes](#routes)
 6. [API Specification](#api-specification)
 7. [Testing](#testing)
 8. [Validation](#validation)
 9. [Metrics](#metrics)
 10. [To Do](#todo)

## Objectives

With this API, you will be able to retrieve stats on each **Player** and **Team** which took part in the Tournament, as well as all **Results** for each game.

## Installation

1. Install [Node.js](http://nodejs.org/).  This application requires Node v14 or above
2. Clone the github repository:
    ```shell
    git clone https://github.com/Schrembot/nodejs-brief.git
    ```
3. Go to the directory:
    ```shell
    cd nodejs-brief
    ```
4. Install node packages:
    ```shell
    npm install
    ```
5. In the project's root folder, create a copy of `.env.example` and rename it `.env`.  In this file, you will need to set a **LEAGE_API_KEY** which will then be used to authorise your requests.
    ```shell
    LEAGUE_API_KEY=1234-1234-1234
    ```
6. Finally, run one of the following commands to run the application.  For development:
    ```shell
    npm run serve
    ```
    or for production:
    ```shell
    npm run start
    ```

## Using Docker

If you prefer using Docker, use the following commands from the project root:

```shell
docker build -t nodejs-brief:latest .
docker run -p 8099:8099 nodejs-brief:latest
```

## Troubleshooting

If your `.env` file is missing or incorrectly set, you will see this message:
>Error: Missing Environment Variables: LEAGUE_SERVER_PORT,LEAGUE_SOURCE_ROOT_URL,LEAGUE_API_KEY

Make sure you copy `.env.example` and set the API key correctly.  Default values for the server port and source root should be sufficient.  

If you are seeing HTTP 401 or 403 responses from the server, it means your API key is incorrectly set in your request headers.   The value you set in the `.env` file for **LEAGUE_API_KEY** is what you need to send through the **x-api-key** header in your requests.

If any of the data sources set in **LEAGUE_SOURCE_ROOT_URL** are unreachable on server launch, an error will be raised and the server will not start up.   Ensure the data sources are available on the target server and that the files are readable from your device.

## Routes

You will find the following endpoints in this API:
| Route                 | Description                                                                                                 |
|-----------------------|-------------------------------------------------------------------------------------------------------------|
| `/teams`              | Lists all teams in the tournament.                                                                          |
| `/teams/:ids`         | Lists one or more teams in the tournament using the given ID(s).  IDs can be comma-separated.               |
| `/teams/:ids/stats`   | Lists one or more team's statistics in the tournament using the given ID(s).  IDs can be comma-separated.   |
| `/players`            | Lists all players in the tournament                                                                         |
| `/players/:ids`       | Lists one or more players in the tournament using the given ID(s).  IDs can be comma-separated.             |
| `/players/:ids/stats` | Lists one or more player's statistics in the tournament using the given ID(s).  IDs can be comma-separated. |
| `/results`            | Lists all results for games played including players and points scored                                      |

For a comprehensive schema, see the [next section](#api-specification).

## API Specification

The file `openapi.yaml` is an OpenAPI definition and is included in the project root.  Copy and Paste the contents of the file into the editor hosted on <https://editor.swagger.io/> to view the specification and try out the API from your browser.  You will need to set the API key using the Authorize button.

Alternatively, a Postman collection has also been included in the project's root.  You will need to set the **x-api-key** variable to your API key in the collection's variables tab.

## Testing

Use the command `npm test` to run the test suite and view code coverage.

## Validation

Use the command `npm run validate` to run Imagination's preset validation script.  This script will only validate if the **LEAGE_API_KEY** is set to **06c47d56-614f-4577-8e85-c88e31c5e8e5**

## Metrics

Metrics are implemented with [Prometheus](https://prometheus.io/) with data exposed at `/metrics`

## To Do

- Logging
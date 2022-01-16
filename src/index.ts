import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression'
import { validateEnvironment } from './utilities/validateEnvironment'
import { downloadData, getCacheKeys } from './utilities/dataCache'

dotenv.config();
try {
    validateEnvironment( process.env )
} catch ( error ) {
    console.log( error )
    process.exit();
}

const PORT = process.env.LEAGUE_SERVER_PORT;
const app: Express = express();

app.use(cors())
app.use(helmet());
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./middleware/authorisation'))
app.use('/', require('./routes'))

;(async () => {
    // Preload and store all our data.
    // This will be downloaded each time we recomple the application
    await downloadData([
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/players.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/results.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/teams.json`,
    ])

    app.listen(PORT, () => console.log(`Running on port ${PORT}`, getCacheKeys()));
})()
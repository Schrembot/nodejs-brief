import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression'
import { validateEnvironment } from './utilities/validateEnvironment'
import { downloadData } from './utilities/downloadData'

dotenv.config();
validateEnvironment( process.env )

const PORT = process.env.LEAGUE_SERVER_PORT;
const app: Express = express();

app.use(cors())
app.use(helmet());
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./middleware/authorisation'))
app.use('/', require('./routes'))
app.get('*', (req: Request, res: Response)  => res.sendStatus(404));

(async () => {
    // Preload and store all our data.
    // This will be re-downloaded each time we run the application to make sure it's fresh
    await downloadData([
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/players.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/results.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/teams.json`,
    ])

    app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
})()
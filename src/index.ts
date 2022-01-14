import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression'
import { validateEnvironment } from './utilities/validateEnvironment'

dotenv.config();
validateEnvironment( process.env )

const PORT = process.env.LEAGUE_SERVER_PORT || 3000;
const app: Express = express();

app.use(cors())
app.use(helmet());
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./middleware/authorisation'))
app.use('/', require('./routes'))
app.get('*', (req: Request, res: Response)  => res.sendStatus(404))

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
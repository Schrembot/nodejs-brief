import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression'

dotenv.config();

const PORT = process.env.LEAGUE_SERVER_PORT || 3000;
const app: Express = express();

app.use(cors())
app.use(helmet());
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./middleware/authorisation'))
app.use('/teams', require('./routes/teams'))
app.use('/players', require('./routes/players'))
app.use('/results', require('./routes/results'))
app.get('/', (req: Request, res: Response)  => res.send('Ready'));

app.get('*', (req: Request, res: Response)  => res.sendStatus(404))

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
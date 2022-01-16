import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression'
import { validateEnvironment } from './utilities/validateEnvironment'
import { downloadData } from './utilities/dataCache'
import { getRoutes } from './routes' 

export const setupServer = async ( environment:any={} ):Promise<Express|null> => {

    dotenv.config();
    // Overwrite any environment variables if needed
    process.env = { ...process.env, ...environment }

    try {
        validateEnvironment( process.env )
    } catch ( error ) {
        console.log( error )
        return null
    }

    const app: Express = express();
    
    app.use(cors())
    app.use(helmet());
    app.use(compression())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(require('./middleware/authorisation'))
    app.use('/', getRoutes())
    
    
    // Preload and store all our data.
    // This will be downloaded each time we recomple the application
    await downloadData([
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/players.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/results.json`,
        `${process.env.LEAGUE_SOURCE_ROOT_URL}/teams.json`,
    ])

    return app
}
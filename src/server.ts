import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression'
import { validateEnvironment } from './utilities/validateEnvironment'
import { downloadData } from './utilities/dataCache'
import { getRoutes } from './routes' 
import apimetrics from 'prometheus-api-metrics'

export const setupServer = async ( environment:any={}, files:Array<string>=[] ):Promise<Express|null> => {

    dotenv.config();
    // Overwrite any environment variables if needed
    process.env = { ...process.env, ...environment }
    const data:Array<string> = files.length ? files : ['players.json', 'results.json', 'teams.json'].map( item => `${process.env.LEAGUE_SOURCE_ROOT_URL}/${item}` )

    try {
        validateEnvironment( process.env )
    } catch ( error ) {
        console.log( error )
        return null
    }
    
    // Preload and store all our data.
    // This will be downloaded each time we recomple the application
    try {
        await downloadData( data )
    } catch ( error ) {
        console.log( error )
        return null
    }

    const app: Express = express();
    
    app.use(cors())
    app.use(helmet());
    app.use(compression())
    app.use(apimetrics())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use( require('./middleware/authorisation') )
    app.use('/', getRoutes())

    return app
}
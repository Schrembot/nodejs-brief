import { Request, Response, Router } from 'express'
import { loadData, passthroughData } from '../utilities/dataCache'

const routes = Router();

routes.get('/', async (req:Request, res:Response )=>res.sendFile( passthroughData('results.json') ) )

module.exports = routes
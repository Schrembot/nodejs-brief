import { Request, Response, Router } from 'express'
import { getAllResults } from '../controllers/results'

const routes = Router();

routes.get('/', async (req:Request, res:Response )=>res.json( await getAllResults() ) )

module.exports = routes
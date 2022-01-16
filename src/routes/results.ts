import { Request, Response, Router } from 'express'
import { getAllResults } from '../controllers/results'

export const getRoutes = ():Router => {
    const routes = Router();

    routes.get('/', async (req:Request, res:Response )=>res.json( await getAllResults() ) )

    return routes
}
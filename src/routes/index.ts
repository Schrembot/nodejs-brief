import { Router, Request, Response } from 'express'
import { getRoutes as teamsRoutes } from './teams'
import { getRoutes as playersRoutes } from './players'
import { getRoutes as resultsRoutes } from './results'

export const getRoutes = ():Router => {
    const routes:Router = Router()

    routes.use('/teams', teamsRoutes())
    routes.use('/players', playersRoutes())
    routes.use('/results', resultsRoutes())
    routes.get('/', (req: Request, res: Response)  => res.sendStatus(200))
    routes.all('*', (req: Request, res: Response)  => res.sendStatus(404))

    return routes
}
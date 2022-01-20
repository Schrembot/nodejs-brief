import { Router, Request, Response } from 'express'
import { getRoutes as teams_routes } from './teams'
import { getRoutes as players_routes } from './players'
import { getRoutes as results_routes } from './results'

export const getRoutes = ():Router => {
  const routes:Router = Router()

  routes.use('/teams', teams_routes())
  routes.use('/players', players_routes())
  routes.use('/results', results_routes())
  routes.get('/', (req: Request, res: Response) => res.sendStatus(200))
  routes.all('*', (req: Request, res: Response) => res.sendStatus(404))

  return routes
}

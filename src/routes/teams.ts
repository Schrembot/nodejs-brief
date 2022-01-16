import { Request, Response, Router } from 'express'
import { getTeamsById, getAllTeams, getTeamStatsById } from '../controllers/teams'

export const getRoutes = ():Router => {
    const routes = Router();

    routes.get('/', async (req:Request, res:Response )=>res.json( await getAllTeams() ))
    routes.get('/:ids', async (req:Request, res:Response )=>res.json( await getTeamsById( req.params.ids?.split(',') ) ) )
    routes.get('/:ids/stats', async (req:Request, res:Response )=>res.json( await getTeamStatsById( req.params.ids?.split(',')) ) )

    return routes
}
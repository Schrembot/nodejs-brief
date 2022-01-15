import { Request, Response, Router } from 'express'
import { getTeamsById, getAllTeams } from '../controllers/teams'

const routes = Router();

routes.get('/', async (req:Request, res:Response )=>res.json( await getAllTeams() ))
routes.get('/:ids', async (req:Request, res:Response )=>res.json( await getTeamsById( req.params.ids?.split(',') ) ) )
routes.get('/:ids/stats', (req:Request, res:Response )=>res.json( Object.keys(req) ) )

module.exports = routes
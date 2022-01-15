import { Request, Response, Router } from 'express'
import { getPlayersById, getAllPlayers, getPlayerStatsById } from '../controllers/players'

const routes = Router();

routes.get('/', async (req:Request, res:Response )=>res.json( await getAllPlayers() ))
routes.get('/:ids', async (req:Request, res:Response )=>res.json( await getPlayersById( req.params.ids?.split(',') ) ) )
routes.get('/:ids/stats', async (req:Request, res:Response )=>res.json( await getPlayerStatsById( req.params.ids?.split(',')) ) )

module.exports = routes
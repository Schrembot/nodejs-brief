import { Request, Response, Router } from 'express'

const playerController = require('../controllers/players')
const routes = Router();

routes.get('/', async (req:Request, res:Response )=>res.json( await playerController.getAllPlayers() ))
routes.get('/:ids', async (req:Request, res:Response )=>res.json( await playerController.getPlayersById( req.params.ids?.split(',') ) ) )
routes.get('/:ids/stats', async (req:Request, res:Response )=>res.json( Object.keys(req) ) )

module.exports = routes
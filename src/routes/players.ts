import { Request, Response, Router } from 'express'

const playersController = require('../controllers/players')
const routes = Router();

routes.get('/', async (req:Request, res:Response )=>res.json( await playersController.getAllPlayers() ))
routes.get('/:ids', async (req:Request, res:Response )=>res.json( await playersController.getPlayersById( req.params.ids?.split(',') ) ) )
routes.get('/:ids/stats', async (req:Request, res:Response )=>res.json( Object.keys(req) ) )

module.exports = routes
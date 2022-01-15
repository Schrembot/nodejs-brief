import { Request, Response, Router } from 'express'

const teamsController = require('../controllers/teams')
const routes = Router();

routes.get('/', async (req:Request, res:Response )=>res.json( await teamsController.getAllTeams() ))
routes.get('/:ids', async (req:Request, res:Response )=>res.json( await teamsController.getTeamsById( req.params.ids?.split(',') ) ) )
routes.get('/:ids/stats', (req:Request, res:Response )=>res.json( Object.keys(req) ) )

module.exports = routes
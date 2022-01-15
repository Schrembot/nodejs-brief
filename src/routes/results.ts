import { Request, Response, Router } from 'express'

const resultsController = require('../controllers/results')
const routes = Router();

routes.get('/', async (req:Request, res:Response )=>res.json( await resultsController.getAllResults() ) )

module.exports = routes
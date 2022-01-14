import { Request, Response, Router } from 'express'

const routes = Router();

routes.get('/', (req:Request, res:Response )=>res.json( Object.keys(req) ))

module.exports = routes
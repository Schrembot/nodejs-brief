import { Request, Response, Router } from 'express'
import apicache from 'apicache'

const routes = Router();

let cache = apicache.middleware
routes.get('/', (req:Request, res:Response )=>res.json( Object.keys(req) ))

module.exports = routes
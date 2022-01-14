import { Router, Request, Response } from 'express';
const routes = Router();

routes.use('/teams', require('./teams'))
routes.use('/players', require('./players'))
routes.use('/results', require('./results'))
routes.get('/', (req: Request, res: Response)  => res.send('Ready'));

module.exports = routes
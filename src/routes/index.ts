import { Router, Request, Response } from 'express'
const routes:Router = Router()

routes.use('/teams', require('./teams'))
routes.use('/players', require('./players'))
routes.use('/results', require('./results'))
routes.get('/', (req: Request, res: Response)  => res.sendStatus(200))
routes.all('*', (req: Request, res: Response)  => res.sendStatus(404))

module.exports = routes
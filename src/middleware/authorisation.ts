import { Request, Response, NextFunction } from 'express'

export const authorisation = (req:Request, res:Response, next:NextFunction):void => {
  if (req.headers['x-api-key']) {
    // API key provided and valid
    if (req.headers['x-api-key'] === process.env.LEAGUE_API_KEY) {
      next()
      return
    }

    // API key provided and invalid
    res.sendStatus(403)
    return
  }

  // API key missing
  res.sendStatus(401)
}

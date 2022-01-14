import { Request, Response } from 'express';

module.exports = function(req:Request, res:Response, next:Function):void {
    if ( req.headers['x-api-key'] ) {

        // API key provided and valid
        if (req.headers['x-api-key'] === process.env.LEAGUE_API_KEY) {
            next()
            return
        }

        // API key provided and invalid
        res.sendStatus(403);
        return

    }
    
    // API key missing
    res.sendStatus(401);
}
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validator = ( req : Request, res: Response, next: NextFunction): void => {
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        res.json(
            {
                error : error.array().map(validationError => validationError.msg)
            }
        )
        return
    }
    else next()
}
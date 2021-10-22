import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validator = ( req : Request, res: Response, next: NextFunction): void => {
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        console.log(error.isEmpty())
        console.log(req.body)
        res.json(
            {
                error : error.array().map(validationError => validationError.msg)
            }
        )
        return
    }
    else next()
}

export const checkEmptyBody = (req : Request, res: Response, next : NextFunction) : void => {
    if (Object.keys(req.body).length == 0) 
    {
        res.send({message : 'Data tidak boleh kosong mohon input ulang'})
        return 
    }
    else next()
}
import { Request, Response, NextFunction } from "express";
import { JWT_KEY } from "../../constant";
import * as jwt from "jsonwebtoken"

export const checkToken = (req: Request, res: Response, next : NextFunction) => 
{
    const token = <string>req.headers['authorization']
    // console.log(req.headers)
    // console.log(token)
    
    if (token == undefined)
    {
        res.status(401)
        res.send({
            error: 'Akses Di Tolak'
        })
        return 
    }
    else 
    {
        const decoded = jwt.decode(token, {complete: true})
        res.locals.payload = decoded?.payload
        jwt.verify(token, JWT_KEY, (err, verified) => {
            if (err)
            {
                res.status(401).send(
                    {
                        success : false, err : err
                    }
                )
                return
            }
            else {
                next()
            }
        })
    }

}
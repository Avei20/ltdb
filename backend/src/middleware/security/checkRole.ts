import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const checkRole = (roles : Array<string>) => {
    return async (req: Request, res:Response, next: NextFunction) =>
    {
        const role = res.locals.payload.role
        
        if (roles.indexOf(role) > -1) next()
        else res.status(401).send({
            err: 'You does\'t have authority!'
        })
    }
}
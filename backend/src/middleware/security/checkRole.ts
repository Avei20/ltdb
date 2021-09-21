import { Request, Response, NextFunction } from "express";
import { User } from ".prisma/client";
import { PrismaClient } from ".prisma/client";
import { resolveTripleslashReference } from "typescript";

const prisma = new PrismaClient()

export const checkRole = (roles : Array<string>) => {
    return async (req: Request, res:Response, next: NextFunction) =>
    {
        const role = res.locals.payload.role
        
        if (roles.indexOf(role) > -1) next()
        else res.status(401).send({
            err: 'No Acces'
        })
    }
}
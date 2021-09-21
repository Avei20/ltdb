import * as jwt from 'jsonwebtoken'
import Bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { JWT_KEY, WAKTU_VALID_TOKEN } from '../constant'
import { User } from '@prisma/client'

const prisma = new PrismaClient()
      
export const login = (req: Request, res: Response): void =>
{
    let data = req.body
    if ((typeof data.username === "string" && typeof data.password === "string"))
    {
        prisma.user.findUnique(
        {
            where: {username : data.username}
        })
        .then (user => {
            if (user === null)
            {
                res.status(404)
                res.send({
                    error : "User Not Found"
                })
            }
            else 
            {
                Bcrypt.compare(data.password, user.password)
                    .then(isValid => {
                        if (isValid) res.send({
                            token : jwt.sign({id: user.id, role : user.role}, JWT_KEY, {
                                expiresIn: WAKTU_VALID_TOKEN
                            })
                        })
                    }).catch(error => {
                        console.log(error)
                        res.status(500)
                        res.send({
                            message : "User not authorized"
                        })
                    })
            }
        }).catch(console.log)
    }
    else 
    {
        res.status(400)
        res.send({
            error : "Username and password required"
        })
    }
}

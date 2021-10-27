import * as jwt from 'jsonwebtoken'
import Bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { JWT_KEY, WAKTU_VALID_TOKEN } from '../constant'

const prisma = new PrismaClient()

export const getId = (token : string) => 
{
    const decoded = jwt.decode(token, {complete : true})
    return decoded?.payload.id
}

export const loginFirst = async (req: Request, res: Response) => 
{
    let data = req.body
    prisma.user.findFirst ({
        where : {
            username : data.username,
            deleted : false
        },
        include : 
        {
            roles : true,
        },
    })
    .then (user => {
        if (user === null)
        {
            res.status(404).send({
                error : "Username/Password salah"
            })
            return
        }
        else 
        {
            Bcrypt.compare(data.password, user.password)
                .then (isValid => {
                    if (isValid)
                    {
                        res.send ({
                            role : user.roles
                        })
                    } 
                })
                .catch (err => 
                {
                    console.log(err)
                    res.status(500).send(
                        {
                            message : "Username/Password Salah"
                        }
                    )
                    return;
                })
        }
    })
    .catch( err => console.log(err))
}

export const loginSecond =  async (req : Request, res : Response) =>
{
    let data = await req.body 
    prisma.user.findUnique(
    {
        where : {username : data.username}
    })
    .then (user => {
        if (user === null)
        {
            res.status(404).json({ error : "Username/Password salah" })
            return
        }
        else 
        {
            Bcrypt.compare(data.password, user.password)
                .then (isValid => 
                    {
                        if(isValid)
                        {
                            Bcrypt.compare(data.password, 'L@n7413ur')
                            .then (isDefault => 
                                {
                                    if (isDefault) {
                                        res.send({
                                            token : jwt.sign({id: user?.id, role: data.role}, JWT_KEY, {
                                                expiresIn : WAKTU_VALID_TOKEN
                                            }),
                                            message : "Password masih default jangan lupa ganti Password demi keamanan akun!"
                                        })
                                        return
                                    } 
                                    else {
                                        res.send({
                                            token : jwt.sign({id: user?.id, role: data.role}, JWT_KEY, {
                                                expiresIn : WAKTU_VALID_TOKEN
                                            }),
                                        })
                                        return
                                    }
                                
                                })
                        }
                        else
                        {
                            res.status(404).json({ error : "Username/Password salah" })
                            return
                        }
                    })

        }
    })
    .catch(err => console.log(err))
}
      
// export const login = (req: Request, res: Response): void =>
// {
//     let data = req.body
//     if ((typeof data.username === "string" && typeof data.password === "string"))
//     {
//         prisma.user.findUnique(
//         {
//             where: {username : data.username}
//         })
//         .then (user => {
//             if (user === null)
//             {
//                 res.status(404)
//                 res.send({
//                     error : "User Not Found"
//                 })
//             }
//             else 
//             {
//                 Bcrypt.compare(data.password, user.password)
//                     .then(isValid => {
//                         if (isValid) res.send({
//                             token : jwt.sign({id: user.id, role : user.role}, JWT_KEY, {
//                                 expiresIn: WAKTU_VALID_TOKEN
//                             })
//                         })
//                     }).catch(error => {
//                         console.log(error)
//                         res.status(500)
//                         res.send({
//                             message : "User not authorized"
//                         })
//                     })
//             }
//         }).catch(console.log)
//     }
//     else 
//     {
//         res.status(400)
//         res.send({
//             error : "Username and password required"
//         })
//     }
// }

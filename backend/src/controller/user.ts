import { Prisma, PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";
import { Response, Request } from "express"
 

const prisma = new PrismaClient()

export async function decrypt(passwordPlain : string) : Promise<string> {
    const salt = await genSalt(10)
    return hash(passwordPlain, salt)
}

export const generateUsername = (nama : string) => 
{
    return nama.split(' ')[0] + '.' + nama.split(' ')[nama.split(' ').length - 1 ]
}

export async function addUser(req: Request, res : Response) : Promise<void> {
    const userData = req.body as unknown as Prisma.UserCreateInput
    prisma.user.create(
        {
            data : {
                username: userData.username, 
                password : await decrypt(String(userData.password)), 
                role : userData.role    
            }
        }
    ).then (user => {
        res.send(
            {
                event : 'created',
                data : {
                    type : 'id',
                    content : user.id
                }
            }
        )
    }).catch (reason => {
        console.dir(reason)
        res.status(500)
        res.json({
            error : reason
        })
    })
}


export const getRole = async (req : Request, res: Response) => 
{
    
}
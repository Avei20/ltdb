import { Prisma, PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";
import { Response, Request } from "express"
import { getId } from "./auth";
 

const prisma = new PrismaClient()

export async function decrypt(passwordPlain : string) : Promise<string> {
    const salt = await genSalt(10)
    return hash(passwordPlain, salt)
}

export const generateUsername = (nama : string) => 
{
    return nama.split(' ')[0] + '.' + nama.split(' ')[nama.split(' ').length - 1 ]
}

// export async function addUser(req: Request, res : Response) : Promise<void> {
//     const userData = req.body as unknown as Prisma.UserCreateInput
//     prisma.user.create(
//         {
//             include : {
//                 roles : true
//             }, 
//             data : {
//                 username: userData.username, 
//                 password : await decrypt(String(userData.password)), 
//                 roles : 
//                 {
//                     createMany : {
//                         data : [
//                             { role :  req.body.role }
//                         ]
//                     }                    
//                 }
//             }
//         }
//     ).then (user => {
//         res.send(
//             {
//                 event : 'created',
//                 data : {
//                     type : 'id',
//                     content : user.id
//                 }
//             }
//         )
//     }).catch (reason => {
//         console.dir(reason)
//         res.status(500)
//         res.json({
//             error : reason
//         })
//     })
// }

export const changePasswordUser = (req: Request, res: Response) => 
{
    const data = req.body as unknown as Prisma.UserUpdateInput
    const token = req.body['auth']
    const userId = getId(token)
    prisma.user.update(
        {
            where : 
            {
                id : userId
            },
            data : 
            {
                password : data?.password
            }
        }
    )
}

export const addRole = (req : Request, res : Response) => 
{
    const data = req.body as unknown as Prisma.RolesCreateInput
    const {username} = req.params
    prisma.user.findUnique({
        where : {username : username}
    })
    .then(user => 
        {
            if(user === null) 
            {
                res.status(404).send({message : 'User tidak ditemukan'})
            }
            else
            {
                prisma.roles.create({
                    data : 
                    {
                        userId: user?.id as number,
                        role : data.role 
                    }
                })
                .then(role => 
                    {
                        const userId = getId(req.headers['auth'] as string)
                        prisma.event.create({
                            data : 
                            {
                                type : 'CREATE',
                                target : 'ROLES', 
                                targetId : role.id,
                                userId : userId
                            }
                        })
                        res.send({message : `Role "${data.role}" berhasil di tambahkan ke ${username}`})
                    })
                .catch (err => 
                    {
                        console.log(err)
                        res.send({err : err})
                    })
            }
        })
}

export const resetPassword = async (req : Request, res: Response) => 
{
    const data = req.body as Prisma.UserUpdateInput
    const {username } = req.params
    const defaultPassword = await decrypt('L@n7413ur')
    prisma.user.update({
        where : {username : username},
        data : 
        {
            password : defaultPassword
        }
    })
}

// export const deleteRole = (req :Request, res : Response) => 
// {
//     const data = req.body as Prisma.RolesWhereInput
//     const userData = req.body as Prisma.UserWhereUniqueInput
//     prisma.user.findUnique ({
//         where : {username : userData.username}
//     })
//     .then (user => 
//         {
//             prisma.roles.delete({
//                 where :
//                 {
//                     userId : user?.id, 
//                     role : data?.role
//                 }
//             })
//         })
// }

export const getRole = async (req : Request, res: Response) => 
{
    
}
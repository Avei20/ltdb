import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client"
import { decrypt, generateUsername } from "./user";
import { getId } from "./auth";

const prisma = new PrismaClient()

export const inputGuru = async (req: Request, res: Response) => {
    const data = req.body as unknown as Prisma.GuruCreateInput
    const username = generateUsername(data.nama)
    const defaultPassword = await decrypt('L@n7413ur')
    const token = req.headers['auth'] as string
    prisma.guru.create({
        include : 
        {
            guruDetails : 
            {
                include : 
                {
                    user : true
                }
            }
        },
        data : 
        {
            nig : data.nig,
            nama : data.nama.toUpperCase(),
            email : `${username}@lantabur.sch.id`,
            jenisKelamin : data.jenisKelamin,
            tempatLahir : data.tempatLahir,
            tanggalLahir : data.tanggalLahir,
            profileUrl : data?.profileUrl,
            guruDetails : 
            {
                create : 
                {
                    user : 
                    {
                        create :
                        {
                            username : username,
                            password : defaultPassword,
                            role : 'GURU'
                        }
                    }
                }
            }
        }
    }).then (guru => {
        const userId = getId(token)
        prisma.event.create(
            {
                data : 
                {
                    type : 'CREATE',
                    target: 'GURU',
                    targetId : guru.id,
                    userId : userId
                }
            }
        ).then(event => {
            res.send({ message : `${guru.nama} sudah di input`})
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({error : err})
        })
        
    }).catch(err => {
        res.status(500).send({ error : err})
    })
}
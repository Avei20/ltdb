import { Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
import { decode } from "jsonwebtoken";

const prisma = new PrismaClient()


export const inputQuran = async (req : Request, res : Response): Promise<void> => {
    const data = req.body as unknown as Prisma.AlQuranCreateInput
    prisma.alQuran.create({
        data : 
        {
            ayat : Number(data.ayat) ,
            baris : Number(data.baris) ,
            halaman : Number(data.halaman) ,
            surah : Number(data.surah) ,
            juz : Number(data.juz) 
        }
    }).then(input => {
        const token = req.headers['auth'] as string
        const decoded = decode(token, {complete :true})
        const userId = decoded?.payload.id
        prisma.event.create({
            data : {
                type : 'CREATE',
                target : 'ALQURAN',
                targetId : input.id, 
                userId : userId
            }
        }).then(quran=>{
            res.send({
                data : input
            })
        }).catch(err => {
            res.status(500).send({
                error : err
            })
        })
    }).catch( err => {
        console.log(err)
        res.status(500).send({ error : err})
    })
}

export const editQuran = async (req : Request, res : Response) : Promise<void> => {
    const data = req.body as unknown as Prisma.AlQuranCreateInput

    prisma.alQuran.findUnique({
        where : {
            
        }
    })
}

export const getQuran = async (req : Request, res : Response) : Promise<void> => {
    const quran = await prisma.alQuran.findMany(
        {
            where : {
                deleted : false
            }
        }
    )

    res.send({
        quran
    })
}
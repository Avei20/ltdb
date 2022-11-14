import { Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
import { decode, JwtPayload } from "jsonwebtoken";
import { TIMEZONE } from "../constant";

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
        const decoded = decode(token, {complete :true}) as JwtPayload
        const userId = decoded?.payload.id
        const time = new Date().toLocaleString("en-US",{timeZone : TIMEZONE})
        console.log(time)
        prisma.event.create({
            data : {
                type : 'CREATE',
                target : 'ALQURAN',
                targetId : input.id, 
                userId : userId,
                time : new Date(time)
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
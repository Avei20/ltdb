import e, { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { getId } from "./auth";

const prisma = new PrismaClient()

export const inputJamTahfidz = async (req: Request, res: Response) => 
{
    const data = req.body as unknown as Prisma.JamTahfidzCreateInput
    const token = req.headers['auth'] as string
    prisma.jamTahfidz.create
    ({
        data :
        {
            waktuMulai : new Date(data.waktuMulai),
            waktuSelesai : new Date(data.waktuSelesai),
            namaJam : data.namaJam, 
            tipe : data.tipe
        }
    }).then (jamTahfidz => 
        {
            const userId = getId(token)
            prisma.event.create 
            ({
                data : 
                {
                    type : 'CREATE',
                    target : 'JAM_TAHFIDZ',
                    targetId : jamTahfidz.id, 
                    userId : userId
                }
            }).then (event => 
                {
                    res.send({ message : `${jamTahfidz.namaJam} berhasil dibuat`})
                })
                .catch(err => 
                    {
                        res.status(500).send({err : err})
                    })
        }).catch(err => {
            res.status(500).send({ error : err})
        })
}
import e, { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { getId } from "./auth";
import { StructuredType } from "typescript";

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
                .catch(erro => 
                    {
                        console.log(erro)
                        res.status(500).send({erro : erro})
                    })
        }).catch(err => {
            console.log(err)
            res.status(500).send({ error : err})
        })
}

export const getJamTahfidz = async (req : Request, res : Response) => {
    const jamTahfidz = await prisma.jamTahfidz.findMany({})

    if (jamTahfidz === null){
        res.send ({ err : `Tabel Jam Tahfidz Masih kosong harap input untuk mengambil data `})
        return
    }
    res.send (jamTahfidz)
}

export const getJamTahfidzByDate = async( req : Request, res: Response) => {
    const input = req.body as Prisma.JamTahfidzCreateInput
    const { tanggal } = req.params
    const data = await prisma.jamTahfidz.findMany({
        where : {
            waktuMulai : {
                gte: new Date (tanggal),
            },
            OR : {
                waktuSelesai : {
                    gte: new Date (tanggal)
                }
            },
        }
    })

    res.send (data)
}


import { json, Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
import { getId } from "./auth";

const prisma = new PrismaClient()

export const inputParent = async (req : Request, res : Response) => {
    const data = req.body as unknown as Prisma.ParentCreateInput
    const token = req.headers['auth'] as string

    prisma.parent.create(
        {
            data : 
            {
                nama : data.nama.toUpperCase(),
                tempatLahir : data.tempatLahir,
                tanggalLahir : new Date(data.tanggalLahir),
                jenisKelamin : data.jenisKelamin,
                agama : data.agama,
                pendidikanTerakhir : data.pendidikanTerakhir, 
                penghasilanPerBulan : Number(data.penghasilanPerBulan),
                pekerjaan : data.pekerjaan,
                nomorTelepon : data.nomorTelepon, 
                statusHidup : data.statusHidup, 
                profileUrl : data?.profileUrl,   
            }
        }
    ).then(parent => {
        const userId = getId(req.headers['auth'] as string)
        prisma.event.create(
            {
                data: {
                    type:'CREATE',
                    target : 'PARENT',
                    targetId : parent.id,
                    userId : userId,
                }
            }
        ).catch(err => {
            console.log(err)
        }).then(event => {
            res.send({
                message : `${parent.nama} sudah di input`
            })
        }
        )
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error : err})
    })
}
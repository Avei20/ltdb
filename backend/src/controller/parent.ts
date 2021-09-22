import { Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const inputParent = async (req : Request, res : Response) => {
    const data = req.body as unknown as Prisma.ParentCreateInput
    const token = req.headers['auth'] as string

    prisma.parent.create(
        {
            data : 
            {
                nama : data.nama,
                tempatLahir : data.tempatLahir,
                tanggalLahir : new Date(data.tanggalLahir),
                agama : data.agama,
                pendidikanTerakhir : data.pendidikanTerakhir, 
                penghasilanPerBulan : Number(data.penghasilanPerBulan),
                pekerjaan : data.pekerjaan,
                nomorTelepon : data.nomorTelepon, 
                statusHidup : data.statusHidup, 
                profileUrl : data?.profileUrl,   
            }
        }
    )
}
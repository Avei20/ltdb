import { Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const inputSesi = async (req : Request, res : Response) : Promise<void> => 
{
    const data = req.body as unknown as Prisma.SessionCreateInput
    prisma.session.create({
        data : 
        {
            type : data.type,
            juz : data.juz, 
            halaman : data.halaman, 
            awalSetoran : data.awalSetoran, 
            akhirSetoran : data.akhirSetoran, 
            nilaiKelancaran : data.nilaiKelancaran, 
            nilaiMakhroj : data.nilaiMakhroj, 
            nilaiSifatHuruf : data.nilaiSifatHuruf, 
            nilaiTajwid : data.nilaiTajwid, 
            jamTahfidz : data.jamTahfidz, 
            muridTahfidzDetail : data.muridTahfidzDetail
        }
    })
}
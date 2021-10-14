import { json, Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
import { getId } from "./auth";
import { random } from "./murid";

const prisma = new PrismaClient()

function generateNIP(tahunLahir : number, tahunMasuk : number) {
    const belakang = random (100000, 999999)
    let lahir : string = String(tahunLahir)
    lahir = lahir.slice(lahir.length-2, lahir.length)
    let masuk : string = String(tahunMasuk)
    masuk = masuk.slice(lahir.length-2, lahir.length)
    return lahir + masuk + String(belakang)
}

export const inputParent = async (req : Request, res : Response) => {
    const data = req.body as unknown as Prisma.ParentCreateInput
    const token = req.headers['auth'] as string
    const tahunLahir = new Date(data.tanggalLahir).getFullYear()
    let nip = generateNIP(tahunLahir, req.body.tahunMasuk)

    prisma.parent.findUnique({
        where : {nip : nip}
    }).then (parent => {
        if (parent !== null )
        {
            nip = generateNIP(tahunLahir, req.body.tahunMasuk)
        }
        prisma.parent.create(
            {
                data : 
                {
                    nip : nip,
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
    })
}
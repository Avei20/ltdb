import { Request, Response } from "express";
import { PrismaClient, Prisma, TipeSesi } from "@prisma/client";
import { getId } from "./auth";
const prisma = new PrismaClient()

class JamTahfidz {
    id:number 
    waktuMulai: string
    waktuSelesai :string
    namaJam : string
    tipe : TipeSesi
    constructor(id :number, waktuMulai: Date, waktuSelesai : Date, namaJam: string, tipe: TipeSesi) {
        this.id = id
        this.waktuMulai = waktuMulai.toLocaleString()
        this.waktuSelesai = waktuSelesai.toLocaleString()
        this.namaJam = namaJam
        this.tipe  = tipe
    }
}

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
    const len = jamTahfidz.length
    const data:JamTahfidz[] = []
    for (let i =0; i< len; i++) {
        let isi = new JamTahfidz(jamTahfidz[i].id, jamTahfidz[i].waktuMulai, jamTahfidz[i].waktuSelesai, jamTahfidz[i].namaJam, jamTahfidz[i].tipe)
        data.push(isi)
    }
    res.send (data)
}

export const getJamTahfidzByDate = async( req : Request, res: Response) => {

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

    let convertData : JamTahfidz[] = []
    const len = data.length

    for (let i =0; i<len; i++) {
        let isi = new JamTahfidz(data[i].id, data[i].waktuMulai, data[i].waktuSelesai, data[i].namaJam, data[i].tipe)
        convertData.push(isi)
    }

    res.send (convertData)
}

export const updateJamTahfidzById = (req : Request, res : Response) => {
    const data = req.body as Prisma.JamTahfidzUpdateInput
    const  id  = Number(req.params.id) 

    prisma.jamTahfidz.update ({
        where : {id : id },
        data : {
            waktuMulai : data?.waktuMulai as Date,
            waktuSelesai : data?.waktuSelesai as Date,
            tipe : data?.tipe,
            namaJam : data?.namaJam
        }
    })
    .then (result => { 
        const userId = getId(req.headers['auth'] as string)
        prisma.event.create ({
            data : {
                type : 'UPDATE', 
                target : 'JAM_TAHFIDZ',
                targetId : result.id,
                userId : userId, 
            }
        })
        .then (hasil => {
            res.send ({ message : `${result.namaJam} pada ${result.waktuMulai.toLocaleString()} berhasil di input`})
        })
        .catch (err => {
            console.log(err)
            res.send (err)
        })
    })
    .catch(e => {
        console.log(e);
        if (e.code == 'P2025') {
            res.send({ message : `Data dengan id :${id} tidak ditemukan !`})
        }
    })
}

export const deleteJamTahfidzById = (req : Request, res: Response) => {
    const id = Number(req.params.id)

    prisma.jamTahfidz.delete({
        where : {id : id}
    })
    .then( result => {
        const userId = getId(req.headers['auth'] as string)
        prisma.event.create({
            data : {
                type : 'DELETE', 
                target : 'JAM_TAHFIDZ',
                targetId : result.id,
                userId : userId, 
            }
        })
        res.send({ message : `${result.namaJam} pada tanggal ${result.waktuMulai.toLocaleString()} sudah berhasil di hapus`})
    })
    .catch(e => {
        if (e.code == 'P2025') {
            res.status(404).send ({ message : `Jam Tahfidz dengan id : ${id} tidak ditemukan !`})
        }
    })
}

export const addGuruTahfidzByUsername = ( req : Request, res : Response) => {
    const { username } = req.params
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
                        role : 'GURU_TAHFIDZ'
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
                        res.send({message : `${username} telah berhasil diangkat menjadi guru tahfidz`})
                    })
                .catch (err => 
                    {
                        console.log(err)
                        res.send({err : err})
                    })
            }
        })
}
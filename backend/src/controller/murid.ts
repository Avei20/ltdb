import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import * as jwt from 'jsonwebtoken'
import { decrypt } from "./user";

const prisma = new PrismaClient()

function random (min:number, max : number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateNIS(tahunMasuk : number, tahunLulus: number) {
    const belakang = random (100000, 999999)
    let masuk: string = String(tahunMasuk)
    masuk = masuk.slice(masuk.length-2, masuk.length)
    let lulus = String(tahunLulus)
    lulus = lulus.slice(lulus.length-2, lulus.length)
    return lulus + masuk + String(belakang)    
}   

function validasiInputMurid (data : Prisma.MuridCreateInput) {
    
}

export const inputMurid = async (req: Request, res: Response) : Promise<void> => {
    //input data murid langsung generate history sama user 
    const data = req.body as unknown as Prisma.MuridCreateInput
    const tahunMasuk = req.body.tahunMasuk 
    const tahunLulus = req.body.tahunLulus
    let nis = generateNIS(tahunMasuk, tahunLulus)
    const username = data.nama.split(' ')[0] + '.' + data.nama.split(' ')[data.nama.split(' ').length - 1 ]
    const defaultPassword = await decrypt('L@n7413ur')
    
    prisma.murid.findUnique({
        where: {nis : nis}
    }).then(murid =>{
        if (murid !== null)
        {
            console.log('nis sama generate nis baru')
            nis = generateNIS(tahunMasuk, tahunLulus)
            console.log(nis)
        }
        prisma.murid.create(
            {
                include :
                {
                    muridDetails : {
                        include : {
                            user : true
                        }
                    }
                },
                data : 
                {
                    nis : nis, 
                    nism : data.nism, 
                    nisn : data?.nisn,
                    nama : data.nama.toUpperCase(),
                    jenisKelamin : data.jenisKelamin, 
                    tempatLahir : data.tempatLahir, 
                    tanggalLahir : new Date(data.tanggalLahir), 
                    anakKe : Number(data.anakKe),
                    jumlahSaudaraKandung : Number(data.jumlahSaudaraKandung), 
                    jumlahSaudaraTiri : Number(data.jumlahSaudaraTiri), 
                    jumlahSaudaraAngkat : Number(data.jumlahSaudaraAngkat),
                    golonganDarah : data?.golonganDarah,
                    profileUrl : data?.profileUrl,
                    muridDetails : {
                        create :{
                            user : {
                                create :{
                                    username : username,
                                    password :  defaultPassword,
                                    role : 'MURID',
                                }
                            }
                        }
                    }
                }
            }
        ).then(murid => {
            const token = <string>req.headers['auth']
            const decoded = jwt.decode(token, {complete: true})
            const userid = decoded?.payload.id
            prisma.event.create({
                data : {
                    type : 'CREATE', 
                    target : 'MURID',
                    targetId : murid.id,
                    userId : userid, 
                }   
            }).catch(err => {
                console.log(err)
            })
            res.send({
                message : `${murid.nama} has created`
            })
        }).catch (err => {
            res.status(500)
            res.send({
                error :err
            })
        })
    })
}

export const editMurid = async (req : Request, res: Response) : Promise<void> => 
{
    const data = req.body as unknown as Prisma.MuridCreateInput

    prisma.murid.findUnique({
        where : {
            nis : data?.nis, 
        }
    }).then(murid => {
        prisma.murid.update({
            where : {
                id : murid?.id
            }, 
            data : {
                nis : data.nis, 
                nism : data.nism, 
                nisn : data?.nisn,
                nama : data.nama.toUpperCase(),
                jenisKelamin : data.jenisKelamin, 
                tempatLahir : data.tempatLahir, 
                tanggalLahir : new Date(data.tanggalLahir), 
                anakKe : Number(data.anakKe),
                jumlahSaudaraKandung : Number(data.jumlahSaudaraKandung), 
                jumlahSaudaraTiri : Number(data.jumlahSaudaraTiri), 
                jumlahSaudaraAngkat : Number(data.jumlahSaudaraAngkat),
                golonganDarah : data?.golonganDarah,
                profileUrl : data?.profileUrl,
            }
        }).then (murid => {
            const token = <string>req.headers['auth']
            const decoded = jwt.decode(token, {complete: true})
            const userid = decoded?.payload.id
            prisma.event.create({
                data : {
                    type : 'UPDATE', 
                    target : 'MURID',
                    targetId : murid.id,
                    userId : userid, 
                }  
            }).then (event => {
                res.send({
                    message : `${murid.nama} sudah diperbaharui`,
                    data : murid
                })
            }).catch (err => {
                res.send ({
                    error : err
                })
            })
        }).catch (err => {
            console.log(err)
            res.status(401)
            res.send({ error : err})
        })
    })
}
import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { decrypt, generateUsername } from "./user";
import { getId } from "./auth";

const prisma = new PrismaClient()

export function random (min:number, max : number) {
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


export const inputMurid = async (req: Request, res: Response) : Promise<void> => {
    //input data murid langsung generate history sama user 
    const data = req.body as unknown as Prisma.MuridCreateInput
    const tahunMasuk = req.body.tahunMasuk 
    const tahunLulus = req.body.tahunLulus
    let nis = generateNIS(tahunMasuk, tahunLulus)
    const username = generateUsername(data.nama)
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
            const userid = getId(req.headers['auth'] as string)
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
    const data = req.body as unknown as Prisma.MuridUpdateInput
    const { nis }= req.params 
    

    prisma.murid.update({
        where : {
            nis : nis
        }, 
        data : { 
            nism : data?.nism, 
            nisn : data?.nisn ,
            nama : data?.nama?.toString().toUpperCase(),
            jenisKelamin : data?.jenisKelamin, 
            tempatLahir : data?.tempatLahir, 
            tanggalLahir : data?.tanggalLahir as Date,
            anakKe : data?.anakKe as number ,
            jumlahSaudaraKandung : data?.jumlahSaudaraKandung as number, 
            jumlahSaudaraTiri : data?.jumlahSaudaraTiri as number, 
            jumlahSaudaraAngkat : data?.jumlahSaudaraAngkat as number,
            golonganDarah : data?.golonganDarah,
            profileUrl : data?.profileUrl,
        }
    }).then (murid => {
        const token = <string>req.headers['auth']
        const userid = getId(token)
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
}

export const getMuridByNis = async (req : Request , res: Response) => 
{
    const { nis } = req.params
    prisma.murid.findUnique({
        where : {
            nis : nis, 
        },
        select :
        {
            nis : true, 
            nism :true, 
            nisn : true, 
            nama : true, 
            tempatLahir : true, 
            tanggalLahir : true, 
            anakKe : true,
            jumlahSaudaraAngkat : true, 
            jumlahSaudaraKandung : true, 
            jumlahSaudaraTiri : true, 
            golonganDarah : true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        }
    })
    .then(murid => 
        {
            res.send(
                {
                    murid
                }
            )
        })
        .catch(err => 
            {
                console.log(err)
                res.send({error : err})
            })
}
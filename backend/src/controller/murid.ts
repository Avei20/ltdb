import e, { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { decrypt, generateUsername } from "./user";
import { getId } from "./auth";
import { isReturnStatement } from "typescript";

const prisma = new PrismaClient()

export function random (min:number, max : number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateNIS(tahunMasuk : number, tahunLulus: number) {
    const belakang = random (10000, 99999)
    let masuk: string = String(tahunMasuk)
    let abad:string = masuk[1]
    masuk = masuk.slice(masuk.length-2, masuk.length)
    let lulus = String(tahunLulus)
    lulus = lulus.slice(lulus.length-2, lulus.length)
    return lulus + abad + masuk + String(belakang)    
}   

export function pad(n :number, length : number = 3 ) {
    let len = length - (''+n).length
    return (len > 0 ? new Array(++len).join('0') : '') + n
}

export const inputMurid = async (req: Request, res: Response) : Promise<void> => {
    //input data murid langsung generate history sama user 
    const data = req.body as unknown as Prisma.MuridCreateInput
    const tahunMasuk = req.body.tahunMasuk 
    const tahunLulus = req.body.tahunLulus
    let nis = generateNIS(tahunMasuk, tahunLulus)
    let username = generateUsername(data.nama).toLowerCase()
    const defaultPassword = await decrypt('L@n7413ur')
    let detectNIS = await prisma.murid.findUnique({ where : { nis : nis }})
    let detectUsername = await prisma.user.findUnique({where : {username : username}})
    
    while (detectNIS !== null) {
        nis = generateNIS(tahunMasuk, tahunLulus)
        detectNIS = await prisma.murid.findUnique({ where : { nis : nis }})
    }

    let counter = 0
    let newUsername 
    while (detectUsername !== null) {
        counter++
        newUsername = username + pad(counter)
        detectUsername = await prisma.user.findUnique({where : {username : newUsername}})
    }
    
    username = newUsername as string


    prisma.murid.create(
        {
            include :
            {
                muridDetails : {
                    include : {
                        user : 
                        {
                            include : {
                                roles : true
                            }
                        }
                    }
                }
            },
            data : 
            {
                nis : nis, 
                nism : data.nism, 
                nisn : data?.nisn,
                nama : data.nama,
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
                                roles : {
                                    create : [
                                        { role : 'MURID'}
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    ).then(murid => {
        const userid = getId(req.headers['auth'] as string)
        prisma.event.createMany({
            data : [{
                type : 'CREATE', 
                target : 'MURID',
                targetId : murid.id,
                userId : userid,
            }, {
                type : 'CREATE', 
                target : 'USER',
                targetId : murid.muridDetails?.user.id as number,
                userId : userid,
            } ]  
        }).catch(err => {
            console.log(err)
        })
        res.send({
            message : `${murid.nama} berhasil di input`
        })
    }).catch (err => {
        console.log(err)
        res.status(500)
        res.send({
            error :err
        })
    })
}

export const editMurid = async (req : Request, res: Response) : Promise<void> => 
{
    const update = req.body as unknown as Prisma.MuridUpdateInput
    const { nis }= req.params 
    
    prisma.murid.findFirst({
        where :{
            nis : nis, 
            deleted : false
        }
    })
    .then (data => {
        if (data === null) {
            res.send({message : `${nis} tidak ditemukan`})
            return
        }
        if (data.deleted == true) {
            res.status(404).send({ message : `${data.nis} sudah dihapus`})
            return
        }

        console.log(data)
        prisma.murid.update({
            where : {
                nis : nis
            }, 
            data : { 
                nism : update?.nism, 
                nisn : update?.nisn ,
                nama : update?.nama?.toString(),
                jenisKelamin : update?.jenisKelamin, 
                tempatLahir : update?.tempatLahir, 
                tanggalLahir : update?.tanggalLahir as Date,
                anakKe : update?.anakKe as number ,
                jumlahSaudaraKandung : update?.jumlahSaudaraKandung as number, 
                jumlahSaudaraTiri : update?.jumlahSaudaraTiri as number, 
                jumlahSaudaraAngkat : update?.jumlahSaudaraAngkat as number,
                golonganDarah : update?.golonganDarah,
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
            }).then (async event => {

                const updatedData = await prisma.murid.findUnique({
                    select : {
                        nis : true,
                        nism : true,
                        nisn : true, 
                        nama: true, 
                        jenisKelamin : true, 
                        tempatLahir : true, 
                        tanggalLahir : true,
                        anakKe : true,
                        jumlahSaudaraAngkat :true,
                        jumlahSaudaraKandung : true, 
                        jumlahSaudaraTiri : true, 
                        golonganDarah : true, 
                        profileUrl : true, 
                        orangTua : true,
                    },
                    where : {nis : murid.nis}
                })

                res.send({
                    message : `${murid.nama} sudah diperbaharui`,
                    data : updatedData
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

export const getMuridByNis = async (req : Request , res: Response) => 
{
    const { nis } = req.params
    prisma.murid.findFirst({
        where : {
            nis : nis, 
            deleted : false
        },
        select :
        {
            nis : true,
            nism : true,
            nisn : true, 
            nama: true, 
            jenisKelamin : true, 
            tempatLahir : true, 
            tanggalLahir : true,
            anakKe : true,
            jumlahSaudaraAngkat :true,
            jumlahSaudaraKandung : true, 
            jumlahSaudaraTiri : true, 
            golonganDarah : true, 
            profileUrl : true, 
            orangTua : true,
        }
    })
    .then(murid => 
        {   
            if (murid === null) {
                res.send({ message : `${nis} tidak ditemukan`})
                return
            }
            else res.send({ murid })
        })
        .catch(err => 
            {
                console.log(err)
                res.send({error : err})
            })
}

export const getMurid = async (req : Request, res : Response) => 
{
    const murid = await prisma.murid.findMany(
        {
            where : {deleted : false},
            select : {
                nis : true,
                nism : true,
                nisn : true, 
                nama: true, 
                jenisKelamin : true, 
                tempatLahir : true, 
                tanggalLahir : true,
                anakKe : true,
                jumlahSaudaraAngkat :true,
                jumlahSaudaraKandung : true, 
                jumlahSaudaraTiri : true, 
                golonganDarah : true, 
                profileUrl : true, 
                orangTua : true,

            }
        }
    )
    if (murid === null) {
        res.status(404).send({ message : 'Tabel masih kosong silahkan Input terlebih dahulu !'})
    } else res.send(murid)
}

export const deleteMuridByNis = async (req : Request, res : Response) => 
{
    const { nis }= req.params

    prisma.murid.findFirst(
        {
            where : {
                nis :nis , 
                deleted : false
            }
        }
    ).then (data => 
        {
            if (data === null) 
            {
                res.send({message : `${nis} tidak ditemukan`})
                return
            }

            if (data.deleted == true) 
            {
                res.send({ message : `${data.nis} tidak ditemukan`})
                return
            }

            prisma.murid.update({
                include  : 
                {
                    muridDetails : 
                    {
                        include : {
                            user : true
                        }
                    }
                },
                where : 
                {
                    nis : nis,
                },
                data : 
                {
                    deleted : true,
                    muridDetails : 
                    {
                        update : 
                        {
                            user : 
                            {
                                update : {
                                    deleted : true
                                }
                            }
                        }
                    }
                } 
            })
            .then (murid => {

                const userid = getId(req.headers['auth'] as string)
                prisma.event.create({
                    data : {
                        type : 'DELETE', 
                        target : 'MURID',
                        targetId : murid.id,
                        userId : userid,
                    }   
                }).catch(err => {
                    console.log(err)
                })
                res.send({
                    message : `${murid.nis} berhasil di hapus`
                })
            })
            .catch (err => 
                {
                    console.log(err)
                    res.status (500)
                    res.send({
                        error : err
                    })
                })
        })

}

export const recoveryMuridByNis = async (req : Request, res : Response ) => 
{
    const { nis } = req.params

    prisma.murid.findFirst({
        where : {
            nis : nis, 
            deleted: true
        }
    })
    .then (data => {
        if (data === null) {
            res.send({ message : `${nis} tidak ditemukan`})
            return
        }

        prisma.murid.update ({
            include : {
                muridDetails : {
                    include : {
                        user :true
                    }
                }
            },
            where : {
                nis : nis
            }, 
            data : {
                deleted : false,
                muridDetails : {
                    update : {
                        user : {
                            update : {
                                deleted : false
                            }
                        }
                    }
                }
            }
        })
        .then (murid => {
            const userid = getId(req.headers['auth'] as string)
            prisma.event.create({
                data : {
                    type : 'UPDATE', 
                    target : 'MURID',
                    targetId : murid.id,
                    userId : userid,
                }   
            }).catch(err => {
                console.log(err)
            })
            res.send({
                message : `${murid.nis} berhasil di recovery`
            })
        })
        .catch (err => 
            {
                console.log(err)
                res.status (500)
                res.send({
                    error : err
                })
            })
    })
}


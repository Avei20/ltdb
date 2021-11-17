import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client"
import { decrypt, generateUsername } from "./user";
import { getId } from "./auth";
import { pad, random } from "./murid";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

const prisma = new PrismaClient()

function generateNIGS(tahunMasuk :number, tahunLahir : number) {
    const belakang = random(10000, 99999) 
    let masuk : string = String(tahunMasuk)
    let abad : string = masuk[1]
    let lahir : string = String(tahunLahir)
    masuk = masuk.slice(masuk.length-2, masuk.length)
    lahir = lahir.slice(lahir.length-2, lahir.length)
    return lahir + abad + masuk + String(belakang)
}

function generateKodeGuru (nama : string, tahunMasuk : number, tahunLahir : number, counter: number = 0) {
    let masuk : string = String(tahunMasuk)
    let lahir : string = String(tahunLahir)
    masuk = masuk.slice(masuk.length-2, masuk.length)
    lahir = lahir.slice(lahir.length-2, lahir.length)
    let len = nama.split(" ").length
    let splitted = nama.split(" ")
    if (len > 1) {
        return (splitted[0][0] + splitted[1][0+counter]).toUpperCase() + "-" + lahir + masuk
    }
    else return (splitted[0][0] + splitted[0][1+counter]).toUpperCase() +"-" + lahir + masuk
}

export const inputGuru = async (req : Request, res : Response ) => {
    const data = req.body as Prisma.GuruCreateInput
    const defaultPassword = await decrypt('L@n7412ur')
    const token = req.headers['auth'] as string
    let tanggalMasuk = new Date(data.tanggalMasuk) 
    let tahunMasuk = tanggalMasuk.getFullYear() 
    let tanggalLahir = new Date (data.tanggalLahir)
    let tahunLahir = tanggalLahir.getFullYear()
    let username = generateUsername(data.nama).toLowerCase()
    let nigs = generateNIGS(tahunMasuk, tahunLahir)
    let kodeGuru = generateKodeGuru(data.nama, tahunMasuk, tahunLahir)
    
    let detectUsername = await prisma.user.findUnique({where : {username : username}})
    let detectNIGS = await prisma.guru.findUnique({where : {nigs : nigs}})
    let detectKodeGuru = await prisma.guru.findUnique({ where : {kodeGuru : kodeGuru}})

    //counter nigs sama
    while (detectNIGS !== null) {
        nigs = generateNIGS(tahunMasuk, tahunLahir)
        detectNIGS = await prisma.guru.findUnique({where : {nigs : nigs}})
    }

    let counter = 0
    let newUsername = username

    //counter username sama
    while (detectUsername !== null) {
        counter++ 
        newUsername = username + pad(counter)
        detectUsername = await prisma.user.findUnique({where : {username : newUsername}})
    }

    username = newUsername as string

    let counterKode = 0
    let newKodeGuru = kodeGuru
    while (detectKodeGuru !== null) {
        counterKode++
        newKodeGuru = generateKodeGuru(data.nama, tahunMasuk, tahunLahir, counterKode)
        detectKodeGuru = await prisma.guru.findUnique({ where : {kodeGuru : newKodeGuru}})
    }

    kodeGuru = newKodeGuru as string
    // console.log(kodeGuru)

    prisma.guru.create({
        include : {
            guruDetails : {
                include : {
                    user : {
                        include : {
                            roles : true
                        }
                    }
                }
            }
        }, 
        data : {
            nig : data.nig, 
            nigs : nigs, 
            kodeGuru : kodeGuru, 
            nama : data.nama, 
            email : data.email, 
            jenisKelamin : data.jenisKelamin, 
            tempatLahir : data.tempatLahir, 
            tanggalLahir : new Date (data.tanggalLahir),
            tanggalMasuk : new Date (data.tanggalMasuk),
            guruDetails : 
            {
                create : 
                    {
                    user : 
                    {
                        create : 
                        {
                            username : username, 
                            password : defaultPassword, 
                            roles : 
                            {
                                create : 
                                {
                                    role : 'GURU'
                                }
                            }
                        }
                    }
                }
            } 
        }
    })
    .then (guru => {
        const userid = getId(token)
        prisma.event.createMany({
            data : [{
                type : 'CREATE',
                target : 'GURU',
                targetId : guru.id,
                userId : userid
            }, {
                type : 'CREATE',
                target : 'USER',
                targetId : guru.guruDetails?.user.id as number,
                userId : userid
            }]
        })
        .catch (err => {
            console.log(err)
        })
        res.send({ message : `${guru.nama} sudah berhasil di input`})
    })
}

export const updateGuru = async(req: Request, res: Response) => {
    const update = req.body as Prisma.GuruUpdateInput
    const { nig } = req.params

    prisma.guru.findFirst ({
        where : {
            nig : nig, 
            deleted : false 
        }
    })
    .then( data => {
        if (data === null) {
            res.status(404).send({ message : `${nig} tidak ditemukan`})
            return
        }
        if (data.deleted === true) {
            res.status(404).send({ message : `${data.nig} sudah dihapus. Hubungi admin untuk di recovery`})
            return
        }

        prisma.guru.update ({
            where : {
                nig : nig
            }, 
            data : {
                nig : update?.nig,
                nama : update?.nama,
                email : update?.email,
                jenisKelamin : update?.jenisKelamin,
                tempatLahir : update?.tempatLahir,
                tanggalLahir : update?.tanggalLahir, 
                tanggalMasuk : update?.tanggalMasuk,
            }
        })
        .then (guru => {
            const token = req.headers['auth'] as string
            const userId = getId(token)
            prisma.event.create({
                data : {
                    type : 'CREATE',
                    target : 'GURU',
                    targetId : guru.id,
                    userId : userId
                }
            })
            .then (async event => {
                const updateData = await prisma.guru.findUnique({
                    where : { nigs : guru.nigs },
                    select : {
                        nig :true, 
                        kodeGuru : true, 
                        nama : true, 
                        email : true, 
                        jenisKelamin : true,
                        tempatLahir : true, 
                        tanggalLahir : true, 
                        tanggalMasuk : true, 
                        profileUrl : true, 
                    }
                })
                res.send ({
                    message : `${guru.nama} sudah berhasil diperbaharui`,
                    data : updateData
                })
            })
            .catch ( err => {
                console.log(err)
                res.send (err)
            })
        })
        .catch (err2 => {
            console.log(err2)
            res.send(err2) 
        })
    })
}

export const getGuruByNig = async (req: Request, res: Response) => {
    const {nig} = req.params
    prisma.guru.findFirst ({
        where : {
            nig : nig, 
            deleted: false
        },
        select : {
            nig :true, 
            kodeGuru : true, 
            nama : true, 
            email : true, 
            jenisKelamin : true,
            tempatLahir : true, 
            tanggalLahir : true, 
            tanggalMasuk : true, 
            profileUrl : true, 
        }
    })
    .then (guru => {
        if (guru === null ) {
            res.send ({ message : `${nig} tidak ditemukan`})
            return
        }
        else res.send ({guru, date : guru.tanggalLahir.toLocaleString()})
    })
    .catch (err => {
        console.log(err)
        res.send(404).send(err)
    })
}

export const deleteGuruByNig = async(req: Request, res: Response) => {
    const {nig} = req.params

    prisma.guru.findFirst({
        where :{
            nig : nig, 
            deleted: false
        }
    })
    .then (data => {
        if (data === null) {
            res.send({ message : `${nig} tidak ditemukan`})
            return
        }

        prisma.guru.update ({
            include : {
                guruDetails : {
                    include : {
                        user : true
                    }
                }
            },
            where : {
                nig : data.nig
            },
            data : {
                deleted : true,
                guruDetails : {
                    update : {
                        user : {
                            update : {
                                deleted : true
                            }
                        }
                    }
                }
            }
        })
        .then ( guru => {
            const userId = getId(req.headers['auth'] as string)
            prisma.event.create({
                data : {
                    type : 'DELETE', 
                    target : 'MURID',
                    targetId : guru.id,
                    userId : userId,
                }
            })
            .catch (err => console.log(err))
            res.send({ message : `${guru.nig} berhasil di hapus`})
        })
    })
    .catch ( err => {
        console.log(err)
        res.status(500).send (err)
    })
}

export const recoveryGurubyNig = (req : Request, res : Response) => {
    const { nig } = req.params 
    prisma.guru.findFirst({
        where : {
            nig : nig, 
            deleted : true
        }
    })
    .then(data => {
        if (data == null) {
            res.send({ message : `${nig} tidak ditemukan` })
            return
        }
        prisma.guru.update({
            include : {
                guruDetails : {
                    include : {
                        user : true
                    }
                }
            }, 
            where : {
                nig : data.nig
            },
            data : {
                deleted : false,
                guruDetails : {
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
        .then ( guru => {
            const userId = getId(req.headers['auth'] as string)
            prisma.event.create({
                data : {
                    type : 'RECOVERY', 
                    target : 'MURID',
                    targetId : guru.id,
                    userId : userId,
                }   
            }).catch(err => {
                console.log(err)
            })
            res.send({
                message : `${guru.nig} berhasil di recovery`
            })
        })
        .catch (err => {
            console.log(err)
            res.status(500).send(err)
        })
    })
}

export const getGuru = async (req : Request, res: Response) => {
    const guru = await prisma.guru.findMany ({
        where : {deleted : false},
        select : {
            nig :true, 
            kodeGuru : true, 
            nama : true, 
            email : true, 
            jenisKelamin : true,
            tempatLahir : true, 
            tanggalLahir : true, 
            tanggalMasuk : true, 
            profileUrl : true, 
        }
    })
    if (guru === null) {
        res.status(404).send({message : `Tabel Masih kosong silahkan input terlebih dahulu!`})
    }
    else res.send(guru)
}

// export const inputGuru = async (req: Request, res: Response) => {
//     const data = req.body as unknown as Prisma.GuruCreateInput 
//     const dataRole = req.body as Prisma.RolesCreateInput
//     const username = generateUsername(data.nama)
//     const defaultPassword = await decrypt('L@n7413ur')
//     const token = req.headers['auth'] as string
//     prisma.guru.create({
//         include : 
//         {
//             guruDetails : 
//             {
//                 include : 
//                 {
//                     user : {
//                         include : {
//                             roles : true
//                         }
//                     }
                    
//                 }
//             }
//         },
//         data : 
//         {
//             nig : data.nig,
//             nama : data.nama.toUpperCase(),
//             email : `${username}@lantabur.sch.id`,
//             jenisKelamin : data.jenisKelamin,
//             tempatLahir : data.tempatLahir,
//             tanggalLahir : new Date(data.tanggalLahir),
//             profileUrl : data?.profileUrl,
//             guruDetails : 
//             {
//                 create : 
//                 {
//                     user : 
//                     {
//                         create :
//                         {
//                             username : username,
//                             password : defaultPassword,
//                             roles : 
//                             {
//                                 create : [
//                                     {role : dataRole.role}
//                                 ]
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }).then (guru => {
//         const userId = getId(token)
//         prisma.event.create(
//             {
//                 data : 
//                 {
//                     type : 'CREATE',
//                     target: 'GURU',
//                     targetId : guru.id,
//                     userId : userId
//                 }
//             }
//         ).then(event => {
//             res.send({ message : `${guru.nama} sudah di input`})
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).send({error : err})
//         })
        
//     }).catch(err => {
//         console.log(err)
//         res.status(500).send({ error : err})
//     })
// }
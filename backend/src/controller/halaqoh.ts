import { Prisma, PrismaClient } from ".prisma/client"

const prisma = new PrismaClient()
// export const inputHalaqoh = async (req : Request, res: Response) => {
//     const inputGuru = req.body as Prisma.GuruWhereUniqueInput

//     const guru = await prisma.guru.findUnique({ where : { nig : String(inputGuru.nig)}})

//     prisma.halaqoh.create({
//         include : {
//             guruTahfidzDetail : {
//                 include : {
//                     guruDetails : {
//                         include : {
//                             guru : {
//                                 select : {
//                                     nig: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }, 
//             muridTahfidzDetail : {
//                 include : {
//                     muridDetails : {
//                         include : {
//                             murid : {
//                                 select : {
//                                     nis : true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//         data : {
//             guruTahfidzDetail : {
//                 connect : 
//                 {
//                     guruId : guru?.id
//                 }
//             },
//             muridTahfidzDetail : {
//                 connect :[
//                     { nis : nis}
//                 ]
//             }
//         }
//     })
    
// }
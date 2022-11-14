import { PrismaClient } from '@prisma/client'
import {genSaltSync, hashSync} from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    // await prisma.user.upsert({
    //     where : { username : 'admin'},
    //     update : {},
    //     create : {
    //         username : 'lt-administrator',
    //         password :hashSync('LtMs_20082021', genSaltSync(10)),
    //         roles : 
    //         {
    //             create : [
    //                 {role : 'ADMIN'},
    //             ]
    //         }
    //     },
    // })
    await prisma.user.create({
        data : {
                username : 'lt-administrator',
                password :hashSync('LtMs_20082021', genSaltSync(10)),
                roles : 
                {
                    create : [
                        {role : 'ADMIN'},
                    ]
                    }
        },
        include: {
            roles : true
        }
    })
    .catch(e => {
        // console.log("Error niiie")
        // console.log(e.code)
        if (e.code == 'P2002' ) {
            console.log('Admin already exist!')
        }
    })
    .finally(() => {
        console.log ('Admin user created with username and password like server')
        // console.log(e)
    })
    
}

main ()
    .catch (e => {
        console.log("Error nih")
        console.error(e.code)
        process.exit()
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
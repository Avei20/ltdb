import { PrismaClient } from '@prisma/client'
import {genSaltSync, hashSync} from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where : { username : 'admin'},
        update : {},
        create : {
            username : 'lt-administrator',
            password :hashSync('LtMs_20082021', genSaltSync(10)),
            roles : 
            {
                create : [
                    {role : 'ADMIN'},
                ]
            }
        },
    })
    console.log ('Admin user created with username and password like server')
    
}

main ()
    .catch (e => {
        console.error(e)
        process.exit()
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
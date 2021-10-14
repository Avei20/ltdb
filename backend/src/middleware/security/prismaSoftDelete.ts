import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main ()
{
    prisma.$use(async (params, next) => 
    {
        if (params.model == 'Post')
        {
            if (params.action == 'delete')
            {
                params.action = 'update'
                params.args['data'] = {deleted : true}
            }
            if (params.action == 'deleteMany')
            {
                params.action = 'updateMany'
                if (params.args.data != undefined)
                {
                    params.args.data['deleted'] = true
                }
                else 
                {
                    params.args['data'] = {deleted : true}
                }
            }
        }
        return next(params)
    })
}
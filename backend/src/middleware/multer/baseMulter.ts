import { Request } from 'express'

export const imageFilter = function (req : Request , file : Express.Multer.File, callback : any) 
{
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
    {
        return callback(new Error ('Only images file are allowed!'), false)
    }
    callback (null, true)
}

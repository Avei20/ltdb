import * as multer from "multer";
import { Request } from "express";


export const guruProfileStorage = multer.diskStorage ({
    destination : function (req : Request, file : Express.Multer.File, callback : any) {
        callback(null, './uploads/guru')
    },
    filename : function (req : Request , file :Express.Multer.File , callback:any) 
    {
        callback (null, file.fieldname)
    }
})
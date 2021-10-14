import * as multer from "multer";
import { Request } from "express";


export const muridProfileStorage = multer.diskStorage ({
    destination : function (req : Request, file : Express.Multer.File, callback : any) {
        callback(null, './uploads/murid')
    },
    filename : function (req : Request , file :Express.Multer.File , callback:any) 
    {
        callback (null, file.fieldname)
    }
})
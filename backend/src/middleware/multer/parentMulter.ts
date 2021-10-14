import * as multer from "multer";
import { Request } from "express";


export const parentProfileStorage = multer.diskStorage ({
    destination : function (req : Request, file : Express.Multer.File, callback : any) {
        callback(null, './uploads/parent')
    },
    filename : function (req : Request , file :Express.Multer.File , callback:any) 
    {
        callback (null, file.fieldname)
    }
})
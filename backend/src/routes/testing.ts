import { Request, Response, Router } from "express";
import { checkEmptyBody } from "../middleware/validator/baseValidator";
import { muridUpdateValidation } from "../middleware/validator/muridValidator";
import { testingPhaseOne, testingValidation } from "../middleware/validator/testingValidator";

const testingRoute = Router ()

testingRoute
    .route('/:nis')
        .post (checkEmptyBody,...testingPhaseOne,(req : Request, res : Response) => {
            if (Object.keys(req.body).length == 0) 
            {
                res.send({ message : 'Data Harus di input'})
            }
            else
            {
                res.send({body : req.body})
            }
        })


export default testingRoute
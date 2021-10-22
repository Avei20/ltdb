import { Router } from "express";
import { inputGuru } from "../controller/guru";
import { checkRole } from "../middleware/security/checkRole";
import { checkToken } from "../middleware/security/checkToken";
import { guruInputValidation } from "../middleware/validator/guruValidator";

const guruRoute = Router()

guruRoute
    .route('/')
        .post([checkToken, checkRole(['ADMIN', 'TU'])], ...guruInputValidation, inputGuru)

guruRoute
    .route('/:nig')
        

export default guruRoute
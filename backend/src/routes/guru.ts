import { Router } from "express";
import { deleteGuruByNig, getGuru, getGuruByNig, inputGuru, recoveryGurubyNig, updateGuru } from "../controller/guru";
import { checkRole } from "../middleware/security/checkRole";
import { checkToken } from "../middleware/security/checkToken";
import { checkEmptyBody } from "../middleware/validator/baseValidator";
import { guruByNigValidation, guruInputValidation, guruUpdateValidation } from "../middleware/validator/guruValidator";

const guruRoute = Router()

guruRoute
    .route('/')
        .post([checkToken, checkRole(['ADMIN', 'TU'])], ...guruInputValidation, inputGuru)
        .get([checkToken, checkRole(['ADMIN', 'TU'])], getGuru)

guruRoute
    .route('/:nig')
        .patch ( [checkToken, checkRole(['ADMIN', 'TU'])], checkEmptyBody, ...guruUpdateValidation, updateGuru)
        .get ( [checkToken, checkRole(['ADMIN', 'TU'])], ...guruByNigValidation, getGuruByNig)
        .delete ( [checkToken, checkRole(['ADMIN', 'TU'])], ...guruByNigValidation, deleteGuruByNig)
        .put( [checkToken, checkRole (['ADMIN'])], ...guruByNigValidation, recoveryGurubyNig)

export default guruRoute
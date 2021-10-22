import { Router } from "express";
import { deleteMuridByNis, editMurid, getMurid, getMuridByNis, inputMurid, recoveryMuridByNis } from "../controller/murid";
import { checkRole } from "../middleware/security/checkRole";
import { checkToken } from "../middleware/security/checkToken";
import { checkEmptyBody } from "../middleware/validator/baseValidator";
import { muridByNisValidation, muridInputValidation, muridUpdateValidation, muridUpdateValidationBodyValidation } from "../middleware/validator/muridValidator";

const muridRoute = Router()

muridRoute
    .route('/')
        .post([checkToken, checkRole(['ADMIN', 'TU'])], ...muridInputValidation, inputMurid )
        .get([checkToken, checkRole(['ADMIN', 'TU'])], getMurid)

muridRoute
    .route('/:nis', )
        .patch([checkToken, checkRole(['ADMIN', 'TU'])],checkEmptyBody,...muridUpdateValidation, editMurid)
        .get([checkToken, checkRole(['ADMIN', 'TU',])], ...muridByNisValidation, getMuridByNis)
        .delete(([checkToken, checkRole(['ADMIN', 'TU'])]), ...muridByNisValidation, deleteMuridByNis)
        .put([checkToken, checkRole(['ADMIN'])], ...muridByNisValidation, recoveryMuridByNis)

export default muridRoute
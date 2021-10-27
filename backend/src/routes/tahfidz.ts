import { Router } from "express";
import { getJamTahfidz, getJamTahfidzByDate, inputJamTahfidz } from "../controller/tahfidz";
import { checkRole } from "../middleware/security/checkRole";
import { checkToken } from "../middleware/security/checkToken";
import { jamTahfidzInputValidation } from "../middleware/validator/tahfidzValidator";

const tahfidzRoute = Router()

tahfidzRoute
.route('/jam')
    .post ([checkToken, checkRole(['ADMIN', 'KEPALA_TAHFIDZ'])], inputJamTahfidz)
    .get([checkToken, checkRole(['ADMIN', 'KEPALA_TAHFIDZ'])], getJamTahfidz)

tahfidzRoute
    .route('/jam/:tanggal')
        .get([checkToken, checkRole(['ADMIN', 'KEPALA_TAHFIDZ'])], getJamTahfidzByDate)


export default tahfidzRoute
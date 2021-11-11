import { Router } from "express";
import { addGuruTahfidzByUsername, deleteJamTahfidzById, getJamTahfidz, getJamTahfidzByDate, inputJamTahfidz, updateJamTahfidzById } from "../controller/tahfidz";
import { checkRole } from "../middleware/security/checkRole";
import { checkToken } from "../middleware/security/checkToken";
import { jamTahfidzInputValidation } from "../middleware/validator/tahfidzValidator";

const tahfidzRoute = Router()

tahfidzRoute
.route('/jam')
    .post ([checkToken, checkRole(['ADMIN', 'KEPALA_TAHFIDZ'])],...jamTahfidzInputValidation, inputJamTahfidz)
    .get([checkToken, checkRole(['ADMIN', 'KEPALA_TAHFIDZ'])], getJamTahfidz)

tahfidzRoute
    .route('/jam/:tanggal')
        .get([checkToken, checkRole(['ADMIN', 'KEPALA_TAHFIDZ'])], getJamTahfidzByDate)

tahfidzRoute
    .route('/jam/:id')
        .patch([checkToken, checkRole(['ADMIN', 'KEPALA_TAHFIDZ'])], updateJamTahfidzById)
        .delete([checkToken, checkRole(['ADMIN', 'KEPALA_TAHFIDZ'])], deleteJamTahfidzById)

tahfidzRoute
    .route('/tambahGuruTahfidz/:username')
        .post([checkToken, checkRole(['ADMIN', 'KEPALA_TAHFIDZ'])], addGuruTahfidzByUsername)


export default tahfidzRoute
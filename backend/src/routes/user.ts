import { Router } from "express";
import { addRole, changePasswordUser, resetPassword } from "../controller/user";
import { checkRole } from "../middleware/security/checkRole";
import { checkToken } from "../middleware/security/checkToken";
import { checkEmptyBody } from "../middleware/validator/baseValidator";
import { changePasswordValidation } from "../middleware/validator/userValidator";

const userRoute = Router()

userRoute
    .route('/changePassword')
        .patch(checkToken,checkEmptyBody, ...changePasswordValidation, changePasswordUser)

userRoute
    .route('/resetPassword/:username')
        .patch([checkToken, checkRole(['ADMIN'])], resetPassword)

userRoute
    .route('/addRole/:username')
        .patch([checkToken, checkRole(['ADMIN'])], addRole)

export default userRoute
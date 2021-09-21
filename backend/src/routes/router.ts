import { Request, Response, Router } from "express";
import { login } from "../controller/auth";
import { addUser } from "../controller/user";
import { checkRole } from "../middleware/security/checkRole";
import { checkToken } from "../middleware/security/checkToken"
import { inputMurid, editMurid } from '../controller/murid'
import { muridInputValidation } from "../middleware/validator/muridValidator";
import { alQuranInputValidation } from "../middleware/validator/quranValidator";
import { getQuran, inputQuran } from "../controller/quran";
import { loginValidator } from "../middleware/validator/loginValidator";
const router = Router()

router
    .get('/', (req : Request, res: Response) : void => {
        res.send(
            {
                message : "Welcome to ltdb Entrypoint"
            }
        )
    })

router.post('/login',...loginValidator ,login)
router.post ('/test-post', async (req: Request, res: Response) => {
    console.log(req.body)
})

router
    .route('/user')
        .post([checkToken, checkRole(['ADMIN'])], addUser)
        .get()
        .patch()

router
    .route('/alquran')
        .get([checkToken, checkRole(['INPUT_QURAN', 'ADMIN', 'TU', 'KEPALA_TAHFIDZ'])], getQuran)
        .post([checkToken, checkRole(['INPUT_QURAN', 'ADMIN', 'TU'])], ...alQuranInputValidation, inputQuran)
        .patch()
router
    .route('/murid')
        .post([checkToken, checkRole(['ADMIN', 'TU'])], ...muridInputValidation, inputMurid)
        .patch([checkToken, checkRole(['ADMIN', 'TU'])], editMurid)



export default router
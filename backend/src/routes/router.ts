import { request, Request, Response, Router } from "express";
import { login } from "../controller/auth";
import { addUser } from "../controller/user";
import { checkRole } from "../middleware/security/checkRole";
import { checkToken } from "../middleware/security/checkToken"
import { inputMurid, editMurid, getMuridByNis } from '../controller/murid'
import { muridInputValidation, muridUpdateValidation } from "../middleware/validator/muridValidator";
import { alQuranInputValidation } from "../middleware/validator/quranValidator";
import { getQuran, inputQuran } from "../controller/quran";
import { loginValidator } from "../middleware/validator/loginValidator";
import { getEvent } from "../controller/event";
import { inputGuru } from "../controller/guru";
import { guruInputValidation } from "../middleware/validator/guruValidator";
import { parentInputValidation } from "../middleware/validator/parentValidator";
import { inputParent } from "../controller/parent";
import multer from "multer";
import { muridProfileStorage } from "../middleware/multer/muridMulter";
import * as fs from 'fs'
import * as path from 'path'

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
        .post([checkToken, checkRole(['ADMIN', 'TU'])], inputMurid)
        
router
    .route('/murid/:nis')
        .patch([checkToken, checkRole(['ADMIN', 'TU'])],...muridUpdateValidation, editMurid)
        .get([checkToken, checkRole(['ADMIN', 'TU',])], getMuridByNis)
router  
    .route('/event')
        .get([checkToken, checkRole(['ADMIN', 'TU'])], getEvent)

router 
    .route('/guru')
        .post([checkToken, checkRole(['ADMIN', 'TU'])], ...guruInputValidation, inputGuru)

router
    .route('/parent')
        .post([checkToken, checkRole(['ADMIN', 'TU'])], ...parentInputValidation, inputParent)
        .patch()
        .delete()

router
    .route('/sesi')

router
    .route('/upload')
        .post((req : Request , res: Response) => {
            const upload = multer({ storage : muridProfileStorage}).single('profilePhoto')
            upload ( req , res , function (err) 
            {
                fs.renameSync(req.file?.path as string, req.file?.path.replace(req.file.fieldname, req.body.nis + path.extname(req.file.originalname)) as string)
                console.log(`Path ${req.file?.path} name ${req.file?.fieldname}`)
                console.log(req.body.nis)
            })
            // const file = req.file?.path;
        })

router
    .route ('/testing')
        .post((req: Request, res: Response) => {
            res.send({message : "ya bisa", body : req.body})
        })
    
export default router
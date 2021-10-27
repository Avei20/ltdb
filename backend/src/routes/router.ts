import { Request, Response, Router } from "express";
import { checkRole } from "../middleware/security/checkRole";
import { checkToken } from "../middleware/security/checkToken"
import { alQuranInputValidation } from "../middleware/validator/quranValidator";
import { getQuran, inputQuran } from "../controller/quran";
import { getEvent } from "../controller/event";
import { parentInputValidation } from "../middleware/validator/parentValidator";
import { inputParent } from "../controller/parent";
import multer from "multer";
import { muridProfileStorage } from "../middleware/multer/muridMulter";
import * as fs from 'fs'
import * as path from 'path'
import loginRoute from "./login";
import userRoute from "./user";
import muridRoute from "./murid";
import testingRoute from "./testing";
import guruRoute from "./guru";
import tahfidzRoute from "./tahfidz";

const router = Router()

router
    .get('/', (req : Request, res: Response) : void => {
        res.send(
            {
                message : "Welcome to ltdb Entrypoint"
            }
        )
    })

router.use('/login', loginRoute)
router.use('/murid', muridRoute)
router.use('/user', userRoute)
router.use('/testing', testingRoute)
router.use('/guru', guruRoute)
router.use('/tahfidz', tahfidzRoute)


router.post ('/test-post', async (req: Request, res: Response) => {
    console.log(req.body)
})

router
    .route('/user')
        // .post([checkToken, checkRole(['ADMIN'])], addUser)
        .get()
        .patch()

router
    .route('/alquran')
        .get([checkToken, checkRole(['INPUT_QURAN', 'ADMIN', 'TU', 'KEPALA_TAHFIDZ'])], getQuran)
        .post([checkToken, checkRole(['INPUT_QURAN', 'ADMIN', 'TU'])], ...alQuranInputValidation, inputQuran)
        .patch()


router  
    .route('/event')
        .get([checkToken, checkRole(['ADMIN'])], getEvent)


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

// router  
    // .route ('/user')
        // .post([checkToken, checkRole(['ADMIN'])], addUser)

    
export default router
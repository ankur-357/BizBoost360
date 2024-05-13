import {Router} from "express"
import {recoverPassword,
    getPagesRecoverPasswor,
    getPageSendEmail,
    manegesSendEmail
} from '../controllers/recoverPassword.controller.js'


const router = Router()

router.get('/recover/password/:token/:id',getPagesRecoverPasswor)

router.get('/recover/password',getPageSendEmail)

router.post('/recover/password',recoverPassword)

router.post('/recover/sendEmail',manegesSendEmail)

export default router
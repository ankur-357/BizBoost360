import User from '../models/user.model.js'
import { __dirname } from '../app.js'
import {join } from "path";
import { emailTemplate,sendEmail } from '../utils/nodemailer.js';
import crypto from 'crypto'
import bcrypt from "bcryptjs";


function generarToken() {
    return crypto.randomBytes(12).toString('hex');
}

// ? Recuperar Password
export const recoverPassword = async (req,res) =>{
    const {password, password2,id} = req.body 
    try {
        if(password !== password2 ) 
        return res.json({message:"Las contraseñas no coinciden",error:true}).status(400)
        
        if(!/^(?=.*[A-Z]).{7,}$/.test(password) || !/^(?=.*[A-Z]).{7,}$/.test(password2))
        return res.json({message:"La contraseña debe tener al menos un carácter en mayúscula y ser mayor a 6 caracteres",error:true}).status(400)

        const userFound = await User.findById(id)
        if(!userFound) 
        return res.json({message:"Usuario no encontrado",error:true}).status(404)
        
        if(userFound.token.used)
        return res.json({message:"Token vencido",error:true}).status(400)
        
        const passwordaHash = await bcrypt.hash(password,10);
        console.log(passwordaHash)
        const token = {
            token:null,
            used:true
        }

        await User.findByIdAndUpdate(id,{password:passwordaHash,token:token},{new:true})   

        res.json({message:"contraseña cambiada",error:false}).status(200)
    } catch (error) {
        console.log(error)
        res.json({message:"error interno",error:true}).status(500)
    }
}

// ? Octener pagina de recuperar comtraseña
export const getPagesRecoverPasswor = async (req,res) =>{
    const {id,token} = req.params
    try {
        const userFound = await User.findById(id)
        if(!userFound || userFound.token.used ||userFound.token.token !== token  ) return res.sendFile(join(__dirname, 'page', 'invalid.html'))
        
        res.sendFile(join(__dirname, 'page', 'changePassword.html'))
    } catch (error) {
        console.log(error)
    }
}

// ? Octener Pagina de enviar correo
export const getPageSendEmail = (req,res) =>{
    try {
        res.sendFile(join(__dirname, 'page', 'sendEmail.html'))
    } catch (error) {
        console.log(error)
    }
}

// ? enviar correo
export const manegesSendEmail = async (req,res) => {
    const {email} = req.body
    try {
        const userFound = await User.findOne({email:email})
        if(!userFound) return res.status(404).json({message:"Usuario no encontrado",error:true});
        const token = generarToken()
        sendRecoverPassword(email,token,userFound._id,userFound.name)

        await User.findByIdAndUpdate(
            userFound._id,
            { 
                $set: { 
                    'token.token': token,
                    'token.used': false
                }
            },
            { new: true }
        );

        res.json({message:"Te enviamos un correo",error:false}).status(200)
    } catch (error) {
        console.log(error)
        res.json({message:"error interno",error:true}).status(500)
    }
}

const sendRecoverPassword = (email,token,userId,userName) =>{
    const subject ="🔒Recupera tu contraseña"

    const html = emailTemplate(email,token,userId,userName)

    sendEmail(email,html,subject)

}
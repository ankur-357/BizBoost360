import { z } from "zod"

export const userRegisterSchema = z.object({
    name:z.string({
        required_error:"Nombre es requerido"
    }),
    email:z.string({
        required_error:"EL correo es requerido"
    }).email({
        message:"Correo invalido"
    }),
    password:z.string({
        required_error:"La contraseña es requerida"
    }).refine(value => /^(?=.*[A-Z]).{7,}$/.test(value), {
        message: "La contraseña debe tener al menos un carácter en mayúscula y ser mayor a 6 caracteres"
      })

    }
)

export const userLoginSchema = z.object({
    email:z.string({
        required_error:"EL correo es requerido"
    }).email({
        message:"Correo invalido"
    }),
    password:z.string({
        required_error:"La contraseña es requerida"
    }).refine(value => /^(?=.*[A-Z]).{7,}$/.test(value), {
        message: "La contraseña debe tener al menos un carácter en mayúscula y ser mayor a 6 caracteres"
      })

})

export const changePassworSchema = z.object({
    password:z.string({
        required_error:"La contraseña es requerida"
    }).refine(value => /^(?=.*[A-Z]).{7,}$/.test(value), {
        message: "La contraseña debe tener al menos un carácter en mayúscula y ser mayor a 6 caracteres"
    }),
    newPassword:z.string({
        required_error:"La contraseña es requerida"
    }).refine(value => /^(?=.*[A-Z]).{7,}$/.test(value), {
        message: "La contraseña debe tener al menos un carácter en mayúscula y ser mayor a 6 caracteres"
    }),
    matchPassword:z.string({
        required_error:"La contraseña es requerida"
    }).refine(value => /^(?=.*[A-Z]).{7,}$/.test(value), {
        message: "La contraseña debe tener al menos un carácter en mayúscula y ser mayor a 6 caracteres"
    }),

})

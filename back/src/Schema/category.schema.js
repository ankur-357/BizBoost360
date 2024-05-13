import { z } from "zod"

export const categorySchema = z.object({
    title:z.string({
        required_error:"Es requerido el nombre de la categoria"
    }),
    description:z.string({
        required_error:"La description es nesesaria"
    })
})
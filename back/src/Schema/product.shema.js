import { z } from "zod"

export const productSchema = z.object({
    name:z.string({
        required_error:"EL Nombre es requerido"
    }),
    price:z.number({
        required_error:"EL precio es requerido"
    }).refine(value => !isNaN(value), {
        message: "El precio debe ser un número",
    }),
    quantity:z.number({
        required_error:"La cantidad es requerida"
    }),
    description:z.string({
        required_error:"La Descricción es requerida"
    }),
    category:z.array(z.string(),{
        required_error:"La Categoria es requerida"
    }),
    currency:z.string({
        required_error:"Se nesecita el tipo de moneda"
    }),
    company:z.string({
        required_error:"Es requerida la Empresa que crea el producto"
    }),
})
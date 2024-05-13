import { z } from "zod"

const productSchema = z.object({
    product: z.string({
        required_error: "El id del producto es requerido"
    }),
    quantity: z.number({
        required_error: "Se requiere cuantos se vendieron de este producto"
    }),
    totalPriceProduct: z.number({
        required_error: "Total generado por la venta de este producto (quantity * price)"
    }),
});

export const saleSchema = z.object({
    total: z.number({
        required_error: "Se requiere cuanto se genero con la venta de estos productos"
    }),
    company: z.string({
        required_error: "Se requiere la compañia que genero esta venta"
    }),
    sold_Products: z.array(productSchema, {
        required_error: "Se esperaba un array"
    }),
});
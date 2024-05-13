import * as z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(5, { message: "Product name is required." }),
  description: z
    .string()
    .min(1, { message: "Product description is required." }),
  image: z.string().min(1, {
    message: "Product image is required.",
  }),
  category: z.array([z.string()], {
    message: "Categories cannot be repeated.",
  }),
  currency: z.enum([
    "CAD",
    "USD",
    "ARS",
    "CLP",
    "COP",
    "PEN",
    "BRL",
    "VES",
    "GTQ",
    "NIO",
    "HNL",
    "CRC",
    "PAB",
    "BZD",
    "BSD",
    "BBD",
    "JMD",
    "XCD",
    "HTG",
  ], {
    message: "You must select a currency type.",
  }),
  price: z
    .number({
      message: "Price must be a non-zero number.",
    }),

  quantity: z
    .number({
      message: "Quantity must be a non-zero number.",
    })

});

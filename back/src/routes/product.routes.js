import { Router } from "express";
import { 
    createProduct,
    deleteProduct,
    // updateProduct,
    getProduct,
    getProducts, 
    editProduct
} from "../controllers/product.controller.js";
// import {authRequired} from '../middleware/tokenResponse.js'
import {validateSchema} from '../middleware/data.validator.js'
import { productSchema } from "../Schema/product.shema.js";


const routes = Router()

//? Octener todos los productos de un usuario
routes.get('/products/:id',getProducts)//authRequired,


//? Octoner un producto
routes.get('/product/:id/:companyId',getProduct)//authRequired,

//? Create Product
routes.post('/product',validateSchema(productSchema),createProduct)//authRequired,

// ? Actualizar un producto
routes.put('/product/:id',validateSchema(productSchema),editProduct)//authRequired,


//? eliminar una producto
routes.delete('/product/:id',deleteProduct)//authRequired,

export default routes
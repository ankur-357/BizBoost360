import { Router } from "express";
import { getSales,getSale,createSale,getSalesCount } from "../controllers/sale.controller.js";
import {validateSchema} from '../middleware/data.validator.js'
import { saleSchema } from "../Schema/sale.schema.js";
import {authRequired} from '../middleware/tokenResponse.js'

const router = Router()

// ? Octener las ventas 
router.get('/sale/company/:id',getSales)//authRequired

// ? Octener una venta por el id
router.get('/sale/:id',authRequired,getSale)

router.get('/sale/count/:id',getSalesCount)
// ? generar venta 
router.post('/sale',validateSchema(saleSchema),createSale)//authRequired

export default router
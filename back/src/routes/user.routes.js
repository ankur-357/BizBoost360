import { Router } from "express";
import { authRequired } from '../middleware/tokenResponse.js'
import { login, register, logout, verityToken, updatePassword, deleteUser } from "../controllers/user.controller.js";
import { validateSchema } from '../middleware/data.validator.js'
import { userRegisterSchema, userLoginSchema, changePassworSchema, } from "../Schema/user.schema.js";
const router = Router();

// ? Registrar usuario
router.post('/register', validateSchema(userRegisterSchema), register);

// ? iniciar seccion
router.post('/login', validateSchema(userLoginSchema), login)

// ? Salir de seccion
router.post('/logout', logout)

// ? cambiar contraseña
router.post('/change/password', validateSchema(changePassworSchema), updatePassword)//authRequired,

// ? Eliminar usuario
router.delete('/user/:id', deleteUser)

// ? Verificar el token de la cookies
router.get('/verify', verityToken)

// Route to fetch user profile by user ID
router.get('/api/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
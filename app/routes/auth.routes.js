const router = require('express').Router()
const userController = require('../Controllers/Auth/authController')
const authToken = require('../middlewares/tokenMiddleware')


// no son vistas son peticiones...
router.post('/registro', userController.registro) // para registrar al usuari
router.post('/profile', authToken.authMiddleware, userController.profile) 
router.post('/login', userController.login) // para autenticar al usuario
router.post('/logout', userController.logout) // para cerrar la 


module.exports = router
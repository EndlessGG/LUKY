const router = require('express').Router()
const userController = require('../Controllers/Auth/authController')
const authToken = require('../middlewares/tokenMiddleware')


// no son vistas son peticiones...
router.post('/registro', userController.registro) // para registrar al usuario
// supongamos que tenemos la ruta perfil, peero como no ha iniciado sesion lo redirige la login con el 
router.post('/profile', authToken.authMiddleware, userController.profile) // el parametro de en medio es el que hace la verficacion :3 para poder acceder a los datos del usuario, ese middleware tambien debe ir en el de vistas
router.post('/login', userController.login) // para autenticar al usuario
router.post('/logout', userController.logout) // para cerrar la 


module.exports = router
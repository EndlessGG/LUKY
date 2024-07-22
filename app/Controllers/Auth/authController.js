const session = require('express-session')
const jwt = require('jsonwebtoken')
const User = require('../../Models/user')
const genToken = require('../../middlewares/tokenMiddleware')

class UserController {

    // Controlador para el Registro de Usuarios
    static async registro(req, res) {
        try {
            const { nombres, apellidoPaterno, apellidoMaterno, email, password } = req.body

            // Validacion en caso de que el correo  ya este registrado
            const existingEmail = await User.findUserByEmail(email)
            if (existingEmail) {
                res.status(409).json({ error: 'El Correo ya esta registrado' })
                res.redirect('/Formulario')
            }

            // Encriptación de contrasena
            const hashedPassword = await User.hashPassword(password)

            // Creacion del nuevo usuario
            const newUser = new User(nombres, apellidoPaterno, apellidoMaterno, email, hashedPassword)
            const userId = await newUser.registerUser()
            
            return res.redirect('/Formulario')
        } catch (error) {
            console.error('Error al registrar usuario, controller:', error)
            res.status(500).json({ error: 'Error interno del servidor' })
        }
    }

    // Controlador para el inicio de sesión de usuarios
    static async login(req, res) {
        try {
            const { email, password } = req.body // lo sacamos del form de leo

            const user = await User.findUserByEmail(email)
            if (!user) {
                return res.render('formulario', {
                    errorEmail_l: 'El correo no se encuentra Registrado', 
                    email: email, 
                    errorPassword_l: null 
                })
            }

            // Comparar la contrasena proporcionada con la almacenada en la BD
            const isMatch = await User.comparePassword(password, user.pass)
            if (!isMatch) {
                return res.render('formulario', {
                    errorEmail_l: null, 
                    email: email, 
                    errorPassword_l: 'La contrasena es Incorrecta' 
                })
            }

            const token = genToken.generarToken(user)

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 24 * 60 * 60 * 1000
            })

            //res.status(200).json({ message: 'Inicio de sesion exitoso', token })
            return res.redirect('/Busqueda')
        } catch (error) {
            console.error('Error al iniciar sesion, controller:', error)
            res.status(500).json({ error: 'Error interno del servidor' })
        }
    }

    // controlador para cerrar sesion
    static async logout(req, res) {
        try {
            res.clearCookie('token')
            req.session.destroy
            //res.json({ messaje: 'Cierre de Sesion Exitoso' })
            return res.redirect('/')
        } catch (error) {
            console.error('Error al cerrar sesion, controller:', error)
        }
    }

    // NO ES para acceder a la pagina de prefil, es para obtener los datos el usuario y ya pal mandarlos pal perfil
    static async profile(req, res) {
        try {
            const token = req.cookies.token;

            const infoUsuario = genToken.extraerInfoToken(token);
            if (!infoUsuario) {
                return res.status(401).json({ mensaje: 'Token inválido' });
            }
            req.usuario = infoUsuario

            const email = req.usuario.email
            
            const user = await User.getAllInfoUser(email)
            if (user) {
                const { pass, ...userWithoutPassword } = user
                res.json(userWithoutPassword)
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' })
            }
        } catch (error) {
            console.error('Error al obtener datos del usuario, controller:', error)
            res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}

module.exports = UserController

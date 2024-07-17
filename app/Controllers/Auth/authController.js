const session = require('express-session')
const jwt = require('jsonwebtoken')
const User = require('../../Models/user')
const genToken = require('../../middlewares/tokenMiddleware')

class UserController {

    // Controlador para el Registro de Usuarios
    static async registro(req, res) {
        try {
            //quitar telefono y isTrabajador y meter por default 0 a istrabajdor
            const { nombres, apellidoPaterno, apellidoMaterno, email, password/*, telefono, isTrabajador */} = req.body // lo que sacamos del form

            // Validación de datos de entrada
            if (!nombres || !apellidoPaterno || !apellidoMaterno || !email || !password) {
                return res.status(400).json({ error: 'Llene todos los campos de manera correcta' })
            }

            // Validación de nombre de usuario existente
            // const existingUsername = await userModel.findUsername(username)
            // if (existingUsername) {
            //     return res.status(409).json({ error: 'El usuario ya esta registrado' })
            // }

            // Validacion en caso de que el correo  ya este registrado
            //const existingEmail = await userModel.findEmail(email)
            const existingEmail = await User.findUserByEmail(email)
            if (existingEmail) {
                // para el back
                return res.status(409).json({ error: 'El Correo ya esta registrado' })

                // para el front
                // return res.render('', {
                //     // para los mensajes de error en el form, espero que hayan xd
                //     error: 'El Correo ya esta registrado',
                //     email: email // este para mantener el email ingresado en el form y checar mis faltas de orto :3
                // })
                // ya depsue hago el js para esto del front y se muestre como tal pero eso deberia hacerlo leo jsjs
            }

            // Encriptación de contrasena
            const hashedPassword = await User.hashPassword(password)

            // Creacion del nuevo usuario
            const newUser = new User( nombres, apellidoPaterno, apellidoMaterno, email, hashedPassword/*, telefono, isTrabajador */)
            const userId = await newUser.registerUser()

            res.status(201).json({ message: 'Usuario registrado exitosamente', userId: userId.insertId })
            //bueno o hago una verificacion por email o solo lo redirecciono al login xd jsjs o la inddex o un mensaje para decirle, ya eres un castor UTP
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
                return res.status(400).json({ message: 'Usuario o contraseña incorrectos' })
                // lo mismo que en registro pero para el front
            }

            // Comparar la contrasena proporcionada con la almacenada en la BD
            const isMatch = await User.comparePassword(password, user.pass)
            if (!isMatch) {
                return res.status(400).json({ message: 'Usuario o contraseña incorrectos' })
            }

            //const getInfo = await userModel.getAllInfoUser(user.email) // este se ocupa en otra seccion, no aca
            // generacion de token
            //const token = this.generateToken(user)
            const token = genToken.generarToken(user)

            // los siguientes estan demas por ahoraa... tienen el mismo propsito, bueno ya depsues veo que hago con esos
            // basicamente session es como cookie pero de express xd
            //res.session.jwtToken = token
            // almacenamos el JWT en las cookies una vez se inicia sesion <3
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 24 * 60 * 60 * 1000
            })

            // para verificar logeo
            res.status(200).json({ message: 'Inicio de sesion exitoso', token })
            // poner lugar para redireccionar, en este caso seria el indezx o la pgina de inico

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
            res.json({ messaje: 'Cierre de Sesion Exitoso' })
            // agregar un redireccion de pagina xd o nose, que lo mande al index
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
                // bueno entonces supongamos que en caso de no teneerlo, cosa que no creo por que no pasara por el middleware que see me haria una cosa pero barabara
                // es mas ni deberia estar este if, confio en el middleware xD
                return res.status(401).json({ mensaje: 'Token inválido' });

            }
            console.log(infoUsuario) // pa depurar
            req.usuario = infoUsuario
            console.log(req.usuario.email) // depurar
            const email = req.usuario.email
            const user = await User.getAllInfoUser(email)
            if (user) {
                // Excluir informacion sensible como la contrasena, igual el i pero por ahora solo las pass
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

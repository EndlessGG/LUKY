const jwt = require('jsonwebtoken');
const { emit } = require('../../config/database');

// para la generacion del JWT
exports.generarToken = (usuario) => {
    const payload = {
        id: usuario.ID, // en este se guardan el id y email del usuario
        email: usuario.email,
        //role: usuario.role, para ver como trabajo los roles o el booleano
        iat: Date.now() / 1000, // Tiempo de emisionn
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expira en 1 hors
    };

    return jwt.sign(payload, process.env.JWT_SECRET)
}

// para poder decodificar el token y poder extraer la informacion del usuario que se guarda en este token
exports.extraerInfoToken = (token) => {
    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRET)
        return decodificado
    } catch (error) {
        console.error('Error al decodificar token:', error)
        return null
    }
}

// para poder protejer rutas en caso de que se intente de entrar a alguna pagina sin sesion, como perfil por ejemplo
exports.authMiddleware = (req, res, next) => {
    //const token = req.headers.authorization?.split(' ')[1]; // Asume formato "Bearer <token>"
    console.log('Todas las cookies:', req.cookies) // depuracion
    const token = req.cookies.token  // sacamos el token de las cookies para ver si si hay o no vea
    console.log('Token extraido:', token) // depuracion
    if (!token) {
        //return res.status(401).json({ mensaje: 'No se proporciono token' });
        // despues lo redireccion a la pagina de login
        res.redirect('/Busqueda')
    }

    // este por ahora no me sirve aqui
    // const infoToken = extraerInfoToken(token)
    // if (!infoToken) {
    //     return res.status(401).json({ mensaje: 'Token inválido' })
    //     // igual lo redireccion a la pagina de login
    // }

    // req.usuario = infoToken; // Añade la informacion del usuario a la request
    next();
}

// o usao este o el anterior jsjs
// bueno por ahora el de verify esta de mas...
// verificacion de TOKEN desde session o cookies
// a este no le hagan caso es feo... como yo
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.session.jwtToken

    if (!token) return res.status(403).send('Acceso denegado')

    try {
        const verified = jwt.verify(token, 'tu_secreto_jwt')
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Token inválido')
    }
}

// ver proteccion para clinete o trabajador

//module.exports = generarToken

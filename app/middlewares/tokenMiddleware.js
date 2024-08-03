const jwt = require('jsonwebtoken');
const { emit } = require('../../config/database');

// para la generacion del JWT
exports.generarToken = (usuario) => {
    const payload = {
        id: usuario.ID, // en este se guardan el id y email del usuario
        email: usuario.email,
        iat: Date.now() / 1000, // Tiempo de emisionn
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expira en 1 hors
    }

    return jwt.sign(payload, process.env.JWT_SECRET)
}

// para poder decodificar el token y poder extraer la informacion del usuario que se guarda en este token
exports.extraerInfoToken = (token) => {
    try {
        if(!token){
            // eslint-disable-next-line no-undef
            redirect('/')
        }
        const decodificado = jwt.verify(token, process.env.JWT_SECRET)
        return decodificado
    } catch (error) {
        console.error('Error al decodificar token:', error)
        return null
    }
}

// para poder protejer rutas en caso de que se intente de entrar a alguna pagina sin sesion, como perfil por ejemplo
exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    
    if (!token) {
        //return res.status(401).json({ mensaje: 'No se proporciono token' });
        return res.redirect('/Formulario')
    }
    next()
}

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

//module.exports = generarToken

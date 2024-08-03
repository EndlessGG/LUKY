const passport = require('passport')
const path = require('path')
const User = require('../Models/user')
const genToken = require('../middlewares/tokenMiddleware')
const moment = require('moment')

exports.showIndexPage = (req, res) => {
    res.render('index')  // pagina de inicio
}
exports.showFormPage = (req, res) => {
    res.render('formulario', { errorEmail_l: null, email: '', errorPassword_l: null })  // pagina de formulario
}

exports.showPerfilPage = async (req, res) => {
    try {
        const token = req.cookies.token
        const infoUsuario = genToken.extraerInfoToken(token)

        if (!infoUsuario) {
            return res.status(401).json({ mensaje: 'Token inválido' })
        }

        req.usuario = infoUsuario
        const email = req.usuario.email

        const user = await User.getAllInfoUser(email)

        if (user) {
            const { pass, ...userWithoutPassword } = user;
            // Formatear la fecha
            userWithoutPassword.fechaCreacion = moment(userWithoutPassword.fechaCreacion).format('DD/MM/YYYY')
            res.render('perfil', { user: userWithoutPassword });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' })
        }
    } catch (error) {
        console.error('Error al obtener datos del usuario, controller:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

exports.showBusquedaPage = (req, res) => {
    const { termino } = req.query
    let publicaciones = []
    let mensaje = null

    if (termino) {
        publicaciones = []
        
        if (publicaciones.length === 0) {
            mensaje = 'No se encontraron publicaciones'
        }
    }

    res.render('buqueda', {
        termino: termino || '',
        publicaciones: publicaciones,
        mensaje: mensaje,
        formatearFecha: (fecha) => {
            return new Date(fecha).toLocaleDateString()
        },
        calcularEstrellas: (valoracion) => {
            // Función para calcular las estrellas basadas en la valoración
            return '★'.repeat(Math.round(valoracion)) + '☆'.repeat(5 - Math.round(valoracion))
        }
    })
}
exports.showTerminosPage = (req, res) => {
    res.render('terminos')  // pagina de inicio
}
exports.showAcercaPage = (req, res) => {
    res.render('acerca')  // pagina de acerca
}
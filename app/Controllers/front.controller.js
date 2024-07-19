const passport = require('passport')
const path = require('path')

exports.showIndexPage = (req, res) => {
    res.render('index')  // pagina de inicio
}
exports.showFormPage = (req, res) => {
    res.render('formulario', { errorEmail_l: null, email: '', errorPassword_l: null })  // pagina de formulario
}
exports.showPerfilPage = (req, res) => {
    res.render('perfil')  // pagina de perfil
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
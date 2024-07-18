const path = require('path')

exports.showIndexPage = (req, res) => {
    res.render('index')  // pagina de inicio
}
exports.showFormPage = (req, res) => {
    res.render('formulario')  // pagina de formulario
}
exports.showPerfilPage = (req, res) => {
    res.render('perfil')  // pagina de perfil
}
exports.showBusquedaPage = (req, res) => {
    res.render('buqueda')  // pagina de busqueda
}
exports.showTerminosPage = (req, res) => {
    res.render('terminos')  // pagina de inicio
}
exports.showAcercaPage = (req, res) => {
    res.render('acerca')  // pagina de acerca
}
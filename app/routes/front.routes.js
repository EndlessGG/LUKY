const express = require('express');
const router = express.Router();
const frontController = require('../Controllers/front.controller');

router.get('/', frontController.showIndexPage)
router.get('/Formulario', frontController.showFormPage) // pagina de inicio
router.get('/Perfil', frontController.showPerfilPage) // pagina de inicio
router.get('/Busqueda', frontController.showBusquedaPage) // pagina de inicio
router.get('/Terminos', frontController.showTerminosPage) // pagina de inicio
//router.get('/Acerca', frontController.showAcercap) // pagina de inicio

module.exports = router
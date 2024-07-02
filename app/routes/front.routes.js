const express = require('express');
const router = express.Router();
const frontController = require('../Controllers/front.controller')

router.get('/', frontController.showIndexPage) // pagina de inicio

module.exports = router
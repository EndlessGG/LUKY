const router = require('express').Router()
const searchController = require('../Controllers/Post/searchController')

router.get('/busquedaPublicaciones', searchController.Buscar)

module.exports = router
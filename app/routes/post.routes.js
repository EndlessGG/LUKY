const express = require('express');
const router = express.Router();
const publicacionesController = require('../Controllers/Post/postController');

router.post('/publicar', publicacionesController.createPublicacion)
router.post('/editar', publicacionesController.editPublicacion)
router.delete('/eliminar/:id', publicacionesController.deletePublicacion)


module.exports = router;

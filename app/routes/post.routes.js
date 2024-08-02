const express = require('express');
const router = express.Router();
const publicacionesController = require('../Controllers/Post/postController');

router.post('/publicar', publicacionesController.createPublicacion);

module.exports = router;

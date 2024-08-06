const publicacionModel = require('../../Models/post')
const User = require('../../Models/user')
const genToken = require('../../middlewares/tokenMiddleware')

exports.createPublicacion = async (req, res) => {
    try {
        const { tituloP, descripcion, precioI, categoriaID, precioF } = req.body

        const token = req.cookies.token

        const infoUsuario = genToken.extraerInfoToken(token)
        if (!infoUsuario) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }
        req.usuario = infoUsuario

        const usuarioID = req.usuario.id

        // Verificar que la categoría y el usuario existen
        const categoria = await publicacionModel.getCategoriaByID(categoriaID)
        const usuario = await User.findUserById(usuarioID)

        if (!categoria) {
            return res.status(400).json({ error: 'Categoría no encontrada' })
        }

        if (!usuario) {
            return res.status(400).json({ error: 'Usuario no encontrado' })
        }

        // Crear la publicación
        const publicacionID = await publicacionModel.createPublicacion({
            tituloP,
            descripcion,
            precioI,
            categoriaID,
            usuarioID,
            precioF,
        })
        res.redirect('/perfil')
        //res.status(201).json({ id: publicacionID, message: 'Publicación creada exitosamente' })
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la publicación', error })
    }
};

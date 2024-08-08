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
}

exports.editPublicacion = async (req, res) => {
    try {
        const { id, tituloP, descripcion, precioI, precioF, categoriaID } = req.body

        const token = req.cookies.token
        const infoUsuario = genToken.extraerInfoToken(token)

        if (!infoUsuario) {
            return res.status(401).json({ mensaje: 'Token inválido' })
        }
        req.usuario = infoUsuario

        const usuarioID = req.usuario.id

        if (!id) {
            console.log("id de publicacion", id)
            return res.status(400).json({ error: 'ID de la publicación es necesario' });
        }

        // Verificar que la publicación existe y pertenece al usuario
        const publicacion = await publicacionModel.getPublicacionByID(id)

        if (!publicacion) {
            return res.status(404).json({ error: 'Publicación no encontrada' })
        }

        if (publicacion.usuarioID !== usuarioID) {
            return res.status(403).json({ error: 'No tienes permisos para editar esta publicación' })
        }

        // Verificar que la categoria existe
        const categoria = await publicacionModel.getCategoriaByID(categoriaID)

        if (!categoria) {
            return res.status(400).json({ error: 'Categoría no encontrada' })
        }

        // Actualizar la publicacion
        await publicacionModel.updatePublicacion({
            id,
            tituloP,
            descripcion,
            precioI,
            precioF,
            categoriaID
        })

        res.redirect('/perfil')
        // res.status(200).json({ message: oPublicación actualizada exitosamente' })
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la publicación', error })
    }
}

exports.deletePublicacion = async (req, res) => {
    try {
        const id = req.params.id

        const token = req.cookies.token;
        const infoUsuario = genToken.extraerInfoToken(token)

        if (!infoUsuario) {
            return res.status(401).json({ mensaje: 'Token inválido' })
        }
        req.usuario = infoUsuario

        const usuarioID = req.usuario.id

        // Verificar que la publicacion existe y pertenece al usuario
        const publicacion = await publicacionModel.getPublicacionByID(id)

        if (!publicacion) {
            return res.status(404).json({ error: 'Publicación no encontrada' })
        }

        if (publicacion.usuarioID !== usuarioID) {
            return res.status(403).json({ error: 'No tienes permisos para eliminar esta publicación' })
        }

        // Eliminar la publicacion
        const result = await publicacionModel.deletePublicacion(id)

        if (result.affectedRows === 0) {
            return res.status(500).json({ error: 'Error al eliminar la publicación' })
        }

        res.status(200).json({ message: 'Publicación eliminada exitosamente' })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la publicación', error })
    }
}


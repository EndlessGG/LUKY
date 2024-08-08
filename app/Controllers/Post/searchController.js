const Search = require('../../Models/Post/search')

class UserController {
    static async Buscar(req, res) {
        try {
            const { termino } = req.query
    
            if (!termino) {
                return res.render('buqueda', { publicaciones: [], mensaje: 'Ingrese un termino de busqueda' })
            }
    
            const publicaciones = await Search.search(termino)
    
            if (publicaciones.length === 0) {
                return res.render('buqueda', { publicaciones: [], mensaje: 'No se encontraron publicaciones' })
            }
    
            // Filtrar los campos que no queremos mostrar nlas potss
            const publicacionesFiltradas = publicaciones.map(({ ID, categoriaID, ...resto }) => resto)
    
            res.render('buqueda', { publicaciones: publicacionesFiltradas, mensaje: null })
        } catch (error) {
            console.error('Error al buscar publicaciones:', error)
            res.render('buqueda', { publicaciones: [], mensaje: 'Error interno del servidor' })
        }
    }
}

module.exports = UserController
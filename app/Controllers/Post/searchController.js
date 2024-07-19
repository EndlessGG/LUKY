const Search = require('../../Models/Post/search')

class UserController {

    // static async Buscar(req, res) {

    //     try {
    //         const { termino } = req.body

    //         if (!termino) {
    //             return res.status(400).json({ error: 'Debe proporcionar un término de búsqueda' })
    //         }

    //         const publicaciones = await Search.search(termino)

    //         if (publicaciones.length === 0) {
    //             return res.status(404).json({ message: 'No se encontraron publicaciones' })
    //         }

    //         res.json(publicaciones)
    //     } catch (error) {
    //         console.error('Error al buscar publicaciones:', error)
    //         res.status(500).json({ error: 'Error interno del servidor' })
    //     }

    // }
    static async Buscar(req, res) {
        try {
            const { termino } = req.query; // Cambiado de req.body a req.query para método GET
    
            if (!termino) {
                return res.render('buqueda', { publicaciones: [], mensaje: 'Ingrese un término de búsqueda' });
            }
    
            const publicaciones = await Search.search(termino);
    
            if (publicaciones.length === 0) {
                return res.render('buqueda', { publicaciones: [], mensaje: 'No se encontraron publicaciones' });
            }
    
            // Filtrar los campos que no queremos mostrar
            const publicacionesFiltradas = publicaciones.map(({ ID, categoriaID, ...resto }) => resto);
    
            res.render('buqueda', { publicaciones: publicacionesFiltradas, mensaje: null });
        } catch (error) {
            console.error('Error al buscar publicaciones:', error);
            res.render('buqueda', { publicaciones: [], mensaje: 'Error interno del servidor' });
        }
    }
}

module.exports = UserController
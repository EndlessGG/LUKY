const pool = require('../../config/database')

async function createPublicacion({ tituloP, descripcion, precioI, categoriaID, usuarioID, precioF }) {
    const [result] = await pool.query(
        `INSERT INTO publicaciones (tituloP, descripcion, precioI, categoriaID, usuarioID, precioF) 
    VALUES (?, ?, ?, ?, ?, ?)`,
        [tituloP, descripcion, precioI, categoriaID, usuarioID, precioF]
    )
    return result.insertId
}

async function updatePublicacion({ id, tituloP, descripcion, precioI, precioF, categoriaID }) {
    await pool.query(
        `UPDATE publicaciones 
         SET tituloP = ?, descripcion = ?, precioI = ?, precioF = ?, categoriaID = ? 
         WHERE ID = ?`,
        [tituloP, descripcion, precioI, precioF, categoriaID, id]
    )
}

// class PublicacionModel {
//     // Método para eliminar una publicación por ID
//     static async deletePublicacion(id) {
//         const [result] = await pool.query(
//             `DELETE FROM publicaciones WHERE ID = ?`,
//             [id]
//         );
//         return result.affectedRows > 0; // Devuelve true si se eliminó al menos una fila
//     }
// }

async function deletePublicacion(id) {
    const [result] = await pool.query(
        `DELETE FROM publicaciones WHERE ID = ?`,
        [id]
    )
    return result
}

async function getCategoriaByID(id) {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE ID = ?', [id])
    return rows[0]
}

async function getCategorias() {
    const [rows] = await pool.query('SELECT * FROM categorias')
    return rows
}

async function getPublicacionByID(id) {
    const [result] = await pool.query(
        `SELECT * FROM publicaciones WHERE ID = ?`,
        [id]
    )
    return result[0]
}


module.exports = {
    createPublicacion,
    getCategoriaByID,
    getCategorias,
    getPublicacionByID,
    updatePublicacion,
    deletePublicacion
}

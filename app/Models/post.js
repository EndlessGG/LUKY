const pool = require('../../config/database')

async function createPublicacion({ tituloP, descripcion, precioI, categoriaID, usuarioID, precioF }) {
    const [result] = await pool.query(
        `INSERT INTO publicaciones (tituloP, descripcion, precioI, categoriaID, usuarioID, precioF) 
    VALUES (?, ?, ?, ?, ?, ?)`,
        [tituloP, descripcion, precioI, categoriaID, usuarioID, precioF]
    )
    return result.insertId
}

async function getCategoriaByID(id) {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE ID = ?', [id])
    return rows[0]
}

async function getCategorias() {
    const [rows] = await pool.query('SELECT * FROM categorias')
    return rows
}

module.exports = {
    createPublicacion,
    getCategoriaByID,
    getCategorias,
}

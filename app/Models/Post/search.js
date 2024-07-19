// models/jobModel.js
const db = require('../../../config/database')

class Search {
  static async search(termino) {
    const query = `
        SELECT 
            p.ID, 
            p.tituloP, 
            p.fecha, 
            p.descripcion, 
            p.precioI, 
            p.categoriaID, 
            u.nombres as usuarioNombre, 
            p.valoracion, 
            p.precioF 
        FROM 
            publicaciones p
        JOIN 
            usuarios u ON p.usuarioID = u.ID
        WHERE 
            p.tituloP LIKE ?`;

    const [results] = await db.query(query, [`%${termino}%`]);
    return results;
  }
}

module.exports = Search;

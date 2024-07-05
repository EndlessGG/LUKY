require('dotenv').config();
const mysql = require('mysql2');
const http = require('http');
const url = require('url');

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const idPublicacion = queryObject.idpublicacion;

    const sql = `SELECT SUM(valor) as suma_total, COUNT(*) as total_registros FROM datos WHERE idpublicacion = ?`;
    
    conn.query(sql, [idPublicacion], (error, results) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error en la consulta a la base de datos');
            return;
        }

        if (results.length > 0) {
            const row = results[0];
            const suma_total = row.suma_total;
            const total_registros = row.total_registros;

            if (total_registros > 0) {
                const promedio = suma_total / total_registros;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`La suma total es: ${suma_total}<br>`);
                res.write(`El número total de registros es: ${total_registros}<br>`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('No hay registros en la tabla.');
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('No se encontraron resultados.');
        }
    });
}).listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

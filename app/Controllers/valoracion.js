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
    const idPublicacion = queryObject.idpublicacion; //Valores que cambiaran con los diseños 
    const valor = queryObject.valor; //Valores que cambiaran con los diseños 

    const sqlInsert = `INSERT INTO datos (idpublicacion, valor) VALUES (?, ?)`;

    conn.query(sqlInsert, [idPublicacion, valor], (error, results) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error en la consulta a la base de datos');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Inserción exitosa');
    });
}).listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

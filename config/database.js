require('dotenv').config()
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10
})

// Funcion para verificar la conexion :3
async function testConnection() {
    try {
        const connection = await pool.getConnection()
        console.log('Conexion a la base de datos establecida con exito.')
        connection.release()
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message)
        process.exit(1) // para detener la app en caso de error
    }
}

// forma para esperar que la conexion se verifique antes de exportar
testConnection()

module.exports = pool
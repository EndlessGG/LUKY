const dbConnection = require('../../config/database')
const bcrypt = require('bcrypt')

class User {
    constructor(nombres, apellidoPaterno, apellidoMaterno, email, pass) {
        this.nombres = nombres
        this.apellidoPaterno = apellidoPaterno
        this.apellidoMaterno = apellidoMaterno
        this.email = email
        this.pass = pass
    }

    static async hashPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            return hashedPassword
        } catch (error) {
            console.error('Error al hashear password, model:', error)
            throw error
        }
    }

    static async comparePassword(password, hashedPassword) {
        try {
            const isMatch = await bcrypt.compare(password, hashedPassword)
            return isMatch
        } catch (error) {
            console.error('Error al cmoparar password, model:', error)
            throw error
        }
    }

    async registerUser() {
        try {
            const [result] = await dbConnection.query(
                'INSERT INTO usuarios (nombres, apellidoPaterno, apellidoMaterno, email, pass) VALUES (?, ?, ?, ?, ?)',
                [
                    this.nombres,
                    this.apellidoPaterno,
                    this.apellidoMaterno,
                    this.email,
                    this.pass
                ]
            )
            return result
        } catch (error) {
            console.error('Error al registrar nuevo usuario, model:', error)
            throw error
        }
    }

    static async findUserByEmail(email) {
        try {
            const [rows] = await dbConnection.query(
                'SELECT ID, email, pass FROM usuarios WHERE email = ?',
                [email]
            )
            return rows[0]
        } catch (error) {
            console.error('Error al obtener correo, model:', error)
            throw error
        }
    }

    static async findUserById(id) {
        try {
            const [rows] = await dbConnection.query(
                'SELECT ID FROM usuarios WHERE ID = ?',
                [id]
            )
            return rows[0]
        } catch (error) {
            console.error('Error al obtener id, model:', error)
            throw error
        }
    }


    static async getAllInfoUser(email) {
        try {
            const [rows] = await dbConnection.query(
                'SELECT * FROM usuarios WHERE email = ?',
                [email]
            )
            
            return rows[0]
        } catch (error) {
            console.error('Error al obtener informacion de usuario, model:', error)
            throw error
        }
    }

    static async getAllPostUser(id) {
    try {
        const [rows] = await dbConnection.query(
            'SELECT * FROM publicaciones WHERE usuarioID = ?',
            [id]
        );
        return rows;
    } catch (error) {
        console.error('Error al obtener publicaciones del usuario, model:', error);
        throw error;
    }
}

}

module.exports = User

// // Encriptacion de Contrasenas
// const hashPassword = async (password) => {
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10)
//         return hashedPassword
//     } catch (error) {
//         console.error('Error al hashear password, model:', error)
//         throw error
//     }
// }

// // Comparacion de Contrasena Encriptada con la proporcionada
// const comparePassword = async (password, hashedPassword) => {
//     try {
//         const isMatch = await bcrypt.compare(password, hashedPassword)
//         return isMatch
//     } catch (error) {
//         console.error('Error al cmoparar password, model:', error)
//         throw error
//     }
// }

// // Registro de Usuarios
// const registerUser = async ({ nombres, apellidoPaterno, apellidoMaterno, email, pass, telefono, isTrabajador }) => {
//     try {
//         const [result] = await dbConnection.query(
//             'INSERT INTO usuarios (nombres, apellidoPaterno, apellidoMaterno, email, pass, telefono, isTrabajador) VALUES (?, ?, ?, ?, ?, ?, ?)',
//             [nombres, apellidoPaterno, apellidoMaterno, email, pass, telefono, isTrabajador]
//         )
//         return result
//     } catch (error) {
//         console.error('Error al registrar nuevo usuario, model:', error)
//         throw error
//     }
// }

// // Buscar usuario por username v:
// const findUsername = async (username) => { // TODO: arreglar
//     try {
//         const [rows] = await dbConnection.query(
//             'SELECT * FROM usuarios WHERE username = ?',
//             [username]
//         )
//         return rows[0]
//     } catch (error) {
//         console.error('Error al obtener usuario, model:', error)
//         throw error
//     }
// }

// // Buscar usuario por correo
// const findEmail = async (email) => {
//     try {
//         const [rows] = await dbConnection.query(
//             'SELECT ID, email, pass FROM usuarios WHERE email = ?',
//             [email]
//         )
//         return rows[0]
//     } catch (error) {
//         console.error('Error al obtener correo, model:', error)
//         throw error
//     }
// }

// const getAllInfoUser = async (email) => {
//     try {
//         const [rows] = await dbConnection.query(
//             'SELECT * FROM usuarios WHERE email = ?',
//             [email]
//         )
//         return rows[0]
//     } catch (error) {
//         console.error('Error al obtener informacion de usuario, model:', error)
//         throw error
//     }
// }

// module.exports = { hashPassword, comparePassword, registerUser, findEmail, findUsername, getAllInfoUser }
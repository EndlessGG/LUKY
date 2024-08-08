const dbConnection = require('../../config/database')
const bcrypt = require('bcrypt')

class User {
    constructor(nombres, apellidoPaterno, apellidoMaterno, email, pass, googleId) {
        this.nombres = nombres
        this.apellidoPaterno = apellidoPaterno
        this.apellidoMaterno = apellidoMaterno
        this.email = email
        this.pass = pass
        this.googleId = googleId
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
            console.error('Error al comparar password, model:', error)
            throw error
        }
    }

    async registerUser() {
        try {
            const [result] = await dbConnection.query(
                'INSERT INTO usuarios (nombres, apellidoPaterno, apellidoMaterno, email, pass, googleId) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    this.nombres,
                    this.apellidoPaterno,
                    this.apellidoMaterno,
                    this.email,
                    this.pass,
                    this.googleId
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
                'SELECT ID, email, pass, googleId FROM usuarios WHERE email = ?',
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

    static async findOrCreateGoogleUser(profile) {
        try {
            const [rows] = await dbConnection.query(
                'SELECT * FROM usuarios WHERE googleId = ?',
                [profile.id]
            );
            if (rows.length > 0) {
                return rows[0];
            } else {
                const [result] = await dbConnection.query(
                    'INSERT INTO usuarios (nombres, email, googleId) VALUES (?, ?, ?)',
                    [profile.displayName, profile.emails[0].value, profile.id]
                );
                const [newUser] = await dbConnection.query(
                    'SELECT * FROM usuarios WHERE ID = ?',
                    [result.insertId]
                );
                return newUser[0];
            }
        } catch (error) {
            console.error('Error al encontrar o crear usuario de Google, model:', error);
            throw error;
        }
    }
}

module.exports = User;

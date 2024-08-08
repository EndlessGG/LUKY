const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
const frontendRoutes = require('./app/routes/front.routes')
const postRoutes = require('./app/routes/post.routes')
const dbConnection = require('./config/database')
const authRoutes = require('./app/routes/auth.routes')
const cookieParser = require('cookie-parser')
const sessionMiddleware = require('./app/middlewares/sessionMiddleware')
const jwt = require('jsonwebtoken')
const searchRoutes = require('./app/routes/search.routes')
const session = require('express-session');
const passport = require('./config/passportConfig');
const AuthController = require('./app/Controllers/Auth/authController');

const PORT = process.env.PORT || 3000

//motor de vistas ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'resources/views'))
app.use(express.static(path.join(__dirname, 'resources/public'))) // archivos estaticos

//middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) // para los formularios y mas
app.use(cookieParser())
app.use(sessionMiddleware)


//endpoints
app.use('/', frontendRoutes) // rutas de paginas y renderizar las vistas de leo
app.use('/auth', authRoutes) // para las peticiones de autenticacion
app.use('/post', postRoutes) // para las peticiones de autenticacion
app.use('/search', searchRoutes)

// Ruta para iniciar la autenticación con Google
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

// Ruta para manejar el callback de Google
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), AuthController.googleAuthCallbackRedirect);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
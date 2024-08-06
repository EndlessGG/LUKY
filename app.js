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


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
const frontendRoutes = require('./app/routes/front.routes')
const dbConnection = require('./config/database')

const PORT = process.env.PORT || 3000


//motor de vistas ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'resources/views'))
app.use(express.static(path.join(__dirname, 'resources/public'))) // archivos estaticos


//middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false })) // para los formularios y mas

//endpoints
app.use('/', frontendRoutes) // rutas de paginas


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
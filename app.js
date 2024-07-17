const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const frontendRoutes = require('./app/routes/front.routes');
const authRoutes = require('./app/routes/auth.routes')
const cookieParser = require('cookie-parser')
const sessionMiddleware = require('./app/middlewares/sessionMiddleware')
const jwt = require('jsonwebtoken')


const PORT = process.env.PORT || 3000;

// Motor de vistas ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.static(path.join(__dirname, 'resources/public'))); // Archivos estáticos

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); // Para los formularios y más
app.use(cookieParser())
app.use(sessionMiddleware)

// Endpoints
app.use('/', frontendRoutes); // Rutas de páginas
app.use('/auth', authRoutes)

// Ruta para la página de inicio de sesión
app.get('/formulario', (req, res) => {
    res.render('formulario'); // Renderiza la vista 'formulario.ejs'
});

const publicaciones = [
    {
        ID: 1,
        tituloP: "Informatica",
        fecha: "2024-07-15",
        descripcion: "Descripción del servicio de informática.",
        precioI: 100.0,
        precioF: 120.0,
        categoriaId: "Informatica",
        usuarioId: 1,
        valoracion: 4.5
    },
    {
        ID: 2,
        tituloP: "Jardinería",
        fecha: "2024-07-16",
        descripcion: "Descripción del servicio de jardinería.",
        precioI: 200.0,
        precioF: 220.0,
        categoriaId: 3,
        usuarioId: 2,
        valoracion: 4.0
    },
    {
        ID: 3,
        tituloP: "Todo tipo de limpieza a tus dispositivos",
        fecha: "2024-07-17",
        descripcion: "Descripción del servicio avanzado de informática.",
        precioI: 150.0,
        precioF: 170.0,
        categoriaId: "Informatica",
        usuarioId: 3,
        valoracion: 5.0
    }
];

// Endpoint para obtener las publicaciones
app.get('/publicaciones', (req, res) => {
    res.json(publicaciones);
});

// Endpoint para buscar publicaciones por título
app.get('/buscar', (req, res) => {
    const tituloP = req.query.tituloP.toLowerCase();
    const publicacionesFiltradas = publicaciones.filter(pub =>
        pub.tituloP.toLowerCase().includes(tituloP)
    );
    res.json(publicacionesFiltradas);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

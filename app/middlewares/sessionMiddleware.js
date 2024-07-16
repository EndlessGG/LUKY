const session = require('express-session')

const sessionMiddleware = session({
    secret: process.env.NODE_ENV,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        expires: false 
    }
})

module.exports = sessionMiddleware
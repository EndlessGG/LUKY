const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../app/Models/user')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
async function(token, tokenSecret, profile, done) {
  try {
    const user = await User.findOrCreateGoogleUser(profile);
    return done(null, user);
  } catch (error) {
    console.error('Error en la estrategia de Google, passport:', error);
    return done(error, null);
  }
}));

// Serializar el usuario
passport.serializeUser((user, done) => {
  done(null, user.ID);
});

// Deserializar el usuario
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findUserById(id);
    done(null, user);
  } catch (error) {
    console.error('Error al deserializar usuario, passport:', error);
    done(error, null);
  }
});

module.exports = passport;

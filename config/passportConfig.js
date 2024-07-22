const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: '511500625217-ht7k0an490uqk9np79g7f3698ue3stnn.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
function(token, tokenSecret, profile, done) {
  // Aquí puedes guardar el perfil del usuario en tu base de datos
  return done(null, profile);
}));

// Serializar el usuario
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserializar el usuario
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '1009253074391-v1vikqme5euagepgddnasta6mgtf3btv.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://172.16.234.140:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // need to complete with database tables 
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, id);
});
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '1009253074391-v1vikqme5euagepgddnasta6mgtf3btv.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://378e-38-27-115-22.ngrok-free.app/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('Google profile:', profile); 
    return done(null, profile); 
  }));
   
  passport.serializeUser((user, done) => {
    console.log('Serializing user:', user.id); // Debug
    done(null, user.id); // Store only the ID
  });
  
  passport.deserializeUser((id, done) => {
    console.log('Deserializing user ID:', id); // Debug
    // Simulate retrieving the full user object
    const mockUser = { id, displayName: 'Test User' }; // Replace with real DB lookup if needed
    done(null, mockUser);
  });
  
  module.exports = passport;
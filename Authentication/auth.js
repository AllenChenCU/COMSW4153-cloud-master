const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./db');

passport.use(
  new GoogleStrategy(
    {
      clientID: '1009253074391-v1vikqme5euagepgddnasta6mgtf3btv.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://accessnyc.ngrok-free.app/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Google profile:', profile);

      try {
        // Check if user exists in the database
        const [results] = await pool.query('SELECT * FROM users WHERE provider_id = ?', [profile.id]);

        if (results.length > 0) {
          // User exists
          return done(null, results[0]);
        } else {
          // User does not exist, insert into database
          const newUser = {
            provider_id: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            username: profile.displayName || `user_${profile.id}`,
          };

          await pool.query(
            'INSERT INTO users (provider_id, displayName, email) VALUES (?, ?, ?)',
            [newUser.provider_id, newUser.displayName, newUser.email]
          );

          console.log('New user inserted:', newUser);
          return done(null, newUser);
        }
      } catch (err) {
        console.error('Database error:', err);
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.provider_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [results] = await pool.query('SELECT * FROM users WHERE provider_id = ?', [id]);
    if (results.length > 0) {
      done(null, results[0]);
    } else {
      done(null, false);
    }
  } catch (err) {
    console.error('Error deserializing user:', err);
    done(err);
  }
});

module.exports = passport;
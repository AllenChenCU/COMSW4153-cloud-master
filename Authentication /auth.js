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
    (accessToken, refreshToken, profile, done) => {
      console.log('Google profile:', profile);

      // Check if user exists in the database
      pool.query(
        'SELECT * FROM users WHERE provider_id = ?',
        [profile.id],
        (fetchErr, results) => {
          if (fetchErr) {
            console.error('Error fetching user:', fetchErr);
            return done(fetchErr);
          }

          if (results.length > 0) {
            // User exists
            return done(null, results[0]);
          } else {
            // User does not exist, insert into database
            const newUser = {
              provider_id: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              username: profile.displayName ||`user_${profile.id}`
            };

            pool.query(
              'INSERT INTO users (provider_id, displayName, email) VALUES (?, ?, ?)',
              [newUser.provider_id, newUser.displayName, newUser.email],
              (insertErr, insertResults) => {
                if (insertErr) {
                  console.error('Error inserting new user:', insertErr);
                  return done(insertErr);
                }

                console.log('New user inserted:', newUser);
                return done(null, newUser);
              }
            );
          }
        }
      );
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.provider_id);
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  pool.query('SELECT * FROM users WHERE provider_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deserializing user:', err);
      return done(err);
    }
    if (results.length > 0) {
      done(null, results[0]);
    } else {
      done(null, false);
    }
  });
});

module.exports = passport;
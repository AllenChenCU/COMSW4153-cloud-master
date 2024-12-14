const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
let jwtSecret = process.env.JWT_SECRET;
const clientID = process.env.CLIENT_ID;

const clientSecret = process.env.CLIENT_SECRET;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./db');
const jwt = require('jsonwebtoken');


passport.use(
  new GoogleStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: 'https://access-nyc-437301-k9.ue.r.appspot.com/auth/google/callback' // 'http://localhost:8080/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Google profile:', profile);

      try {
        // Check if user exists in the database
        const [results] = await pool.query('SELECT * FROM users WHERE provider_id = ?', [profile.id]);

        if (results.length > 0) {
          // User exists
          const user = results[0];
          const token = jwt.sign( { id: user.provider_id, email: user.email, displayName: user.displayName }, jwtSecret, { expiresIn: '7d' });
          return done(null, { ...user, token });
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

          const token = jwt.sign( { id: newUser.provider_id, email: newUser.email, displayName: newUser.displayName }, jwtSecret , { expiresIn: '7d' });
          return done(null, { ...newUser, token });
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
      const user = results[0];
      const token = jwt.sign({ id: user.provider_id, email: user.email, displayName: user.displayName }, jwtSecret, { expiresIn: '7d' });
      done(null, { ...user, token });
    } else {
      done(null, false);
    }
  } catch (err) {
    console.error('Error deserializing user:', err);
    done(err);
  }
});

module.exports = passport;
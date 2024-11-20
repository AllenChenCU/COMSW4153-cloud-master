
const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('./auth');  

const app = express();
app.use(express.static('public'));


app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  (req, res, next) => {
    console.log('Google callback route hit');
    next();
  },
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authentication successful, user:', req.user);
    res.redirect('/profile');
  }
);


app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.send(`Hello ${req.user.displayName}, your email is ${req.user.emails[0].value}`);
});


app.listen(8080, 'localhost', () => {
  console.log('Server running on http://localhost:8080');
});
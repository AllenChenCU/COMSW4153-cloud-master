const express = require('express');
const session = require('express-session');
const passport = require('./auth'); // Import Passport configuration
const path = require('path');

const app = express();

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/auth/google', (req, res, next) => {
  console.log('Auth route triggered');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authenticated user:', req.user);
    res.redirect('/login'); 
  }
);

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({
    id: req.user.id,
    displayName: req.user.displayName,
    email: req.user.email,
  });
});


app.use(express.static(path.resolve(__dirname, '../UI_repo/landing-page/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../UI_repo/landing-page/build', 'index.html'));
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
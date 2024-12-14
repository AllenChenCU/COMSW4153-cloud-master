const express = require('express');
const session = require('express-session');
const passport = require('./auth'); // Import Passport configuration
const path = require('path');

const app = express();

// Serve static files from the React app's build directory
app.use(express.static('/Users/dede/Desktop/AccessNYC Website/COMSW4153-cloud-master/UI_repo/landing-page/build'));

// Catch-all handler for any requests not matched by other routes
app.get('*', (req, res) => {
  res.sendFile(path.join('/Users/dede/Desktop/AccessNYC Website/COMSW4153-cloud-master/UI_repo/landing-page/build', 'index.html'));
});

// Middleware
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/login'); // Ensure this matches the React route
  }
);

app.get('/logout', (req, res) =>{
  req.logout((err) => {
    if(err){
      return res.status(500).json({error: 'Failed to log out.'});
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json(req.user);
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
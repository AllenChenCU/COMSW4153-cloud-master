const express = require('express');
const session = require('express-session');
const passport = require('./auth'); 
const path = require('path');
const jwtSecret = process.env.JWT_SECRET;
const { createProxyMiddleware } = require('http-proxy-middleware');
const { exec } = require('child_process');
const cors = require('cors');


const app = express();
const PORT = 8080; 

app.use(cors({
  origin: '*',  // You can replace '*' with specific origins for added security
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/auth/google', (req, res, next) => {
  // console.log('Auth route triggered');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});


app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // console.log('Authenticated user:', req.user);
    res.redirect('/oauth/callback');
  },
  (err, req, res, next) => {
    if (err) {
      console.error('Error during authentication:', err);
      res.redirect('/');
    }
    next();
  }
);

app.get('/logout', (req, res) =>{
  req.logout((err) => {
    if(err){
      return res.status(500).json({error: 'Failed to log out.'});
    }
    res.redirect('/');
  });
});


app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // console.log('Authenticated user:', req.user);
  res.json({
    id: req.user.id,
    displayName: req.user.displayName,
    email: req.user.email,
    token: req.user.token
  }
);
});


app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// changed 
if (process.env.NODE_ENV === 'development') {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
} else {
  app.use(express.static(path.resolve(__dirname, '../UI_repo/landing-page/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../UI_repo/landing-page/build', 'index.html'));
  });
}

exec('cd ../UI_repo/landing-page && npm run build', (err, stdout, stderr) => {
  if (err) {
    console.error('Error rebuilding the project:', stderr);
    return;
  }
  console.log('Frontend rebuilt successfully:', stdout);
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});

module.exports = app;

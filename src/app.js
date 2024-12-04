const express = require('express');
const path = require('path');
const app = express();

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
      "default-src 'self'; " +
      "script-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net 'unsafe-inline'; " +
      "style-src 'self' https://cdnjs.cloudflare.com; " +
      "img-src 'self' data:; " +
      "connect-src 'self';"
    );
    next();
  });

//middleware to set the Content-Security-Policy header
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff'); // Enforces correct MIME type handling
    next();
  });

  app.use('/styles', express.static(path.join(__dirname, '..', 'public', 'styles'), { setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }}));

  app.use('/scripts', express.static(path.join(__dirname, '..', 'public', 'scripts'), { setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }}));

//example middleware
app.use(express.static(path.join(__dirname, 'public')));

// define a simple route for testing
app.get('/', (req, res) => {
    console.log('home route hit');
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/3D-garden', (req, res) => {
    console.log('3D garden route hit');
    res.sendFile(path.join(__dirname, '..', 'public', '3D_garden.html'));
});

// define a route for the getting weather data from a user input of their zip code
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/api/weather', weatherRoutes);



module.exports = app;
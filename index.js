// server.js
const express = require('express');
const path = require('path');
const app = express();
const initiatives = require('./data/initiatives.json');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});
// Routes
app.get('/', (req, res) => {
  res.render('index', { title: "Home" });
});

app.get('/about', (req, res) => {
  res.render('about', { title: "About Us" });
});
app.get('/services', (req, res) => {
  // console.log("Initiatives:", initiatives)
  res.render('service', { title: "Our Initiatives", initiatives });
});
app.get('/projects', (req, res) => {
  res.render('project', { title: "Our Projects" });
});
app.get('/feature', (req, res) => {
  res.render('feature', { title: "Features" });
});
app.get('/quote', (req, res) => {
  res.render('quote', { title: "Get a quote" });
});
app.get('/team', (req, res) => {
  res.render('team', { title: "Our Team" });
});
app.get('/testimonial', (req, res) => {
  res.render('team', { title: "Testimonial" });
});
app.get('/404', (req, res) => {
  res.render('404', { title: "404" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// server.js
const express = require('express');
const path = require('path');
const app = express();
const initiatives = require('./data/initiatives.json');
const projects = require('./data/projects.json')
const faqs = require('./data/faqs.json')
const { Job, OurTeam, ContactUs, Application, OurPartners, MembershipRequest, Publication, Newsletter, AnnualReports, ShortCourseApplication } = require("./models");
require("dotenv").config();

var adminRouter = require('./routes/admin')
const { sequelize } = require("./models");
// sequelize.sync().then(() => console.log("✅ DB Synced"));
sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ DB Synced with Alter"));
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ DB Connected");
  })
  .catch((err) => {
    console.error("❌ DB Connection Error: ", err);
  });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

//admin routes 
app.use("/admin", adminRouter);
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
  res.render('project', { title: "Our Projects", projects });
});
app.get('/feature', (req, res) => {
  res.render('feature', { title: "Features" });
});
app.get('/quote', (req, res) => {
  res.render('quote', { title: "Get a quote" });
});
app.get('/team', async (req, res) => {
  try {
    const team = await OurTeam.findAll({ raw: true });
    res.render("team", {
      title: "Our Team",
      team
    });
  } catch (error) {
    console.error("Failed to load team:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/partnership', async (req, res) => {
  try {
    const partners = await OurPartners.findAll({ raw: true });
    console.log('partners', partners)
    res.render('partnership', { title: "Partnership", partners });


  } catch (error) {

  }

});
app.get('/faqs', (req, res) => {
  // console.log("Faqs:", faqs)
  res.render('faqs', { title: "FAQS", faqs });
});
app.get('/testimonial', (req, res) => {
  res.render('team', { title: "Testimonial" });
});
app.get('/contact', (req, res) => {
  res.render('contact', { title: "Contact Us" });
});
app.get('/404', (req, res) => {
  res.render('404', { title: "404" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

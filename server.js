const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

// Register Partial
hbs.registerPartials(__dirname + '/views/partials');

var app = express();

//var router = express.Router;

// Set View Engine
app.set('view-engine', 'hbs');

// Middleware to Log Info
app.use((req, res, next) => {
    var timestamp = new Date().toString();
    var logger = `${timestamp}: ${req.method} ${req.url}`;

    console.log(logger);

    fs.appendFile('server.log', logger + '\n', (err) => {
      if (err) {
        console.log("Cannot find system log file" + err);
      }
    });

    next();
});

// Middleware - Maintenance Page
// app.use((req, res, next) => {
//     res.render("maintenance.hbs");
// });

// Middleware - Static User Accessable Directory
app.use(express.static(__dirname + '/public'));

// Register Helper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => res.redirect('/home'));

app.get('/home', (req, res) => {
 res.render("home.hbs", {
   title: "Home Page"
 }); 
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        title: 'About Page'
    }); 
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to process URL'
    });
});

app.listen(5000, () => {
  console.log(`Server is up on port: ${port}`);
});

module.exports = app;
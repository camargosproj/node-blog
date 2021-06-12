const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

//Express app
const  app = express(); 

//Connect to mongoDB
const dbURL = 'mongodb+srv://nodeninja:28051414@ninjatuts.byonp.mongodb.net/NinjaTuts?retryWrites=true&w=majority';

mongoose.connect(dbURL, { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then((result) =>  app.listen(3000))
    .catch((err) => console.log('An error ocurred', err));

// Register view engine
app.set('view engine', 'ejs');

//Middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev')); //Do not forget to check it later 
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

app.use(blogRoutes);

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { title: '404'});
});




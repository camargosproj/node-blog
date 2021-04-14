const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blog = require('./models/blog');


//Express app
const  app = express(); 

//Connect to mongoDB
const dbURL = 'mongodb+srv://nodeninja:28051414@ninjatuts.byonp.mongodb.net/NinjaTuts?retryWrites=true&w=majority';

mongoose.connect(dbURL, { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then((result) =>  app.listen(3000))
    .catch((err) => console.log('An error ocurred', err));


// Register view engine
app.set('view engine', 'ejs');

//Listen for requests

//Middleware and static files
app.use(express.static('public'));

app.use(morgan('dev'));

//Listen for requests



//mongoose and mongo sandbox routes
app.get('/addblog', (req, res) => {
        blog = new Blog({
        title: 'First blog',
        snippet: 'about my new blog',
        body: 'This is just my first blog'
    });
    res.render('models/blog', { blog: blog });
    /*
    This's the part of the code that isnt working 
    blog.save()
       .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log('An error ocurred');
        });*/
});

app.get('/', (req, res) => {
    const blogs = [
        {title: "Lorem ipsum", snippet: "Lorem ipsum ipsum ipsum"},
        {title: "Lorem ipsum", snippet: "loger helpa ipsum ipsum"},
        {title: "Jack Viatam", snippet: "Lorem ipsum ipsum ipsum"},
    ];
    res.render('index', { title: 'Home', blogs});
});


app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});

});
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'New Blog'});
});


// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});
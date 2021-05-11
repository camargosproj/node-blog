const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


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
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

//Listen for requests



//mongoose and mongo sandbox routes
app.get('/addblog', (req, res) => {
        const blog = new Blog({
        title: 'Another blog',
        snippet: 'about my new blog',
        body: 'This is just my first blog'
    });
    blog.save()
       .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log('An error ocurred');
        });
});
app.get("/all-blogs", (req, res) =>{
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/single-blog", (req, res) =>{
    Blog.findById('6078e46091024748c4cf5e72')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});
//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// All blogs routes

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index', {title : 'All Blogs', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/blogs', (req, res) =>{
    const blog = Blog(req.body);
    blog.save()
        .then(() =>{
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err);

        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'New Blog'});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});

});



// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});
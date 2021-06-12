const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController')

//routes/*/
router.get('/', blogController.blog_index);
//Get requests
router.get('/create', blogController.blog_create_get);
router.get('/about', (req, res) => {
    res.render('about', { title: 'About'});

});
router.get("/:id", blogController.blog_details);
//Post Requests
router.post('/blogs', blogController.blog_create_post);
//Delete Requests
router.delete("/:id", blogController.blog_delete)


module.exports = router;
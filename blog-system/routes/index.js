require('../lib/db');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.username = req.session.name;
    res.locals.authenticated = req.session.logined;
    Blog.find(function(err, blogs, count) {
        res.render('index', {
            title: '知點--給我一個知點，我可以撐起全宇宙！',
            blogs: blogs
        });
    });
});

module.exports = router;

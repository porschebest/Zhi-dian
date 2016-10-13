require('../lib/db');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var Comment = mongoose.model('Comment');
var bodyParser = require('body-parser');


/*  使用者刪除文章功能  */
router.get('/delete/:id', function(req, res, next) {
    console.log('connect');
    Blog.remove({
        _id: req.params.id
    }, function(err) {
        if (err) {
            console.log('Failed to delete article.');
        }
        console.log('Done.');
    });
    res.redirect('/users/profile');
});

/* 登入會員 */
router.post('/login', function(req, res, next) {
    if ((!req.body.user) || (!req.body.passwd)) {
        res.redirect('/users/register');
        return;
    }
    req.session.name = req.body.user;
    req.session.passwd = req.body.passwd;
    req.session.logined = true;
    res.redirect('/');
});

/* 使用者新增文章 */
router.post('/add', function(req, res, next) {
    if (!req.session.name) {
        res.redirect('/');
        return;
    }
    new Blog({
        Username: req.session.name,
        Title:req.body.Title,
        Article: req.body.Content,
        Tags:req.body.Tags,
        CreateDate: req.body.Date
    }).save(function(err) {
        if (err) {
            console.log('Failed to save to DB');
            return;
        }
        console.log('Save to DB');

    });
    res.redirect('/');
});

/* 使用者更新文章 */
router.post('/update/:id', function(req, res, next) {
    if (!req.params.id) {
        res.redirect('/');
        return;
    }
    Blog.update({
        _id: req.params.id
    }, {
        Title:req.body.Title,
        Article: req.body.Content,
        Tags:req.body.Tags,
        CreateDate: req.body.Date
    }, function(err) {
        if (err) {
            console.log('Failed to update article!');
        } else {
            console.log('Done');
        }
    });
    res.redirect('/users/profile');
});

/* 使用者留言 */
router.post('/comment/:id', function(req, res, next) {
    if (!req.params.id) {
        res.redirect('/');
        return;
    }
    new Comment({
        Visitor: req.body.Visitor,
        Comment: req.body.Comment,
        MessageID: req.params.id,
        CreateDate: Date.now()
    }).save(function(err) {
        if (err) {
            console.log('Failed to save to DB');
            return;
        }
        console.log('Save to DB');
    });
    res.redirect('/users/message/' + req.params.id);
});

module.exports = router;

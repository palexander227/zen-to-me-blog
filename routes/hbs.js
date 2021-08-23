const router = require('express').Router();
const handleGetPosts = require('../controllers/handleGetPosts');

router.get('/', (req, res) => {
    
        res.render("home");
})

router.get('/signup', (req, res) => {
    res.render('layouts/signup', { sessionFlash: res.locals.sessionFlash });

})

router.get('/login', (req, res) => {
    res.render('layouts/login', { sessionFlash: res.locals.sessionFlash });

})

router.get('/home', (req, res) => { 
    sess = req.session
    handleGetPosts().then(
        (p ) => {
            const posts = JSON.parse(JSON.stringify(p))
            
            res.render("layouts/home", {user: sess.user, posts})
        }).catch(err => {
            console.log(`getting all posts failed with ${err}`);
            req.session.sessionFlash = {
                type: 'error_message',
                message: ` ERROR: ${err}`
            }
            
            res.render("layouts/home", {user: sess.user})
        })
})

router.get('/my-blogs', (req, res) => { 
    sess = req.session
    handleGetPosts(sess.user).then(
        (p ) => {
            const posts = JSON.parse(JSON.stringify(p))
            
            res.render("layouts/home", {user: sess.user, posts})
        }).catch(err => {
            console.log(`getting all posts failed with ${err}`);
            req.session.sessionFlash = {
                type: 'error_message',
                message: ` ERROR: ${err}`
            }
            
            res.render("layouts/home", {user: sess.user})
        })
})

router.get('/published-posts', (req, res) => {
    sess = req.session
    handleGetPosts(sess.user).then(
        (p ) => {
            const posts = JSON.parse(JSON.stringify(p))
            
            res.render("layouts/publishedPosts", {user: sess.user, posts})
        }).catch(err => {
            console.log(`Trying to get posts for individual user failed' ${err}`);
            req.session.sessionFlash = {
                type: 'error_message',
                message: ` ERROR: ${err}`
            }
            res.render("layouts/publishedPosts", {user: sess.user})
        })
})

router.get('/new-post', (req, res) => { sess = req.session
    console.log(req.session.user)
    res.render("layouts/newPost", {user: sess.user})
})


module.exports=router
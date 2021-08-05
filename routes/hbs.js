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

router.get('/welcome', (req, res) => { 
    sess = req.session
    handleGetPosts().then(
        (p ) => {
            const posts = JSON.parse(JSON.stringify(p))
            console.dir(posts)
            console.log('hello')
            res.render("layouts/welcome", {user: sess.user, posts})
        }).catch(err => {
            console.log(`getting all posts failed with ${err}`);
            req.session.sessionFlash = {
                type: 'error_message',
                message: ` ERROR: ${err}`
            }
            console.log('bye')
            res.render("layouts/welcome", {user: sess.user})
        })
})

router.get('/published-posts', (req, res) => { sess = req.session
    res.render("layouts/publishedPosts", {user: sess.user})
})

router.get('/new-post', (req, res) => { sess = req.session
    console.log(req.session.user)
    res.render("layouts/newPost", {user: sess.user})
})


module.exports=router
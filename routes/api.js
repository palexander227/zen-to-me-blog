const router = require('express').Router();
const flash = require('express-flash')
const handleRegister = require('../controllers/handleRegister');
const handleLogin = require('../controllers/handleLogin');
const handlePublish = require('../controllers/handlePublish')
const handleGetPosts = require('../controllers/handleGetPosts');
const handleInit = require('../controllers/handleInit');


router.post('/register', (req, res) => {
    handleInit()
    handleRegister(req.body.username, req.body.password)
    .then(()=>{
        console.log('api/register | User registered successfully! Redirecting to login.')
        
        res.redirect('/login')

    }).catch(err => {
        console.log(`api/register | User registration failed!${err}`)
        // req.flash('registration_error', ` ERROR: ${err}`)
        req.session.sessionFlash = {
            type: 'error_message',
            message: ` ERROR: ${err}`
        }
        // res.render('layouts/signup', { sessionFlash: res.locals.sessionFlash });
        res.redirect(301, '/signup')
    })
})

router.post('/authorize', (req, res) => {
    handleLogin(req.body.username, req.body.password)
    .then(()=>{
        console.log('api/login | User logged in successfully! Redirecting to home.')
        sess = req.session
        sess.user = req.body.username
        res.redirect('/home')

    }).catch(err => {
        console.log(`api/login | User login failed!${err}`)
        // req.flash('registration_error', ` ERROR: ${err}`)
        req.session.sessionFlash = {
            type: 'error_message',
            message: ` ERROR: ${err}`
        }
        // res.render('layouts/signup', { sessionFlash: res.locals.sessionFlash });
        res.redirect(301, '/login')
    })
})


router.all('/logout', (req, res) => {
    delete req.session.user
    res.redirect('/home')
})

router.post('/create-post', (req, res) => {
    console.log(req.session.user)
    handlePublish(req.body.title, req.body.content, req.session.user)
    .then(()=>{
        console.log('api/create-post | Post created successfully! Redirecting to profile.')
        
        res.redirect('/published-posts')

    }).catch(err => {
        console.log(`api/create-post | Publish failed!${err}`)
        // req.flash('registration_error', ` ERROR: ${err}`)
        req.session.sessionFlash = {
            type: 'error_message',
            message: ` ERROR: ${err}`
        }
        // res.render('layouts/signup', { sessionFlash: res.locals.sessionFlash });
        res.redirect(301, '/new-post')
    })
})

router.get('/post', (req, res) => {
    handleInit()
    console.log('running handleInit')
    handleGetPosts().then(
        (posts ) => {
            res.json(posts);
        }).catch(err => {
            console.log(`getting all posts failed with ${err}`);
            req.session.sessionFlash = {
                type: 'error_message',
                message: ` ERROR: ${err}`
            }
            res.status(500);
        })
})



module.exports=router
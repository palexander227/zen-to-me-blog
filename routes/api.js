const router = require('express').Router();
const flash = require('express-flash')
const handleRegister = require('../controllers/handleRegister');
const handleLogin = require('../controllers/handleLogin');


router.post('/register', (req, res) => {
    
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
        console.log('api/login | User logged in successfully! Redirecting to welcome.')
        sess = req.session
        sess.user = req.body.username
        res.redirect('/welcome')

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
    res.redirect('/welcome')
})

router.post('/create-post', (req, res) => {
    
    handlePublish(req.body.title, req.body.tags, req.body.content)
    .then(()=>{
        console.log('api/create-post | Post created successfully! Redirecting to profile.')
        
        res.redirect('/profile')

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



module.exports=router
const router = require('express').Router();
const flash = require('express-flash')
const handleRegister = require('../controllers/handleRegister');
router.post('/register', (req, res) => {
    sess = req.session
    sess.user = req.body.username
    handleRegister(req.body.username, req.body.password)
    .then(()=>{
        console.log('api/register | User registered successfully! Redirecting to welcome.')
        
        res.redirect('/welcome')

    }).catch(err => {
        console.log(`api/register | User registration failed!${err}`)
        // req.flash('registration_error', ` ERROR: ${err}`)
        req.session.sessionFlash = {
            type: 'success',
            message: 'This is a flash message using custom middleware and express-session.'
        }
        // res.render('layouts/signup', { sessionFlash: res.locals.sessionFlash });
        res.redirect(301, '/signup')
    })
}) 

module.exports=router
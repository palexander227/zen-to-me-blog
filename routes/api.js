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
        req.flash('error', 'the error message')
    })
}) 

module.exports=router
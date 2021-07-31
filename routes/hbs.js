const router = require('express').Router();

router.get('/', (req, res) => {
    res.render("home")
})

router.get('/signup', (req, res) => {
    res.render("layouts/signup")
})

router.get('/welcome', (req, res) => { sess = req.session
    res.render("layouts/welcome", {user: sess.user})
})

module.exports=router
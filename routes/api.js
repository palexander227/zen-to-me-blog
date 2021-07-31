const router = require('express').Router();

router.post('/register', (req, res) => {
    sess = req.session
    sess.user = req.body.username
    res.redirect('/welcome')
}) 

module.exports=router
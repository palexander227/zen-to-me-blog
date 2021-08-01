const {User} = require('../models')

const handleLogin = (given_username, given_password) => {
    return new Promise((res, rej) => {
        console.log(`cntr/handleLogin | received: ${given_username} with ${given_password}`)

        //check if the username and password are not blank and at least n characters long
        if(!given_username){return rej('The username cannot be blank')}
        if(!given_password){return rej('The password cannot be blank')}

        // check to see if passwords match
        User.findOne({
            where: {user_name: given_username}
        })
        .then(user => {
            user.dataValues.password === given_password ? res() : rej('Either the user name or password does not match.')
            
        })
        .catch((err) => {return rej(`Error: ${err}`)})


    })
}

module.exports = handleLogin; 
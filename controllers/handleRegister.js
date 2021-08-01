const {User} = require('../models')

const handleRegister = (given_username, given_password) => {
    return new Promise((res, rej) => {
        console.log(`cntr/handleRegister | received: ${given_username} with ${given_password}`)
        
        //check if the username and password are not blank and at least n characters long
        if(!given_username || given_username ===''){return rej('The username cannot be blank'); }
        if(!given_password || given_password ===''){return rej('The password cannot be blank'); }
        if(given_password.length < 4){return rej('The password must be at least 4 characters'); }
        if(given_username.length < 4){return rej('The username must be at least 4 characters'); }

        
        //check to see if this username exists
        User.findAll()
        .then(user_list => {
            user_list.map(this_user => {
                if(this_user.user_name === given_username){return rej('This username already exists.')}
            })
        })


        // Create the user if tests pass.
        User.create({
            user_name: given_username,
            password: given_password
        })
    .then((user) => {
      res()
    })
    .catch(err => {
        rej(err)
    })





    })
}

module.exports = handleRegister; 
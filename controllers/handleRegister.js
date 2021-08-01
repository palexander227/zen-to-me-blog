const {User} = require('../models')

const handleRegister = (given_username, given_password) => {
    return new Promise((res, rej) => {
        console.log(`cntr/handleRegister | received: ${given_username} with ${given_password}`)
        //check to see if this username exists
        User.findAll()
        .then(user_list => {
            user_list.map(this_user => {
                if(this_user.user_name === given_username){rej('This username already exists.')}
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
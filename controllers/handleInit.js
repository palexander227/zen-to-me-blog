const {  User } = require('../models');
const handleInit = async () => {
    
        //lookup to see if the user_name is in the data base
            User.findOne()
            .then(() => {console.log('database exists')})
            .catch((err) => {
                if(err.includes(".user_model' doesn't exist")){
                    console.log("model does not exist, run init")
                }
            })
            
        }     
        

module.exports = handleInit;
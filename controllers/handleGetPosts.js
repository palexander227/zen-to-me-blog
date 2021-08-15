const { Post, User } = require('../models');
const handleGetPosts = async (user_name) => {
    if(user_name){
        //lookup to see if the user_name is in the data base
            const user = await User.findOne({where: {user_name}});
            if(!user){
                throw new Error('User does not exist. Cannot find posts.');
            }
            const posts = await Post.findAll({where: {user_name}}); 
            return posts;  
        }else{
        const posts = await Post.findAll();
        return posts;
    }
}

module.exports = handleGetPosts;
const { Post, User } = require('../models')
// need to create new model and seed file
const handlePublish = async (title, content, user_name) => {
    //check if the title and content are not blank and at least n characters long
    if(!title || title ===''){ throw new Error('The title cannot be blank'); }
    if(!content || content ===''){ throw new Error('The content cannot be blank'); }
    if(title.length < 3){throw new Error('The title must be at least 3 characters'); }
    if(content.length < 4){throw new Error('The content must be at least 4 characters'); }
    
    //check to see if this username exists
    const user = await User.findOne({
        where:{
            user_name: user_name
        }
    })

    if(!user ){ throw new Error('User is required to create a post.')}
   
    // Create the post if tests pass.
    const post = await Post.create({
        title,
        content,
        user_name,
    })

    return post
}


module.exports = handlePublish; 
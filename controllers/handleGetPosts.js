const { Post } = require('../models');
const handleGetPosts = async () => {
    const posts = await Post.findAll();
    return posts;
}

module.exports = handleGetPosts;
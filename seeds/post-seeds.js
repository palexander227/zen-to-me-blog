const { Post } = require('../models');


const postData = [
  {
    id: 1,
    title: "A Blogpost",
    content: "Some content",
    user_name: "A user",
  }]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;

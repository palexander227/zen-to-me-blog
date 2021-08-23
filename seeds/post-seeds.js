const { Post } = require('../models');


const postData = [
  {
    title: "A Blogpost",
    content: "Some content",
    user_name: "peter",
  }]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;

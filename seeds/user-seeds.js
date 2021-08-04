const { User } = require('../models');

const userData = [
  {
    user_name: 'ThinkingAllowed',
    password: 'password',
  }
  
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

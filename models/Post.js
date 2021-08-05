 // import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const User = require('./User.js')

// Initialize Product model (table) by extending off Sequelize's Model class
class Post extends Model {}

// set up fields and rules for Product model
Post.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
     
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post_model',
  }
);

Post.belongsTo(User, {
  foreignKey: {
    name: 'user_name',
    allowNull: false
  }
})





module.exports = Post;

           
            

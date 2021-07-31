// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
// const Category = require('./Category.js')

// Initialize Product model (table) by extending off Sequelize's Model class
class User extends Model {}

// set up fields and rules for Product model
User.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);
// Product.belongsTo(Category, {foreignKey: 'category_id'});

module.exports = Product;


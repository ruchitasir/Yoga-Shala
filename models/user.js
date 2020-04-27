'use strict';
let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,255],
          msg: 'you don\t have a first name huh?'
        }
      }
    },
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          msg: 'Please give a valid email address 😏'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [6,32],
          msg: 'Passwords must be between 6 and 32 characters'
        }
      }
    },
    occupation: DataTypes.TEXT,
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    admin: DataTypes.BOOLEAN,
    pic: DataTypes.STRING,
    address: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    zipcode: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: pendingUser =>{
        // hash the password
        let hashedPassword = bcrypt.hashSync(pendingUser.password,12)
        //reassign the hashed password(over write the plain text password)
        pendingUser.password = hashedPassword
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };

  user.prototype.validPassword = function(typedInPassword){
    // Determine if the password typed in hashes to the same thing as the existing hash
    let correctPassword = bcrypt.compareSync(typedInPassword,this.password)
    // Return the boolean result of the comparison
    return correctPassword
  }

  return user;
};
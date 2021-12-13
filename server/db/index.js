//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Applications = require('./models/JobApplication')

//associations could go here!
Applications.belongsToMany(User, {through: 'users-jobs'});
User.belongsToMany(Applications, {through: 'users-jobs'})

module.exports = {
  db,
  models: {
    User,
    Applications
  },
}

const Sequelize = require('sequelize')
const db = require('../db')

const Applications = db.define('applications', {
  companyName: {
    type: Sequelize.STRING,

  },
  companyUrl: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true
    },
  },
  positionTitle: {
    type: Sequelize.STRING,
  },
  response: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  location: {
    type: Sequelize.STRING
  }
})

module.exports = Applications;

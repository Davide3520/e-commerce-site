const Sequelize = require('sequelize')
const db = require('../db')

const Applications = db.define('applications', {
  companyName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  companyUrl: {
    type: Sequelize.STRING,
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
  }
})

module.exports = Applications;

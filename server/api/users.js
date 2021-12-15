const router = require('express').Router()
const { application } = require('express')
const jobApp = require('../../script/Application')
const { models: { User, Applications }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

/*
[
  '_customGetters',    '_customSetters',
  'validators',        '_hasCustomGetters',
  '_hasCustomSetters', 'rawAttributes',
  '_isAttribute',      'correctPassword',
  'generateToken',     'getApplications',
  'countApplications', 'hasApplication',
  'hasApplications',   'setApplications',
  'addApplication',    'addApplications',
  'removeApplication', 'removeApplications',
  'createApplication'
]


*/

router.get('/:userId', async (req, res, next) => {
  try{
    const user = await User.findByPk(req.params.userId)
    const jobsApp = await user.getApplications()
    res.send(jobsApp)
  }catch(e) {
    next(e);
  }
})

router.post('/create', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.headers.authorization)
    const newApplication = await Applications.create(req.body.appl);
    const result = await user.addApplication(newApplication)
    res.send(result);
  } catch (error) {
    next(error);
  }
})

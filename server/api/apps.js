const router = require('express').Router()
const { application } = require('express');
const { models: { User, Applications }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log(req)
  } catch(e) {
    next(e);
  }
})

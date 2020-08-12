const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensureAuth');

const ONE_DAY_IN_MILL = 1000 * 60 * 60 * 24;

const sendUser = (user, res) => {
  res.cookie('session', user.autToken(), {
    httpOnly: true,
    maxAge: ONE_DAY_IN_MILL
  });
  res.send(user);
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => sendUser(user, res))
      .catch(next);
  });

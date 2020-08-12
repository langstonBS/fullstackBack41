const { Router } = require('express');
const Cereal = require('../models/Cereal');


module.exports = Router()
  .post('/', (req, res, next) => {
    Cereal
      .create(req.body)
      .then(cereal => res.send(cereal))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Cereal
      .find(req.query)
      .then(cereal => res.send(cereal))
      .catch(next);
  })


  .delete('/:id', (req, res, next) => {
    Cereal
      .findByIdAndDelete(req.params.id)
      .then(cereal => res.send(cereal))
      .catch(next);
  });

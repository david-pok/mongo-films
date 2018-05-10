const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router.get('/', function(req, res) {
  let query = Film.find()
    query.select('episode producer title director release_date')
    .populate('characters', ' name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter')
    .sort('episode')

    const { producer, released } = req.query;
//ONE WAY OF DOING REGEXP
    if (producer) {
      const filter = new RegExp(producer, 'i');
      query.where({ producer: filter });
    }
  //ANOTHER WAY OF DOING REGEXP
    if (released) {
      query.where({ release_date: { $regex: released, $options: 'i' } });
    }
    query.then(films => res.status(200).json(films))
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;

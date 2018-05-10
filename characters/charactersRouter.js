const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
    Character.find()
    .then(chars => res.status(200).json(chars))
    .catch(err => {
        res.status(500).json(err);
    });
});
router.get('/:id', function(req, res) {
    Character.findById(req.params.id)
    //^^^this is same as: Character.find({_id: req.params.id})
    .populate('homeworld')
    .then(char => {
        Film.find({ characters: req.params.id })
            .select('title')
            .then(films => {
                const character = { ...char._doc, movies: films };
       
        res.status(200).json(character)
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});


router.get('/:id/vehicles', function(req, res) {
    const { id } = req.params   
       Vehicle.find({})
       .populate('pilots')
       .then(p => {
        res.status(200).json(p)
       })
     
   
 
    .catch(err => {
        res.status(500).json(err);
    });
});
module.exports = router;

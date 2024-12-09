
const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

//Route to fetch plants based on hardiness zone


router.get('/get-plants', (req, res) => {
    console.log("Fetching plants for zone:", req.query.zone);
    plantController.fetchPlantsByZone(req, res);
});

module.exports = router;    
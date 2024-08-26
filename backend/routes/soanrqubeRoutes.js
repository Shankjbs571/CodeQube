const express = require('express');

const getComponentMeasures = require('../controllers/getReport');

const route = express.Router();
route.post('/getreport', getComponentMeasures);

module.exports = route;
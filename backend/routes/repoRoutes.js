const express = require('express');

const clonerepo = require('../controllers/repoController');


const repo = express.Router();
repo.post('/clonerepo', clonerepo);

module.exports = repo;
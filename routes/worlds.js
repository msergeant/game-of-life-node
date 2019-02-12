var express = require('express');
var router = express.Router();
const World = require('../lib/world/world.js');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/next', function(req, res, next) {
  const w = new World(req.body.live_cells);
  res.json({ live_cells: w.nextGeneration().liveCells });
});

module.exports = router;


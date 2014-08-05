'use strict';

var express = require('express');
var controller = require('./media.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/:type', controller.show);

module.exports = router;
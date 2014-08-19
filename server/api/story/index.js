'use strict';

var express = require('express');
var controller = require('./story.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/:id/comment', controller.comment);
router.delete('/:id/comment/:comment', controller.destroyComment);

module.exports = router;

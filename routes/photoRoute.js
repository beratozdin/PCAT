const express = require('express');
const photoController = require('../controllers/photoController');

const router=express.Router();

//Work routes
router.route('/:slug').get(photoController.getPhoto);
router.route('/').post(photoController.createPhoto);
router.route('/:slug').put(photoController.updatePhoto);
router.route('/:slug').delete(photoController.deletePhoto);

module.exports = router;
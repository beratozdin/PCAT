const express = require('express');
const pageController=require('../controllers/pageController');

const router=express.Router();

//Page routes
router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/add').get(pageController.getAddPage);
router.route('/photos/edit/:slug').get(pageController.getEditPage);

module.exports = router;
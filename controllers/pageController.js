const Photo = require('../models/Photo');
const fs = require('fs');

exports.getIndexPage = async (req, res) => {

  const page = req.query.page || 1;
  const photosPerPage = 3;

  const totalPhotos = await Photo.find().countDocuments();

  const photos = await Photo.find({})
  .sort('-dateCreated')
  .skip((page-1) * photosPerPage)
  .limit(photosPerPage)

  res.render('index', {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage)
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about');
};

exports.getAddPage = (req, res) => {
  res.status(200).render('add');
};

exports.getEditPage = async (req, res) => {
  const photo = await Photo.findOne({ slug : req.params.slug });
  res.status(200).render('edit', {
    photo,
  });
};
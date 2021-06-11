const Photo = require('../models/Photo');
const fs = require('fs');

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findOne({slug : req.params.slug});
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.status(201).redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ slug: req.params.slug });
  photo.title = req.body.title;
  photo.description = req.body.description;
  await photo.save();

  res.redirect('/');
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ slug: req.params.slug });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findOneAndRemove({slug : req.params.slug});
  res.redirect('/');
};
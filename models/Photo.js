const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

//create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true
  }
});

PhotoSchema.pre('validate', function(next){
  this.slug = slugify(this.title, {
    lower:true,
    strict:true
  })
  next();
})

const Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;
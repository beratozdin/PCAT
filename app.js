const express = require('express');
const path=require('path');
const ejs=require('ejs');
const Photo = require('./models/Photo');
const mongoose=require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/pcat-test-db', {

  useNewUrlParser:true,
  useUnifiedTopology:true,
});

//Template engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//Routes

app.get('/', async (req, res) => {
  const photos = await Photo.find({});

  res.render('index', {
    photos
  })
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  
  await Photo.create(req.body)
  res.redirect('/')
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
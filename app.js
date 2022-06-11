const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const app = express();
const port = 3000;

//connect Db
mongoose
  .connect('mongodb://127.0.0.1:27017/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connected !'))
  .catch((err) => console.log(err));

//MIDDLEWARE : Req ve Res arasında ki yapılan işlerin(metot,istek vs) tümüdür
// static dosyalar burada tanımlanır
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // url datayı okumamuzu sağlar
app.use(express.json()); // urlde ki datayı json çevirir

// TEMPLATE ENGINE
// mvc yapısında ki views kısmını belirtiriz. Expresse biz views olarak ejs kullanıcaz dedik
// ejs olarak kullanacağımız için .html uzantılı dosyaları .ejs olarak değiştiriyoruz
app.set('view engine', 'ejs');

// ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index',{
    photos
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Sunucu ${port} port numarası ile başladı`);
});

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = 3000;

//MIDDLEWARE : Req ve Res arasında ki yapılan işlerin(metot,istek vs) tümüdür
// static dosyalar burada tanımlanır
app.use(express.static('public'));


// TEMPLATE ENGINE
// mvc yapısında ki views kısmını belirtiriz. Expresse biz views olarak ejs kullanıcaz dedik
// ejs olarak kullanacağımız için .html uzantılı dosyaları .ejs olarak değiştiriyoruz
app.set('view engine','ejs')


// ROUTES
app.get('/', (req, res) => {
  res.render('index')
});
app.get('/about', (req, res) => {
  res.render('about')
});
app.get('/add', (req, res) => {
  res.render('add')
});

app.listen(port, () => {
  console.log(`Sunucu ${port} port numarası ile başladı`);
});

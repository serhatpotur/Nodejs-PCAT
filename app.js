const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController=require('./controllers/photoController')
const aboutController=require('./controllers/aboutController')
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
app.use(fileUpload());
app.use(methodOverride('_method',{methods:['POST','GET']}));

// TEMPLATE ENGINE
// mvc yapısında ki views kısmını belirtiriz. Expresse biz views olarak ejs kullanıcaz dedik
// ejs olarak kullanacağımız için .html uzantılı dosyaları .ejs olarak değiştiriyoruz
app.set('view engine', 'ejs');

// ROUTES

// Get All Photo
app.get('/',photoController.getAllPhotosAsync);

// Get Photo By Id
app.get('/photos/:id', photoController.getPhotoByIdAsync);

// Get Method - Add Photo 
app.get('/add', photoController.addPhoto);

// Post Method - Add Photo
app.post('/photos', photoController.createPhotoAsync);

// Get Method - Update Photo
app.get('/photos/edit/:id', photoController.editPhotoAsync);

// Post Method - Update Photo
app.put('/photos/:id', photoController.updatePhotoAsync);

// Delete Method
app.delete('/photos/:id', photoController.deletePhotoAsync);


// About Controller
app.get('/about', aboutController.getAbout );



app.listen(port, () => {
  console.log(`Sunucu ${port} port numarası ile başladı`);
});

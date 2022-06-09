const express = require('express');
const path  = require('path');
const app = express();
const port = 3000;


//MIDDLEWARE : Req ve Res arasında ki yapılan işlerin(metot,istek vs) tümüdür
// static dosyalar burada tanımlanır
app.use(express.static('public'));


app.get('/', (req, res) => {
  // const photo = {
  //   id: 1,
  //   name: 'photo name',
  //   description: 'Photo Desc.',
  // };
  // res.send(photo);

  res.sendFile(path.resolve(__dirname,'temp/index.html'))
});

app.listen(port, () => {
  console.log(`Sunucu ${port} port numarası ile başladı`);
});

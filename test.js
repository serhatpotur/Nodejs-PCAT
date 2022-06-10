const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// connect DB
/* MongooseError: Operation `photos.insertOne()` buffering timed out after 10000ms hatasından dolayı 
mongoose.connect('mongodb://localhost:27017/pcat-test-db') yerine aşağıdaki gibi yazıp çalışırdım ve hata düzeldi

*/
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> console.log('Db Bağlandı')).catch((err)=>console.log(err));

//create Schema
const PhotoSchema = new Schema({
    title: String,
    description: String,
    qty:Number
  })

  const Photo = mongoose.model('Photo', PhotoSchema);

//create a Photo
// Photo.create({
//     title: 'Photo Title 4',
//     description: 'Photo description 4 lorem ipsum',
//     qty:150
//   });


//read a photo
// Photo.find({}, (err, data) => {
//     console.log(data);
//   });
  
//   //update photo
//   const id = '62a36817da3c43a12514b097';
//   Photo.findByIdAndUpdate(
//     id,
//     {
//       title: 'Photo Title 1 updated',
//       description: 'Photo description 1 updated',
//     },
//     {
//         new: true // log ekranında güncellenmiş halini görmemizi sağlar, yazmazsak log ekranında güncellemeden önceki halini görürüz
//     },
//     (err, data) => {
//       console.log(data);
//     }
//   );
  
//   //delete a photo
  const id = '62a388ae7d65d3b4cd6ff391';
  
  Photo.findByIdAndDelete(id, (err, data) => {
    console.log('Photo is removed..');
  });
const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotosAsync = async (req, res) => {
  const page = req.query.page || 1; // ilk olarak ya 1. sayfayı al ya da queryden gelen page değerini al
  const photosPerPage = 3; // sayfa başına kaç fotoğraf olsun
  const totalPhotos = await Photo.find().countDocuments(); //veri tabanında kaç fotoğraf var
  //console.log(totalPhotos);
  const photos = await Photo.find({})
    .sort('-dateCreated') //son yüklenen foto en başa gelsin diye sort kullandık. - ise yeniden eskiye demek
    .skip((page - 1) * photosPerPage) // istediğimiz fotoğrafları pas geçmesini sağladık. (2-1)*2 =2. 1. ve 2. fotoğrafı pas geçip 3. fotoğraftanbaşlar
    .limit(photosPerPage); // sayfa başına kaç fotoğraf olsun
  
    res.render('index', {
    photos: photos,
    current: page, // o anki sayfaya karşılık gelsin
    pages: Math.ceil(totalPhotos / photosPerPage), // her sayfada kaç foto gösterilsin. math.ceil ise yukarı yuvarlaması için
  });
};

exports.getPhotoByIdAsync = async (req, res) => {
  // console.log(req.params.id);
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
};

exports.addPhoto = (req, res) => {
  res.render('add');
};

exports.createPhotoAsync = async (req, res) => {
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    //uploads klasörü yoksa oluştur
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhotoAsync = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};

exports.editPhotoAsync = async (req, res) => {
  // console.log(req.params.id);
  const editPhoto = await Photo.findOne({ _id: req.params.id });
  res.render('edit', { editPhoto });
};

exports.deletePhotoAsync = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};

// const express = require('express');
const vision = require('@google-cloud/vision');
const fs = require('fs');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, next) => {
    console.log('filter');
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto){
      next(null, true);
    } else{
      next({message: 'That file type isn\'t allowed'});
    }
  }
};


// Creates a client
const client = new vision.ImageAnnotatorClient();

// exports.upload = ()=>{
//   console.log(uploading);
// }

exports.upload = multer(multerOptions).single('photo');

exports.save = async (req, res, next) => {
  console.log('saving');
  if(!req.file){
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(1000, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  res.redirect(`/getImageData/${req.body.photo}`);
};

// exports.upload = (req, res) => {
//   const form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//     saveFile(files.filetoupload);
//   });
//
//   // } else {
//   //   fs.unlink(tempPath, function () {
//   //     if (err) throw err;
//   //     console.error("Only .png files are allowed!");
//   //   });
//   // }
// };

function saveFile(file){
  // const oldpath = files.filetoupload.path;
  // const newpath = '/uploads/' + files.filetoupload.name;
  // console.log(oldpath);
  // console.log(newpath);
  // fs.rename(oldpath, newpath, function (err) {
  //   if (err) throw err;
  //   console.log('saved', newpath)
  //   detectText(newpath);
  // });
  const tempPath = file.path;
  const targetPath = `.public/uploads/${file.name}`;
  // if (path.extname(req.files.file.name).toLowerCase() === '.png') {
  fs.rename(tempPath, targetPath, function(err) {
    if (err) throw err;
    console.log("Upload completed!");
  });
}

function detectText(path){
  client
    .textDetection(path)
    .then(results => {
      const detections = results[0].textAnnotations;
      console.log('Text:');
      detections.forEach(text => console.log(text));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

// const express = require('express');
const formidable = require('formidable');
const vision = require('@google-cloud/vision');
const path = require('path');
const fs = require('fs');

// Creates a client
const client = new vision.ImageAnnotatorClient();

exports.upload = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    saveFile(files.filetoupload);
  });

  // } else {
  //   fs.unlink(tempPath, function () {
  //     if (err) throw err;
  //     console.error("Only .png files are allowed!");
  //   });
  // }
};

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

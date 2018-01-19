const vision = require('@google-cloud/vision');

exports.getImageData = (req, res) => {
// Creates a client
  const client = new vision.ImageAnnotatorClient();
  const fileName = `./public/uploads/${req.params.photo}`;

  // Performs text detection on the local file
  client
    .textDetection(fileName)
    .then(results => {
      const detections = results[0].textAnnotations;
      const data = [];
      detections.forEach(text => data.push(text));
      res.json(data);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};

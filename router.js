const express = require('express');
const router = express.Router();
const { catchErrors } = require('./handlers/errorHandlers');
const imageDataController = require('./controllers/imageDataController');
const uploadController = require('./controllers/uploadController');

router.get('/', (req, res) => {
  res.render('index', {title: 'Google Vision Demo'});
});

router.get('/getImageData/:photo', imageDataController.getImageData);
router.post('/fileupload',
  uploadController.upload,
  catchErrors(uploadController.save)
);

module.exports = router;

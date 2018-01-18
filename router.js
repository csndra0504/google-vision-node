const express = require('express');
const router = express.Router();
const imageDataController = require('./controllers/imageDataController');
const uploadController = require('./controllers/uploadController');

router.get('/getImageData', imageDataController.getImageData);
router.post('/fileupload', uploadController.upload);

module.exports = router;

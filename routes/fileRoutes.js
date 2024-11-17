const express = require('express');
const { uploadFile, listFiles, downloadFile } = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/upload', authMiddleware, uploadFile);
router.get('/files', authMiddleware, listFiles);
router.get('/download/:fileId', authMiddleware, downloadFile);

module.exports = router;

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// File upload setup
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pptx', '.docx', '.xlsx'];
        if (!allowedTypes.includes(path.extname(file.originalname))) {
            return cb(new Error('File type not allowed'), false);
        }
        cb(null, true);
    }
});

// Upload file
exports.uploadFile = upload.single('file'), async (req, res) => {
    try {
        const { user } = req;
        const fileUrl = `/uploads/${req.file.filename}`;
        await pool.execute('INSERT INTO files (file_name, file_url, owner_id) VALUES (?, ?, ?)', [req.file.filename, fileUrl, user.id]);
        res.send({ message: 'File uploaded successfully', fileUrl });
    } catch (err) {
        res.status(500).send('Error uploading file');
    }
};

// List files
exports.listFiles = async (req, res) => {
    const { user } = req;
    const [files] = await pool.execute('SELECT * FROM files WHERE owner_id = ?', [user.id]);
    res.json(files);
};

// Download file
exports.downloadFile = async (req, res) => {
    const { user } = req;
    const { fileId } = req.params;

    const [file] = await pool.execute('SELECT * FROM files WHERE id = ? AND owner_id = ?', [fileId, user.id]);
    if (!file.length) return res.status(403).send('Access denied');

    const filePath = `./uploads/${file[0].file_name}`;
    res.download(filePath);
};

const db = require('../config/db');

const saveFile = (filename, uploadedBy, fileUrl) => {
  return db.execute(
    'INSERT INTO files (filename, uploaded_by, file_url) VALUES (?, ?, ?)',
    [filename, uploadedBy, fileUrl]
  );
};

const getAllFiles = () => {
  return db.execute('SELECT * FROM files');
};

module.exports = { saveFile, getAllFiles };

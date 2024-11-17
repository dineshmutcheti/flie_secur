const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Dinesh@4592',
    database: 'file_sharing'
});

module.exports = pool.promise();

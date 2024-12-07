const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '172.16.234.34',
  user: 'root',
  password: 'Howard-@02927552',
  database: 'authentication_accessnyc',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL');
  connection.release(); 
});

module.exports = pool;
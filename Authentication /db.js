const mysql = require('mysql2');
const db = require('./db');


const connection = mysql.createConnection({
  host: 'http://172.16.234.140:8080/', 
  user: 'root', 
  password: 'Howard-@02927552', 
  database: 'authentication_accessnyc'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL');
});

db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('The result is: ', results[0].result);
  });

module.exports = connection;
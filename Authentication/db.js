const mysql = require('mysql2/promise'); 

const pool = mysql.createPool({
  host: "authenticationdb.cluster-cxgkgy0kqnkk.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "COMS4153CloudGPT",
  database: "authenticationdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool; // Export the promise-based pool
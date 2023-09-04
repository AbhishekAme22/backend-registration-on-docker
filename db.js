const mysql = require('mysql2');

const dbConfig = {
  host: 'mysql-container',
  user: 'dev',
  password: '1234',
  database: 'user_address',
};

const connection = mysql.createPool(dbConfig);

module.exports = connection;

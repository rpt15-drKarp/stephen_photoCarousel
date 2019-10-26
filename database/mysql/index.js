const mysql = require('mysql');
const util = require('util');
const dnsConfig = require('../../config.js');

let dbEnv = '';
process.env.NODE_ENV === 'prod' ? dbEnv = dnsConfig.dbUrl : dbEnv = 'localhost';
console.log('mysql host:', dbEnv);
console.log('dnsConfig.dbUrl:', dnsConfig.dbUrl);

const pool = mysql.createPool({
  host     : dbEnv,
  user     : 'root',
  password : 'password',
  database: 'photoCarousel'
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('MySQL database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('MySQL database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('MySQL database connection was refused.')
    }
  } else {
    console.log('connected to mySQL')
  }

  if (connection) connection.release()
  return
});

pool.query('SET GLOBAL connect_timeout=28800');
pool.query('SET GLOBAL wait_timeout=28800');
pool.query('SET GLOBAL interactive_timeout=28800');

pool.query = util.promisify(pool.query);

module.exports.pool = pool;
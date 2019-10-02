const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database: 'photoCarousel'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query('SET GLOBAL connect_timeout=28800');
connection.query('SET GLOBAL wait_timeout=28800');
connection.query('SET GLOBAL interactive_timeout=28800');

module.exports.connection = connection;
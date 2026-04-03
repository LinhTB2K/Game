let mysql = require('mysql2');


let con = mysql.createConnection({
	host: '127.0.0.1',
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database:  process.env.DB_NAME,
});


con.connect(function(err) {
	if (err) throw err;
});

module.exports = con;
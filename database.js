const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Newpass$1972',
    database: 'projeto_electron'
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Exemplo de consulta
connection.query('SELECT * FROM pessoas', function(err, rows, fields) {
    if (err) throw err;
    console.log('Data received from MySQL:');
    console.log(rows);
});

connection.end();

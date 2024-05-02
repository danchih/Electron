const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'Newpass$1972',
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');

 // Tenta criar o banco de dados apenas se não existir (embora já esteja especificado na conexão)
 connection.query("CREATE DATABASE IF NOT EXISTS sistema_usuario", (err, result) => {
  if (err) {
    console.error('Erro ao criar o banco de dados:', err);
    return;
  }
  console.log("Database 'sistema_usuario' created");

  // Criar a tabela 'customers' se não existir
  const sqlTable = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255),
      senha VARCHAR(255),
      email VARCHAR(255),
      cep VARCHAR(255),
      rua VARCHAR(255),
      bairro VARCHAR(255),
      localidade VARCHAR(255),
      uf VARCHAR(255)
    )
  `;

  connection.query(sqlTable, (err, result) => {
    if (err) {
      console.error('Erro ao criar tabela:', err);
      return;
    }
    console.log("Table 'usuarios' created");

    // Verifica se o email 'admin@exemplo.com' já existe na tabela 'usuarios'
    checkAndInsertAdmin();
  });
});

function checkAndInsertAdmin() {
  const emailToCheck = 'admin@exemplo.com';
  connection.query('SELECT * FROM usuarios WHERE email = ?', [emailToCheck], (error, results) => {
    if (error) {
      console.error('Erro ao verificar usuário:', error);
      return;
    }
    if (results.length > 0) {
      console.log('Usuário com o email admin@exemplo.com já existe!');
    } else {
      // Insere o usuário admin se ele não existir
      const sqlInsert = "INSERT INTO usuarios (nome, email, senha, cep, rua, bairro, localidade, uf) VALUES ('admin', 'admin@exemplo.com', 'senhaadmin', NULL, NULL, NULL, NULL, NULL)";
      connection.query(sqlInsert, (error, results) => {
        if (error) {
          console.error('Erro ao cadastrar usuário no MySQL:', error);
        } else {
          console.log('Usuário administrador cadastrado com sucesso no MySQL!');
        }
      });
    }
  });
}});
module.exports = connection;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Importe sua conexão com o banco de dados aqui
const db = require('./database');

// O bodyParser nos ajuda a ler o corpo das requisições POST
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username: email, password: senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.query(query, [email, senha], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false });
    } else if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  });
});


  app.get('/getUser', (req, res) => {
    const userId = 1; // ID do usuário
  
    const query = 'SELECT * FROM usuarios WHERE id = 1';
  
    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false });
      } else if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ success: false });
      }
    });
  });


  app.post('/cadastrar-usuario', (req, res) => {
    const { nome, email, password, cep, rua, bairro, localidade, uf } = req.body;

    // Execução da query SQL para inserir os dados do usuário no MySQL
    db.query('INSERT INTO usuarios (nome, email, password, cep, rua, bairro, localidade, UF) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [nome, email, password, cep, rua, bairro, localidade, uf], 
        (error, results, fields) => {
            if (error) {
                console.error('Erro ao cadastrar usuário no MySQL:', error);
                res.status(500).json({ success: false });
            } else {
                console.log('Usuário cadastrado com sucesso no MySQL!');
                res.status(201).json({ success: true});
            }
        });
    });

    
// Definição da rota para buscar todos os usuários
app.get('/getUsers', (req, res) => {
  const query = 'SELECT nome, email, cep, rua, bairro, localidade, uf FROM usuarios';
  db.query(query, (error, results) => {
      if (error) {
          console.error('Erro ao consultar o banco de dados:', error);
          res.status(500).json({ success: false, message: 'Erro ao acessar banco de dados' });
      } else if (results.length > 0) {
          res.json(results);
      } else {
          res.status(404).json({ success: false, message: 'Nenhum usuário encontrado' });
      }
  });
});
  
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

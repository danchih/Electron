const { ipcRenderer } = require('electron');

function logar() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Envia os dados para o processo principal (main.js) para autenticação
    ipcRenderer.send('login', { email, password });
}

function cadastrar() {
    const nome = document.querySelector('input[name="nome"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const endereco = document.querySelector('input[name="endereço"]').value;
    const cep = document.querySelector('input[name="cep"]').value;
    const bairro = document.querySelector('input[name="bairro"]').value;
    const cidade = document.querySelector('input[name="cidade"]').value;
    const estado = document.querySelector('input[name="estado"]').value;

    // Enviar dados de cadastro para o servidor via fetch
    fetch('http://localhost:3000/cadastrar-usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome,
            email,
            password,
            endereco,
            cep,
            bairro,
            cidade,
            estado
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
        }
        return response.json();
    })
    .then(data => {
        alert('Usuário cadastrado com sucesso!');
        window.location.href = "usuarios.html"; // Redireciona para a página de usuários
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
    });
}

function preencherEndereco(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('input[name="endereco"]').value = data.logradouro;
            document.querySelector('input[name="bairro"]').value = data.bairro;
            document.querySelector('input[name="cidade"]').value = data.localidade;
            document.querySelector('input[name="estado"]').value = data.uf;
        })
        .catch(error => console.error('Erro ao preencher endereço:', error));
}

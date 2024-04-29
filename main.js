const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadFile('index.html');
};

app.whenReady().then(() => {
    createWindow();
});

// Ouvinte de evento para cadastro
ipcMain.on('cadastro', (event, dados) => {
    // Aqui você processa os dados do cadastro, como salvá-los em um banco de dados
    console.log('Dados do cadastro:', dados);
    // Você pode chamar funções ou realizar ações necessárias com os dados de cadastro aqui
});

// Ouvinte de evento para login
ipcMain.on('login', (event, dados) => {
    // Aqui você processa os dados de login, como autenticá-los
    console.log('Dados de login:', dados);
    // Você pode chamar funções ou realizar ações necessárias com os dados de login aqui
});

/*
* Objetivo: criar os endpoints das funções
* Autor: João Pedro dos Santos 
* Data: 13/04/2026
* Versão : 1.0
*/

const express = require('express');
const app = express();

const {
    listaTodosContatos,
    getPerfilPorNumero,
    getDadosContatos,
    getTodasMensagens,
    getConversa,
    pesquisarPalavra
} = require('./model/funcoes.js');

app.use(express.json());


//ListarTodos os Usuarios
app.get('/usuarios', (req, res) => {
    res.json(listaTodosContatos());
});

//Prcurar o perfil pelo numero
app.get('/usuarios/:numero', (req, res) => {
    const dados = getPerfilPorNumero(req.params.numero);
    res.json(dados);
});

//Procurar o contato do usuario
app.get('/usuarios/:numero/contatos', (req, res) => {
    res.json(getDadosContatos(req.params.numero));
});

//Procurar Todas as mensagens
app.get('/usuarios/:numero/mensagens', (req, res) => {
    res.json(getTodasMensagens(req.params.numero));
});

//Procurar uma conversa pelo número
app.get('/usuarios/:numero/conversa/:contato', (req, res) => {
    const { numero, contato } = req.params;
    res.json(getConversa({ numero, contato }));
});

//Pesquisa por palavra
app.get('/pesquisa', (req, res) => {
    res.json(pesquisarPalavra(req.query.palavra));
});

//Subir para o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

// http://localhost:3000/usuarios
// http://localhost:3000/usuarios/11987876567
// http://localhost:3000/usuarios/11987876567/contatos
// http://localhost:3000/usuarios/11987876567/mensagens
// http://localhost:3000/usuarios/11987876567/conversa/Ana Maria
// http://localhost:3000/pesquisa?palavra=projeto
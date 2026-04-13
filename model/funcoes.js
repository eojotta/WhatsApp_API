/***************************************************************
* Objetivo : Simular uma API do whatsapp
* Autor : João Pedro dos Santos
* Data : 04/08/2026
* Versão : 1.0
 ******************************************************/


//Listar todos os dados de usuário independente do número (Retornar todos os dados)
    const {contatos} = require ("./contatos")

function listaTodosContatos(){

    return contatos['whats-users']
}

//************************************************************************************* */

//Listar dados da conta do profile do usuário (Todos os dados do profile que podem ser alterados como nome,“nick”,
//foto, número, imagem, cor de fundo e dados da conta como criação e encerramento, etc)

function getPerfilPorNumero(numero) {

    let resultado = false 

    contatos["whats-users"].forEach(function(dados){

        if(dados.number == numero){
            listaTodosContatos = {
                name: dados.account,
                number: dados.number,
                nickname: dados.nickname,
                profile_image: dados["profile-image"],
                background: dados.background,
                account_creation: dados["created-since"].start,
                account_closure: dados["created-since"].end
            }
        }
    })

    return listaTodosContatos
}

/************************************************************************************* */

//Listar dados de contato para cada usuário
//(Retornar apenas os dados pessoais de cada contato do usuário, como nome, foto e descrição)

function getDadosContatos(numero) {

    let listaTodosContatos = false

    let listaContatos = [];

    contatos["whats-users"].forEach(function(usuario) {

        if (usuario.number == numero) {

            usuario.contacts.forEach(function(contato) {

                listaContatos.push({
                    name: contato.name,
                    description: contato.description,
                    image: contato.image
                });

            });
        }
    });

    return listaContatos;
}

/****************************************************************************************** */

//Listar todas as mensagens trocadas de uma conta de usuário

function getTodasMensagens(numero) {
    let todasMensagens = [];

    for (let usuario of contatos["whats-users"]) {
        if (usuario.number == numero) {

            for (let contato of usuario.contacts) {
                todasMensagens.push(...contato.messages);
            }

        }
    }

    return todasMensagens;
}

/******************************************************************************************* */

//Listar uma conversa de um usuário e um contato

function getConversa(query) {
    const numero = query.numero;
    const nomeContato = query.contato;

    for (let usuario of contatos["whats-users"]) {
        if (usuario.number == numero) {

            for (let contato of usuario.contacts) {
                if (contato.name == nomeContato) {
                    return {
                        nome: usuario.account,
                        numero: usuario.number,
                        contato: contato.name,
                        mensagens: contato.messages
                    };
                }
            }

        }
    }

    return null;
}

/******************************************************************************************** */

//Pesquisa de Palavra chave

function pesquisarPalavra(palavra) {
    let resultado = [];

    for (let usuario of contatos["whats-users"]) {
        for (let contato of usuario.contacts) {
            for (let mensagem of contato.messages) {

                if (mensagem.content.includes(palavra)) {
                    resultado.push({
                        usuario: usuario.account,
                        contato: contato.name,
                        mensagem: mensagem.content,
                        hora: mensagem.time
                    });
                }
            }
        }
    }

    return resultado;
}

// filtro por palavra chave
//console.log(pesquisarPalavra("projeto"));

//Listar todos os dados de usuário independente do número
//console.log(listaTodosContatos())

//Listar dados de contato para cada usuário
//console.log(getDadosContatos("11987876567"));

//Listar dados da conta do profile do usuário
//console.log(getPerfilPorNumero(11987876567))

//Listar todas as mensagens trocadas de uma conta de usuário
//JSON.stringify -> o console.log normal mostra [Object], Com isso, ele mostra tudo detalhado.
//console.log(getTodasMensagens("11987876567"));

//Listar uma conversa de um usuário e um contato
//console.log(getConversa({numero: "11987876567",contato: "Ana Maria"}));


module.exports = {
    listaTodosContatos,
    getPerfilPorNumero,
    getDadosContatos,
    getTodasMensagens,
    getConversa,
    pesquisarPalavra
};
/***************************************************************
* Objetivo : Sinmular uma API do whatsapp
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

    let listaTodosContatos = false 

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


console.log(getDadosContatos("11987876567"));
//console.log(listaTodosContatos())
//console.log(getPerfilPorNumero(11987876567))
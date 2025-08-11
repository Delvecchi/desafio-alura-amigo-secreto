//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

let listaNomes = [];

function exibirErroNome(tag, texto) {
    let campo = document.querySelector(tag);
    if (campo) {
        campo.placeholder = texto;
        campo.classList.add('erro');
        setTimeout(() => campo.classList.remove('erro'), 2000);

        if (typeof responsiveVoice !== 'undefined') {
            responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
        } else {
            console.warn("responsiveVoice não está carregado.");
        }
    } else {
        console.warn(`Elemento "${tag}" não encontrado.`);
    }
}

function adicionarAmigo() {
    let nomeCampo = document.querySelector('#amigo');
    let nome = nomeCampo.value.trim();
    let nomeNormalizado = nome.toLowerCase();

    if (nome.length === 0) {
        exibirErroNome('#amigo', 'Digite um nome válido');
        return;
    }

    if (listaNomes.map(n => n.toLowerCase()).includes(nomeNormalizado)) {
        exibirErroNome('#amigo', 'Nome já adicionado');
        nomeCampo.value = '';
        return;
    }

    listaNomes.push(nome);
    atualizarLista();
    limparCampo();
}


function atualizarLista() {
    const ul = document.getElementById("listaAmigos"); // Corrigido
    ul.innerHTML = "";

    listaNomes.forEach(function(nome) {
        const li = document.createElement("li");
        li.textContent = nome;
        ul.appendChild(li);
    });
}

function limparCampo() {
    let nomeCampo = document.querySelector('#amigo');
    nomeCampo.value = '';
    nomeCampo.placeholder = 'Digite um nome';
}

function sortearAmigo() {
    if (listaNomes.length < 2) {
        exibirMensagemErro('Adicione pelo menos 2 amigos para sortear.', 'erro');
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * listaNomes.length);
    const nomeSorteado = listaNomes[indiceSorteado];

    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = `<li>🎉 Amigo sorteado: <strong>${nomeSorteado}</strong></li>`;

    exibirMensagemErro('Sorteio realizado com sucesso!', 'alerta');
}

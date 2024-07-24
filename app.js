document.addEventListener('DOMContentLoaded', (event) => {
    let listaDeNumeroSorteados = [];
    let numeroLimite = 100;
    let numeroSecreto = gerarNumeroAleatorio();
    let tentativas = 1;

    function exibirTextoNaTela(tag, texto) {
        let campo = document.querySelector(tag);
        if (campo) {
            campo.innerHTML = texto;
            if (window.responsiveVoice) {
                responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
            }
        }
    }

    let mensagemNumeroMaxino = `Escolha um número entre 1 e ${numeroLimite}`;

    function exibirMensagemInicial() {
        exibirTextoNaTela('h1', 'Jogo do número secreto');
        exibirTextoNaTela('.texto__paragrafo', mensagemNumeroMaxino);
    }

    exibirMensagemInicial();

    function verificarChute() {
        let chute = document.querySelector('.container__input').value;
        if (chute == numeroSecreto) {
            exibirTextoNaTela('h1', 'Acertou!');
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
            exibirTextoNaTela('.texto__paragrafo', mensagemTentativas);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('.texto__paragrafo', 'O número secreto é menor');
            } else {
                exibirTextoNaTela('.texto__paragrafo', 'O número secreto é maior');
            }
            tentativas++;
            limparCampo();
        }
    }

    function gerarNumeroAleatorio() {
        let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
        let quantidadeDeElementos = listaDeNumeroSorteados.length;

        if (quantidadeDeElementos == numeroLimite) {
            listaDeNumeroSorteados = [];
        }

        if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
            return gerarNumeroAleatorio();
        } else {
            listaDeNumeroSorteados.push(numeroEscolhido);
            return numeroEscolhido;
        }
    }

    function limparCampo() {
        let chute = document.querySelector('.container__input');
        chute.value = '';
    }

    function reiniciarJogo() {
        numeroSecreto = gerarNumeroAleatorio();
        limparCampo();
        tentativas = 1;
        exibirMensagemInicial();
        document.getElementById('reiniciar').setAttribute('disabled', true);
    }

    // Adicionar evento para pressionar Enter
    document.querySelector('.container__input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            verificarChute();
        }
    });

    document.querySelector('.container__botao').addEventListener('click', verificarChute);
    document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);
});

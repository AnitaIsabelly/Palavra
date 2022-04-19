window.googletag = window.googletag || { cmd: [] };
googletag.cmd.push(function () {
    googletag
        .defineSlot(
            '/6355419/Travel/Europe/France/Paris', [300, 250], 'banner-ad')
        .addService(googletag.pubads());
    googletag.enableServices();
});

document.addEventListener("DOMContentLoaded", () => {
    let palavraCerta = [[]];
    let espacoVazio = 1;
    let palavra;
    let contadorPalavra = 0;

    Array.prototype.append = [].push;

    const tecla = document.querySelectorAll(".fileira button");
    const tela = document.getElementById("quadradao");
    const telaMensagem = document.querySelectorAll(".mensagem-container");

    palavraNovaPartida(target => palavra = target);

    //criar tela das letras
    for (let i = 0; i < 30; i++) {
        let quadrado = document.createElement("div");
        quadrado.classList.add("quadrado");
        quadrado.setAttribute("id", i + 1);
        tela.appendChild(quadrado);
    }
    //teclado
    for (let j = 0; j < tecla.length; j++) {
        tecla[j].onclick = ({ target }) => {
            const letras = target.getAttribute("id");

            if (letras === 'Deletar') {
                const arrayPalavraAtual = getArrayPalavraAtual();
                const letraRemovida = arrayPalavraAtual.pop();
                const ultimaLetra = document.getElementById(String(espacoVazio - 1));

                palavraCerta[palavraCerta.length - 1] = arrayPalavraAtual;

                ultimaLetra.textContent = "";
                espacoVazio = espacoVazio - 1;
                document.getElementById(espacoVazio).style.backgroundColor = "#d3d3d3";
                return;
            }

            if (letras === 'Enter') {
                const arrayPalavraAtual = getArrayPalavraAtual();
                const palavraAtual = arrayPalavraAtual.join('');
                const primeiraLetra = contadorPalavra * 5 + 1;

                //cores nas letras
                arrayPalavraAtual.forEach((letras, j) => {
                    const xLetra = primeiraLetra + j;
                    const letraCerta = palavra.includes(letras);
                    const posicao = palavra.charAt(j);
                    const posicaoCerta = letras;

                    if (letraCerta == false) {
                        document.getElementById(xLetra).style.backgroundColor = "#AD4C73";
                    }
                    if (posicaoCerta === posicao) {
                        document.getElementById(xLetra).style.backgroundColor = "#449FB3";
                    }
                    if (posicaoCerta !== posicao && letraCerta === true) {
                        document.getElementById(xLetra).style.backgroundColor = "#FAEB5C";
                    }
                });
                contadorPalavra += 1;

                //correcao
                if (palavraAtual === palavra) {
                    mostrarMensagem('Parabéns! Acertou a palavra!');
                    setTimeout(() => { document.location.reload(true) }, 2000);

                }

                if (arrayPalavraAtual.length != 5) {
                    mostrarMensagem('A palavra precisa ter 5 letras.');
                }

                if (palavraCerta.length === 6) {
                    mostrarMensagem('Suas tentativas acabaram. A palavra era ' + palavra);
                    setTimeout(() => { document.location.reload(true) }, 2000);
                } palavraCerta.push([]);
                return;
            }
            atualizarPalavraCerta(letras);
        };
    }

    function getArrayPalavraAtual() {
        const numPalavraCerta = palavraCerta.length;
        return palavraCerta[numPalavraCerta - 1];
    }

    function atualizarPalavraCerta(letras) {
        const arrayPalavraAtual = getArrayPalavraAtual();
        if (arrayPalavraAtual && arrayPalavraAtual.length < 5) {
            arrayPalavraAtual.push(letras);
            const elementoDeEspacoVazio = document.getElementById(String(espacoVazio));
            espacoVazio = espacoVazio + 1;
            elementoDeEspacoVazio.textContent = letras;
        }
    }

    function palavraNovaPartida(cod) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "/getPalavraSorteada", true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                return cod(xmlhttp.responseText);
        }
        xmlhttp.send();
    }

    const mostrarMensagem = (mensagem) => {
        const elementoMensagem = document.createElement('p');
        elementoMensagem.textContent = mensagem;
        telaMensagem[0].append(elementoMensagem);
        setTimeout(() => telaMensagem[0].removeChild(elementoMensagem), 2000);
    }
});
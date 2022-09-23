let palavraSecreta  = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
let palavraOculta = [];
let palavraJogo = palavraSecreta[0];
let palavraDica = palavraSecreta[1];

const letrasCorretas = [];
const letrasErradas = [];

let tentativas = 6;

let teclado = document.getElementsByClassName('botao-teclado');

function iniciaJogo() {
    document.getElementById("dica").style.visibility = 'visible';
    document.getElementById("div-desaparece").style.display = 'none';
    document.getElementById("sessao-teclado").style.display = 'block';
    document.getElementById("palavra-secreta-div").style.visibility = 'visible';
    
    montaPalavra();
}

function desisteJogo() {
    let popup = document.getElementById('img').src = 'img/medo.png';
    let mensagem = document.getElementById('mensagem');
    mensagem.textContent = "Que pena, você perdeu :C";
    mostraPopup();
}

function novoJogo() {
    location.reload(true); 
}

function montaPalavra() {
    let espacoDica = document.getElementById("dica");
    espacoDica.innerHTML = palavraDica;

    let espacoPalavra = document.getElementById("palavra-secreta-div");
    espacoPalavra.innerHTML = "";

    for(i = 0; i < palavraJogo.length; i++) {
        if(palavraOculta[i] == undefined) {
            palavraOculta[i] = "&nbsp;&nbsp;&nbsp;"
            espacoPalavra.innerHTML = espacoPalavra.innerHTML + "<div class='palavra-secreta-letra'>" + palavraOculta[i] + "</div>";
        } else {
            espacoPalavra.innerHTML = espacoPalavra.innerHTML + "<div class='palavra-secreta-letra'>" + palavraOculta[i] + "</div>";
        }
    } 
}

function mostraPalavra(letra) {
    const posicao = palavraJogo.indexOf(letra);

    if (posicao < 0) {
        tentativas--;
    } else {
        for(i = 0; i < palavraJogo.length; i++) {
            if(palavraJogo[i] == letra) {
                palavraOculta[i] = letra;
            }
        }
    }

    let vitoria = true;
    for(i = 0; i < palavraJogo.length; i++) {
        if(palavraJogo[i] != palavraOculta[i]) {
            vitoria = false;
        }
    }

    if(vitoria){
        mostraPopup();
    }

    if(tentativas == 0) {
        desisteJogo();
    }
}

function adicionaPalavra() {
    let inputPalavra = document.getElementById('inputPalavra');
    let inputDica = document.getElementById('inputDica');

    let palavraAdd = inputPalavra.value.toUpperCase();
    let dicaAdd = inputDica.value.toUpperCase();

    listaPalavras.push([palavraAdd , dicaAdd]);
    
    palavraJogo = palavraAdd;
    palavraDica = dicaAdd;

    let popupAddPalavra = document.getElementById('popupAddPalavra').style.display = 'none';
    iniciaJogo();   
}

function mudaImagem() {
    let imagem = ["img/forca1.png", "img/forca2.png", "img/forca3.png", "img/forca4.png", "img/forca5.png", "img/forca6.png"];
    switch(tentativas) {
        case 6: document.getElementById("imagem-forca").src = imagem[0];
        break;
        case 5: document.getElementById("imagem-forca").src = imagem[1];
        break;
        case 4: document.getElementById("imagem-forca").src = imagem[2];
        break;
        case 3: document.getElementById("imagem-forca").src = imagem[3];
        break;
        case 2: document.getElementById("imagem-forca").src = imagem[4];
        break;
        case 1: document.getElementById("imagem-forca").src = imagem[5];
        break;
        default: document.getElementById("imagem-forca").src = "img/forca.png";
        break;
    }
}

function mostraPopup() {
    let popup = document.getElementById('popup');
    popup.style.display = 'flex';
}

function mostraPopupAddPalavra() {
    let popupAddPalavra = document.getElementById('popupAddPalavra');
    popupAddPalavra.style.display = 'flex';
}

function fechaPopupAddPalavra() {
    let popupAddPalavra = document.getElementById('popupAddPalavra');
    popupAddPalavra.style.display = 'none'
}

function verificaLetra(e) {
    let clica = document.getElementById(e);

    if(tentativas > 0) {
            if(palavraJogo.includes(e)) {
            letrasCorretas.push(e);
            clica.style.backgroundColor = 'green';
            clica.style.color = 'white';
            clica.removeAttribute('onclick');
            } else {
                letrasErradas.push(e);
                clica.style.backgroundColor = 'red';
                clica.style.color = 'white';
                clica.removeAttribute('onclick');
                mudaImagem();
            }
        }
    }  

function clicaLetra(e) {
    verificaLetra(e);
    mostraPalavra(e);
    montaPalavra();
}

teclado.onclick = clicaLetra;
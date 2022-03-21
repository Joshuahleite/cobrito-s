const somFundo = new Audio("music/music.mp3");
const somGameOver = new Audio("music/gameover.mp3");
const somMover = new Audio("music/move.mp3");
const somComer = new Audio("music/food.mp3");

var direcao = {x: 0, y:1};

var cobrinha = [ { x: 5,y: 5} ]

var fruta = {  x: Math.floor(Math.random() * 18),
    y: Math.floor(Math.random() * 18)  }
var pontos = 0;
var velocidade= 5;
var ultimaVezAtualizada=0;

function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if((tempoAtual - ultimaVezAtualizada) / 1000 < 1 / velocidade){
        return;
    }

    ultimaVezAtualizada = tempoAtual

    atualizaGame();
}

function verificaColisao(){
    for(var i = 1; i < cobrinha.length; i++){
        if(cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y){
            return true;
        }
    }
    //colisao paredes
    if(cobrinha[0].x >= 25 || cobrinha[0].x <= 0 || cobrinha[0].y >=25 || cobrinha[0].y <= 0){
        return true;
    }
}

    function atualizaGame(){

        var colidiu = verificaColisao();
        if(colidiu == true){
            somFundo.pause();
            somGameOver.play();
            alert("cobrito faleceu" + '\n' + "(ಥ﹏ಥ)")
            cobrinha = [{x: 5, y: 5}]
            direcao.x = 0;
            direcao.y = 0;
            pontos = 0;  
            pontuacao.innerHTML = 0 + " pontos (o_o)"
        }

        verificarComerFrutinha();

        for(var i = cobrinha.length - 2; i >= 0; i--) {
            cobrinha[i+1] = {...cobrinha[i]}
        }

        cobrinha[0].y += direcao.y;
        cobrinha[0].x += direcao.x;

        board.innerHTML ="";
        for(var i= 0; i < cobrinha.length; i++){
            var parteCobrinha = document.createElement('div');
            parteCobrinha.style.gridRowStart = cobrinha[i].y;
            parteCobrinha.style.gridColumnStart = cobrinha[i].x;

            if(i == 0){
                parteCobrinha.classList.add("head");
            } else {
                parteCobrinha.classList.add("snake");
            }

            board.appendChild(parteCobrinha);
        }

        var frutinha = document.createElement("div");
        frutinha.style.gridColumnStart = fruta.x;
        frutinha.style.gridRowStart = fruta.y;
        frutinha.classList.add("fruta")
        board.appendChild(frutinha);
}

somFundo.play();

function verificarComerFrutinha(){
    if(cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y){
        somComer.play();
        pontos += 10
    if(pontos < 150){
        pontuacao.innerHTML = pontos + " pontos (^Д^)"
    }else if(pontos < 400){
            pontuacao.innerHTML = pontos + " pontos  (◉ω◉)"
        } else if (pontos < 800) {
            pontuacao.innerHTML = pontos + " pontos (︶^︶)"
        } else if (pontos < 1000) {
            pontuacao.innerHTML = pontos + " pontos (ノಠ益ಠ)"
        } else if (pontos > 1000) {
            pontuacao.innerHTML = pontos + " pontos  (▀̿̿Ĺ̯̿▀̿ ̿)"
        }
        cobrinha.unshift(
            {x: cobrinha[0].x + direcao.x,
            y: cobrinha[0].y + direcao.y,})
            fruta.x = Math.floor(Math.random() * 25),
            fruta.y = Math.floor(Math.random() * 25),
            velocidade = velocidade + 0.5;
//             var images = ['kiwi.png', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',
//             'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',
//             'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',
//             'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'];
// $('html').css({'background-image': 'url(images/' + images[Math.floor(Math.random() * images.length)] + ')'}); 
        
    }
}

function direcaoCobrao(e) {

    somMover.play();
    console.log(e)
    switch(e.code){
        case "KeyW":
        case "ArrowUp":
            direcao.x = 0;
            direcao.y = -1;
            break;

        case "KeyA":
        case "ArrowLeft":
            direcao.x = -1;
            direcao.y = 0;
            break;

        case "KeyS":
        case "ArrowDown":
            direcao.x = 0;
            direcao.y = 1;
            break;

        case "KeyD":
        case "ArrowRight":
            direcao.x = 1;
            direcao.y = 0;
            break;

        case "Enter":
            direcao.x = 1;
            direcao.y = 0;
            somFundo.play();
            break;
    }
}
window.addEventListener('keydown', (e) => direcaoCobrao(e))

principal();
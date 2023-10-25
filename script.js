const html = document.querySelector("html");

const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");

const buttons = document.querySelectorAll(".app__card-button");
const iniciarPausar = document.querySelector("#start-pause span");
const startPause = document.querySelector("#start-pause");
const banner = document.querySelector(".app__image");

const appTitle = document.querySelector(".app__title");
const musicaFocoInput = document.querySelector("#alternar-musica");
const estadoImageBotaoPlay = document.querySelector(
  ".app__card-primary-butto-icon"
);
const tempoNaTela = document.querySelector("#timer");

const musica = new Audio("./sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("./sons/play.wav");
const audioPause = new Audio("./sons/pause.mp3");
const tempoZerado = new Audio("./sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  buttons.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      appTitle.innerHTML = `Otimize sua produtividade,<br>
  <strong class="app__title-strong">mergulhe no que importa.</strong>`;

      break;
    case "descanso-curto":
      appTitle.innerHTML = `Que tal dar uma respidara?<br>
  <strong class="app__title-strong">Faça uma pausa curta!</strong>`;

      break;

    case "descanso-longo":
      appTitle.innerHTML = `Hora de voltar à superfície.<br>
  <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    tempoZerado.play();
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPause.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPause.play();
    zerar();
    estadoImageBotaoPlay.setAttribute("src", "./imagens/play_arrow.png");
    iniciarPausar.textContent = "Retomar";
    return;
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  estadoImageBotaoPlay.setAttribute("src", "./imagens/pause.png");
  iniciarPausar.textContent = "Pausar";
}

function zerar() {
  clearTimeout(intervaloId);
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();

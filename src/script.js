var inputBotão = document.querySelector('input#playButton')
let board = document.querySelector('div#board')


const cardTypes = [
  './img/beerparrot.gif',
  './img/portal_blue_parrot.gif',
  './img/hypno_parrot_dark.gif',
  './img/kindasusparrot.gif',
  './img/laptop_parrot.gif',
  './img/original_parrot.gif',
  './img/portal_blue_parrot.gif',
]

let virouCard = false
let primeiroCard, segundoCard
let trancarBoard = false



function jogar() {
    let aux = window.prompt('Quantas cartas irá jogar? (4-14)')
  
    while (isNaN(Number(aux)) || !validarContagemDePares(Number(aux))) {
      aux = Number(
        window.prompt(`Valor inválido, insira o número novamente \n
          Quantas cartas irá jogar? (4-14)`)
      )
}
  
    const totalPares = Number(aux) / 2
    jogo(totalPares)
}  

function validarContagemDePares(n) {
    return n > 0 && n % 2 == 0
}

function jogo(contagemDePares) {
    inputBotão.style.display = 'none'
  
    const uniqueCards = cardTypes.slice(0, contagemDePares).map(
      (imgPath) => `
          <div class="card">
            <img
              class="frente"
              src="${imgPath}"
              alt="Face da carta"
            />
            <img class="verso" src="./img/verso.png" alt="Verso da carta" />
          </div>
        `
    )
    const cardPairs = [...uniqueCards, ...uniqueCards]
    const cardsEmbaralhados = embaralharCards(cardPairs)
    board.innerHTML = cardsEmbaralhados
  

    adicionarCards()
}
  
function adicionarCards() {
    const cards = document.querySelectorAll('.card')
  
    cards.forEach((card) => {
      card.addEventListener('click', giroCard)
    })
}
  
  

function giroCard() {
  if (trancarBoard) return
  if (this === primeiroCard) return

  this.classList.add('flip')
  if (!virouCard) {
    virouCard = true
    primeiroCard = this
    return
  }

  segundoCard = this
  virouCard = false
  checarPares()
}

function checarPares() {
  if (primeiroCard.dataset.card === segundoCard.dataset.card) {
    inativarCards()
    return
  }

  desvirarCards()
}

function inativarCards() {
  primeiroCard.removeEventListener('click', giroCard)
  segundoCard.removeEventListener('click', giroCard)

  limparBoard()
}

function desvirarCards() {
   trancarBoard = true

  setTimeout(() => {
    primeiroCard.classList.remove('flip')
    segundoCard.classList.remove('flip')

    limparBoard()
  }, 1500)
}

function limparBoard() {
  ;[virouCard, trancarBoard] = [false, false]
  ;[primeiroCard, segundoCard] = [null, null]
}

function embaralharCards(cards) {
    return cards.sort(() => 0.5 - Math.random())
}
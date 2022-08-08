//objeto criado para manipular os dados
var state = { board: [], currentGame: [], savedGames: [] };

function start() {
  readLocalStorage();
  createBoard();
  newGame();
}

function readLocalStorage() {
  //verificar se há o local storage no navegador, porque não são todos que tem
  if(!window.localStorage){
    return;
  }

  var savedGamesFromLocalStorage = window.localStorage.getItem('saved-games');

  if(savedGamesFromLocalStorage) {
    state.savedGames = JSON.parse(savedGamesFromLocalStorage);
  }
}

function writeToLocalStorage() {
  window.localStorage.setItem('saved-games', JSON.stringify(state.savedGames));
}

//função para construir o array com os números da mega
function createBoard() {
  state.board = [];

  for (var i = 1; i <= 60; i++) {
    state.board.push(i);
  }
}

//função que vai zerar o jogo
function newGame() {
  resetGame();
  render();
}

//função para colocar visualmente o jogo no browser
function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

//função que vai construir o board
function renderBoard() {
  var divBoard = document.querySelector("#megasena-board");
  divBoard.innerHTML = "";

  var ulNumbers = document.createElement("ul");
  ulNumbers.classList.add("numbers");

  for (var i = 0; i < state.board.length; i++) {
    var currentNumber = state.board[i];

    var liNumber = document.createElement("li");
    liNumber.textContent = currentNumber;
    liNumber.classList.add("number");

    liNumber.addEventListener("click", handleNumberClick);

    if (isNumberInGame(currentNumber)) {
      liNumber.classList.add("selected-number");
    }

    ulNumbers.appendChild(liNumber);
  }

  divBoard.appendChild(ulNumbers);
}

//ao clicar se já estiver com o número, vamos remover
//se ainda não estiver, vamos adicionar
function handleNumberClick(event) {
  var value = Number(event.currentTarget.textContent);

  if (isNumberInGame(value)) {
    removeNumberFromGame(value);
  } else {
    addNumberToGame(value);
  }
  render();
}

//renderizar os botões
function renderButtons() {
  var divButtons = document.querySelector("#megasena-buttons");
  divButtons.innerHTML = "";

  var buttonNewGame = createNewGameButton();
  var buttonRandomGame = createRandomGameButton();
  var buttonSaveGame = createSaveGameButton();
  var buttonClearSavedGames = createClearSavedGames();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
  divButtons.appendChild(buttonClearSavedGames);
}

function createNewGameButton() {
  var button = document.createElement("button");
  button.textContent = "Novo jogo";
  button.classList.add('button-blue');

  button.addEventListener("click", newGame);

  return button;
}

function createRandomGameButton() {
  var button = document.createElement("button");
  button.textContent = "Jogo aleatório";
  button.classList.add('button-orange');

  button.addEventListener("click", randomGame);

  return button;
}

function createSaveGameButton() {
  var button = document.createElement("button");
  button.textContent = "Salvar jogo";
  button.disabled = !isGameComplete();
  button.classList.add('button-green');

  button.addEventListener("click", saveGame);

  return button;
}

function createClearSavedGames() {
  var button = document.createElement("button");
  button.textContent = "Limpar jogos salvos";
  button.disabled = !isGameSaved();
  button.classList.add('button-red');

  button.addEventListener("click", clearSavedGames);

  return button;
}

//função para salvar os jogos
function renderSavedGames() {
  var divSavedGames = document.querySelector("#megasena-saved-games");
  divSavedGames.innerHTML = "";

  var savedGame = state.savedGames;

  if (savedGame.length === 0) {
    divSavedGames.innerHTML = "<p>Nenhum jogo salvo</p>";
  } else {
    var ulSavedGames = document.createElement('ul');

    for(var i = 0; i < savedGame.length; i++){
        var currentGame = savedGame[i];

        var liGame = document.createElement('li');
        liGame.textContent = currentGame.join(', ');

        ulSavedGames.appendChild(liGame);
    }
    divSavedGames.appendChild(ulSavedGames);
  }

}

//função para adicionar números
function addNumberToGame(numberToAdd) {
  //números da mega só podem ser de 1 à 60
  if (numberToAdd < 1 || numberToAdd > 60) {
    console.error("Número inválido = ", numberToAdd);
    return;
  }

  //só podem ser 6 números
  if (state.currentGame.length >= 6) {
    console.error("O jogo já está completo.");
    return;
  }

  //verifica se o número já existe
  if (isNumberInGame(numberToAdd)) {
    console.error("Este número já está no jogo", numberToAdd);
    return;
  }

  //push = insere um elemento no array
  state.currentGame.push(numberToAdd);
}

//função para remover o número ao clicar nele 2 vezes
function removeNumberFromGame(numberToRemove) {
  //números da mega só podem ser de 1 à 60
  if (numberToRemove < 1 || numberToRemove > 60) {
    console.error("Número inválido = ", numberToRemove);
    return;
  }

  var newGame = [];

  for (var i = 0; i < state.currentGame.length; i++) {
    var currentNumber = state.currentGame[i];

    //se o número do array for igual ao clique, não fazemos nada
    if (currentNumber === numberToRemove) {
      continue;
    }

    //se for diferente ele adiciona ao array vazio
    newGame.push(currentNumber);
  }

  //no fim é retornado o novo array
  state.currentGame = newGame;
}

//função para não repetir os números
function isNumberInGame(numberToCheck) {
  //se no array está incluído o número
  /*if (state.currentGame.includes(numberToCheck)) {
    return true;
  }

  return false;*/

  return state.currentGame.includes(numberToCheck);
}

//função para salvar os números
function saveGame() {
  if (!isGameComplete()) {
    var currentLenth = state.currentGame.length;
    var lengthError = 6 - currentLenth;
    console.error(
      "O jogo não está completo. Falta(m) ",
      lengthError,
      ", número(s)."
    );
    return;
  }

  state.savedGames.push(state.currentGame.sort(function(a, b){return a - b}));
  writeToLocalStorage();
  newGame();
}

//função para saber se o jogo está completo
function isGameComplete() {
  return state.currentGame.length === 6;
}

//função para zerar o jogo
function resetGame() {
  state.currentGame = [];
}

//montar jogo aleatório
function randomGame() {
  resetGame();

  while (!isGameComplete()) {
    var randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }

  render();
}

function isGameSaved() {
  return state.savedGames.length >= 1;
}

function clearSavedGames(){
  localStorage.clear();
  state.savedGames = [];
  return window.location.reload(true);
}

start();

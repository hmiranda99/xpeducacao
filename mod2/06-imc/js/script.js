function start() {
  var buttonCalculateImc = document.querySelector("#button-calculate-imc");
  buttonCalculateImc.addEventListener("click", handleButtonClick);

  //assim que for alterando ele já vai mudar o resultado na hora
  var inputWeigth = document.querySelector('#input-weigth');
  var inputHeigth = document.querySelector('#input-height');

  inputWeigth.addEventListener('input', handleButtonClick);
  inputHeigth.addEventListener('input', handleButtonClick);

  //o programa já vai começar rodando
  handleButtonClick();
}

function calculateImc(weigth, heigth) {
  return weigth / (heigth * heigth);
}

function handleButtonClick() {
    var inputWeigth = document.querySelector('#input-weigth');
    var inputHeigth = document.querySelector('#input-height');
    var imcResult = document.querySelector('#imc-result');
    
    var weigth = Number(inputWeigth.value);
    var heigth = Number(inputHeigth.value);

    var imc = calculateImc(weigth, heigth);
    //colocar , no lugar do .
    var formattedImc = imc.toFixed(2).replace('.', ',');

    imcResult.textContent = formattedImc;
}

//essa função vai rodar sempre
start();

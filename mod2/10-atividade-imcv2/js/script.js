var cardImc = document.querySelector(".card-imc");
var buttonCalculateImc = document.querySelector("#button-calculate-imc");
var inputWeigth = document.querySelector("#input-weigth");
var inputHeigth = document.querySelector("#input-height");
var labelRangeResult = document.querySelector("#label-range-result");
var svgImc = document.querySelector("#svg-imc");

buttonCalculateImc.addEventListener("click", handleButtonClick);

function calculateImc(weigth, heigth) {
  return weigth / (heigth * heigth);
}

function handleButtonClick() {
  var imcResult = document.querySelector("#imc-result");
  var rangeResult = document.querySelector("#range-result");

  var weigth = Number(inputWeigth.value);
  var heigth = Number(inputHeigth.value);

  if(!weigth || !heigth){
    return;
  }

  var imc = calculateImc(weigth, heigth);
  //colocar , no lugar do .
  var formattedImc = imc.toFixed(2).replace(".", ",");

  var range = rangeImc(imc);

  imcResult.textContent = formattedImc;
  rangeResult.textContent = range;

  cardResult();
  inputResult();
}

function rangeImc(imc) {
  if (imc >= 16 && imc <= 16.9) {
    cardImc.classList.remove("background-gray");
    cardImc.style.backgroundColor = "#7209B7";

    return "Muito abaixo do peso";

  } else if (imc >= 17 && imc <= 18.4) {
    cardImc.classList.remove("background-gray");
    cardImc.style.backgroundColor = "#9B5DE5";

    return "Abaixo do peso";

  } else if (imc >= 18.5 && imc <= 24.99) {
    cardImc.classList.remove("background-gray");
    cardImc.style.backgroundColor = "#0EAD69";

    return "Peso normal";

  } else if (imc >= 25 && imc <= 29.99) {
    cardImc.classList.remove("background-gray");
    cardImc.style.backgroundColor = "#F8961E";

    return "Acima do peso";

  } else if (imc >= 30 && imc <= 34.99) {
    cardImc.classList.remove("background-gray");
    cardImc.style.backgroundColor = "#FF7D00";

    return "Obesidade grau I";

  } else if (imc >= 35 && imc <= 40) {
    cardImc.classList.remove("background-gray");
    cardImc.style.backgroundColor = "#D00000";

    return "Obesidade grau II";

  } else if (imc > 40) {
    cardImc.classList.remove("background-gray");
    cardImc.style.backgroundColor = "#6A040F";

    return "Obesidade grau III";
  }
}

function cardResult() {
  svgImc.style.display = "none";
  labelRangeResult.style.display = "block";
  cardImc.classList.remove("card-imc");
  cardImc.classList.add("card-result");
  cardImc.classList.add("animation-card-in");
}

function inputResult() {
  inputHeigth.disabled = true;
  inputWeigth.disabled = true;
  buttonCalculateImc.innerText = "Calcular novamente";
  buttonCalculateImc.addEventListener("click", handleStartButtonClick);
}

function handleStartButtonClick() {
  window.location.reload(true);
}
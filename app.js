const allKeys = document.querySelector(".calculatorKeys")
const display = document.querySelector(".calculatorDisplay")
const displayNum = document.querySelector(".displayNum")
const radioNeutral = document.getElementById("radio-neutral")
const radioNo = document.getElementById("radio-no")
const radioYes = document.getElementById("radio-yes")
const operatorKey = document.getElementsByClassName("operator")
const numberBtns = document.getElementsByClassName("number")
const decimal = document.getElementById("decimal")
const equalTo = document.getElementById("equal-to")
const reset = document.getElementById("reset")
const del = document.getElementById("del")

let displayVal = "0"
let pendingVal
let evalStringArray = []

let numberArr = Array.from(numberBtns)
numberArr.forEach(function (numberBtns) {
  numberBtns.addEventListener("click", updateDisplay, false)
})

// Calculator Display
function updateDisplay(e) {
  const btnText = e.target.innerText
  if (displayVal === "0") {
    displayVal = btnText
    displayNum.innerHTML = parseFloat(displayVal).toLocaleString("en-US")
  } else {
    displayVal += btnText
    displayNum.innerHTML = parseFloat(displayVal).toLocaleString("en-US")
  }
  e.preventDefault()
}

// Handle Operation
let operatorArr = Array.from(operatorKey)
operatorArr.forEach(function (operatorKey) {
  operatorKey.addEventListener("click", performOperation)
})

function performOperation(e) {
  const operation = e.target.innerText

  switch (operation) {
    case "+":
      pendingVal = displayVal
      displayVal = "0"
      displayNum.innerHTML = displayVal
      evalStringArray.push(pendingVal)
      evalStringArray.push("+")
      break
    case "-":
      pendingVal = displayVal
      displayVal = "0"
      displayNum.innerHTML = displayVal
      evalStringArray.push(pendingVal)
      evalStringArray.push("-")
      break
    case "*":
      pendingVal = displayVal
      displayVal = "0"
      displayNum.innerHTML = displayVal
      evalStringArray.push(pendingVal)
      evalStringArray.push("*")
      break
    case "/":
      pendingVal = displayVal
      displayVal = "0"
      displayNum.innerHTML = displayVal
      evalStringArray.push(pendingVal)
      evalStringArray.push("/")
      break
    case "=":
      evalStringArray.push(displayVal)
      let evaluation = eval(evalStringArray.join(""))
      displayVal = evaluation + ""
      displayNum.innerText = parseFloat(displayVal).toLocaleString("en-US")
      evalStringArray = []
      break
    default:
      break
  }
  e.preventDefault()
}

document.addEventListener("DOMContentLoaded", getTheme)
reset.addEventListener("click", resetDisplay)
del.addEventListener("click", delDisplay)
decimal.addEventListener("click", decimalKey)
radioNeutral.addEventListener("change", neutralColor)
radioNo.addEventListener("change", noColor)
radioYes.addEventListener("change", yesColor)

function resetDisplay() {
  displayVal = "0"
  pendingVal = undefined
  evalStringArray = []
  displayNum.innerHTML = parseFloat(displayVal).toLocaleString("en-US")
}
function delDisplay(index) {
  displayVal = displayVal.slice(index, -1)

  if (displayVal === "") {
    displayVal = "0"
  }
  displayNum.innerHTML = parseFloat(displayVal).toLocaleString("en-US")
}
function decimalKey() {
  if (!displayVal.includes(".")) {
    displayVal += "."
    displayNum.innerHTML = displayVal
  }
}

// Calculator Themes
function neutralColor() {
  let theBody = document.body
  if (this.checked) {
    theBody.className = "theme2"
  }
  storeThemeToLocalStorage((theBody.className = "theme2"))
}
function noColor() {
  let theBody = document.body
  if (this.checked) {
    theBody.className = "theme3"
  }

  // Store Themes in Local Storage
  storeThemeToLocalStorage((theBody.className = "theme3"))
}
function yesColor() {
  let theBody = document.body
  if (this.checked) {
    theBody.className = "default"
    theBody.style.transition = "0.8s ease"
  }

  // Store Themes in Local Storage
  storeThemeToLocalStorage((theBody.className = "default"))
}

// Store Themes in Local Storage
function storeThemeToLocalStorage(theme) {
  let themes
  if (localStorage.getItem("themes") === null) {
    themes = []
  } else {
    themes = JSON.parse(localStorage.getItem("themes"))
  }
  themes[0] = theme
  localStorage.setItem("themes", JSON.stringify(themes))
}

// Get theme from Local Storage
function getTheme() {
  const theBody = document.body
  let themes
  if (localStorage.getItem("themes") === null) {
    themes = ["default"]
  } else {
    themes = JSON.parse(localStorage.getItem("themes"))
  }
  theBody.classList = themes[0]
}

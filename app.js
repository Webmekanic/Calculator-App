// Declaring Variables
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

// Convert HTML Collection to Array
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
document.addEventListener("DOMContentLoaded", getChecked)
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
  let theme2Checked = "t2checkedno"
  if (this.checked) {
    theBody.className = "theme2"
    theme2Checked = "t2checkedyes"
  }
  storeThemeToLocalStorage("theme2", theme2Checked)
}
function noColor() {
  let theBody = document.body
  let theme3Checked = "t3checkedno"
  if (this.checked) {
    theBody.className = "theme3"
    theme3Checked = "t3checkedyes"
  }
  // Store Themes in Local Storage
  storeThemeToLocalStorage("theme3", theme3Checked)
}
function yesColor() {
  let theBody = document.body
  let theme1Checked = "t1checkedno"
  if (this.checked) {
    theBody.className = "default"
    theBody.style.transition = "0.8s ease"
    theme1Checked = "t1checkedyes"
  }

  // Store Themes in Local Storage
  storeThemeToLocalStorage("default", theme1Checked)
}

// Store Themes in Local Storage
function storeThemeToLocalStorage(theme, checkedTheme) {
  setTheme(theme)
  setChecked(checkedTheme)
}

function setTheme(theme) {
  let themes
  if (localStorage.getItem("themes") === null) {
    themes = "default"
  } else {
    themes = theme
  }

  localStorage.setItem("themes", themes)
}

function setChecked(checkedTheme) {
  let checked
  if (localStorage.getItem("checked") === null) {
    checked = "t1checkedyes"
  } else {
    checked = checkedTheme
  }

  localStorage.setItem("checked", checked)
}

// Get theme from Local Storage
function getTheme() {
  const theBody = document.body
  let themes
  if (localStorage.getItem("themes") === null) {
    theBody.className = "default"
    localStorage.setItem("themes", "default")
  } else {
    themes = localStorage.getItem("themes")
    theBody.classList.add(themes)
  }
}

function getChecked() {
  const radios = document.getElementsByName("event")
  const checked = localStorage.getItem("checked")
  const radioYes = document.getElementById("radio-yes")

  if (checked === null) {
    radioYes.checked = true
    localStorage.setItem("checked", "t1checkedyes")
  } else {
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].value === checked) {
        radios[i].checked = true
      }
    }
  }
}

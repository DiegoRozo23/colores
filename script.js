let root = document.documentElement;
let colorToGuess = document.getElementById("colorToGuess")
let buttonNav = document.querySelectorAll(".nav button") 
let allBoxes = document.querySelectorAll(".boxes div")
let getCssVariable = getComputedStyle(document.documentElement)
let checkColor = document.querySelector(".nav h1")
function randomRgb() {
    let round = Math.round, random = Math.random, value = 255;
    return 'rgb(' + round(random()*value) + ',' + round(random()*value) + ',' + round(random()*value) + ")";
}
function randomColors(numberOfBoxes){
    let principalColor = Math.floor((Math.random() * (numberOfBoxes)) + 1);
    root.style.setProperty(`--color${principalColor}`, colorToGuess.textContent = randomRgb())
    let numbers = [principalColor]
    for(i = 0; i<numberOfBoxes -1; i++){
        let randomNumber = Math.floor((Math.random() * (numberOfBoxes)) + 1)
        if(numbers.includes(randomNumber) === false){ 
            numbers.push(randomNumber)
            root.style.setProperty(`--color${randomNumber}`, randomRgb())
        }
        else i--
    }
}
function selectButton(e){ 
    document.getElementById("selected").id = "notSelected"
    e.target.id = "selected"
}
function resetDefaultValues(){
    checkColor.textContent = ""
    for(let element of document.querySelectorAll(".destroy")) {
        element.classList.remove("destroy");
    }
}
for(button of buttonNav){
    button.addEventListener("click", (e)=>{
        if(e.target.id == "newColors") {
            if(document.querySelector("#selected").className == "easyMode") randomColors(3)
            else randomColors(6)
            resetDefaultValues()
        }
        else if(e.target.className == "easyMode"){
            randomColors(3)
            selectButton(e)
            for(i=4; i<=6; i++)root.style.setProperty(`--color${i}`, "")
            resetDefaultValues()
        }
        else{
            randomColors(6)
            selectButton(e)
            resetDefaultValues()
        }
    })
}
for(box of allBoxes){
    box.addEventListener("click", (e)=>{
        if(colorToGuess.textContent == getCssVariable.getPropertyValue(`--${e.target.id}`)){
            checkColor.textContent = "Correct!"
            root.style.setProperty("--mainColor", getCssVariable.getPropertyValue(`--${e.target.id}`))
        }
        else{
            checkColor.textContent = "Incorrect!"
            root.style.setProperty(`--${e.target.id}`, "")
            e.target.className = "destroy"
        }
    })
}
document.addEventListener('DOMContentLoaded',function(){randomColors(6)})




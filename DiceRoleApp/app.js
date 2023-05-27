const buttonEl  =  document.getElementById("roll-button");
const diceEl =  document.getElementById("dice");
const roleHistoryEl = document.getElementById("roll-history");
let historyList = [];


function updateRollHistory(){
    roleHistoryEl.innerHTML = "";
    for(let i = 0 ; i <historyList.length; i++){
        
        var listItem = document.createElement("li");
        listItem.innerHTML =`Roll ${i+1} : <span>${historyList[i]}</span>`
        roleHistoryEl.appendChild(listItem);
    }
}

function rollDice(){
    const rollResult = Math.floor(Math.random() * 6) +1; 
    const diceFace = getDiceFace(rollResult);
    diceEl.innerHTML = diceFace;
    historyList.push(diceFace);
    updateRollHistory();
}

function getDiceFace(rollResult){
    switch(rollResult){
        case 1:
            return "&#9856;";
        case 2:
            return "&#9857;";
        case 3:
            return "&#9858;";
        case 4:
            return "&#9859;";
        case 5:
            return "&#9860;";
        case 6:
            return "&#9861;";
        default :
            return "Nan"; 
    } 
}

function addAnimation(){
    diceEl.classList.add("roll-animation");
}

function  removeAnimation(){
    diceEl.classList.remove("roll-animation");
}

buttonEl.addEventListener("click", function(event){
    addAnimation()
    rollDice();
    setTimeout(() => {
        removeAnimation();

    }, 2000);
  
})


const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const SELECTIONS = [
    {
        name:'rock',emoji:'✊', beats:'scissors',
    },
    {
        name:'paper',emoji:'🖐️', beats:'rock',
    },
    {
        name:'scissors',emoji:'✌️', beats:'paper',
    }
]
selectionButtons.forEach(selectionButton=>{
    selectionButton.addEventListener('click', e=>{
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection=>selection.name === selectionName);
        makeSelection(selection);
    })
})
function makeSelection(selection){
    const computerChoice = randomSelection();
    const youWin = isVictor(selection, computerChoice);
    const computerWin = isVictor(computerChoice, selection);
    addSelectionResult(randomSelection(), computerWin);
    addSelectionResult(selection, youWin);
    if(youWin){incrementScore(yourScoreSpan);}
    else{incrementScore(computerScoreSpan);}
    //console.log(computerChoice);
}
function incrementScore(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText)+1;//taking current text and converting it into an integer and adding 1 to it
}
function addSelectionResult(selection, winner){
    const div = document.createElement('div');
    div.innerText=selection.emoji;
    div.classList.add('result-selection');
    if(winner){
        div.classList.add('winner');
    }
    finalColumn.after(div);
}

function randomSelection(){
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);// gives a number 0,1,2
    return SELECTIONS[randomIndex];
}
function isVictor(playerSelection, computerSelection){
    return playerSelection.beats===computerSelection.name;
}
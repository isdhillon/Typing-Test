//time limit
let timeLimit=60;
//quotes array
let quotesArray = [
    "No one is perfect - that’s why pencils have erasers.",
    "You’re braver than you believe, and stronger than you seem, and smarter than you think.",
    "Once you replace negative thoughts with positive ones, you’ll start having positive results",
    "When you are enthusiastic about what you do, you feel this positive energy. It’s very simple.",
    "Winning is fun, but those moments that you can touch someone’s life in a very positive way are better.",
    "You always pass failure on the way to success.",
    "It makes a big difference in your life when you stay positive."
  ];
//declarations
let time =document.querySelector(".time");
let accuracy=document.querySelector(".accuracy");
let cpm=document.querySelector(".cpm");
let wpm=document.querySelector(".wpm");
let error=document.querySelector(".errors");
let quote=document.querySelector(".quote-section");
let input=document.querySelector(".input");
let restartBtn=document.querySelector(".restart");
let inputArea=document.querySelector(".typing-section")
let cpmButton=document.querySelector(".display-buttons .cpm")
let wpmButton=document.querySelector(".display-buttons .wpm")
//default values
let timeLeft=timeLimit;
let timeElapsed=0;
let totalErros=0;
let errors=0;
let accuracyValue=0;
let characterTyped=0;
let currentQuote="";
let quoteNo=0;
let timer=null;

//updating quotes
function updateQuote(){
    quote.innerText=null;
    //getting the current quote
    currentQuote=quotesArray[quoteNo];
    //splitting the quote
    currentQuote=currentQuote.split("")
    for(let i=0;i<currentQuote.length;i++)
    {   let char=currentQuote[i]
        //making span element for the quote
        let charSpan=document.createElement('span')
        charSpan.innerText=char;
        //appending child
        quote.appendChild(charSpan)
        //updating the quote
    if(quoteNo<quotesArray.length-1){
        quoteNo++;
    }
    else{
        quoteNo=0
    }
}
}
//processing the entered text
function processEnteredText()
//input of text area
{
    currentInput=input.value;
    //splitting it
    currentInputArray=currentInput.split("");
    //increment character typed
    characterTyped++;
    errors=0;
    //getting the current quote span array
    quoteSpanArray=quote.querySelectorAll("span");
    for(let i=0;i<quoteSpanArray.length;i++) {
        //quote character
        let char=quoteSpanArray[i]
        //typed character
        let typedChar=currentInputArray[i];
        //if null
        if(typedChar==null){
            //remove classes
            char.classList.remove('correct-char')
            char.classList.remove('incorrect-char')
            
        }
        //if matches
        else if(typedChar==char.innerText){
            char.classList.add("correct-char")
            char.classList.remove("incorrect-char")
            
        }
        //if not matches
        else{
            char.classList.remove("correct-char")
            char.classList.add("incorrect-char")
            errors++
        }
    }
        //displaying the errors
        error.innerText=totalErros+errors;
    //correct charcters typed
    let correctCharacters=(characterTyped-(totalErros+errors));
    //accuracy level 
    let accuracyVal=((correctCharacters/characterTyped)*100)
    //displayi accuracy
    accuracy.innerText=Math.round(accuracyVal)
    //current array and input text length matches change the quote
    if(currentInput.length==currentQuote.length){
        updateQuote()
        //update total eros
        totalErros=totalErros+errors
        //reset text field
        input.value=""
    }
}
//update timer
function updateTimer(){
    if(timeLeft>0){
        //displaying timer
        timeLeft--
        timeElapsed++
        time.innerText=timeLeft+"s"
    }
    else{
        //when the timer ends
        finishGame()
    }
}
//finishing game
function finishGame(){
    //clearing the interval
    clearInterval(timer)
    input.disabled=true;
    quote.innerText="click on restart to start a new game"
    restartBtn.style.display="block";
    //finding character per minute
    cpmValue = Math.round(((characterTyped / timeElapsed) * 60));
    //words per limit
    wpmValue = Math.round((((characterTyped / 5) / timeElapsed) * 60));
//displaying values
  cpm.innerText=cpmValue;
  wpm.innerText=wpmValue
    //showing the buttons
  cpmButton.parentElement.style.display="block"
  wpmButton.parentElement.style.display="block"
}
//start the game
function startGame(){
    //reset values
    resetValues();
    //update quotes
    updateQuote();
    //clear timer
    clearInterval(timer);
    //making timer the function is rum after every 1 second
    timer=setInterval(updateTimer,1000)
}
//reset values
function resetValues(){
    timeLeft=timeLimit;
    timeElapsed;
    errors=0;
    totalErros=0;
    accuracyValue=0;
    characterTyped=0;
    quoteNo=0;
    input.disabled=false;
    input.value=""
    quote.innerText="Click on the area below to start the game."
    accuracy.innerText=100;
    time.innerText=timeLeft+'s'
    error.innerText=0;
    //hiding the buttons
    restartBtn.style.display="none"
    cpmButton.parentElement.style.display="none"
    wpmButton.parentElement.style.display="none"
}
//event listeners
restartBtn.addEventListener("click",resetValues);
//when the input text comes in focus game starts
input.addEventListener("focus",startGame);
//when we type text
input.addEventListener("input",processEnteredText)
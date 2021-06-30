var startButton = document.querySelector("#start-button");
var timerEl = document.querySelector("#timer");
var headerEl = document.querySelector("#title");
var mainEl = document.querySelector("#answers");
var directionsEl = document.querySelector("#content");
var buttonEl = document.querySelector("button");
var correctEl = document.querySelector("#correct-answer");
var incorrectEl = document.querySelector("#incorrect-answer");
var highScoreEl = document.querySelector("#highscores")
var highscoreForm = document.querySelector("#highscore-form")
var initialsEl = document.querySelector("#initials")
var listEl = document.querySelector("#highscores-list")

var questionNumber = 0;
var timer = 30;
var score = 0;
var scoreInfo = []
var questionAnswers = [
    {question: "_ are any grouping of characters (letters, spaces, numbers, or symbols) surrounded by single quotes or double quotes",
     answer1: "Strings",
     answer2: "Booleans",
     answer3: "Numbers",
     answer4: "Null",        
     correct: "Strings", 
    },
    {question: "_ include the set of all integers and floating point numbers",
    answer1: "Strings",
    answer2: "Booleans",
    answer3: "Numbers",
    answer4: "Null",
    correct: "Numbers",
    },
    {question: "_ can be either true or false",
    answer1: "Strings",
    answer2: "Booleans",
    answer3: "Numbers",
    answer4: "Null",
    correct: "Booleans",
    },
    {question: "_ represents the intentional absence of value",
    answer1: "Strings",
    answer2: "Booleans",
    answer3: "Numbers",
    answer4: "Null",
    Correct:"Null",
    },
];

function startTimer() {
    var timeInterval = setInterval(function() {
      timer--;
      timerEl.textContent = `Time remaing: ${timer}`;
      if (timer <= 0) {
          clearInterval(timeInterval);
    }

    }, 1000);
}   

function choiceHandler(event) {
    console.log(this.name)
    console.log(questionAnswers[questionNumber].correct)
    if (this.name == questionAnswers[questionNumber].correct) {
        score++
    }
    else {
        timer = timer - 5

    }
    questionNumber++
    loadQuestions()

}


function loadQuestions() {

    startButton.style.display = 'none'
    directionsEl.textContent = ''
    while (mainEl.lastElementChild) {
        mainEl.removeChild(mainEl.lastElementChild)  
    } 
    if(questionNumber <= questionAnswers.length - 1 && timer > 0) {
        headerEl.textContent = questionAnswers[questionNumber].question
        for (const [key, value] of Object.entries(questionAnswers[questionNumber])) {
            var choice = document.createElement("button")
            choice.textContent = questionAnswers[questionNumber][key]
            choice.setAttribute('name',questionAnswers[questionNumber][key])
            mainEl.append(choice)  
            mainEl.firstChild.style.display = "none"
            
            choice.addEventListener("click", choiceHandler)
         }
}
    else { 
        headerEl.textContent = `You have scored ${score}. Please insert your initials to save your score!`
        highscoreForm.style.display = "block"

    }
}

console.log(highscoreForm.lastChild.value)
highscoreForm.addEventListener("submit",function(event){
    event.preventDefault()
    console.log(document.querySelector("#initials").value);
    initials = initialsEl.value.trim();-+ 
    scoreInfo.push({'initials': initials, 'score': score});

    localStorage.setItem("userData", JSON.stringify(scoreInfo));
    highscores()
       }) 


function highscores() {
    headerEl.textContent = 'HighScores'
    while (highscoreForm.lastElementChild) {
        highscoreForm.removeChild(highscoreForm.lastElementChild)  
    } 
    var storedData = JSON.parse(localStorage.getItem("userData"));


    if (storedData !== null) {
      scoreInfo = storedData;
    }
    console.log(scoreInfo.initials)
  for (var i = 0; i < scoreInfo.length; i++) {
    var info = `Initials: ${scoreInfo[i].initials} Score: ${scoreInfo[i].score}`;

    var li = document.createElement("li");
    li.textContent = info;
    li.setAttribute("data-index", i);

    console.log(listEl)
    listEl.appendChild(li);

  }
    
  }

  highScoreEl.addEventListener('click', highscores)

function startQuiz() {
    startTimer()
    loadQuestions()

}

startButton.addEventListener("click", startQuiz)



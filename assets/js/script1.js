const startButton = document.getElementById("start-btn")
const questionContainerEl = document.getElementById("question-container")
const questionEl = document.getElementById("question")
const answerButtonsEl = document.getElementById("answer-buttons")
const timeLeftDisplay = document.querySelector("#time-left")
const startBtn = document.querySelector("#start-btn")
const initialBtn = document.querySelector("#initials-btn")
const initialInput = document.querySelector("#initial-input")
const initialEl = document.getElementById("initials")
const scoreDisplay = document.getElementById("high-scores")
const highScores = []
const answerStatusEl = document.getElementById("answer-status")
var selectAnswerTimeout = null
let timeLeft = 10;
let score = 0;
let shuffledQuestions, currentQuestionIndex 

//reset the quiz
function resetState() {
    timeLeftDisplay.innerHTML = 10
    timeLeft = 10
    startTimer()
    score = 0
    initialInput.value = ""
    initialBtn.setAttribute("disabled", true)
}

// function to begin quiz
function startQuiz() {
    resetState()
    startButton.classList.add("hide")
    scoreDisplay.classList.add("hide")
    questionContainerEl.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide") 
    setNextQuestion();
}

// timer variables
var myTimer = null
var timer = function(){
    if(timeLeft <= 0) {
        stopTimer();
        enterInitials();
    } 
    const time = --timeLeft
    timeLeftDisplay.innerHTML = time < 0 ? 0 : timeLeft
    }

 //timer function   
 function startTimer() {
     myTimer = setInterval(timer, 1000)
}

function stopTimer() {
   if (myTimer) {clearInterval(myTimer)}
   timeLeftDisplay.innerHTML = timeLeft < 0 ? 0 : timeLeft
}


//score function   
 function keepScore(isCorrect){
        if(isCorrect) {
            score++
        } else {
            timeLeft -= 2
        }
    }

// function to begin next Question
function setNextQuestion() {
    //change the visible answers
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
        (answerButtonsEl.firstChild)
    }
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }

//function to make question appear
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText= answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button) 
    })
}

//shuffle through questions array
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    keepScore(correct)
    answerStatusEl.innerHTML = correct ? "Correct, one point has been added!" : "Wrong, two seconds have been deducted"
    selectAnswerTimeout = setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++
            answerStatusEl.innerHTML = ""
            setNextQuestion()
        } else { 
            stopTimer()
            enterInitials()
            answerStatusEl.innerHTML = ""
        }
    }, 1000)
    
}

//intials function
function enterInitials() {
    initialEl.classList.remove("hide")
    questionContainerEl.classList.add("hide")
}

//save score
function saveScore() {
//    var saveScore = {initials: initialInput.value, 
//      score: "score" 
//     }
    // highScores.push(saveScore)
        var scoreDiv = document.createElement("div")
        scoreDiv.innerHTML = "<h2>" + initialInput.value + "</h2><div>" + score + "</div"
        document.getElementById("scoreContainer").append(scoreDiv)
    displayScores()
}

//ensure initials are entered before saving
function handleSubmitButtonState() {
   if (initialInput.value) {
       initialBtn.removeAttribute("disabled")
   } else {
      initialBtn.setAttribute("disabled", true)
   }

}
//display scores
function displayScores() {
    initialEl.classList.add("hide")
    scoreDisplay.classList.remove("hide")
    startButton.innerText = "restart"
    startButton.classList.remove("hide") 
}

function viewHighScores(){
    stopTimer()
    clearTimeout(selectAnswerTimeout)
    questionContainerEl.classList.add("hide")
    displayScores()
}


//questions array
var questions = [
    {
        question: "What is DOM?",
        answers: [
            {text: 'Document Object Model', correct: true},
            {text: 'Definitive Object Model', correct: false},
            {text: 'Document Orientation Model', correct: false},
            {text: 'none of the above', correct: false}
        ]
    },
    {
        question: "Select the Correct Statement",
        answers: [
            {text: 'You can use JavaScript to create interactive web elements', correct: true},
            {text: 'JavaScript is used only for web apps', correct: false},
            {text: 'JavaScript is a server-side only language', correct: false},
            {text: 'none of the above', correct: false}
        ]
    },
    {
        question: "What extension is used for the JavaScript file?",
        answers: [
            {text: '.js', correct: true},
            {text: '.java', correct: false},
            {text: '.javaS', correct: false},
            {text: '.javascript', correct: false}
        ]
    }
]

document.addEventListener("DOMContentLoaded", () => {
startButton.addEventListener("click", startQuiz)
initialBtn.addEventListener("click", saveScore)
initialInput.addEventListener("input", handleSubmitButtonState)
})

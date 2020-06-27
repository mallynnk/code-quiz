var startButton = document.getElementById("start-btn")
var nextButto n= document.getElementById("next-btn")
var questionContainerEl = document.getElementById("question-container")
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById("answer-buttons")

let shuffledQuestions, currentQuestionIndex

function startGame()  {
    startButton.classList.add("hide")
    shufledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide")
    setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText= answer.text
        button.className.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button) 
    })
} 

function resetState() {
    nextButton.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild (answerButtonsEl.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => { 
        setStatusClass(button, button.dataset.correct)
    })
}

var questions = [
    {
        question: "What is 2 +2?",
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false},
            {text: '5', correct: false},
            {text: '17', correct: false}
        ]
    }
]





//TIMER
// var timer;
// var time = 30;
// var timerDiv = document.getElementById("time");
// function count(){
//     console.log("THIS IS THE TIME! ", time);
//     time--;
//     timerDiv.textContent = time
//     if(time===0){
//         clearInterval(timer)
//     }
// }

// timer = setInterval(count,1000)

startButton.addEventListener("click", startGame)
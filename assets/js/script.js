var startButton = document.getElementById("start-btn")
var nextButton= document.getElementById("next-btn")
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
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText= answer.text
        button.className.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button) 
    })
} 

function resetState() {
    clearStatusClass(document.body)
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
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "restart"
        startButton.classList.remove("hide") 
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(elemenet) {
    element.classList.remove("correct")
    element.classLIst.remove("wrong")
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
    },
    {
        question: "What is 2 +2?",
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false},
            {text: '5', correct: false},
            {text: '17', correct: false}
        ]
    },
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
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})
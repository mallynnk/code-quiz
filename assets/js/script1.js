const timeLeftDisplay = document.querySelector("#time-left")
const scoreDisplay = document.querySelector("#score")
const startBtn = document.querySelector("#start-btn")
const startButton = document.getElementById("start-btn")
const nextButton= document.getElementById("next-btn")
const questionContainerEl = document.getElementById("question-container")
const questionEl = document.getElementById("question")
const answerButtonsEl = document.getElementById("answer-buttons")
let timeLeft = 30;
let score = 0;
let shuffledQuestions, currentQuestionIndex 


// function to begin quiz
function startQuiz() {
    startButton.classList.add("hide")
    questionContainerEl.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide") 
    setNextQuestion();
    keepScore()
}


 //timer function   
 function countDown() {
    setInterval(function(){
        if(timeLeft <= 0) {
            clearInterval(timeLeft = 0);
           // window.alert("Your time is up!")
            //startQuiz()
        }
        //console.log(timeLeft);
        timeLeftDisplay.innerHTML = timeLeft
        timeLeft -= 1
    }, 1000)
}


 //score function   
 function keepScore() {
    setInterval(function(){
        if(answer.correct) {
            score = score +1
        } else {
            timeLeft = timeLeft -2
        }
        console.log(score);
        scoreDisplay.innerHTML = score
    })
}


function keepScore() {
    if(question = true) {
        score = score++
        console.log(score)
    } else {
    timeLeft = timeLeft -2 
    }
}


// function to begin next Question
function setNextQuestion() {
        resetState()
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

    //change the visible answers
    function resetState() {
        nextButton.classList.add("hide")
        while (answerButtonsEl.firstChild) {
            answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
        }
    }
    
    //shuffle through questions array
    function selectAnswer(e) {
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
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
    
    //correct and wrong functions
    function setStatusClass(element, correct) {
        clearStatusClass(element)
        if (correct) {
            element.classList.add("correct")
        } else {
            element.classList.add("wrong")
        }
        console.log(element);
    }
    
    function clearStatusClass(element) {
        element.classList.remove("correct")
        element.classList.remove("wrong")
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
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()})
startBtn.addEventListener("click", countDown)
})

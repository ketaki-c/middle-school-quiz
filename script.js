const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const messageBox = document.getElementById('message-box');
const infoLink = document.getElementById('info-link');
const questionsAttemptedElement = document.getElementById('questions-attempted');
const correctAnswersElement = document.getElementById('correct-answers');
const wrongAnswersElement = document.getElementById('wrong-answers');
const unattemptedElement = document.getElementById('unattempted');

let currentQuestionIndex = 0;
let attempted = 0;
let correct = 0;
let wrong = 0;
let unattempted = 10;
let quizStarted = false;

const questions = [
    { 
        question: "What does PACE stand for?", 
        answers: [
            { text: "Plankton, Aerosol, Cloud, ocean Ecosystem", correct: true }, 
            { text: "Plankton, Atmospheric Composition, Cloud, Ecosystem", correct: false }
        ],
        infoLink: "https://pace.oceansciences.org/overview.htm" 
    },
    { 
        question: "What is a primary focus of the PACE mission?", 
        answers: [
            { text: "Investigating the geological features of Earth", correct: false }, 
            { text: "Studying interactions between ocean organisms, clouds, and aerosols", correct: true }
        ],
        infoLink: "https://pace.oceansciences.org/science.htm" 
    },
    { 
        question: "PACE is designed to help understand the health of which ecosystem?", 
        answers: [
            { text: "Marine ecosystems", correct: true }, 
            { text: "Terrestrial ecosystems", correct: false }
        ],
        infoLink: "https://pace.oceansciences.org/science.htm" 
    },
    { 
        question: "Which vital role do plankton play in the ocean?", 
        answers: [
            { text: "They serve as primary producers in marine food webs", correct: true }, 
            { text: "They act as predators in oceanic ecosystems", correct: false }
        ],
        infoLink: "https://pace.oceansciences.org/phytoplankton.htm" 
    },
    { 
        question: "How does PACE contribute to climate research?", 
        answers: [
            { text: "By tracking temperature changes in various regions", correct: false }, 
            { text: "By measuring the effects of aerosols and clouds on climate systems", correct: true }
        ],
        infoLink: "https://pace.oceansciences.org/science_ocean.htm" 
    },
    { 
        question: "What type of particles does PACE study in the atmosphere?", 
        answers: [
            { text: "Greenhouse gases", correct: false }, 
            { text: "Aerosols", correct: true }
        ],
        infoLink: "https://pace.oceansciences.org/aerosols.htm" 
    },
    { 
        question: "In what way does PACE's data assist with policy-making?", 
        answers: [
            { text: "By providing insights into geological formations", correct: false }, 
            { text: "By informing decisions related to environmental protection and climate action", correct: true }
        ],
        infoLink: "https://pace.oceansciences.org/data.htm" 
    },
    { 
        question: "How are ocean health and air quality interconnected as indicated by PACE?", 
        answers: [
            { text: "Decreased air quality leads to increased marine biodiversity", correct: false }, 
            { text: "Airborne pollutants can negatively impact marine ecosystems", correct: true }
        ],
        infoLink: "https://pace.oceansciences.org/science_ocean.htm" 
    },
    { 
        question: "What significant change does PACE aim to observe over time?", 
        answers: [
            { text: "Shifts in land use patterns", correct: false }, 
            { text: "Variations in ocean color and plankton populations", correct: true }
        ],
        infoLink: "https://pace.oceansciences.org/science.htm" 
    },
    { 
        question: "Which aspect of the Earth's environment does PACE NOT directly study?", 
        answers: [
            { text: "Cloud formation and properties", correct: false }, 
            { text: "Underwater geological formations", correct: true }
        ],
        infoLink: "https://pace.oceansciences.org/instruments.htm" 
    }
];

// Start Quiz button event listener
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    quizStarted = true;
    startScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    infoLink.href = question.infoLink;
    infoLink.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(answer) {
    // Prevent further answer selection
    if (!quizStarted) return;

    attempted++;
    if (answer.correct) {
        correct++;
        messageBox.innerText = "Correct!";
    } else {
        wrong++;
        messageBox.innerText = "Wrong!";
    }
    
    // Update link and show more info
    infoLink.style.display = 'block';

    // Disable all buttons after an answer is selected
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });

    // Update stats in the legend
    updateStats();
    
    // Show next button for the next question
    nextButton.style.display = 'block';
}

// Function to show the next question
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        messageBox.innerText = "";
        nextButton.style.display = 'none';
        infoLink.style.display = 'none';
    } else {
        showResults();
    }
});

function updateStats() {
    questionsAttemptedElement.innerText = attempted;
    correctAnswersElement.innerText = correct;
    wrongAnswersElement.innerText = wrong;
    unattemptedElement.innerText = questions.length - attempted;
}

function showResults() {
    quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: ${correct} / ${questions.length}</p>
    `;
    quizStarted = false;
}

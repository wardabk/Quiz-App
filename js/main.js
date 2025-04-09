const questions = [
    {
        question: "Quelle est la capitale du Maroc ?",
        options: ["Casablanca", "Rabat", "Marrakech", "Fès"],
        answer : "Rabat"
    },
    {
        question: "En quelle année la Première Guerre mondiale a-t-elle commencé ?",
        options: ["1912", "1914", "1916", "1918"],
        answer: "1914"
    },
    {
        question: "Qui a peint la Mona Lisa ?",
        options: ["Pablo Picasso", "Leonard de Vinci", "Vincent van Gogh", "Claude Monet"],
        answer: "Leonard de Vinci"
    },
    {
        question: "Qui a écrit 'Les Misérables' ?",
        options: ["Victor Hugo", "Émile Zola", "Gustave Flaubert", "Albert Camus"],
        answer: "Victor Hugo"
    },
    {
        question: "Qui a remporté la Coupe du Monde de la FIFA 2018 ?",
        options: ["Brésil", "Allemagne", "France", "Argentine"],
        answer: "France"
    },
    {
        question: "Combien de joueurs y a-t-il dans une équipe de basketball ?",
        options: ["5", "6", "7", "8"],
        answer: "5"
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Suivant";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(selectedBtn) {
    const selectedAnswer = selectedBtn.innerHTML;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedAnswer === correctAnswer) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.innerHTML === correctAnswer) {
            button.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Vous avez eu ${score} sur ${questions.length} !`;
    nextButton.innerHTML = "Rejouer";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

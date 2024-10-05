const questions = [
    { question: "What is an exoplanet?", options: ["A planet outside our solar system", "A planet in our solar system", "A star", "A comet"], answer: 0 },
    { question: "What is the most common method for detecting exoplanets?", options: ["Transit method", "Gravitational lensing", "Direct imaging", "Radial velocity method"], answer: 0 },
    { question: "Which of these exoplanets is located in the habitable zone?", options: ["Gliese 581g", "Jupiter", "Mars", "Venus"], answer: 0 },
    { question: "What is a 'Hot Jupiter'?", options: ["A gas giant very close to its star", "A planet hotter than the sun", "A rocky planet", "A small icy planet"], answer: 0 },
    { question: "What does the 'Goldilocks Zone' refer to?", options: ["A region around a star where life can exist", "A zone with no planets", "A star system with three planets", "A planet that is too cold"], answer: 0 },
    { question: "Which telescope is used for detecting exoplanets?", options: ["Kepler Telescope", "Hubble Telescope", "Spitzer Telescope", "Galileo Telescope"], answer: 0 },
    { question: "What is a 'Super-Earth'?", options: ["A planet more massive than Earth but smaller than Uranus", "An Earth-like planet", "A planet orbiting a red dwarf", "A gas giant"], answer: 0 },
    { question: "Which star is closest to the Solar System and hosts an exoplanet?", options: ["Proxima Centauri", "Betelgeuse", "Sirius", "Alpha Centauri"], answer: 0 },
    { question: "Which type of exoplanet is most commonly found?", options: ["Gas giants", "Earth-like planets", "Rocky planets", "Ice giants"], answer: 0 },
    { question: "What does the term 'rogue planet' refer to?", options: ["A planet that does not orbit any star", "A planet moving out of its solar system", "A starless black hole", "A planet orbiting multiple stars"], answer: 0 },
    // Add 10 more questions
    { question: "Which is the nearest exoplanet?", options: ["Proxima b", "Kepler-452b", "Jupiter", "Venus"], answer: 0 },
    { question: "Which of the following is a gas giant exoplanet?", options: ["Kepler-7b", "Earth", "Mars", "Venus"], answer: 0 },
    { question: "What is the transit method used for?", options: ["Detecting exoplanets", "Detecting stars", "Measuring distance between planets", "Finding black holes"], answer: 0 },
    { question: "Which space telescope is primarily designed to search for exoplanets?", options: ["Kepler", "James Webb", "Chandra", "Spitzer"], answer: 0 },
    { question: "What is the primary characteristic of a 'rocky planet'?", options: ["Solid surface", "Gas surface", "Icy surface", "Dusty surface"], answer: 0 },
    { question: "Which is the largest exoplanet discovered so far?", options: ["HD 100546 b", "Kepler-452b", "Mars", "Gliese 581g"], answer: 0 },
    { question: "What does the 'habitable zone' mean?", options: ["Area where liquid water could exist", "Zone with only gas planets", "Zone with no stars", "Cold region in space"], answer: 0 },
    { question: "Which planet in our solar system is often compared to exoplanets?", options: ["Jupiter", "Saturn", "Mars", "Venus"], answer: 0 },
    { question: "How are exoplanets often named?", options: ["By their host star", "By their size", "By their color", "By their temperature"], answer: 0 },
    { question: "Which method can measure the wobble of stars caused by planets?", options: ["Radial velocity", "Direct imaging", "Gravitational lensing", "Transit method"], answer: 0 }
];


let currentQuestionIndex = 0;
let score = 0;
let selectedOptions = Array(questions.length).fill(-1);
let maxQuizHeight = 0;
let maxOptionsHeight = 0;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const resultContainer = document.getElementById('result');
const progressElement = document.getElementById('progress');

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.innerHTML = `<span class="option-label">${String.fromCharCode(65 + index)}.</span> ${option}`;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);

        if (selectedOptions[currentQuestionIndex] === index) {
            button.classList.add('selected');
        }
    });

    nextButton.disabled = selectedOptions[currentQuestionIndex] === -1;
    prevButton.disabled = currentQuestionIndex === 0;
    updateProgressBar();
    updateProgressText();

    // Ensure consistent height
    setTimeout(updateContainerHeight, 0);
}

function selectOption(index) {
    selectedOptions[currentQuestionIndex] = index;
    const optionButtons = optionsContainer.children;
    Array.from(optionButtons).forEach((button, i) => {
        button.classList.toggle('selected', i === index);
    });
    nextButton.disabled = false;
}

function updateProgressBar() {
    const filledWidth = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressElement.style.width = `${filledWidth}%`;
}

function updateProgressText() {
    const progressTextElement = document.getElementById('progress-text');
    progressTextElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showSubmit();
    }
    updateProgressBar(); // Ensure the progress bar updates on the last question
});

prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});

function showSubmit() {
    questionContainer.style.display = 'none';
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';
    resultContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>You've answered all the questions. Are you ready to see your results?</p>
        <button class="submit-button" id="submit-button">Show Results</button>
    `;
    document.getElementById('submit-button').addEventListener('click', showResult);
}

function showResult() {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
        const isCorrect = selectedOptions[index] === question.answer;
        if (isCorrect) correctAnswers++;
    });
    const percentage = (correctAnswers / questions.length) * 100;
    resultContainer.innerHTML = `
        <h2>Your Quiz Results</h2>
        <p>You got ${correctAnswers} out of ${questions.length} questions correct.</p>
        <p>Your score: ${percentage.toFixed(2)}%</p>
        <button class="review-button" id="review-button">Review Answers</button>
    `;
    document.getElementById('review-button').addEventListener('click', showReview);
}

function showReview() {
    questionContainer.style.display = 'block';
    resultContainer.innerHTML = '<h2>Answer Review</h2>';
    optionsContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-review');
        questionDiv.innerHTML = `<strong>${index + 1}. ${question.question}</strong>`;

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options-container');

        question.options.forEach((option, i) => {
            const optionButton = document.createElement('div');
            optionButton.classList.add('option');
            optionButton.innerHTML = `<span class="option-label">${String.fromCharCode(65 + i)}.</span> ${option}`;
            
            if (selectedOptions[index] === i && i === question.answer) {
                optionButton.classList.add('correct-answer');
            } else if (selectedOptions[index] === i) {
                optionButton.classList.add('wrong-answer');
                optionButton.innerHTML += ` <span class="correct-label">(Correct: ${question.options[question.answer]})</span>`;
            } else if (i === question.answer) {
                optionButton.classList.add('correct-answer');
            }

            optionsDiv.appendChild(optionButton);
        });

        questionDiv.appendChild(optionsDiv);
        optionsContainer.appendChild(questionDiv);
    });

    resultContainer.appendChild(document.createElement('hr'));
    const retakeButton = document.createElement('button');
    retakeButton.textContent = 'Retake Quiz';
    retakeButton.classList.add('submit-button');
    retakeButton.addEventListener('click', resetQuiz);
    resultContainer.appendChild(retakeButton);
}

function resetQuiz() {
    currentQuestionIndex = 0;
    selectedOptions = Array(questions.length).fill(-1);
    maxQuizHeight = 0;
    maxOptionsHeight = 0;
    showQuestion();
    questionContainer.style.display = 'block';
    nextButton.style.display = 'inline-block';
    prevButton.style.display = 'inline-block';
    resultContainer.innerHTML = '';
}

function updateContainerHeight() {
    const quizContainer = document.querySelector('.quiz-container');
    const optionsContainer = document.querySelector('.options-container');
    
    // Update max heights if current heights are larger
    maxQuizHeight = Math.max(maxQuizHeight, quizContainer.offsetHeight);
    maxOptionsHeight = Math.max(maxOptionsHeight, optionsContainer.offsetHeight);
    
    // Set the heights to the maximum observed
    quizContainer.style.minHeight = `${maxQuizHeight}px`;
    optionsContainer.style.minHeight = `${maxOptionsHeight}px`;
}

showQuestion();
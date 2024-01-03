const questions = [
  {
    question: "Who was regarded as the meekest man in the Bible ?",
    answers: [
      { text: "Moses", correct: true },
      { text: "Abraham", correct: false },
      { text: "Enoch", correct: false },
      { text: "Daniel", correct: false },
    ],
  },

  {
    question: "Which Prophet was instructed by God to marry an harlot ?",
    answers: [
      { text: "Micah", correct: false },
      { text: "Hosea", correct: true },
      { text: "Ezekiel", correct: false },
      { text: "Amos", correct: false },
    ],
  },

  {
    question: "What was the name of Abraham's wife after the death of Sarah ?",
    answers: [
      { text: "Milcah", correct: false },
      { text: "Zipporah", correct: false },
      { text: "Zilah", correct: false },
      { text: "Keturah", correct: true },
    ],
  },

  {
    question: "What was the name of Moses brother ?",
    answers: [
      { text: "Eleazar", correct: false },
      { text: "Caleb", correct: false },
      { text: "Aaron", correct: true },
      { text: "Joshua", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-buttons");
const nextElement = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;

  score = 0;
  nextElement.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNumber}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextElement.style.display = "none";
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }

  Array.from(answerElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextElement.style.display = "block";
}

function showScore(){
  resetState()
  questionElement.innerHTML = `You scored ${score} out of ${questions.length} i.e ${(score/questions.length)*100}%!`
  nextElement.innerHTML = "Play Again"
  nextElement.style.display = "block";
}
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}
nextElement.addEventListener('click',()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton()
  }else{
    startQuiz();
  }
})
startQuiz();

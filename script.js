const quiz = [
    {
      question: "Qual seleção venceu a Copa do Mundo em 2018?",
      options: ["Brasil", "França", "Alemanha", "Argentina"],
      correct: 1,
    },
    {
      question: "Quantas vezes o Pelé venceu a Copa do Mundo?",
      options: ["1", "2", "3", "4"],
      correct: 2,
    },
    {
      question: "Qual clube é conhecido como 'Los Blancos'?",
      options: ["Barcelona", "Real Madrid", "Juventus", "Manchester United"],
      correct: 1,
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionContainer = document.getElementById("question-container");
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const resultEl = document.getElementById("result");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  
  function loadQuestion() {
    const currentQuestion = quiz[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.classList.add("btn", "btn-light", "d-block", "w-100", "my-2");
      btn.textContent = option;
      btn.addEventListener("click", () => selectOption(index));
      optionsEl.appendChild(btn);
    });
  }
  
  function selectOption(selected) {
    const currentQuestion = quiz[currentQuestionIndex];
    if (selected === currentQuestion.correct) {
      score++;
      resultEl.textContent = "Resposta correta!";
      resultEl.style.color = "#88d498";
    } else {
      resultEl.textContent = `Errado! A resposta correta era: ${currentQuestion.options[currentQuestion.correct]}`;
      resultEl.style.color = "#ff6f61";
    }
    document.querySelectorAll("#options button").forEach((btn, index) => {
      btn.disabled = true;
      if (index === currentQuestion.correct) {
        btn.classList.add("btn-success");
      } else if (index === selected) {
        btn.classList.add("btn-danger");
      }
    });
    nextBtn.style.display = "block";
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    resultEl.textContent = "";
    if (currentQuestionIndex < quiz.length) {
      loadQuestion();
      nextBtn.style.display = "none";
    } else {
      showFinalResult();
    }
  }
  
  function showFinalResult() {
    questionContainer.style.display = "none";
    resultEl.innerHTML = `<h2>Sua pontuação: ${score}/${quiz.length}</h2>`;
    restartBtn.style.display = "block";
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.style.display = "block";
    restartBtn.style.display = "none";
    resultEl.textContent = "";
    loadQuestion();
  }
  
  nextBtn.addEventListener("click", nextQuestion);
  restartBtn.addEventListener("click", restartQuiz);
  
  // Inicializa o quiz
  loadQuestion();
  
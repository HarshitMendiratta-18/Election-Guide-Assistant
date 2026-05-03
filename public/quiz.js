/**
 * Voter Awareness Quiz v2.0
 */

const questions = [
  {
    q: "What is the minimum age to register as a voter in India?",
    a: ["16 Years", "18 Years", "21 Years", "25 Years"],
    c: 1
  },
  {
    q: "Which document is essential for identification at the polling booth?",
    a: ["EPIC Card", "Library Card", "Gym Membership", "Utility Bill"],
    c: 0
  },
  {
    q: "How many seconds does the VVPAT slip remain visible?",
    a: ["3 Seconds", "5 Seconds", "7 Seconds", "10 Seconds"],
    c: 2
  }
];

let currentQ = 0;
let score = 0;
let selected = null;

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const startBtn = document.getElementById('start-quiz-btn');
  const nextBtn = document.getElementById('next-q-btn');
  const startArea = document.getElementById('quiz-start');
  const contentArea = document.getElementById('quiz-content');
  const resultArea = document.getElementById('quiz-result');
  const qArea = document.getElementById('question-area');
  const progressArea = document.getElementById('quiz-progress');

  startBtn.addEventListener('click', () => {
    startArea.style.display = 'none';
    contentArea.style.display = 'block';
    loadQuestion();
  });

  function loadQuestion() {
    selected = null;
    nextBtn.disabled = true;
    const q = questions[currentQ];
    
    qArea.innerHTML = `
      <h3 style="margin-bottom:24px; line-height:1.4;">${q.q}</h3>
      <div style="display:grid; gap:12px;">
        ${q.a.map((opt, i) => `
          <button class="quiz-option" data-idx="${i}" style="text-align:left; padding:16px; background:rgba(255,255,255,0.05); border:1px solid var(--border-glass); border-radius:12px; color:white; cursor:pointer; transition:var(--transition);">
            ${opt}
          </button>
        `).join('')}
      </div>
    `;

    qArea.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        qArea.querySelectorAll('.quiz-option').forEach(b => {
          b.style.borderColor = 'var(--border-glass)';
          b.style.background = 'rgba(255,255,255,0.05)';
        });
        btn.style.borderColor = 'var(--accent-1)';
        btn.style.background = 'rgba(129, 140, 248, 0.1)';
        selected = parseInt(btn.dataset.idx);
        nextBtn.disabled = false;
      });
    });

    progressArea.innerText = `Question ${currentQ + 1} of ${questions.length}`;
  }

  nextBtn.addEventListener('click', () => {
    if (selected === questions[currentQ].c) score++;
    
    currentQ++;
    if (currentQ < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

  function showResults() {
    contentArea.style.display = 'none';
    resultArea.style.display = 'block';
    document.getElementById('result-msg').innerText = `You scored ${score} out of ${questions.length}!`;
    document.getElementById('result-title').innerText = score === questions.length ? "Master Voter!" : "Well Done!";
  }
});

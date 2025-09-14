/* global QUIZ_SETS */
(function(){
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const submitBtn = document.getElementById('submitBtn');
  const newAttemptBtn = document.getElementById('newAttemptBtn');
  const quizSection = document.getElementById('quizSection');
  const resultSection = document.getElementById('resultSection');
  const questionsContainer = document.getElementById('questionsContainer');
  const scoreLine = document.getElementById('scoreLine');
  const reviewContainer = document.getElementById('reviewContainer');
  const saveStatus = document.getElementById('saveStatus');
  const quizMeta = document.getElementById('quizMeta');
  const studentNameEl = document.getElementById('studentName');
  const setSelect = document.getElementById('setSelect');
  const shuffleToggle = document.getElementById('shuffleToggle');

  let currentSetName = 'easy';
  let currentQuestions = [];
  let started = false;

  function shuffle(array){
    const a = array.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderQuiz(questions){
    questionsContainer.innerHTML = '';
    questions.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = 'q-card';
      const title = document.createElement('div');
      title.className = 'q-title';
      title.textContent = (idx+1) + '. ' + q.q;
      card.appendChild(title);

      q.options.forEach((opt, oi) => {
        const label = document.createElement('label');
        label.className = 'option';
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'q' + idx;
        radio.value = String(oi);
        const span = document.createElement('span');
        span.textContent = opt;
        label.appendChild(radio);
        label.appendChild(span);
        card.appendChild(label);
      });
      questionsContainer.appendChild(card);
    });
  }

  function start(){
    const name = studentNameEl.value.trim();
    if(!name){
      alert('Please enter your name.');
      return;
    }
    currentSetName = setSelect.value;
    const baseQuestions = QUIZ_SETS[currentSetName] || [];
    currentQuestions = shuffleToggle.checked ? shuffle(baseQuestions) : baseQuestions.slice();
    renderQuiz(currentQuestions);
    quizMeta.textContent = `Student: ${name} • Set: ${currentSetName} • Questions: ${currentQuestions.length}`;
    quizSection.classList.remove('hidden');
    resultSection.classList.add('hidden');
    resetBtn.disabled = false;
    started = true;
  }

  function reset(){
    started = false;
    quizSection.classList.add('hidden');
    resultSection.classList.add('hidden');
    questionsContainer.innerHTML = '';
    scoreLine.textContent = '';
    reviewContainer.innerHTML = '';
    saveStatus.textContent = '';
    resetBtn.disabled = true;
  }

  async function submit(){
    if(!started){
      alert('Start the quiz first.');
      return;
    }
    const answers = [];
    let correct = 0;
    currentQuestions.forEach((q, idx) => {
      const chosen = document.querySelector(`input[name="q${idx}"]:checked`);
      const val = chosen ? Number(chosen.value) : null;
      answers.push(val);
      if(val === q.answerIndex) correct++;
    });

    const total = currentQuestions.length;
    const percent = Math.round((correct/total)*100);
    scoreLine.textContent = `Score: ${correct}/${total} (${percent}%)`;

    // Review UI
    reviewContainer.innerHTML = '';
    currentQuestions.forEach((q, idx) => {
      const div = document.createElement('div');
      div.className = 'q-card ' + (answers[idx] === q.answerIndex ? 'correct':'incorrect');
      const t = document.createElement('div');
      t.className = 'q-title';
      t.textContent = `${idx+1}. ${q.q}`;
      const chosenText = (answers[idx] != null) ? q.options[answers[idx]] : '(no answer)';
      const correctText = q.options[q.answerIndex];
      const p1 = document.createElement('p');
      p1.textContent = `Your answer: ${chosenText}`;
      const p2 = document.createElement('p');
      p2.textContent = `Correct answer: ${correctText}`;
      div.appendChild(t); div.appendChild(p1); div.appendChild(p2);
      reviewContainer.appendChild(div);
    });

    // Save to backend
    saveStatus.textContent = 'Saving your attempt...';
    try{
      const res = await fetch('/.netlify/functions/submit-attempt', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          student_name: studentNameEl.value.trim(),
          set: currentSetName,
          score: correct,
          total,
          answers,
          submitted_at: new Date().toISOString()
        })
      });
      if(!res.ok){
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }
      await res.json();
      saveStatus.textContent = 'Saved successfully ✅';
    }catch(err){
      console.error(err);
      saveStatus.textContent = 'Could not save to database. Your score is still shown above.';
    }

    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({behavior:'smooth'});
  }

  startBtn.addEventListener('click', start);
  resetBtn.addEventListener('click', reset);
  submitBtn.addEventListener('click', submit);
  newAttemptBtn.addEventListener('click', reset);
})();

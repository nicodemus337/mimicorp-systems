const questions = [
  { key: 'service', prompt: 'What kind of help are you looking for?', type: 'options' },
  { key: 'name', prompt: 'What should I call you?', placeholder: 'Your name' },
  { key: 'email', prompt: 'What email should Amelia use to reply?', placeholder: 'you@example.com', inputMode: 'email' },
  { key: 'situation', prompt: 'What is happening right now? What feels broken, unclear, or not yet built?', placeholder: 'Tell me the situation as it really is…', multiline: true },
  { key: 'timing', prompt: 'What timing are you working with?', placeholder: 'A date, a rough window, or “not sure yet”' }
];

const answers = {};
let step = 0;
const chat = document.querySelector('#intake-chat');
const form = document.querySelector('#intake-form');
const options = document.querySelector('#service-options');
const entry = document.querySelector('#text-entry');
const answer = document.querySelector('#intake-answer');
const complete = document.querySelector('#intake-complete');

function addMessage(kind, text) {
  const message = document.createElement('div');
  message.className = `chat-message chat-${kind}`;
  const label = document.createElement('span');
  label.textContent = kind === 'mimi' ? 'Mimi Corp' : 'You';
  const copy = document.createElement('p');
  copy.textContent = text;
  message.append(label, copy);
  chat.append(message);
  message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showStep() {
  const question = questions[step];
  const percent = Math.round(((step + 1) / questions.length) * 100);
  document.querySelector('#step-label').textContent = `Question ${step + 1} of ${questions.length}`;
  document.querySelector('#progress-label').textContent = `${percent}%`;
  document.querySelector('#progress-bar').style.width = `${percent}%`;
  options.hidden = question.type !== 'options';
  entry.hidden = question.type === 'options';
  if (question.type !== 'options') {
    answer.value = '';
    answer.placeholder = question.placeholder;
    answer.rows = question.multiline ? 5 : 2;
    answer.inputMode = question.inputMode || 'text';
    answer.focus();
  }
}

function accept(value) {
  const clean = value.trim();
  if (!clean) return;
  answers[questions[step].key] = clean;
  addMessage('you', clean);
  step += 1;
  if (step >= questions.length) return finish();
  addMessage('mimi', questions[step].prompt);
  showStep();
}

options.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-value]');
  if (button) accept(button.dataset.value);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  accept(answer.value);
});

function finish() {
  form.hidden = true;
  document.querySelector('.intake-status').hidden = true;
  document.querySelector('.intake-progress').hidden = true;
  addMessage('mimi', `Thank you, ${answers.name}. I turned that into a short brief for Amelia.`);
  const summary = `PROJECT INTAKE — MIMI CORP\n\nName: ${answers.name}\nEmail: ${answers.email}\nArea of help: ${answers.service}\nTiming: ${answers.timing}\n\nWhat is happening:\n${answers.situation}`;
  document.querySelector('#project-summary').textContent = summary;
  const subject = encodeURIComponent(`Project inquiry from ${answers.name} — ${answers.service}`);
  const body = encodeURIComponent(`${summary}\n\n— Submitted through mimi-corp.com`);
  document.querySelector('#email-brief').href = `mailto:amelia.cronan@gmail.com?subject=${subject}&body=${body}`;
  complete.hidden = false;
  complete.scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.querySelector('#copy-brief').addEventListener('click', async (event) => {
    await navigator.clipboard.writeText(summary);
    event.currentTarget.textContent = 'Copied';
  }, { once: true });
}

showStep();

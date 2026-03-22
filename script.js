const challenges = [
  {
    prompt: 'You just cloned a repository. Which command checks working tree status?',
    answers: ['git status'],
    help: 'Use `git status` to show tracked/untracked files and branch info.'
  },
  {
    prompt: 'Stage all changed files before commit.',
    answers: ['git add .', 'git add -A', 'git add --all'],
    help: '`git add .` stages modified and new files in current directory. `git add -A` stages all changes globally.'
  },
  {
    prompt: 'Create a new branch named feature-ui and switch to it in one command.',
    answers: ['git checkout -b feature-ui', 'git switch -c feature-ui'],
    help: '`git checkout -b <name>` or `git switch -c <name>` creates and checks out the branch.'
  },
  {
    prompt: 'Commit staged changes with the message "init".',
    answers: ['git commit -m "init"', "git commit -m 'init'"],
    help: 'Use `git commit -m "message"`.'
  },
  {
    prompt: 'Pull newest changes from remote origin main.',
    answers: ['git pull origin main', 'git pull'],
    help: '`git pull origin main` fetches and merges remote branch main from origin.'
  }
];

let activeIndex = 0;
const promptEl = document.getElementById('prompt');
const inputEl = document.getElementById('inputCommand');
const resultEl = document.getElementById('result');
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');

function normalize(input) {
  return input.trim().replace(/\s+/g, ' ').toLowerCase();
}

function showChallenge(index) {
  const c = challenges[index];
  promptEl.textContent = c.prompt;
  inputEl.value = '';
  resultEl.textContent = '';
  inputEl.focus();
}

function checkAnswer() {
  const given = normalize(inputEl.value);
  const c = challenges[activeIndex];

  if (!given) {
    resultEl.textContent = 'Type a git command first.';
    resultEl.style.color = '#fbbf24';
    return;
  }

  const ok = c.answers.some(ans => normalize(ans) === given);
  if (ok) {
    resultEl.textContent = '✅ Correct! ' + c.help;
    resultEl.style.color = '#62d14f';
  } else {
    resultEl.textContent = '❌ Not quite. Expected something like: ' + c.answers[0];
    resultEl.style.color = '#f5626f';
  }
}

checkBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', () => {
  activeIndex = (activeIndex + 1) % challenges.length;
  showChallenge(activeIndex);
});
window.addEventListener('load', () => showChallenge(activeIndex));
inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });

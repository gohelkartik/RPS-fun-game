const pScoreEl = document.getElementById('p-score');
const cScoreEl = document.getElementById('c-score');
const statusMsg = document.getElementById('status');
const pHand = document.getElementById('p-hand');
const cHand = document.getElementById('c-hand');
const themeSwitcher = document.getElementById('theme-switcher');
const buttons = document.querySelectorAll('.btn');

let scores = { player: 0, computer: 0 };

const iconMap = {
    rock: 'fa-hand-back-fist',
    paper: 'fa-hand',
    scissors: 'fa-hand-scissors'
};

themeSwitcher.addEventListener('change', (e) => {
    document.body.setAttribute('data-theme', e.target.value);
});

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const pChoice = btn.getAttribute('data-choice');
        const choices = ['rock', 'paper', 'scissors'];
        const cChoice = choices[Math.floor(Math.random() * 3)];

        statusMsg.textContent = "BATTLE!";
        statusMsg.style.color = "var(--text)";
        
        // Hand reset to rock for animation
        pHand.className = `fa-solid fa-hand-back-fist shaking`;
        cHand.className = `fa-solid fa-hand-back-fist shaking`;

        buttons.forEach(b => b.disabled = true);

        setTimeout(() => {
            pHand.classList.remove('shaking');
            cHand.classList.remove('shaking');
            
            pHand.className = `fa-solid ${iconMap[pChoice]}`;
            cHand.className = `fa-solid ${iconMap[cChoice]}`;

            determineWinner(pChoice, cChoice);
            buttons.forEach(b => b.disabled = false);
        }, 1000);
    });
});

function determineWinner(user, cpu) {
    if (user === cpu) {
        statusMsg.textContent = "DRAW";
    } else if (
        (user === 'rock' && cpu === 'scissors') ||
        (user === 'paper' && cpu === 'rock') ||
        (user === 'scissors' && cpu === 'paper')
    ) {
        statusMsg.textContent = "VICTORY!";
        statusMsg.style.color = "var(--win)";
        scores.player++;
    } else {
        statusMsg.textContent = "DEFEAT";
        statusMsg.style.color = "var(--loss)";
        scores.computer++;
    }
    
    pScoreEl.textContent = scores.player;
    cScoreEl.textContent = scores.computer;
}
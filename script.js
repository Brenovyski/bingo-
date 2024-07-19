const bingoTable = document.querySelector('.bingo-table');
const lastNumberDisplay = document.getElementById('last-number');
const resetButton = document.getElementById('reset-button');
const roundNumberDisplay = document.getElementById('round-number');
const roundDisplay = document.getElementById('round-display');
const decreaseRoundButton = document.getElementById('decrease-round');
const increaseRoundButton = document.getElementById('increase-round');
const roundTypeSelect = document.getElementById('round-type-select');

let roundNumber = 1;
let roundType = 'Normal';

function updateRoundDisplay() {
    if (roundType === 'Normal') {
        roundDisplay.textContent = `Rodada ${roundNumber}`;
    } else {
        roundDisplay.textContent = `Rodada ${roundType.charAt(0).toUpperCase() + roundType.slice(1)}`;
    }
}

increaseRoundButton.addEventListener('click', () => {
    roundNumber++;
    roundNumberDisplay.textContent = roundNumber;
    updateRoundDisplay();
});

decreaseRoundButton.addEventListener('click', () => {
    if (roundNumber > 1) {
        roundNumber--;
        roundNumberDisplay.textContent = roundNumber;
        updateRoundDisplay();
    }
});

roundTypeSelect.addEventListener('change', (event) => {
    roundType = event.target.value;
    updateRoundDisplay();
});

// Bingo columns
const columns = {
    B: Array.from({ length: 15 }, (_, i) => i + 1),
    I: Array.from({ length: 15 }, (_, i) => i + 16),
    N: Array.from({ length: 15 }, (_, i) => i + 31),
    G: Array.from({ length: 15 }, (_, i) => i + 46),
    O: Array.from({ length: 15 }, (_, i) => i + 61),
};

// Create number rows
['B', 'I', 'N', 'G', 'O'].forEach(letter => {
    const row = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = letter;
    th.classList.add(letter);
    row.appendChild(th);
    columns[letter].forEach(number => {
        const cell = document.createElement('td');
        cell.textContent = number;
        cell.addEventListener('click', () => {
            if (cell.classList.contains('taken')) {
                cell.classList.remove('taken', letter);
                lastNumberDisplay.textContent = '-';
            } else {
                cell.classList.add('taken', letter);
                lastNumberDisplay.textContent = `${letter} ${number}`;
            }
        });
        row.appendChild(cell);
    });
    bingoTable.appendChild(row);
});

// Reset button functionality
resetButton.addEventListener('click', () => {
    const cells = document.querySelectorAll('.bingo-table td');
    cells.forEach(cell => {
        cell.classList.remove('taken', 'B', 'I', 'N', 'G', 'O');
    });
    lastNumberDisplay.textContent = '-';
    roundNumber = 1;
    roundType = 'Normal';
    roundNumberDisplay.textContent = roundNumber;
    roundTypeSelect.value = 'Normal';
    updateRoundDisplay();
});

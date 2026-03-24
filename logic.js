// Data Storage
let userQuizzes = [];

// Modal Controls
const modal = document.getElementById('uploadModal');
const openBtn = document.getElementById('openUploadBtn');

openBtn.onclick = () => modal.style.display = 'flex';

function closeModal() {
    modal.style.display = 'none';
}

// Handle Quiz Upload
document.querySelector('.submit-btn').addEventListener('click', () => {
    const question = document.getElementById('qInput').value;
    const options = Array.from(document.querySelectorAll('.opt-input')).map(input => input.value);

    if (question && options.every(opt => opt !== "")) {
        const newQuiz = {
            question: question,
            options: options,
            timestamp: new Date().getTime()
        };

        userQuizzes.push(newQuiz);
        alert("Success! Your TNPSC question is live.");
        
        // Reset and Close
        document.getElementById('qInput').value = '';
        document.querySelectorAll('.opt-input').forEach(i => i.value = '');
        closeModal();
        
        // Optional: Instantly update the UI to show the new question
        displayQuiz(newQuiz);
    } else {
        alert("Please fill in the question and all four options!");
    }
});

// Display Logic (Kahoot-style Animation)
function displayQuiz(quiz) {
    const container = document.getElementById('quizContainer');
    container.style.opacity = '0'; // Fade out current
    
    setTimeout(() => {
        document.getElementById('question').innerText = quiz.question;
        const grid = document.querySelector('.options-grid');
        grid.innerHTML = ''; // Clear old options
        
        quiz.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'opt fade-in-up';
            btn.style.animationDelay = `${index * 0.1}s`;
            btn.innerText = opt;
            grid.appendChild(btn);
        });
        
        container.style.opacity = '1'; // Fade in new
    }, 400);
}
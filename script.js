// Button elements
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const modal = document.getElementById('modal');

// Countdown elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Target date: 08.02.2026 12:30 Moscow Time (UTC+3)
const targetDate = new Date('2026-02-08T12:30:00+03:00');

// "No" button running away from cursor
btnNo.addEventListener('mouseover', function(e) {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    
    // Calculate new random position within container
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;
    
    // Ensure button stays away from cursor
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    
    const distance = 100; // Minimum distance from cursor
    if (Math.abs(newX - mouseX) < distance && Math.abs(newY - mouseY) < distance) {
        newX = (newX + maxX / 2) % maxX;
        newY = (newY + maxY / 2) % maxY;
    }
    
    btnNo.style.left = newX + 'px';
    btnNo.style.top = newY + 'px';
});

// "Yes" button opens modal
btnYes.addEventListener('click', function() {
    modal.classList.add('active');
    updateCountdown(); // Start countdown immediately
});

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Countdown timer function
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
        
        setTimeout(updateCountdown, 1000);
    } else {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
    }
}

// Initialize "No" button position
function initNoButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    btnNo.style.left = (containerRect.width / 2 + 50) + 'px';
    btnNo.style.top = '0px';
}

// Initialize on page load
window.addEventListener('load', initNoButton);

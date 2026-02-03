// Текущая страница
let currentPage = 1;
const totalPages = 5;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Показываем первую страницу
    showPage(currentPage);
    
    // Обновляем прогресс
    updateProgress();
    
    // Добавляем звуковые эффекты при наведении на кнопки
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            playSound('hover');
        });
    });
});

// Функция показа страницы
function showPage(pageNumber) {
    // Скрываем все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Показываем нужную страницу
    const pageElement = document.getElementById(`page${pageNumber}`);
    if (pageElement) {
        pageElement.classList.add('active');
    }
    
    // Обновляем прогресс
    updateProgress();
}

// Функция обновления индикатора прогресса
function updateProgress() {
    document.querySelectorAll('.progress-dot').forEach((dot, index) => {
        if (index < currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Обработка нажатия "Да"
function handleYes() {
    // Прямой переход на финальную страницу (page5)
    currentPage = 5;
    showPage(currentPage);
    playSound('success');
    createHeartsAnimation();
}

// Обработка нажатия "Нет" - переход на следующую страницу
function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
        playSound('click');
        
        // Добавляем тряску для кнопки "Нет" на последней странице выбора
        if (currentPage === 3) {
            setTimeout(() => {
                const noBtn = document.querySelector('#page3 .no-btn');
                if (noBtn) {
                    noBtn.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        noBtn.style.animation = '';
                    }, 500);
                }
            }, 300);
        }
    }
}

// Показ финальной страницы после принудительного "Да"
function showFinalPage() {
    currentPage = 5;
    showPage(currentPage);
    playSound('celebration');
    createHeartsAnimation();
    showConfetti();
}

// Перезапуск приложения
function restartApp() {
    currentPage = 1;
    showPage(currentPage);
    playSound('click');
}

// Создание анимации сердечек
function createHeartsAnimation() {
    const container = document.querySelector('.container');
    const heartsCount = 50;
    
    for (let i = 0; i < heartsCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.opacity = '0.7';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `floatUp ${Math.random() * 3 + 2}s linear forwards`;
        
        container.appendChild(heart);
        
        // Удаляем сердечко после анимации
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}

// Добавляем CSS для анимации сердечек
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100px) rotate(20deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Функция для звуковых эффектов
function playSound(type) {
    try {
        // Создаем звуковые эффекты через Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (type === 'click') {
            // Звук клика
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 400;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }
        else if (type === 'hover') {
            // Звук наведения
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
        else if (type === 'success') {
            // Звук успеха
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.value = 500 + (i * 100);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.3);
                }, i * 100);
            }
        }
        else if (type === 'celebration') {
            // Праздничный звук
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.value = 300 + (i * 50);
                    oscillator.type = 'triangle';
                    
                    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.5);
                }, i * 150);
            }
        }
    } catch (e) {
        console.log("Аудио не поддерживается в этом браузере");
    }
}

// Функция для конфетти (простая версия)
function showConfetti() {
    const colors = ['#ff3366', '#ff66a3', '#ffcc00', '#4CAF50', '#2196F3'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.opacity = '0.8';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Анимация падения
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Удаляем конфетти после анимации
        animation.onfinish = () => confetti.remove();
    }
}
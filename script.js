// Основные функции сайта

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    // Загружаем сохранённые результаты
    loadProgress();

    // Обработчики для меню
    setupMenuHandlers();

    // Обновляем статистику
    updateStats();
});

// Загрузка прогресса из localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('examProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        updateProgressBar(progress.completed / progress.total * 100);
    }
}

// Обновление прогресс-бара
function updateProgressBar(percentage) {
    const progressBar = document.getElementById('globalProgress');
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
}

// Обновление статистики
function updateStats() {
    const savedProgress = localStorage.getItem('examProgress');
    let correctCount = 0;

    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        correctCount = progress.correct || 0;
    }

    const correctElement = document.getElementById('correctCount');
    if (correctElement) {
        correctElement.textContent = correctCount;
    }
}

// Настройка обработчиков для меню
function setupMenuHandlers() {
    // Режим случайных вопросов
    const practiceMode = document.getElementById('practiceMode');
    if (practiceMode) {
        practiceMode.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'pages/exam.html?mode=random&count=20';
        });
    }

    // Ссылка на результаты
    const resultsLink = document.getElementById('resultsLink');
    if (resultsLink) {
        resultsLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'pages/results.html';
        });
    }
}

// Показ уведомлений
function showNotification(message, type = 'success') {
    // Удаляем старое уведомление
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }

    // Создаём новое уведомление
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Автоматически скрываем через 3 секунды
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Сохранение ответа
function saveAnswer(questionId, selectedOptions, isCorrect) {
    const savedAnswers = JSON.parse(localStorage.getItem('examAnswers') || '{}');

    savedAnswers[questionId] = {
        selected: selectedOptions,
        correct: isCorrect,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('examAnswers', JSON.stringify(savedAnswers));

    // Обновляем общий прогресс
    updateOverallProgress(isCorrect);
}

// Обновление общего прогресса
function updateOverallProgress(isCorrect) {
    const savedProgress = JSON.parse(localStorage.getItem('examProgress') || '{"total": 0, "completed": 0, "correct": 0}');

    savedProgress.total = 156; // Всего вопросов
    savedProgress.completed = Object.keys(JSON.parse(localStorage.getItem('examAnswers') || '{}')).length;

    if (isCorrect) {
        savedProgress.correct = (savedProgress.correct || 0) + 1;
    }

    localStorage.setItem('examProgress', JSON.stringify(savedProgress));
    updateStats();
    updateProgressBar((savedProgress.completed / savedProgress.total) * 100);
}

// Получение режима экзамена из URL
function getExamMode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('mode') || 'all';
}

// Адаптация текста кнопок для мобильных
function adaptButtonsForMobile() {
    if (window.innerWidth <= 768) {
        // Укорачиваем текст на мобильных
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        const submitButton = document.getElementById('submitButton');

        if (prevButton) {
            const prevText = prevButton.querySelector('.button-text');
            if (prevText) prevText.textContent = 'Назад';
        }

        if (nextButton) {
            const nextText = nextButton.querySelector('.button-text');
            if (nextText) nextText.textContent = 'Далее';
        }

        if (submitButton) {
            const submitText = submitButton.querySelector('.button-text');
            if (submitText) submitText.textContent = 'Проверить';
        }
    }
}

// Вызываем при загрузке и изменении размера окна
document.addEventListener('DOMContentLoaded', function () {
    adaptButtonsForMobile();
    window.addEventListener('resize', adaptButtonsForMobile);
});
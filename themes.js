// Управление темами

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    // Проверяем сохранённую тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    updateThemeButton(savedTheme);
    
    // Обработчик переключения темы
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            setTheme(newTheme);
            updateThemeButton(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});

// Установка темы
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
}

// Обновление кнопки темы
function updateThemeButton(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (themeToggle && themeIcon) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Светлая тема';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Тёмная тема';
        }
    }
}

// Проверка предпочтений системы
if (window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Если в localStorage нет темы, используем системную
    if (!localStorage.getItem('theme')) {
        setTheme(prefersDark.matches ? 'dark' : 'light');
        updateThemeButton(prefersDark.matches ? 'dark' : 'light');
    }
    
    // Отслеживание изменений системной темы
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
            updateThemeButton(e.matches ? 'dark' : 'light');
        }
    });
}
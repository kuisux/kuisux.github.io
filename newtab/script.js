document.addEventListener('DOMContentLoaded', () => {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const themeButtons = document.querySelectorAll('.theme-button');
    const bodyElement = document.body;

    function updateDateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', dateOptions);
        timeElement.textContent = timeString;
        dateElement.textContent = dateString;
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    const savedTheme = localStorage.getItem('selectedTheme') || 'catppuccin-mocha';

    function applyTheme(themeName) {
        bodyElement.classList.remove(
            'catppuccin-mocha',
            'catppuccin-latte', 
            'gruvbox-dark',
            'nord'
        );

        if (themeName) {
             bodyElement.classList.add(themeName);
        }

        themeButtons.forEach(button => {
            if (button.dataset.theme === themeName) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        localStorage.setItem('selectedTheme', themeName);
        console.log(`Theme applied: ${themeName}`);
    }

    applyTheme(savedTheme);

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const themeName = button.dataset.theme;
            applyTheme(themeName);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;
    const currentYearSpan = document.getElementById('year');

    // --- Theme Switching ---
    function applyTheme(themeName) {
        body.className = '';
        body.classList.add(themeName);
        localStorage.setItem('pixella-theme', themeName);
    }

    const savedTheme = localStorage.getItem('pixella-theme');
    if (savedTheme) {
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);
    } else {
        applyTheme(themeSelect.value);
    }

    themeSelect.addEventListener('change', (event) => {
        applyTheme(event.target.value);
    });

    // --- Update Footer Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

});

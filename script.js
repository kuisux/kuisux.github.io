document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;
    const currentYearSpan = document.getElementById('year');

    // --- Theme Switching ---

    // Function to apply theme
    function applyTheme(themeName) {
        // Remove existing theme classes
        body.className = ''; // Clear all classes first (simplest way)
        // Or loop and remove only theme-* classes if body has other important classes
        // body.classList.forEach(className => {
        //     if (className.startsWith('theme-')) {
        //         body.classList.remove(className);
        //     }
        // });

        body.classList.add(themeName);
        localStorage.setItem('pixella-theme', themeName); // Save preference
    }

    // Check for saved theme on load
    const savedTheme = localStorage.getItem('pixella-theme');
    if (savedTheme) {
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);
    } else {
        // Apply default theme if nothing saved (already set in HTML/CSS)
        applyTheme(themeSelect.value);
    }

    // Add event listener for theme change
    themeSelect.addEventListener('change', (event) => {
        applyTheme(event.target.value);
    });

    // --- Update Footer Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: More complex animations ---
    // Example: Trigger animations on scroll (using Intersection Observer API)
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the card is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optional: Add an 'animated' class instead of direct styles
                // entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        // Initial state for animation (set in CSS or here)
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

});

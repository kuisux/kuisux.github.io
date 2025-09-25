document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const moonIcon = themeSwitcher.querySelector('.moon-icon');
    const sunIcon = themeSwitcher.querySelector('.sun-icon');
    const currentYearSpan = document.getElementById('current-year');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Function to apply theme and update icon
    function applyTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        if (theme === 'latte') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline';
        } else {
            moonIcon.style.display = 'inline';
            sunIcon.style.display = 'none';
        }
    }

    // Check for saved theme in localStorage or use default (mocha)
    // Also checks user's OS preference if no theme is saved
    let currentTheme;
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        currentTheme = 'latte'; // Prefer Latte if OS is light and no saved theme
    } else {
        currentTheme = 'mocha'; // Default to Mocha
    }

    applyTheme(currentTheme);


    // Event listener for theme switcher button
    themeSwitcher.addEventListener('click', () => {
        let newTheme = body.getAttribute('data-theme') === 'mocha' ? 'latte' : 'mocha';
        applyTheme(newTheme);
    });

    // Optional: Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Ensure it's not just a "#" link or a link to something not an ID
            if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault();
                document.querySelector(hrefAttribute).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple fade-in animation for sections on scroll (optional)
    const sections = document.querySelectorAll('section');
    const options = {
        root: null, // viewport
        threshold: 0.1, // 10% of the section is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            // observer.unobserve(entry.target); // Uncomment if you want animation only once
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = "0"; // Initially hide
        section.style.transform = "translateY(20px)"; // Initial offset
        section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(section);
    });

});
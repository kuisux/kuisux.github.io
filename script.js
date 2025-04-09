// No changes needed from the previous version.
// Keep the script.js file as it was.

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher ---
    const themeButtons = document.querySelectorAll('.theme-switcher button');
    const body = document.body;

    // Function to apply theme
    const applyTheme = (themeName) => {
        body.setAttribute('data-theme', themeName);
        localStorage.setItem('pixella-theme', themeName);
    };

    // Check for saved theme on load
    const savedTheme = localStorage.getItem('pixella-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('mocha'); // Default
    }

    // Add event listeners to buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const themeName = button.getAttribute('data-theme-name');
            applyTheme(themeName);
        });
    });

    // --- Widget 1: Pat the Pixel Cat ---
    const patButton = document.getElementById('pat-button');
    const patCountDisplay = document.getElementById('pat-count');
    let patCount = 0;

    if (patButton && patCountDisplay) {
        patButton.addEventListener('click', () => {
            patCount++;
            patCountDisplay.textContent = patCount;
            patButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                patButton.style.transform = 'scale(1)';
            }, 100);
        });
    } else {
        console.error("Pat the Cat widget elements not found!");
    }

    // --- Widget 2: Cozy Clock (Now at the top) ---
    const clockDisplay = document.getElementById('clock');
    let clockInterval;

    function updateClock() {
        if (clockDisplay) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            clockDisplay.textContent = timeString;
        } else {
             console.error("Clock display element not found!");
             if (clockInterval) {
                clearInterval(clockInterval);
             }
        }
    }

    updateClock();
    clockInterval = setInterval(updateClock, 1000);

});

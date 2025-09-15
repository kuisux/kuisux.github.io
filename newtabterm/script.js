document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the theme
    const applyTheme = (theme) => {
        body.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.checked = theme === 'latte';
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');

    // Determine initial theme: use saved theme or default to 'mocha'
    const initialTheme = savedTheme || 'mocha';
    applyTheme(initialTheme);

    // Add event listener for the toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'latte' : 'mocha';
            applyTheme(newTheme);
        });
    }

    // Live Clock
    const clockContainer = document.getElementById('clock-container');

    if (clockContainer) {
        function updateClock() {
            const now = new Date();
            // Using toLocaleTimeString for a user-friendly, localized format
            const timeString = now.toLocaleTimeString();
            clockContainer.innerHTML = `<p style="color: var(--subtext0)">current time is ${timeString}</p>`;
        }

        updateClock(); // Set time immediately on load
        setInterval(updateClock, 1000); // Update every second
    }

    // --- Search and Cursor Functionality ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const fakeCursor = searchInput ? searchInput.nextElementSibling : null;

    if (searchForm && searchInput && fakeCursor) {
        // Search submission handler
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the form from reloading the page
            const query = searchInput.value.trim();

            if (query) {
                // Construct the Google search URL
                const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                // Open the search in a new tab
                window.open(searchURL, '_blank');
                // Clear the input field
                searchInput.value = '';
            }
        });

        // Thick cursor simulation
        // The input is autofocused, so show the cursor on load.
        fakeCursor.style.display = 'inline-block';

        searchInput.addEventListener('input', () => {
            // Hide fake cursor when typing starts. The real caret takes over.
            fakeCursor.style.display = 'none';
        });

        searchInput.addEventListener('blur', () => {
            // Hide fake cursor when input loses focus
            fakeCursor.style.display = 'none';
        });

        searchInput.addEventListener('focus', () => {
            // On focus, show the fake cursor only if the input is empty.
            if (searchInput.value.length === 0) {
                fakeCursor.style.display = 'inline-block';
            }
        });
    }
});
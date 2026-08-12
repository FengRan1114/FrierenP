(function () {
    'use strict';

    var root = document.documentElement;
    var themeToggle = document.getElementById('myonoffswitch');
    var savedTheme = localStorage.getItem('themeState');
    var preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = savedTheme || (preferredDark ? 'Dark' : 'Light');

    function applyTheme(nextTheme) {
        theme = nextTheme;
        root.dataset.theme = theme;
        localStorage.setItem('themeState', theme);
        if (themeToggle) {
            themeToggle.checked = theme === 'Light';
            themeToggle.setAttribute('aria-label', theme === 'Dark' ? 'Switch to light theme' : 'Switch to dark theme');
        }
    }

    applyTheme(theme);

    if (themeToggle) {
        themeToggle.addEventListener('change', function () {
            applyTheme(theme === 'Dark' ? 'Light' : 'Dark');
        });
    }

    document.querySelectorAll('.projectItem').forEach(function (item) {
        var release = function () { item.classList.remove('pressed'); };
        item.addEventListener('pointerdown', function () { item.classList.add('pressed'); });
        item.addEventListener('pointerup', release);
        item.addEventListener('pointercancel', release);
        item.addEventListener('pointerleave', release);
    });
}());

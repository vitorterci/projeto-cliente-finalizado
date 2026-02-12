document.addEventListener('DOMContentLoaded', function() {
    // Controle de tema claro/escuro
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if (themeToggle) themeToggle.textContent = '☀️';
        } else {
            body.removeAttribute('data-theme');
            if (themeToggle) themeToggle.textContent = '🌙';
        }
    }
    
    function checkTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (prefersDark ? 'dark' : 'light');
    }
    
    applyTheme(checkTheme());
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }

    // Toggle da barra lateral
    const barraToggle = document.getElementById('barraToggle');
    const barraLateral = document.querySelector('.barra-lateral');
    
    if (barraToggle && barraLateral) {
        barraToggle.addEventListener('click', function() {
            barraLateral.classList.toggle('expandida');
            const isExpanded = barraLateral.classList.contains('expandida');
            this.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Acessibilidade do Dropdown
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropdownToggle && dropdownContent) {
        // Toggle no clique para mobile
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const isVisible = window.getComputedStyle(dropdownContent).display === 'grid';
                dropdownContent.style.display = isVisible ? 'none' : 'grid';
                this.setAttribute('aria-expanded', !isVisible);
            }
        });

        // Navegação por teclado
        dropdown.addEventListener('keydown', function(e) {
            const items = dropdownContent.querySelectorAll('.dropdown-item a');
            let index = Array.from(items).indexOf(document.activeElement);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (index < items.length - 1) items[index + 1].focus();
                else items[0].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (index > 0) items[index - 1].focus();
                else items[items.length - 1].focus();
            } else if (e.key === 'Escape') {
                dropdownContent.style.display = 'none';
                dropdownToggle.focus();
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Fechar dropdown ao clicar fora
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-toggle')) {
            if (dropdownContent && window.innerWidth <= 768) {
                dropdownContent.style.display = 'none';
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

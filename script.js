
document.addEventListener('DOMContentLoaded', function() {
    // 1. Controle de tema claro/escuro
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
    
    // 2. Lógica de Abas
    function openTab(evt, tabName) {
        const tabContents = document.getElementsByClassName('tab-content');
        for (let content of tabContents) content.classList.remove('active');

        const tabs = document.getElementsByClassName('tab');
        for (let tab of tabs) tab.classList.remove('active');

        const target = document.getElementById(tabName);
        if (target) target.classList.add('active');
        evt.currentTarget.classList.add('active');
    }
    
    const tabElements = document.getElementsByClassName('tab');
    for (let tab of tabElements) {
        tab.addEventListener('click', function(e) {
            const tabName = this.getAttribute('data-tab') || 
                           (this.getAttribute('onclick') ? this.getAttribute('onclick').match(/'(.*?)'/)[1] : null);
            if (tabName) openTab(e, tabName);
        });
    }
    
    if (tabElements.length > 0) {
        const firstTab = tabElements[0];
        const firstTabName = firstTab.getAttribute('data-tab') || 
                           (firstTab.getAttribute('onclick') ? firstTab.getAttribute('onclick').match(/'(.*?)'/)[1] : null);
        if (firstTabName) {
            firstTab.classList.add('active');
            const firstTabContent = document.getElementById(firstTabName);
            if (firstTabContent) firstTabContent.classList.add('active');
        }
    }

    // 3. Toggle da barra lateral (Consolidado)
    const barraToggle = document.getElementById('barraToggle');
    const barraLateral = document.querySelector('.barra-lateral');
    
    if (barraToggle && barraLateral) {
      barraToggle.addEventListener('click', function() {
        const isExpanded = barraLateral.classList.toggle('expandida');
        barraLateral.classList.toggle('recolhida', !isExpanded);
        this.style.left = isExpanded ? '305px' : '85px';
      });
    }

    // 4. Lógica do Dropdown
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (dropdownToggle && dropdownContent) {
      dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isVisible = dropdownContent.classList.toggle('is-open');
        dropdownContent.style.display = isVisible ? 'grid' : 'none';
        dropdownToggle.setAttribute('aria-expanded', isVisible);
      });
    }
});

// Navegação por teclado para o dropdown
document.addEventListener('keydown', function(e) {
  const dropdown = document.querySelector('.dropdown');
  const content = document.querySelector('.dropdown-content');
  const toggle = document.querySelector('.dropdown-toggle');
  
  if (!dropdown || !content || !toggle) return;

  const items = Array.from(content.querySelectorAll('a'));
  const activeElement = document.activeElement;
  const currentIndex = items.indexOf(activeElement);

  if (e.key === 'Escape') {
    content.style.display = 'none';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }

  if (content.style.display === 'grid') {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus();
    }
  }
});

// Fechar dropdown ao clicar fora
window.addEventListener('click', function(event) {
  if (!event.target.matches('.dropdown-toggle')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let openDropdown of dropdowns) {
      if (openDropdown.classList.contains('is-open')) {
        openDropdown.classList.remove('is-open');
        openDropdown.style.display = 'none';
        const toggle = openDropdown.previousElementSibling;
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    }
  }
});

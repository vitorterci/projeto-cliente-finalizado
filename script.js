
document.addEventListener('DOMContentLoaded', function() {
    // Controle de tema claro/escuro
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Aplicar tema
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if (themeToggle) themeToggle.textContent = '☀️';
        } else {
            body.removeAttribute('data-theme');
            if (themeToggle) themeToggle.textContent = '🌙';
        }
    }
    
    // Verificar preferência de tema
    function checkTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (prefersDark ? 'dark' : 'light');
    }
    
    // Aplicar tema inicial
    const initialTheme = checkTheme();
    applyTheme(initialTheme);
    
    // Alternar entre temas
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }
    
    // Função para abrir abas
    function openTab(evt, tabName) {
        // Esconder todos os conteúdos de tab
        const tabContents = document.getElementsByClassName('tab-content');
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        // Desativar todas as tabs
        const tabs = document.getElementsByClassName('tab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }

        // Mostrar conteúdo da tab atual e ativar a tab
        document.getElementById(tabName).classList.add('active');
        evt.currentTarget.classList.add('active');
    }
    
    // Adicionar event listeners para todas as abas
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function(e) {
            const tabName = this.getAttribute('data-tab') || 
                           this.getAttribute('onclick').match(/'(.*?)'/)[1];
            openTab(e, tabName);
        });
    }
    
    // Ativar a primeira aba por padrão
    if (tabs.length > 0) {
        const firstTab = tabs[0];
        const firstTabName = firstTab.getAttribute('data-tab') || 
                           firstTab.getAttribute('onclick').match(/'(.*?)'/)[1];
        firstTab.classList.add('active');
        const firstTabContent = document.getElementById(firstTabName);
        if (firstTabContent) firstTabContent.classList.add('active');
    }
});

// Adicione isso ao seu script.js
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    
    // Toggle da barra lateral
    const barraToggle = document.getElementById('barraToggle');
    const barraLateral = document.querySelector('.barra-lateral');
    
    if (barraToggle && barraLateral) {
      barraToggle.addEventListener('click', function() {
        barraLateral.classList.toggle('expandida');
        // Atualizar posição do botão
        if (barraLateral.classList.contains('expandida')) {
          this.style.left = '305px';
        } else {
          this.style.left = '85px';
        }
      });
    }
    
    // ... resto do código existente ...
  });

  // No seu script.js
document.getElementById('barraToggle').addEventListener('click', function() {
    document.querySelector('.barra-lateral').classList.toggle('recolhida');
  });

// Suporte para fechar o dropdown ao clicar fora dele
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-toggle')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === 'grid') {
        openDropdown.style.display = 'none';
      }
    }
  }
}

// Toggle dropdown no clique (para mobile)
document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownContent = document.querySelector('.dropdown-content');
  
  if (dropdownToggle && dropdownContent) {
    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      const isVisible = dropdownContent.style.display === 'grid';
      dropdownContent.style.display = isVisible ? 'none' : 'grid';
    });
  }
});

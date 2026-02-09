// ===== SMOOTH SCROLL NA # ODKAZY =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ZVÝRAZNĚNÍ AKTIVNÍHO MENU PŘI SCROLLU =====
window.addEventListener('scroll', () => {
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    const section = document.querySelector(href);
    
    if (section) {
      const rect = section.getBoundingClientRect();
      
      // Pokud je sekce viditelná (top < 150px od okna)
      if (rect.top <= 150 && rect.bottom >= 150) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ===== PORTFOLIO FILTER - FILTROVÁNÍ PROJEKTŮ PODLE KATEGORIE =====

function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Odeber .active ze všech tlačítek
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Přidej .active na kliknuté tlačítko
      button.classList.add('active');
      
      // Získej kategorii k filtrování
      const filterValue = button.getAttribute('data-filter');
      
      // Projdi všechny karty a zobraz/skryj podle kategorie
      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          // Zobraz kartu
          card.style.display = 'block';
          
          // Přidej animaci
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
          
        } else {
          // Skryj kartu s animací
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Spusť filtr když je stránka načtena
document.addEventListener('DOMContentLoaded', initPortfolioFilter);

const portfolioCards = document.querySelectorAll('.portfolio-card');
const loadMoreBtn = document.getElementById('load-more-btn');
let itemsToShow = 3;

portfolioCards.forEach((card, index) => {
  if (index >= itemsToShow) {
    card.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', () => {
  portfolioCards.forEach(card => {
    card.classList.remove('hidden');
    card.style.display = 'block';
  });
  loadMoreBtn.style.display = 'none';
});

const visibleCards = document.querySelectorAll('.portfolio-card[style*="display: block"], .portfolio-card:not([style*="display: none"])');
document.getElementById('project-count').textContent = visibleCards.length;
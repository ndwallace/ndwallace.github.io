/* Nathan Wallace - Skills list script */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // Skills Section - Dynamic Loading from JSON
  // ============================================
  
  const skillsGrid = document.querySelector('.skills__grid');
  
  if (skillsGrid) {
    loadSkills();
  }
  
  async function loadSkills() {
    try {
      const response = await fetch('data/skills.json');
      const data = await response.json();
      renderSkills(data);
      initSkillAnimations();
    } catch (error) {
      console.error('Error loading skills data:', error);
      // Skills section will show the static fallback if JSON fails to load
    }
  }
  
  function getSkillLevel(progress, thresholds) {
    if (progress >= thresholds.five) return '5+';
    if (progress >= thresholds.four) return '4';
    if (progress >= thresholds.three) return '3';
    if (progress >= thresholds.two) return '2';
    return '1';
  }
  
  function getIconSVG(iconName) {
    const icons = {
      code: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
      search: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
      users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`
    };
    return icons[iconName] || icons.code;
  }
  
  function renderSkills(data) {
    const { categories, levelThresholds } = data;
    
    // Clear existing content
    skillsGrid.innerHTML = '';
    
    categories.forEach(category => {
      const categoryEl = document.createElement('div');
      categoryEl.className = 'skill-category';
      
      const skillsHTML = category.skills.map(skill => {
        const level = getSkillLevel(skill.progress, levelThresholds);
        return `
          <div class="skill-item">
            <div class="skill-item__header">
              <span class="skill-item__name">${skill.name}</span>
              <span class="skill-item__level">${level}</span>
            </div>
            <div class="skill-item__bar">
              <div class="skill-item__progress" data-progress="${skill.progress}%" style="width: 0%"></div>
            </div>
          </div>
        `;
      }).join('');
      
      categoryEl.innerHTML = `
        <div class="skill-category__header">
          <div class="skill-category__icon">${getIconSVG(category.icon)}</div>
          <h3 class="skill-category__title">${category.title}</h3>
        </div>
        <div class="skill-list">
          ${skillsHTML}
        </div>
      `;
      
      skillsGrid.appendChild(categoryEl);
    });
  }
  
  function initSkillAnimations() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('skill-category')) {
          const progressBars = entry.target.querySelectorAll('.skill-item__progress');
          progressBars.forEach((bar, index) => {
            const width = bar.dataset.progress;
            setTimeout(() => {
              bar.style.width = width;
            }, 100 + (index * 100)); // Stagger animation
          });
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));
  }
});

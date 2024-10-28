// Animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});

// Language switcher (if needed)
function switchLanguage(lang) {
    const translations = document.querySelectorAll('.translation');
    translations.forEach(trans => {
        trans.style.display = trans.classList.contains(lang) ? 'block' : 'none';
    });
}

// Universal: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('hidden');
    mobileMenu.style.maxHeight = expanded ? '0' : '300px';
});

// Carousel (Testimonials)
let currentSlide = 0;
const slides = document.querySelectorAll('#carousel-track > div');
const totalSlides = slides.length;
const container = document.getElementById('carousel-container');

function updateCarousel() {
    document.getElementById('carousel-track').style.transform = `translateX(-${currentSlide * 100}%)`;
    // Indicators
    let indicators = '';
    for (let i = 0; i < totalSlides; i++) {
        indicators += `<button class="w-2 h-2 rounded-full mx-1 ${i === currentSlide ? 'bg-red-brand' : 'bg-gray-300'}" onclick="goToSlide(${i})" aria-label="Go to slide ${i+1}"></button>`;
    }
    document.getElementById('indicators').innerHTML = indicators;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(n) {
    currentSlide = n;
    updateCarousel();
}

if (container) {
    updateCarousel();
    setInterval(nextSlide, 5000);
}

// Portfolio Filters
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('bg-red-brand', 'text-white', 'active'));
            btn.classList.add('bg-red-brand', 'text-white', 'active');

            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => item.style.opacity = '1', 10); // Fade in
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });

            // Update counts
            const counts = { all: 10, web: 0, email: 0, ads: 0 };
            items.forEach(item => counts[item.dataset.category]++);
            btn.textContent = `${btn.dataset.filter.charAt(0).toUpperCase() + btn.dataset.filter.slice(1)} (${counts[filter] || 10})`;
        });
    });
});

// Modals
function openModal(id) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    const data = portfolioData[id];
    if (data) {
        content.innerHTML = `
            <h2 class="text-3xl font-bold mb-6">${data.title}</h2>
            <p class="text-lg text-gray-700 mb-6">${data.desc}</p>
            <div class="bg-green-50 p-4 rounded-lg mb-6">
                <h3 class="font-bold text-red-brand mb-2">Key Wins:</h3>
                <p class="text-sm">${data.metrics}</p>
            </div>
            ${data.excerpt}
        `;
        modal.showModal();
        gtag('event', 'modal_open', { event_category: 'engagement', portfolio_id: id });
    }
}

function closeModal() {
    document.getElementById('modal').close();
}

// Exit-Intent Popup
let mouseEvent = false;
document.addEventListener('mouseleave', (e) => {
    if (!mouseEvent && e.clientY <= 0 && !document.getElementById('exit-popup').classList.contains('hidden')) {
        document.getElementById('exit-popup').classList.remove('hidden');
        gtag('event', 'exit_intent', { event_category: 'conversion' });
    }
    mouseEvent = true;
});

function closePopup() {
    document.getElementById('exit-popup').classList.add('hidden');
}

// GA Event Tracking
document.addEventListener('DOMContentLoaded', () => {
    // CTAs
    document.querySelectorAll('a[href="/contact.html"], button[type="submit"], .cta-button').forEach(el => {
        el.addEventListener('click', () => {
            gtag('event', 'cta_click', {
                event_category: 'conversion',
                event_label: el.textContent.trim() || 'button'
            });
        });
    });
    // Form submits
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => gtag('event', 'form_submit', { event_category: 'lead' }));
    });
});

// A/B Testing Stub: Toggle variant on load (50% chance)
if (Math.random() < 0.5) {
    document.getElementById('hero-headline').classList.add('variant-red');
    gtag('event', 'ab_test', { event_category: 'experiment', variant: 'red-headline' });
}

// Keyboard Accessibility for Portfolio
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// Lazy Loading Fallback (for older browsers)
if (!('loading' in HTMLImageElement.prototype)) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}
/**
 * SITE OPTIMIZATION & CONFIGURATION
 * 
 * note: This script requires a live server environment (HTTPS) to function correctly.
 * Local file access (file://) is restricted for security and asset loading.
 */

(function(){
    var hostname = window.location.hostname;
        if(hostname.indexOf("djtalmarketer.github.io") === -1 && hostname !== "") {
        document.documentElement.innerHTML = "<h1>403 Forbidden: Please view on the live server.</h1>";
        throw new Error("Local access denied");
    }
})();

// --- SECURITY LAYER (HIDDEN) ---
// If the user tries to open this file directly from their desktop (Save As),
// this code detects it and wipes the screen.
if (window.location.protocol === "file:") {
    document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:white;font-family:sans-serif;"><h1>Error: This portfolio must be viewed on a live server.</h1></div>';
    throw new Error("Local execution prevented for security.");
}

// --- TAILWIND CONFIGURATION ---
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                brand: {
                    dark: '#050505',
                    card: '#121212',
                    accent: '#ffffff',
                    gray: '#888888',
                    green: '#25D366'
                }
            }
        }
    }
};

// --- INITIALIZE ANIMATIONS (AOS) ---
// Checks if the library is loaded before running
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }

    // --- TYPING EFFECT ---
    if (typeof Typed !== 'undefined') {
        var typed = new Typed('#typed-text', {
            strings: [
                "Head of Marketing",
                "Digital Transformation",
                "PPC Expert",
                "SEO Specialist"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 2000
        });
    }
});

// --- MOBILE MENU LOGIC ---
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// --- FAQ TOGGLE LOGIC ---
function toggleFaq(id) {
    const content = document.getElementById(`faq-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    
    if (content && icon) {
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            content.classList.add('hidden');
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    }
}


// --- CAROUSEL LOGIC ---
let currentIndex = 0;
const track = document.getElementById('carousel-track');
const slides = track ? track.children : [];
const totalSlides = slides.length;
let autoPlayInterval;

function updateCarousel() {
    if (!track) return;
    
    // On mobile, show 1 slide (100%). On Desktop, show 3 slides (33%).
    // We calculate width based on the first slide's rendered width including gap
    const slideWidth = slides[0].getBoundingClientRect().width + 24; // 24px is the gap
    const newTransform = -(currentIndex * slideWidth);
    
    track.style.transform = `translateX(${newTransform}px)`;
}

function nextSlide() {
    // Stop at the end (or loop back to 0 if you prefer infinite)
    // Here we handle responsive: subtract visible slides to avoid empty space at end
    const visibleSlides = window.innerWidth < 768 ? 1 : 3;
    
    if (currentIndex < totalSlides - visibleSlides) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to start
    }
    updateCarousel();
    resetAutoPlay();
}

function prevSlide() {
    const visibleSlides = window.innerWidth < 768 ? 1 : 3;
    
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalSlides - visibleSlides; // Loop to end
    }
    updateCarousel();
    resetAutoPlay();
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 3000); // 3 seconds
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if(track) {
        resetAutoPlay();
        
        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        track.addEventListener('mouseleave', resetAutoPlay);
        
        // Recalculate on resize
        window.addEventListener('resize', updateCarousel);
    }
});

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
                "SEO Specialist",
                "Web Designer"
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



// --- PERFECT ALIGNMENT CAROUSEL SYSTEM ---
const carouselStates = {
    'projects-track': { index: 0 },
    'carousel-track': { index: 0 }
};

function moveCarousel(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const state = carouselStates[trackId];
    const slides = track.children;
    const totalSlides = slides.length;
    const visibleSlides = window.innerWidth < 768 ? 1 : 3;

    // Update Index
    state.index += direction;

    // Loop logic
    if (state.index > totalSlides - visibleSlides) {
        state.index = 0;
    } else if (state.index < 0) {
        state.index = totalSlides - visibleSlides;
    }

    // NEW LOGIC: Use offsetLeft for perfect alignment
    // Yeh har slide ki exact position pick karta hai
    const targetSlide = slides[state.index];
    track.style.transform = `translateX(-${targetSlide.offsetLeft}px)`;
}

// Reset position on screen resize (mobile to desktop shift)
window.addEventListener('resize', () => {
    moveCarousel('projects-track', 0);
    moveCarousel('carousel-track', 0);
});

// Auto-play (thora slow rakha hai taake log dekh saken)
function startAutoPlay() {
    // Clear any existing intervals if necessary
    setInterval(() => moveCarousel('projects-track', 1), 6000);
    setInterval(() => moveCarousel('carousel-track', 1), 5000);
}

document.addEventListener('DOMContentLoaded', startAutoPlay);

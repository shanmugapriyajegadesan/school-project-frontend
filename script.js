// ==========================================
// 1. Navbar Loading Logic (Updated for all paths)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Mudhalla normal path try pannum, fail aana parent folder path try pannum
    fetch('navbar.html')
        .then(res => {
            if (!res.ok) throw new Error('File not found in current folder');
            return res.text();
        })
        .then(data => insertNavbar(data))
        .catch(() => {
            // Normal path fail aana, sub-folder-kaga '../' pottu thedum
            fetch('../navbar.html')
                .then(res => res.text())
                .then(data => insertNavbar(data))
                .catch(err => console.error("Navbar load aagala:", err));
        });
});

function insertNavbar(data) {
    const navbarElement = document.getElementById("navbar");
    if(navbarElement) {
        navbarElement.innerHTML = data;
        initNavbarEvents(); // Ensure events bind after load
    }
}

// Bind Navbar Events
function initNavbarEvents() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = trigger.nextElementSibling;
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
}

// ==========================================
// 2. Hero Slider Logic
// ==========================================
let currentStep = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    if(slides[index]) slides[index].classList.add('active');
}

function nextSlide() {
    if(slides.length > 0) {
        currentStep = (currentStep + 1) % slides.length;
        showSlide(currentStep);
    }
}

function prevSlide() {
    if(slides.length > 0) {
        currentStep = (currentStep - 1 + slides.length) % slides.length;
        showSlide(currentStep);
    }
}

let autoSlider = setInterval(nextSlide, 5000);

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if(nextBtn) {
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlider);
        nextSlide();
        autoSlider = setInterval(nextSlide, 5000);
    });
}

if(prevBtn) {
    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlider);
        prevSlide();
        autoSlider = setInterval(nextSlide, 5000);
    });
}

// ==========================================
// 3. Counters Logic
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');

            if (entry.isIntersecting) {
                let count = 0;
                const duration = 2000;
                const startTime = performance.now();

                const updateCount = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    
                    const currentNumber = Math.floor(progress * target);
                    counter.innerText = currentNumber + (currentNumber >= target ? "+" : "");

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    }
                };
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = "0";
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// ==========================================
// 4. Back To Top Logic
// ==========================================
const backToTopButton = document.querySelector("#backToTop");

if(backToTopButton) {
    window.addEventListener("scroll", () => {
        // window.innerHeight equals 100vh
        if (window.pageYOffset > window.innerHeight) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
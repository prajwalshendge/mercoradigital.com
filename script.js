document.addEventListener('DOMContentLoaded', () => {

    // --- Contact Page Form Handling Simulation ---
    // NOTE: This targets the form specifically on the contact page (contact.html)
    const contactPageForm = document.getElementById('contact-page-form');
    const formStatusContact = document.getElementById('form-status-contact');

    // Check if the contact page form and its status container exist on the current page
    if (contactPageForm && formStatusContact) {
        const successMessageContact = formStatusContact.querySelector('.success');
        const errorMessageContact = formStatusContact.querySelector('.error');
        // NOTE: To disable/enable button during submission, you'd need to select it here:
        // const submitButtonContact = contactPageForm.querySelector('button[type="submit"]');


        contactPageForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default page reload

            // --- Hide previous status messages ---
            if (successMessageContact) successMessageContact.style.display = 'none';
            if (errorMessageContact) errorMessageContact.style.display = 'none';

            // --- Basic Validation (Leveraging HTML5 'required') ---
            // More complex validation (e.g., email format, phone format) could be added here.

            // --- Simulate Sending Data ---
            // **** IMPORTANT ****
            // This section ONLY simulates the process.
            // To actually send data and save it to Google Drive/Sheets, you MUST replace
            // this simulation with a fetch() call to your Google Apps Script URL,
            // third-party form endpoint, or custom backend script.
            console.log('Contact page form submitted. Simulating sending...');

            // Example: Get form data if needed for fetch()
            // const formData = new FormData(contactPageForm);
            // console.log("Form Data:", Object.fromEntries(formData.entries()));

            // Display loading state (optional)
            // if(submitButtonContact) {
            //    submitButtonContact.disabled = true;
            //    submitButtonContact.textContent = 'Sending...';
            // }

            // --- Simulate Network Delay & Success/Error ---
            const simulateSuccess = Math.random() > 0.2; // 80% chance of success for demo

            setTimeout(() => { // Simulate network response time
                if (simulateSuccess) {
                    console.log('Simulated Success');
                    if (successMessageContact) successMessageContact.style.display = 'block';
                    contactPageForm.reset(); // Clear the form on success
                } else {
                    console.error('Simulated Error');
                    if (errorMessageContact) {
                         // You might want to set a default error message if data.error is not provided by a real API
                         errorMessageContact.textContent = 'Oops! Something went wrong. Please try again.';
                         errorMessageContact.style.display = 'block';
                    }
                }
                 // Reset button state (optional)
                 // if(submitButtonContact) {
                 //    submitButtonContact.disabled = false;
                 //    submitButtonContact.textContent = 'Send Message';
                 // }

            }, 1000); // 1-second delay simulation

        });
    } else {
        // Optional: Log if the contact form wasn't found (e.g., on other pages like index.html)
        // console.log('Contact page form with ID "contact-page-form" not found on this page.');
    }


    // --- Mobile Menu Toggle Logic ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            // Toggle ARIA attribute for accessibility
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            // Toggle the 'active' class on the nav element (requires CSS rules for .active)
            mainNav.classList.toggle('active');
            // Toggle body class to prevent scrolling when menu is open (requires CSS rules for .mobile-menu-open)
            document.body.classList.toggle('mobile-menu-open');
        });
    }


    // --- AI Chatbot Placeholder Interaction (Conceptual) ---
    const chatBotButton = document.getElementById('chat-bot-button');
    if (chatBotButton) {
        chatBotButton.addEventListener('click', () => {
            console.log('Chatbot button clicked. Requires integration.');
            // **** IMPORTANT ****
            // This is just a placeholder click handler.
            // Actual chatbot functionality (opening window, predefined questions/answers)
            // requires integration with a specific chatbot service (like Tidio, Crisp, Drift, HubSpot)
            // or a custom-built solution using JavaScript frameworks and potentially AI APIs.
            // You would typically call the API of your chosen service here, e.g., `TidioChatApi.open()`.
            alert('Chatbot integration needed here!'); // Simple alert for demo
        });
    }


    // --- Future Enhancements & TODOs (Kept from original) ---
    // TODO: Implement real form submission using fetch() or XMLHttpRequest (linking to Google Apps Script/Backend for Google Drive/Sheets integration).
    // TODO: Add more robust JavaScript validation for forms (beyond HTML5 'required').
    // TODO: Implement smooth scrolling for anchor links (e.g., #case-studies).
    // TODO: Use Intersection Observer API for scroll reveal animations (to replace CSS animation delays for better performance on elements as they enter viewport).
    // TODO: Initialize actual Chat Bot Widget based on chosen service documentation (this includes setting up predefined questions/answers if the service supports it).

}); // End DOMContentLoaded Listener

/* =====================================================
   HERO SECTION ENHANCEMENTS
   ===================================================== */

// --- 1. Typed / cycling headline ---
(function heroTyped() {
    const el = document.getElementById('hero-typed');
    if (!el) return;

    const words = ['Brand', 'Organic Reach', 'Revenue', 'Online Presence', 'Authority'];
    let wordIdx = 0, charIdx = 0, deleting = false;
    const TYPING_SPEED = 90, DELETING_SPEED = 50, PAUSE = 1800;

    function tick() {
        const current = words[wordIdx];
        if (!deleting) {
            el.textContent = current.slice(0, ++charIdx);
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(tick, PAUSE);
                return;
            }
        } else {
            el.textContent = current.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                wordIdx = (wordIdx + 1) % words.length;
            }
        }
        setTimeout(tick, deleting ? DELETING_SPEED : TYPING_SPEED);
    }
    tick();
}());

// --- 2. 3D WebGL Background (Three.js) ---
(function hero3DBackground() {
    const container = document.getElementById('hero-3d-canvas');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Geometry - Icosahedron for that premium tech feel
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00FF87, // Neon Green
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add a second slightly larger sphere for depth
    const geo2 = new THREE.IcosahedronGeometry(3.2, 1);
    const mat2 = new THREE.MeshBasicMaterial({ 
        color: 0x0D5C48, // Emerald Green
        wireframe: true,
        transparent: true,
        opacity: 0.1 
    });
    const sphere2 = new THREE.Mesh(geo2, mat2);
    scene.add(sphere2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Handle Resize
    window.addEventListener('resize', () => {
        if (!container.offsetWidth) return;
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Gentle rotation
        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.002;
        
        sphere2.rotation.x -= 0.0005;
        sphere2.rotation.y -= 0.001;

        // Mouse tracking easing
        sphere.position.x += (mouseX * 0.5 - sphere.position.x) * 0.05;
        sphere.position.y += (mouseY * 0.5 - sphere.position.y) * 0.05;

        renderer.render(scene, camera);
    }
    animate();
}());

// --- 3. Stat counter animation (fires when cards enter viewport) ---
(function heroStats() {
    const cards = document.querySelectorAll('.hero-stat-card');
    if (!cards.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const numEl = entry.target.querySelector('.stat-number');
            if (!numEl || numEl.dataset.animated) return;
            numEl.dataset.animated = '1';

            const target = parseInt(numEl.dataset.target, 10);
            const duration = 1600;
            const step = 16;
            const steps = duration / step;
            let current = 0;
            const inc = target / steps;

            const t = setInterval(() => {
                current = Math.min(current + inc, target);
                numEl.textContent = Math.round(current);
                if (current >= target) clearInterval(t);
            }, step);

            io.unobserve(entry.target);
        });
    }, { threshold: 0.4 });

    cards.forEach(c => io.observe(c));
}());

// --- 4. Global Scroll Reveal Animations ---
(function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only reveal once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
}());

// --- 5. 3D Mouse Tilt Effect ---
(function init3DTilt() {
    const tiltElements = document.querySelectorAll('[data-3d]');
    if (!tiltElements.length || window.matchMedia("(pointer: coarse)").matches) return; // Skip on touch devices

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg tilt
            const rotateY = ((x - centerX) / centerX) * 5;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}());

// --- 6. Magnetic Buttons ---
(function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    if (!magneticButtons.length || window.matchMedia("(pointer: coarse)").matches) return;

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move button slightly towards cursor
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}());

// --- 7. Additional Stat Counters (for the new Stats Bar) ---
(function statsBarCounter() {
    const statItems = document.querySelectorAll('.stats-bar-item');
    if (!statItems.length) return;

    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const numEl = entry.target.querySelector('.stats-bar-num');
            if (!numEl || numEl.dataset.animated) return;
            
            const targetVal = numEl.dataset.target;
            numEl.dataset.animated = '1';

            if (targetVal === 'none') {
                observer.unobserve(entry.target);
                return;
            }

            const target = parseInt(targetVal, 10);
            const duration = 2000;
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;

            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / 16)); // increment based on 60fps
                if (current >= target) {
                    numEl.textContent = target;
                    clearInterval(timer);
                } else {
                    numEl.textContent = current;
                }
            }, 16);

            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => io.observe(item));
}());

/*
    NOTE ON MODULARIZING JS (Kept from original):
    For larger projects, it's best practice to break this script into modules.
    For example:
    - formHandler.js (Handles form submission logic)
    - mobileMenu.js (Handles navigation toggle)
    - uiAnimations.js (Handles scroll reveals, etc.)
    - chatBot.js (Handles chat integration)
    You would then use ES6 modules (import/export) and potentially a build tool
    like Webpack or Parcel to bundle them. For this current scale, a single
    file is acceptable but keep modularity in mind as features grow.
*/
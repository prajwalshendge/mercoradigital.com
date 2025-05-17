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
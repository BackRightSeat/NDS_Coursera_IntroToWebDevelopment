// ---------------------------------------------
// Toggle Navigation Menu (Mobile Hamburger)
// ---------------------------------------------
function toggleMenu() {
    const nav = document.querySelector('nav[role="navigation"]');
    nav.classList.toggle('open');
}

// Attach toggleMenu() to the hamburger icon
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", toggleMenu);
        hamburger.addEventListener("keypress", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                toggleMenu();
            }
        });
    }
});

// ---------------------------------------------
// Smooth Scrolling for Internal Navigation Links
// ---------------------------------------------
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        // Close mobile menu after clicking a link
        const nav = document.querySelector('nav[role="navigation"]');
        nav.classList.remove("open");
    });
});
// ======================================================
// PROJECT FILTERING
// ======================================================

function filterProjects(category) {
    const projects = document.querySelectorAll("#projects article");

    projects.forEach(project => {
        const projectCategory = project.getAttribute("data-category");

        if (category === "all" || projectCategory === category) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}

// Optional: attach filter buttons if you add them in HTML
document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-filter");
        filterProjects(category);
    });
});


// ======================================================
// LIGHTBOX / MODAL IMAGE VIEWER
// ======================================================

// Create modal elements dynamically
const modal = document.createElement("div");
modal.id = "lightbox-modal";
modal.style.display = "none";
modal.innerHTML = `
    <div id="lightbox-overlay"></div>
    <div id="lightbox-content">
        <img id="lightbox-image" src="" alt="Expanded project image">
        <button id="lightbox-close" aria-label="Close image viewer">&times;</button>
    </div>
`;
document.body.appendChild(modal);

const modalImage = document.getElementById("lightbox-image");
const modalClose = document.getElementById("lightbox-close");
const modalOverlay = document.getElementById("lightbox-overlay");


// Open modal when project image is clicked
document.querySelectorAll("#projects img").forEach(img => {
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
        modalImage.src = img.src;
        modal.style.display = "flex";
        modalClose.focus();
    });
});

// Close modal function
function closeLightbox() {
    modal.style.display = "none";
    modalImage.src = "";
}

// Close on button click
modalClose.addEventListener("click", closeLightbox);

// Close on overlay click
modalOverlay.addEventListener("click", closeLightbox);

// Close on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});
// ======================================================
// CONTACT FORM VALIDATION
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#contact form");
    const nameInput = document.querySelector("#contact-name");
    const emailInput = document.querySelector("#contact-email");
    const messageInput = document.querySelector("#contact-message");

    // Create helper function to show error messages
    function showError(input, message) {
        let error = input.nextElementSibling;

        // If no error element exists, create one
        if (!error || !error.classList.contains("error-message")) {
            error = document.createElement("div");
            error.classList.add("error-message");
            input.insertAdjacentElement("afterend", error);
        }

        error.textContent = message;
        input.classList.add("invalid");
    }

    // Clear error message
    function clearError(input) {
        const error = input.nextElementSibling;
        if (error && error.classList.contains("error-message")) {
            error.textContent = "";
        }
        input.classList.remove("invalid");
    }

    // Email validation regex
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Real-time validation listeners
    nameInput.addEventListener("input", () => {
        if (nameInput.value.trim() === "") {
            showError(nameInput, "Name is required.");
        } else {
            clearError(nameInput);
        }
    });

    emailInput.addEventListener("input", () => {
        if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, "Please enter a valid email address.");
        } else {
            clearError(emailInput);
        }
    });

    messageInput.addEventListener("input", () => {
        if (messageInput.value.trim() === "") {
            showError(messageInput, "Message cannot be empty.");
        } else {
            clearError(messageInput);
        }
    });

    // Validate on submit
    form.addEventListener("submit", (e) => {
        let isValid = true;

        if (nameInput.value.trim() === "") {
            showError(nameInput, "Name is required.");
            isValid = false;
        }

        if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }

        if (messageInput.value.trim() === "") {
            showError(messageInput, "Message cannot be empty.");
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault(); // Stop form submission
        }
    });
});

// ===== TYPING ANIMATION =====
const texts = [
  "Web Developer crafting modern, responsive websites that deliver real impact.",
  "Frontend Developer focused on clean design and smooth user experience.",
  "Building fast, scalable, and user-friendly web applications.",
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 60;
const eraseSpeed = 40;
const delayBetween = 1500;

const typingElement = document.getElementById("typing-text");

function typeEffect() {
  const currentText = texts[index];

  if (!isDeleting) {
    typingElement.textContent = currentText.slice(0, charIndex++);
    if (charIndex > currentText.length) {
      setTimeout(() => (isDeleting = true), delayBetween);
    }
  } else {
    typingElement.textContent = currentText.slice(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? eraseSpeed : speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  // Toggle menu
  toggle.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling
    nav.classList.toggle("show");
    toggle.classList.toggle("active");
  });

  // Close when clicking outside
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("show");
      toggle.classList.remove("active");
    }
  });
});

const skillsSection = document.querySelector(".skills");
const progressBars = document.querySelectorAll(".progress-bar");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressBars.forEach((bar) => {
          bar.style.width = bar.getAttribute("data-progress");
        });
      }
    });
  },
  { threshold: 0.5 },
);

observer.observe(skillsSection);

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#nav-links a");

  function setActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });

    /* ✅ FORCE CONTACT ACTIVE AT BOTTOM */
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
      navLinks.forEach((link) => link.classList.remove("active"));
      document.querySelector('nav a[href="#contact"]').classList.add("active");
    }
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();
});

document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("LSMObcyVEJeCnFnGA"); // replace

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.textContent = "Sending...";
    status.style.color = "#555";

    emailjs
      .sendForm("service_v3gt6ky", "template_cp924pc", form)
      .then(() => {
        status.textContent = "Message sent successfully ✅";
        status.style.color = "green";
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        status.textContent = "Failed to send ❌";
        status.style.color = "red";
      });
  });
});

// ===== DARK MODE =====
const toggle = document.getElementById("theme-toggle");
const icon = toggle.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  icon.classList.replace("fa-moon", "fa-sun");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
});

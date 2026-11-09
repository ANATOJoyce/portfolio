// =====================================
// MENU MOBILE
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// =====================================
// ANNÉE AUTOMATIQUE
// =====================================

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// =====================================
// ANIMATIONS AU DÉFILEMENT
// =====================================

const animatedElements = document.querySelectorAll(
  ".section-title, " +
    ".about-content, " +
    ".skills, " +
    ".experience-card, " +
    ".project-card, " +
    ".gallery-item, " +
    ".education-card, " +
    ".contact",
);

animatedElements.forEach((element, index) => {
  element.classList.add("reveal");

  // Petit décalage progressif pour les cartes
  if (
    element.classList.contains("experience-card") ||
    element.classList.contains("project-card") ||
    element.classList.contains("gallery-item") ||
    element.classList.contains("education-card")
  ) {
    element.style.transitionDelay = `${(index % 3) * 0.12}s`;
  }
});

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  },
);

animatedElements.forEach((element) => {
  observer.observe(element);
});

// =====================================
// EFFET DE MOUVEMENT DE LA PHOTO
// =====================================

const profileCard = document.querySelector(".profile-card");

const canHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)",
).matches;

if (profileCard && canHover) {
  const heroVisual = document.querySelector(".hero-visual");

  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;

    profileCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    profileCard.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
}

// Small interactions for the portfolio. Keep this file linked in index.html.
document.addEventListener("DOMContentLoaded", () => {
  // Update the copyright year automatically.
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Mobile navigation menu.
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // Reveal sections smoothly when they enter the screen.
  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Typing effect for the role in the hero section.
  const typedRole = document.getElementById("typed-role");
  const roles = [
    "Aspiring Software Developer",
    "Frontend Developer in Progress",
    "B.Tech IT Student"
  ];

  if (typedRole && !reduceMotion) {
    let roleIndex = 0;
    let characterIndex = roles[0].length;
    let deleting = true;
    typedRole.textContent = roles[0];

    const typeNext = () => {
      const currentRole = roles[roleIndex];

      if (deleting) {
        characterIndex -= 1;
        typedRole.textContent = currentRole.slice(0, characterIndex);
        if (characterIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          window.setTimeout(typeNext, 350);
          return;
        }
        window.setTimeout(typeNext, 38);
      } else {
        const nextRole = roles[roleIndex];
        characterIndex += 1;
        typedRole.textContent = nextRole.slice(0, characterIndex);
        if (characterIndex >= nextRole.length) {
          deleting = true;
          window.setTimeout(typeNext, 1600);
          return;
        }
        window.setTimeout(typeNext, 58);
      }
    };

    window.setTimeout(typeNext, 1700);
  }

  // Subtle cursor glow on devices with a mouse.
  const pointerGlow = document.querySelector(".pointer-glow");
  if (pointerGlow && window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
    window.addEventListener("mousemove", (event) => {
      pointerGlow.style.left = `${event.clientX}px`;
      pointerGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }
});

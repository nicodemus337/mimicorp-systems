/* =========================
   INTRO TRANSITION
========================= */

const video = document.getElementById("introVideo");
const intro = document.getElementById("intro");
const site = document.getElementById("site");

// If intro video exists, control transition
if (video && intro && site) {
  let transitioned = false;

  const revealSite = () => {
    if (transitioned) return;
    transitioned = true;

    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";
      site.classList.remove("hidden");
      site.style.opacity = "1";
    }, 800);
  };

  // When video ends
  video.onended = revealSite;

  // Fallback (in case video fails or hangs)
  setTimeout(revealSite, 8000);
}


/* =========================
   NAV INJECTION
========================= */

const navContainer = document.getElementById("nav");

if (navContainer) {
  fetch("/components/nav.html")
    .then(res => res.text())
    .then(data => {
      navContainer.innerHTML = data;
      highlightActiveNav();
    })
    .catch(err => {
      console.error("Nav load failed:", err);
    });
}


/* =========================
   ACTIVE NAV LINK
========================= */

function highlightActiveNav() {
  const links = document.querySelectorAll("nav a");
  const path = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute("href");

    if (path.startsWith(href) && href !== "/") {
      link.classList.add("active");
    }

    // Special case for homepage
    if (path === "/" && href === "/") {
      link.classList.add("active");
    }
  });
}


/* =========================
   SMOOTH SCROLL (OPTIONAL)
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


/* =========================
   BASIC FADE-IN ON LOAD
========================= */

window.addEventListener("load", () => {
  document.body.classList.add("fade-in");
});
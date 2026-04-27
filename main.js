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
   COPYRIGHT WATERMARK
========================= */

const siteContainer = document.getElementById("site");

if (siteContainer && !document.querySelector(".site-watermark")) {
  const watermark = document.createElement("footer");
  watermark.className = "site-watermark";
  watermark.setAttribute("aria-label", "Copyright");
  watermark.innerHTML = "&copy; mimicorp labs, 2026, new iberia louisiana";
  siteContainer.appendChild(watermark);
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

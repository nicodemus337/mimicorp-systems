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
  watermark.innerHTML = "&copy; mimicorp labs, llc 2026";
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


/* =========================
   WEBBOOK READER
========================= */

document.querySelectorAll(".webbook-reader").forEach(reader => {
  const pages = Array.from(reader.querySelectorAll(".webbook-page"));
  const stage = reader.querySelector(".webbook-stage");
  const count = reader.querySelector(".webbook-count");
  const prev = reader.querySelector(".webbook-prev");
  const next = reader.querySelector(".webbook-next");
  let index = Math.max(0, pages.findIndex(page => page.classList.contains("is-active")));
  let touchStartX = 0;

  function renderPage() {
    pages.forEach((page, pageIndex) => {
      const active = pageIndex === index;
      page.classList.toggle("is-active", active);
      page.setAttribute("aria-hidden", active ? "false" : "true");
    });

    if (count) {
      count.textContent = `${index + 1} / ${pages.length}`;
    }

    if (prev) {
      prev.disabled = index === 0;
    }

    if (next) {
      next.disabled = index === pages.length - 1;
    }
  }

  function goToPage(nextIndex) {
    index = Math.min(Math.max(nextIndex, 0), pages.length - 1);
    renderPage();
  }

  if (!pages.length) {
    return;
  }

  prev?.addEventListener("click", () => goToPage(index - 1));
  next?.addEventListener("click", () => goToPage(index + 1));

  stage?.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPage(index - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToPage(index + 1);
    }
  });

  stage?.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  stage?.addEventListener("touchend", event => {
    const distance = event.changedTouches[0].clientX - touchStartX;

    if (Math.abs(distance) < 48) {
      return;
    }

    goToPage(distance > 0 ? index - 1 : index + 1);
  }, { passive: true });

  renderPage();
});

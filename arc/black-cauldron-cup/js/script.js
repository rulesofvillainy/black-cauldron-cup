/* ==========================================================================
   Black Cauldron Cup — Demo Site Script
   All "purchase" / external actions are stubbed out — this is a placeholder
   clone with no real payments, auth, or backend.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initSignInModal();
  initDummyButtons();
  initVendorPage();
});

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => links.classList.remove("open"));
  });
}

/* ---------- Sign In modal (dummy — no real auth) ---------- */
function initSignInModal() {
  const openBtns = document.querySelectorAll("[data-open-signin]");
  const overlay = document.getElementById("signin-modal");
  if (!overlay) return;
  const closeBtn = overlay.querySelector(".modal-close");
  const form = overlay.querySelector("form");

  openBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      overlay.classList.add("open");
    })
  );

  closeBtn?.addEventListener("click", () => overlay.classList.remove("open"));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("open");
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    overlay.classList.remove("open");
    showToast("This is a placeholder demo — sign-in isn't connected to anything.");
  });
}

/* ---------- Any button/link tagged as a dummy action ---------- */
function initDummyButtons() {
  document.querySelectorAll("[data-dummy-action]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const label = el.getAttribute("data-dummy-action") || "This action";
      showToast(`${label} — demo only, no real purchase or link happens here.`);
    });
  });
}

/* ---------- Toast helper ---------- */
let toastTimer;
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* ---------- Vendor page: simulate "loading events" then reveal options ---------- */
function initVendorPage() {
  const loadingMsg = document.getElementById("vendor-loading");
  const vendorContent = document.getElementById("vendor-content");
  if (!loadingMsg || !vendorContent) return;

  setTimeout(() => {
    loadingMsg.style.display = "none";
    vendorContent.style.display = "block";
  }, 900);
}

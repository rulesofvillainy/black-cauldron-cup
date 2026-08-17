/* ==========================================================================
   Black Cauldron Cup — Demo Site Script
   All "purchase" / external actions are stubbed out — this is a placeholder
   clone with no real payments, auth, or backend.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initDummyButtons();
  initPopovers();
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


/* ---------- Event detail popovers ---------- */
function initPopovers() {
  // Open
  document.querySelectorAll("[data-popover]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-popover");
      const overlay = document.getElementById(id);
      if (!overlay) return;
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  // Close — ✕ button or backdrop click
  document.querySelectorAll(".popover-overlay").forEach((overlay) => {
    const closeBtn = overlay.querySelector(".popover-close");
    closeBtn?.addEventListener("click", () => closePopover(overlay));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closePopover(overlay);
    });
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".popover-overlay.open").forEach(closePopover);
  });
}

function closePopover(overlay) {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
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

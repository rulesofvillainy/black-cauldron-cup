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
  initCardGallery();
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

/* ---------- Contextual messages for pending/TBD actions ---------- */
const DUMMY_MESSAGES = {
  "Decklist Link":
    "Decklist submission link not yet available. Please check back later or contact the Tournament Organizers.",
  "Playhub Link":
    "Ravensburger Playhub link not yet available. Please check back closer to the event date.",
  "View Hotel Booking Link":
    "Hotel block booking details are not yet available. Check back soon for more information.",
  "Purchase Option A Table":
    "Vendor table applications are not yet open. Please check back later or contact the event organizers.",
  "Purchase Option B Table":
    "Vendor table applications are not yet open. Please check back later or contact the event organizers.",
};

function initDummyButtons() {
  document.querySelectorAll("[data-dummy-action]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const action = el.getAttribute("data-dummy-action") || "";
      const message =
        DUMMY_MESSAGES[action] ||
        `${action} — this link is not yet available. Please check back later.`;
      showToast(message);
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

/* ---------- Artist Card Gallery ---------- */
function initCardGallery() {
  const overlay   = document.getElementById("popover-artist-cards");
  const mainImg   = document.getElementById("gallery-main-img");
  const mainLabel = document.getElementById("gallery-main-label");
  const strip     = document.getElementById("gallery-strip");
  if (!overlay || !mainImg || !mainLabel || !strip) return;

  const thumbs = strip.querySelectorAll(".gallery-thumb");
  let fadeTimer  = null;

  /* Show a card in the viewer.
   * lock=true  → definitive selection (click): single smooth fade-in.
   * lock=false → hover preview: instant swap, no opacity cycle. */
  function setGalleryCard(thumb, lock) {
    const src   = thumb.dataset.img   || "";
    const label = thumb.dataset.label || "";

    // Update footer label
    mainLabel.textContent = label;
    mainLabel.classList.toggle("has-card", !!label);

    if (lock) {
      // Mark active thumb
      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");

      // Only fade if the src is actually changing
      if (mainImg.src !== src && mainImg.getAttribute("src") !== src) {
        clearTimeout(fadeTimer);
        mainImg.style.transition = "opacity 0.28s ease";
        mainImg.style.opacity    = "0";
        fadeTimer = setTimeout(() => {
          mainImg.src = src;
          const show = () => { mainImg.style.opacity = "1"; };
          mainImg.onload = show;
          if (mainImg.complete && mainImg.naturalWidth) show();
        }, 180);
      }
    } else {
      // Hover: instant, no flash
      clearTimeout(fadeTimer);
      mainImg.style.transition = "none";
      mainImg.style.opacity    = "1";
      mainImg.src = src;
    }
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener("mouseover", () => setGalleryCard(thumb, false));
    thumb.addEventListener("click",     () => setGalleryCard(thumb, true));
  });

  // When cursor leaves the strip, snap back to the locked active card instantly
  strip.addEventListener("mouseleave", () => {
    const locked = strip.querySelector(".gallery-thumb.active");
    if (locked) setGalleryCard(locked, false);
  });

  // When the gallery popover opens, load the active (or first) card instantly
  document.querySelectorAll("[data-popover='popover-artist-cards']").forEach(btn => {
    btn.addEventListener("click", () => {
      const active = strip.querySelector(".gallery-thumb.active") || thumbs[0];
      if (active) setGalleryCard(active, false); // instant on open
    });
  });
}

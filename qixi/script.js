const header = document.querySelector("[data-header]");
const dialog = document.querySelector("[data-secret-dialog]");
const openButton = document.querySelector("[data-open-letter]");
const closeButton = document.querySelector("[data-close-letter]");
const galleryDialog = document.querySelector("[data-gallery-dialog]");
const galleryImage = document.querySelector("[data-gallery-image]");
const galleryCaption = document.querySelector("[data-gallery-caption]");
const galleryButtons = [...document.querySelectorAll("[data-gallery-index]")];
const passwordGate = document.querySelector("[data-password-gate]");
const passwordForm = document.querySelector("[data-password-form]");
const passwordInput = document.querySelector("[data-password-input]");
const passwordError = document.querySelector("[data-password-error]");
const soundtrackPreview = document.querySelector("[data-soundtrack-preview]");
const soundtrackStatus = document.querySelector("[data-soundtrack-status]");
const protectedContent = [document.querySelector(".site-header"), document.querySelector("main"), document.querySelector("footer")].filter(Boolean);
let activeGalleryIndex = 0;

const PASSWORD_HASH = "d4f84e9b4c90d55243cdedf9f261d38f911c1393727f33954a85e6fcbbd5d2be";
const SESSION_KEY = "qixi-story-unlocked";

const setContentLocked = (locked) => {
  protectedContent.forEach((element) => {
    element.inert = locked;
  });
};

const unlockStory = (animate = true) => {
  setContentLocked(false);
  document.body.classList.remove("is-locked");

  if (!passwordGate) return;
  if (animate) passwordGate.classList.add("is-opening");

  window.setTimeout(() => {
    passwordGate.hidden = true;
  }, animate ? 480 : 0);
};

const hashPassword = async (value) => {
  const normalized = value.replace(/\D/g, "");
  const bytes = new TextEncoder().encode(normalized);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const playSoundtrackPreview = () => {
  if (!soundtrackPreview) return;

  soundtrackPreview.currentTime = 0;
  const playback = soundtrackPreview.play();

  playback?.then(() => {
    if (soundtrackStatus) soundtrackStatus.textContent = "Now playing: 喜欢你 · Reproduciendo: 喜欢你";
  }).catch(() => {
    if (soundtrackStatus) soundtrackStatus.textContent = "Tap play above to begin · Toca el botón de reproducción para empezar";
  });
};

soundtrackPreview?.addEventListener("ended", () => {
  if (soundtrackStatus) soundtrackStatus.textContent = "Preview finished — continue with the full player above · La vista previa terminó — continúa arriba";
});

setContentLocked(true);

if (sessionStorage.getItem(SESSION_KEY) === "yes") {
  unlockStory(false);
  playSoundtrackPreview();
} else {
  window.setTimeout(() => passwordInput?.focus(), 120);
}

passwordForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  passwordForm.classList.remove("has-error");
  passwordError.textContent = "";

  const submittedHash = await hashPassword(passwordInput.value);

  if (submittedHash === PASSWORD_HASH) {
    sessionStorage.setItem(SESSION_KEY, "yes");
    playSoundtrackPreview();
    unlockStory();
    return;
  }

  passwordForm.classList.add("has-error");
  passwordError.textContent = "That date does not open our story. · Esa fecha no abre nuestra historia.";
  passwordInput.select();
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 28);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

openButton?.addEventListener("click", () => {
  if (dialog?.showModal) {
    dialog.showModal();
  }
});

closeButton?.addEventListener("click", () => dialog?.close());

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

const showGalleryPhoto = (index) => {
  if (!galleryImage || !galleryCaption || galleryButtons.length === 0) return;

  activeGalleryIndex = (index + galleryButtons.length) % galleryButtons.length;
  const button = galleryButtons[activeGalleryIndex];
  const image = button.querySelector("img");
  const caption = button.closest("figure")?.querySelector("figcaption")?.textContent.trim();

  galleryImage.src = image.src;
  galleryImage.alt = image.alt;
  galleryCaption.textContent = caption || "";
};

galleryButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showGalleryPhoto(index);
    galleryDialog?.showModal();
  });
});

document.querySelector("[data-gallery-close]")?.addEventListener("click", () => galleryDialog?.close());
document.querySelector("[data-gallery-prev]")?.addEventListener("click", () => showGalleryPhoto(activeGalleryIndex - 1));
document.querySelector("[data-gallery-next]")?.addEventListener("click", () => showGalleryPhoto(activeGalleryIndex + 1));

galleryDialog?.addEventListener("click", (event) => {
  if (event.target === galleryDialog) {
    galleryDialog.close();
  }
});

galleryDialog?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showGalleryPhoto(activeGalleryIndex - 1);
  if (event.key === "ArrowRight") showGalleryPhoto(activeGalleryIndex + 1);
});

const header = document.querySelector("[data-header]");
const dialog = document.querySelector("[data-secret-dialog]");
const openButton = document.querySelector("[data-open-letter]");
const closeButton = document.querySelector("[data-close-letter]");
const galleryDialog = document.querySelector("[data-gallery-dialog]");
const galleryImage = document.querySelector("[data-gallery-image]");
const galleryCaption = document.querySelector("[data-gallery-caption]");
const galleryButtons = [...document.querySelectorAll("[data-gallery-index]")];
let activeGalleryIndex = 0;

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

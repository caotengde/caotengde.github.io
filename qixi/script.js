const header = document.querySelector("[data-header]");
const dialog = document.querySelector("[data-secret-dialog]");
const openButton = document.querySelector("[data-open-letter]");
const closeButton = document.querySelector("[data-close-letter]");

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

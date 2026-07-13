const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (header && !header.classList.contains("compact")) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

const article = document.querySelector(".article-main .article");

if (article && !document.querySelector("#comments")) {
  const comments = document.createElement("section");
  comments.className = "comments-panel";
  comments.id = "comments";
  comments.setAttribute("aria-labelledby", "comments-title");
  comments.innerHTML = `
    <p class="section-kicker">Discussion</p>
    <h2 id="comments-title">Comments</h2>
    <p class="comments-intro">Questions, corrections, and research discussion are welcome.</p>
    <div class="giscus"></div>
  `;
  article.append(comments);

  const giscus = document.createElement("script");
  giscus.src = "https://giscus.app/client.js";
  giscus.dataset.repo = "caotengde/caotengde.github.io";
  giscus.dataset.repoId = "MDEwOlJlcG9zaXRvcnk5NzgwOTAwMQ==";
  giscus.dataset.category = "Announcements";
  giscus.dataset.categoryId = "DIC_kwDOBdRyac4DBI_M";
  giscus.dataset.mapping = "pathname";
  giscus.dataset.strict = "1";
  giscus.dataset.reactionsEnabled = "1";
  giscus.dataset.emitMetadata = "0";
  giscus.dataset.inputPosition = "top";
  giscus.dataset.theme = "light";
  giscus.dataset.lang = "en";
  giscus.dataset.loading = "lazy";
  giscus.crossOrigin = "anonymous";
  giscus.async = true;
  comments.querySelector(".giscus").append(giscus);
}

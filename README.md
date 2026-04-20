# caotengde.github.io

Personal academic blog and GitHub Pages homepage.

## Local Preview

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

If this is a new local directory, run:

```bash
git init
git branch -M main
git remote add origin git@github.com:caotengde/caotengde.github.io.git
git add .
git commit -m "Create academic blog"
git push -u origin main
```

After deployment, visit:

```text
https://caotengde.github.io
```

## Common Edit Locations

- Homepage content: `index.html`
- Notes list: `blog.html`
- Individual posts: `posts/`
- Styles: `styles.css`
- Site icon: `assets/favicon.svg`
- Homepage hero image: `assets/academic-hero.png`

To add a new note, copy `posts/reading-note-template.html`, update the filename, title, date and body, then add links in `blog.html` and `index.html`.

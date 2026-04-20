# caotengde.github.io

个人学术博客与 GitHub Pages 主页。

## 本地预览

直接在浏览器打开 `index.html` 即可预览。也可以运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 发布到 GitHub Pages

如果这是一个新目录，可以执行：

```bash
git init
git branch -M main
git remote add origin git@github.com:caotengde/caotengde.github.io.git
git add .
git commit -m "Create academic blog"
git push -u origin main
```

发布后访问：

```text
https://caotengde.github.io
```

## 常用修改位置

- 主页信息：`index.html`
- 文章列表：`blog.html`
- 单篇文章：`posts/`
- 样式：`styles.css`
- 站点图标：`assets/favicon.svg`
- 主页封面图：`assets/academic-hero.png`

新增文章时，可以复制 `posts/reading-note-template.html`，改文件名、标题、日期和正文，再把链接加入 `blog.html` 与 `index.html`。

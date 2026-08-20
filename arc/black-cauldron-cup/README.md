# Black Cauldron Cup (Placeholder Demo Site)

This is a **static HTML/CSS/JS clone** of a tournament landing site's structure
and functionality, with all branding, copy, and images replaced by placeholder
content:

- Logo → placeholder box
- All photos → dashed placeholder blocks
- All body text → generic placeholder copy
- All "Buy Ticket" / "Purchase" / "Donate" / social links → dummy buttons that
  just show a small toast message (no real payment, auth, or external links)
- Sign In → a non-functional modal form

No frameworks, no build step, no dependencies — just plain files.

## Pages

- `index.html` — home page with Tournaments, Commentators, Sponsors, Vendors,
  Venue, About, and Contact sections
- `faq.html` — FAQ page
- `vendor.html` — vendor table "purchase" page with a simulated loading state

## File structure

```
black-cauldron-cup/
├── index.html
├── faq.html
├── vendor.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── README.md
```

## Option 1: Deploy on GitHub Pages (recommended, no installs needed)

1. Create a new repository on GitHub (e.g. `black-cauldron-cup`).
2. Upload all the files in this folder to the repo, keeping the same
   structure (`css/`, `js/`, and the `.html` files at the repo root).
   - Easiest way: on the repo page, click **Add file → Upload files**, drag
     in everything, and commit.
   - Or with git locally:
     ```bash
     cd black-cauldron-cup
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/black-cauldron-cup.git
     git push -u origin main
     ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
6. GitHub will publish the site at:
   `https://YOUR-USERNAME.github.io/black-cauldron-cup/`
   (it can take a minute or two the first time).

That's it — no Node, no build tools, nothing else to install. Every link
between pages uses relative paths (`index.html`, `faq.html`, `vendor.html`,
`css/styles.css`, `js/script.js`), so it works correctly whether it's hosted
at a domain root or in a GitHub Pages subfolder.

## Option 2: Preview locally before deploying

You don't strictly need a server — you can open `index.html` directly in a
browser — but some browsers restrict things like `fetch` on `file://` URLs,
so a tiny local server is nicer for testing. Two easy ways:

**With Node.js installed:**
```bash
npx http-server .
# then open the printed http://localhost:8080 address
```
(`npx` will download the small `http-server` package on first run — nothing
to install ahead of time beyond having Node.js/npm on your machine, e.g. from
https://nodejs.org.)

**With Python installed (no Node needed):**
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Customizing it further

- **Colors/fonts**: edit the CSS variables at the top of `css/styles.css`
  (`--color-primary`, `--color-accent`, `--font-heading`, etc.).
- **Placeholder images**: they're pure CSS/HTML (`.placeholder-img`), so
  there are no image files to manage. To swap in real images later, replace
  a `<span class="placeholder-img ...">LABEL</span>` with an `<img src="..." alt="...">`.
- **Dummy buttons**: any element with `data-dummy-action="Some Label"` will
  show a toast reading `"Some Label — demo only, no real purchase or link
  happens here."` when clicked. Remove the attribute and add a real `href`
  or click handler when you're ready to wire up real functionality.
- **Sign-in modal**: currently just closes and shows a toast on submit. Hook
  it up to real auth (Firebase, Auth0, your own backend, etc.) later if
  needed — that would require moving beyond a purely static site.

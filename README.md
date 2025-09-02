# Jay Hemnani — Portfolio Website

A fast, minimal personal site for showcasing data engineering & analytics work.  
Built with **vanilla HTML/CSS/JS** and deployable on **GitHub Pages**.

---

## Features

- Dark/blue aesthetic with glassy cards & soft shadows
- Hero interactions: spotlight/parallax tilt, typewriter, gradient “shine”
- Reveal-on-scroll animations (respects `prefers-reduced-motion`)
- **Projects as case studies**: overview, challenge, solution, impact, ASCII architecture,
  tech stack, links, gallery
- Search & tag filters (scales to 50+ items)
- Clean sections: About, Education, Experience, Skills
- **Resume** opens `index_da.html` in a new tab (`/resume.html` redirects)
- Email anti-scrape (address assembled at runtime)
- Security-ready: CSP meta, CodeQL, Dependabot, MIT license

---

## Repository Structure

    /index.html
    /about.html
    /education.html
    /experience.html
    /projects.html
    /skills.html
    /resume.html             # redirects to index_da.html
    /index_da.html           # standalone resume
    /style_da.css
    /script_da.js

    /assets/
      style.css              # site styles
      app.js                 # animations, theme, reveal, email obfuscation
      projects-data.js       # all project case studies
      projects.js            # grid/search/tags/modal logic

    /.github/
      workflows/codeql.yml   # CodeQL scanning
      dependabot.yml         # automated updates for GitHub Actions

    LICENSE
    SECURITY.md

---

## Quick Start

Local preview (no tooling): open `index.html`.

Simple local server:

    python3 -m http.server 8080
    # open http://localhost:8080

---

## Deploy (GitHub Pages)

1. Push to GitHub.
2. Settings → Pages → Build & deployment: **Deploy from a branch**
3. Branch: `main`, Folder: `/root`
4. Enable **Enforce HTTPS**
5. (Optional) Custom domain + enable DNSSEC at registrar

---

## Customization

Colors (`assets/style.css`):

    :root{
      --bg:#0c1317; --card:#101a20; --text:#e6edf3; --muted:#9fb2bf;
      --accent:#5ea7ff; --ring:rgba(94,167,255,.35);
    }

Change `--accent` to adjust buttons/nav underline/highlights.

---

## Projects: Add/Update Case Studies

Edit `assets/projects-data.js`. Schema:

    {
      id: "unique-id",
      title: "Project Title",
      headline: "One-line value prop",
      role: "Your role",
      period: "when/where",
      tags: ["kafka","airflow","warehouse"],
      challenge: "What problem?",
      solution: ["Step 1", "Step 2"],
      impact: ["Outcome or metric"],
      tech: ["Python","SQL","TimescaleDB"],
      diagram: `ASCII diagram here`,
      images: ["assets/img/p1-1.png","assets/img/p1-2.png"],
      video: "https://www.youtube.com/embed/xyz",
      links: { code: "https://github.com/you/repo", demo: "https://demo", paper: "https://doi" }
    }

The Projects page auto-renders cards, search, tag chips, and the detailed modal.

---

## Resume Tab

- All nav bars link **Resume** → `index_da.html` with `target="_blank"`.
- `resume.html` exists only to redirect to `index_da.html`.
- Ensure `index_da.html` includes:

    <link rel="stylesheet" href="style_da.css" />
    <script src="script_da.js" defer></script>

---

## Security & Privacy

Baseline CSP meta (add to `<head>`):

    <meta http-equiv="Content-Security-Policy"
          content="default-src 'self'; img-src 'self' data:; script-src 'self';
                   style-src 'self' 'unsafe-inline'; font-src 'self' data:;
                   object-src 'none'; base-uri 'self'; form-action 'self'">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="color-scheme" content="dark light">

Email anti-scrape (footer + JS):

    <!-- footer link -->
    <a class="email-link" data-user="jodnani10" data-domain="gmail.com" href="#">contact</a>

    // assets/app.js
    (() => {
      document.querySelectorAll('.email-link').forEach(a => {
        const addr = `${a.dataset.user}@${a.dataset.domain}`;
        a.href = `mailto:${addr}`;
      });
    })();

(For HSTS / frame-ancestors, use real response headers via a proxy like Cloudflare.)

---

## GitHub Repo Security

- **License:** MIT (`LICENSE`)
- **Security policy:** `SECURITY.md` (private disclosure instructions)
- **Dependabot:** `/.github/dependabot.yml` (keeps GitHub Actions updated)
- **CodeQL:** `/.github/workflows/codeql.yml` (JS scanning)
- Settings → Code security & analysis: enable Dependabot alerts/updates, Secret scanning
  (+ Push Protection), Code scanning
- Branch protection (main): require PR + passing checks (CodeQL), optional signed commits
- Ensure no secrets in repo; keep `.env` out via `.gitignore`

---

## Accessibility & SEO

- Respects reduced motion, logical headings, focusable controls
- `meta` descriptions per page; descriptive link labels

---

## Tech Stack

- HTML/CSS/JS (no framework, no build step)

---

## License

MIT — see `LICENSE`.

---

## Security Policy

See `SECURITY.md`. Vulnerabilities? Email **jodnani10@gmail.com** with steps to reproduce.

---

## Publish Checklist

- [ ] GitHub Pages enabled + **Enforce HTTPS**
- [ ] Custom domain & DNSSEC (if used)
- [ ] Branch protection + security scans on
- [ ] `LICENSE`, `SECURITY.md`, `.github/dependabot.yml`,
      `.github/workflows/codeql.yml` committed
- [ ] Resume tab opens `index_da.html` (and `/resume.html` redirects)
- [ ] Projects populated in `assets/projects-data.js` with images/links

# medroadie.com

Marketing site for MedRoadie. Plain HTML/CSS/JS, no build step, hosted free on GitHub Pages.

| File | What |
|------|------|
| `index.html` | The page (all text is here) |
| `styles.css` | Look: stage-black, amber, stencil headings |
| `script.js` | Contact form (Formspree, or email fallback) |
| `assets/logo.svg` | Flight-case logo |
| `assets/fonts/saira-stencil-one.woff2` | Heading font, self-hosted (SIL Open Font License, see `assets/fonts/OFL.txt`) |
| `CNAME` | Custom domain for GitHub Pages |

Run locally: `python -m http.server 5190 --directory C:\Dev\medroadie-site`, open http://localhost:5190.

The product mock-up in the hero uses a fictional company (Northwind Ortho, TitanLock, FlexAnchor). Never put real customer material or screenshots on this site.

## Contact form
1. Create a free account at formspree.io with your own email, make a form, copy its URL (`https://formspree.io/f/xxxxxxx`).
2. Put it in `script.js`: `const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxx";`
3. Without it, the form opens the visitor's email app addressed to hello@medroadie.com.

## Publish on GitHub Pages
1. GitHub repo (must be public on the free plan): push this folder, then Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
2. Settings → Pages → Custom domain: `medroadie.com`, tick "Enforce HTTPS" when it becomes available.
3. DNS at Namecheap (Domain List → Manage → Advanced DNS), remove the parking records and add:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | petrusvii.github.io. |

4. Email forwarding (Namecheap → Domain → Redirect Email): `hello@medroadie.com` → your own email.

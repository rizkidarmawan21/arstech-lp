# Arstech marketing site

Static HTML, CSS, and JavaScript. Page sources live in `src/pages/`; `build.py` assembles the shared layout and partials into the published HTML. Edit the sources, then rebuild.

## Local preview

```sh
python3 build.py
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. No Node runtime is required to serve the site.

## Verification

```sh
npm ci
npx playwright install chromium
npm test
npm run check
```

Playwright starts a local server when one is not already running. Tests cover five viewport widths, volumetric icon geometry, accessible ASCII sculptures, animation pausing and resuming, mobile navigation, service selection, sticky previews and scroll activation in both directions, contact validation and draft contents, automatic illustration loops, reduced motion, JavaScript-disabled fallbacks, and nested article assets.

## Redesign

The `redesign/arstech-studio` branch is based on `arstech`. The base stylesheet remains in `assets/css/styles.css`; `assets/css/studio.css` defines the revised typography, layout, diagram, and motion. Interactions remain dependency-free in `assets/js/main.js`. Manrope is self-hosted under the included SIL Open Font License.

`assets/js/ascii.js` renders the enlarged hero orbit, its four independently rotating 3D icons, and the process layers as shaded character art. It uses local geometry and Canvas, without Three.js or remote media. The owner selected [OVONE on 21st](https://21st.dev/community/ascii/ovone-57f212a0-1b1b-479a-92b2-40132e966d31) as the visual reference; this implementation uses its own geometry and renderer.

Contact submission opens an email draft. The visitor must send it in their email app. There is no form delivery backend. Placeholder WhatsApp links have been removed from the rendered page.

The Dockerfile builds the source inside the image and serves the generated output through Nginx. The redesign does not require a deployment change.

## Company positioning

The company story describes two years of work that grew into Arstech, as provided by the owner. The mission is to become an AI Native Company and contribute to technology through research, development, and real-world implementation.

AI-native positioning means treating AI as a part of the company’s own processes and products. The website frames this as an ambition, alongside practical customer services. Background research: [Microsoft WorkLab on AI-native organizations](https://www.microsoft.com/en-us/worklab/what-can-ai-native-startups-teach-the-rest-of-us), and [Anthropic’s Advolve example](https://claude.com/customers/advolve). These sources inform the definition, not claims about Arstech’s results.

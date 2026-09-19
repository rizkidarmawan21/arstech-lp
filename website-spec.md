# Arstech Website Specification

**Version 2.0** | Implements `design.md` (the Arstech Design System) | Scope: the Arstech marketing website only.

---

## 0. Scope

This file is the **implementation spec for the website**. It is deliberately separate from `design.md`:

- **`design.md` is the brand.** It is portable, surface-agnostic, and belongs to every Arstech project, including Instagram, decks, and documents. It defines the palette, type, spacing, grid, shape, elevation, motion, iconography, imagery, the rail motif, voice, and per-surface rules.
- **This file is the site.** It defines the page architecture, the component library, responsive behaviour, accessibility, and the delivery gate for this one surface.

Everything visual here is an application of `design.md`. When the two disagree, `design.md` wins. Nothing in this file should be copied to another surface; another surface gets its own spec.

**Files in this project:** `index.html`, `assets/css/styles.css`, `assets/js/main.js`, `Dockerfile`.

**Vocabulary.** `R-XX` cites a rule from the antislop filter. `[REAL DATA]` and `[CLIENT]` are honest placeholders (see 7).

---

## 1. Direction

### 1.1 Design Read

> Reading this as: a B2B software-engineering company site for technical and business decision-makers, in a structured technical-editorial language, dial **ENERGY 2 / RHYTHM 3 / MOTION 3**.

ENERGY and RHYTHM are the brand defaults from `design.md` section 1.4. MOTION is one step above the brand default of 2, because the hero diagram carries a content-bearing flow and an assembly on entry. That shift is a sanctioned per-surface override, recorded in the table in `design.md` section 1.4.

### 1.2 How the dials show up on the site

| Dial | Value | How it shows up here |
|---|---|---|
| **ENERGY** | 2 | One focal point per screen, restrained accent, generous whitespace. |
| **RHYTHM** | 3 | Hero is a `6 / 6` split, capabilities a `4 / 8` accordion, process a full-width timeline, studio a `7 / 5` split, contact an `8 / 4` form band. No two sections share a skeleton. |
| **MOTION** | 3 | The hero diagram assembles on entry and then runs a continuous data flow, both content-bearing (3.5). Everything else on the page stays at reveal-and-transition level: one reveal per element, hover and focus transitions. No parallax, no pin, no decorative loop. |

### 1.3 What v1 got wrong, and what v2 does instead

v1 was a single centered column of the same card grid, repeated. Each pattern below is a generic-AI tell. The fix is the reason the corresponding section exists in its new shape.

| v1 pattern | Why it reads as AI | v2 fix |
|---|---|---|
| Fake terminal console in the hero with typed commands | A costume for "developer tool"; it is decoration, not the product (R-05, R-06) | A real, interactive **system diagram** that shows the systems Arstech actually builds |
| Invented console metrics (12.4 ms, 99.98%, 18 online) | Statistics with no source (R-17, R-36) | Removed. No numbers without a source |
| Fabricated client logos (GLOBELINK, APEX SYSTEMS, BIO LABS) | Trust claims with no evidence (R-18, R-36) | Replaced with honest `[CLIENT]` slots. The band is now hidden until real clients exist (R-38) |
| Eyebrow pill with a pulsing dot above the H1 | Capsule badge plus decorative status dot; the dot marks no state (R-09, R-31) | Removed. A quiet text kicker replaces it |
| Four identical service cards | Uniform cards flatten content hierarchy (R-14) | A numbered capability index where each item expands; the flagship leads |
| Process as three identical cards with big numbers | The "How it works, always 3 steps" template (R-05) | A real timeline on the System Rail, each phase carrying its own artifacts |
| Uppercase, wide-tracked mono labels everywhere | Monospace-as-aesthetic plus extreme tracking (R-06) | Sentence-case labels, numeric indices, tabular numerals for figures only |
| Every section: centered title, subtitle, card grid | Uniform section rhythm (R-05) | Five different section compositions, matched to RHYTHM 3 |

---

## 2. Page architecture

Eight sections are defined. Seven are currently live; section 6 is hidden. Each names its job, its composition, and its focal point. No two share a skeleton.

| # | Section | Job | Composition | Focal point |
|---|---|---|---|---|
| 1 | Header | Orient and route | Single bar, logo left, nav right | The primary CTA |
| 2 | Hero | State the offer in one screen | Two-column `6 / 6`, text left, system diagram right | The headline |
| 3 | Capability index | Show what Arstech builds | `4 / 8`: sticky label left, numbered accordion right | The open capability |
| 4 | Process | Show how work happens | Full-width timeline on the rail, horizontal on desktop | The active phase |
| 5 | Studio | Say who Arstech is | `7 / 5`: narrative left, stack panel right | The narrative |
| 6 | Clients | Show who Arstech works with | Slim band of honest placeholder slots | The band label |
| 7 | Contact | Convert | Navy band, form and direct channels | The form |
| 8 | Footer | Close and route | Editorial three-group footer, not four template columns | The brand line |

**Section order reason (C-3):** a technical reader needs the offer, then evidence of capability, then process, then who is behind it, then a way to talk. Each section answers the question the previous one raises.

### 2.1 Section 6 is currently hidden

The band ships in the markup but carries the `hidden` attribute, so it does not render and is absent from the accessibility tree. It was hidden because five empty `[CLIENT]` slots read as unfinished, and no real clients were available to fill them.

To re-enable it:

1. Remove the `hidden` attribute from the `<section id="clients">` element in `index.html`.
2. Renumber the Contact section index from `04` back to `05`, so the numbering runs 01 to 05 again.

The section, its styles, and its `ClientSlot` component are all kept in place, so re-enabling is an edit, not a rebuild. While hidden, the visible numbering runs 01 Capabilities, 02 Process, 03 Studio, 04 Contact.

---

## 3. Component library

Every component is defined so a placeholder can be replaced one-to-one. Each entry gives purpose, anatomy, variants, states, sizes, tokens, responsive behaviour, and accessibility. Class names are the ones used in the build. Token values live in `design.md`.

### 3.1 Primitives

#### Container
- **Purpose:** constrain content to the grid.
- **Anatomy:** a single wrapper with `max-width` and gutter.
- **Variants:** `.container` (1200px), `.container--narrow` (760px).
- **Tokens:** `--container`, `--gutter`.
- **Responsive:** gutter shrinks from `40px` to `20px` below `640px`. Never causes horizontal overflow.

#### Section
- **Purpose:** one vertical unit with consistent rhythm.
- **Anatomy:** `<section>` with an optional `id` anchor and a background variant.
- **Variants:** `.section` (default), `.section--alt` (soft background), `.section--dark` (navy), `.section--tight` (reduced padding for a slim band).
- **Tokens:** `--space-6` to `--space-9` vertical padding.
- **Accessibility:** `aria-labelledby` pointing at the section's heading.

#### SectionHeader
- **Purpose:** introduce a section with a consistent but not identical header.
- **Anatomy:** index (`01`) plus label, then `h2`, then optional lead paragraph.
- **Variants:** `.section-header--split` (label and title side by side on desktop), `.section-header--stack` (stacked), `.section-header--on-dark`.
- **Tokens:** `--text-h2`, `--text-lead`, `--muted`, `--blue-strong` (index).
- **Accessibility:** `h2` is a real heading; the index is `aria-hidden` because it is presentational ordering.
- **Don't:** do not wrap the label in a pill or use uppercase tracking (R-09, R-06).

#### Rail
- **Purpose:** the brand's identity motif, applied here (see `design.md` section 12).
- **Anatomy:** a `1px` line with `8px` nodes at attachment points.
- **Variants:** `.rail--vertical`, `.rail--horizontal`.
- **Tokens:** `--border`, `--blue`.
- **Accessibility:** purely decorative, `aria-hidden="true"`.

#### Reveal
- **Purpose:** the single motion primitive for entry.
- **Anatomy:** a wrapper that adds `.is-visible` on first intersection.
- **Variants:** `data-reveal` with optional `data-reveal-delay`.
- **States:** hidden (default), visible.
- **Tokens:** `--dur-slow`, `--ease-out`.
- **Accessibility:** disabled entirely under `prefers-reduced-motion: reduce`. Content is present in the DOM whether or not the animation runs, and the hidden state is scoped to `.js` so the page is fully visible without JavaScript.

#### Icon
- **Purpose:** a single relevant mark.
- **Anatomy:** inline `<svg>` with `currentColor`.
- **Variants:** size via `--icon-size` (`20px` default).
- **Accessibility:** `aria-hidden="true"` when decorative; a control using only an icon carries an `aria-label`.

### 3.2 Brand

#### Logo
- **Purpose:** identify Arstech in the header and footer.
- **Anatomy:** the mark plus the wordmark `Arstech`. The mark path and lockup rules live in `design.md` section 2.
- **Variants:** `.logo--full`, `.logo--mark`, `.logo--reversed`.
- **States:** default, link hover (mark takes `--blue-strong`).
- **Sizes:** header `26px` mark, footer `26px` mark.
- **Accessibility:** the link wrapping the logo has `aria-label="Arstech, home"`.
- **Note:** the mark is a **designed placeholder** pending the official Arstech vector (R-23, R-38).

#### Tag
- **Purpose:** a real, short status or category label.
- **Anatomy:** text in a pill, optional leading dot.
- **Variants:** `.tag`, `.tag--blue`, `.tag--dark`.
- **Tokens:** `--radius-full`, `--blue-tint`, `--text-xs`.
- **Accessible contrast:** `--blue-strong` on `--blue-tint` is 4.65:1.
- **Don't:** no badge for "AI Powered", "Beta", or "New" unless it is a real status (R-09). A dot inside a tag must mark a real state or be omitted (R-31).

### 3.3 Actions

#### Button
- **Purpose:** trigger one action.
- **Anatomy:** `<button>` or `<a>` with a label and an optional trailing icon.
- **Variants:**
  - `.btn--primary`: `--blue-strong` fill, white label. Hover `--blue-hover`.
  - `.btn--secondary`: white fill, `--navy` label, `1px --border-strong` border. Hover: `--blue-tint` background, `--blue-strong` border.
  - `.btn--ghost`: transparent, `--navy` label. Hover: `--blue-tint` background.
  - `.btn--on-dark`: white fill, `--navy` label (for the navy band).
- **Sizes:** `.btn--sm` (`38px`), `.btn--md` (`44px`, default), `.btn--lg` (`52px`).
- **States:** default, hover, active (`translateY(1px)`), focus-visible (`2px --focus` ring, `2px` offset), disabled (`--surface-alt` fill, `--muted` label, `cursor: not-allowed`), loading (label plus a `15px` indeterminate ring).
- **Tokens:** `--radius-sm`, `--dur-fast`, `--ease`.
- **Accessibility:** every size clears the `44px` target on mobile; `sm` is used only inside dense desktop contexts and never as the sole mobile control. Disabled buttons use the `disabled` attribute, not a class alone.
- **Don't:** no arrows on every button (R-08). An arrow appears only on the one action that leaves the page or advances a flow.

#### Link
- **Purpose:** navigate to a real destination.
- **Anatomy:** `<a href>` with a real target.
- **Variants:** `.link`, `.link--arrow`, `.link--on-dark`.
- **States:** default (`--blue-strong`), hover (underline plus `--blue-hover`), focus-visible (ring).
- **Accessibility:** inline links inside prose are underlined by default so they are distinguishable without colour alone (WCAG 1.4.1).

### 3.4 Navigation

#### Header
- **Purpose:** persistent orientation and the primary CTA.
- **Anatomy:** `.header` containing the logo, the nav, the CTA, and the mobile menu trigger.
- **Variants:** default (flat on the surface) and `.is-scrolled` (solid surface, `1px --border` bottom edge, `--shadow-xs`).
- **States:** top, scrolled, menu-open.
- **Tokens:** `--header-h`, `--shadow-xs`, `--dur`.
- **Responsive:** below `900px` the nav collapses to the trigger plus the drawer.
- **Accessibility:** `<header>` with `<nav aria-label="Primary">`. The scrolled state is visual only. Header height is exposed as `--header-h` so scroll offset stays correct.

#### NavLink
- **Purpose:** route to a real section.
- **Anatomy:** `<a href="#section">`.
- **Variants:** `.nav-link`, `.nav-link.is-active`.
- **States:** default (`--muted`), hover (`--navy`), active (navy label plus a `2px --blue` underline on the rail), focus-visible. Minimum height `44px`.
- **Accessibility:** the active state is driven by scroll position and mirrored with `aria-current="true"`.

#### MobileMenu
- **Purpose:** the navigation on small screens.
- **Anatomy:** a trigger button (`.menu-toggle`) and a drawer (`.mobile-menu`) with the nav links and the CTA.
- **Variants:** closed, open.
- **States:** open animates the drawer in over `--dur`; the trigger shows a close icon; the body is scroll-locked.
- **Tokens:** `--surface`, `--shadow-md`, `--dur`, `--ease-out`.
- **Responsive:** shown below `900px` only. With JavaScript disabled, the drawer stays visible as a stacked nav fallback and the useless trigger is hidden.
- **Accessibility:** trigger has `aria-expanded` and `aria-controls`; the drawer closes on `Escape`, on a link activation, and on outside click; focus moves into the drawer on open and returns to the trigger on close.

#### SkipLink
- **Purpose:** let keyboard users jump to content.
- **Anatomy:** the first focusable element on the page.
- **States:** visually hidden until focused, then a visible `--blue-strong` panel at the top left.
- **Accessibility:** targets `#main`.

### 3.5 Hero

#### Hero
- **Purpose:** state the offer and the primary action in one screen.
- **Anatomy:** `.hero` with two columns: text (kicker, `h1`, lead, action row) and the system diagram. The kicker is a quiet text line, not a pill.
- **Variants:** default only. One hero.
- **States:** static text; the diagram is interactive.
- **Tokens:** `--text-display`, `--space-9`, `--blue-strong`.
- **Responsive:** two columns above `900px`; stacked with the diagram below the actions on mobile. Below `480px` the two actions are full width. The diagram scales with its container and never overflows.
- **Accessibility:** `h1` is the page's single `h1`. The diagram carries `role="img"` with a descriptive `aria-label` and its nodes are also reachable controls.
- **Don't:** no eyebrow pill, no pulsing dot, no fake console, no metric strip (R-05, R-09, R-17).

#### SystemDiagram
- **Purpose:** show, honestly, the systems Arstech builds and connects, and show them *working*.
- **Anatomy:** a container (`.diagram`) holding three layers: an SVG rail layer (`.diagram__rails`, one hairline per connection), an SVG flow layer (`.diagram__flows`, one animated dashed line per connection, painted on top), and HTML content (the `Arstech core` hub plus five node buttons: Web platforms, Custom APIs, AI systems, Data pipelines, Integrations).
- **Icons:** one relevant mark per system, drawn on the same `24` grid with the same `1.75` stroke and round joins so the set reads as one family rather than five borrowed glyphs: a browser window (Web platforms), a server stack (Custom APIs), a processor chip (AI systems), a database (Data pipelines), and a plug (Integrations). Each glyph names what that system is, and none of the banned glyphs (sparkle, star, lightning, orb, robot) appear. Colour is `--blue-strong` at rest, moving to `--navy` on hover, focus, and active (R-04).
- **Variants:** `.diagram--interactive` (hero).
- **Motion, in three parts, all content-bearing:**
  1. **Assembly**, once, when the diagram first enters view. It runs in three beats, in this order: the core lands first (`0.5s` fade, no delay), then the rails draw outward from it (`0.5s`, staggered `40ms`, starting at `0.25s`) with the flow fading in behind them (`0.45s` delay), then the five systems arrive (`0.5s`, staggered `60ms`, starting at `0.75s`), settling at about `1.25s`. Nothing appears before the thing it hangs from. It never re-runs.
  2. **Flow**, continuous. Small `4px` round dashes travel from the core out to each system along every connection, one dash period per `0.75s` (about `45` units/s). The section claims "we connect the systems your business runs on", so the diagram shows data moving instead of asserting it. Staggered across the period so the five connections never pulse in unison. Confined to this one element; nothing else on the page loops.
  3. **Response**, on interaction. Hovering, focusing, or tapping a node brightens its flow to full opacity in `--blue-strong` at `5px`, dims the other four to 10 percent, and updates the caption.
- **States:** idle, assembling, assembled, node active, node dimmed, reduced-motion.
- **Tokens:** `--blue`, `--blue-strong`, `--blue-tint`, `--navy`, `--border`, `--dur`, `--dur-slow`, `--ease-out`.
- **Responsive:** radial with both SVG layers above `700px`; below that it reflows into a vertical rail list rather than shrinking, the assembly still runs, and the flow layer does not render. Nodes are `44px` tall minimum at every width.
- **Accessibility:** the container has `role="img"` and an `aria-label` describing the systems; each node is a real `<button>` with an accessible name, operable by `Tab`, `Enter`, and `Space`, so the interaction is not mouse-only (R-32). Under `prefers-reduced-motion: reduce` the flow layer is removed outright rather than shortened (the blanket `0.01ms` duration rule would otherwise spin it into a flicker), the assembly delays are zeroed, and every node is visible immediately.
- **Failure guard:** the CSS holds the hub and nodes hidden until assembly runs, so that trigger must never be missable. The observer uses `threshold: 0`, because a fractional threshold left a `375px`-wide phone with an empty hero (only 16 percent of the diagram is on screen at load), and a `3s` timer assembles regardless as a safety net so the diagram can never be stranded blank.
- **Reason:** replaces the v1 fake terminal. It is truthful (it depicts the real service set), it is the brand motif in its purest form, and the motion explains the product rather than decorating it.

#### DiagramNode
- **Purpose:** one system in the diagram.
- **Anatomy:** a button carrying a system icon, a label, and a connection line to the hub.
- **Variants:** hub, satellite.
- **States:** idle, hover, focus, active, dimmed (when a sibling is active).
- **Tokens:** `--radius-sm`, `--blue-strong`, `--navy`, `--blue-tint`.
- **Accessibility:** exposed as a button with the system name and description. The icon is `aria-hidden`; the label carries the name.

### 3.6 Content

#### CapabilityItem
- **Purpose:** present one capability in the index.
- **Anatomy:** `.capability` with a header button (index number, title, one-line summary, toggle icon) and a panel (detail paragraph plus an "Included" list). Built as an accordion row.
- **Variants:** `.capability.is-open` (the lead item, open by default).
- **States:** collapsed, expanded, hover, focus-visible.
- **Tokens:** `--text-h3`, `--radius-md`, `--border`, `--blue-tint` (hover), `--blue-strong` (index and toggle).
- **Responsive:** the `4 / 8` split collapses to a stacked layout below `900px`; the index label moves above the list.
- **Accessibility:** each header is a `<button>` with `aria-expanded` and `aria-controls`; the panel is a region. Fully keyboard operable; `Enter` and `Space` toggle. The collapsed panel uses `visibility: hidden` so its contents leave the accessibility tree and the tab order.
- **Reason:** replaces four identical cards with one varied, hierarchical, interactive list (R-14, R-05).

#### ProcessTimeline
- **Purpose:** show the real delivery process.
- **Anatomy:** `.timeline` with a horizontal rail on desktop and a vertical rail on mobile. Each `.phase` carries an index, a title, a description, and a "You get" artifacts list.
- **Variants:** `.timeline` (orientation switches at `900px`).
- **States:** default; each phase reveals once on scroll.
- **Tokens:** `--border`, `--blue`, `--space-6`.
- **Accessibility:** an ordered list `<ol>`; the rail is decorative.
- **Reason:** the v1 "3 identical cards with big numbers" is the template tell (R-05). A timeline with real artifacts is a different composition and adds information instead of decoration.

#### StackList
- **Purpose:** show the real technical stack.
- **Anatomy:** `.stack` as a definition list: a category term and a value.
- **States:** static; rows sit on hairlines for scanning.
- **Tokens:** `--text-sm`, `--muted`, `--border`.
- **Accessibility:** `<dl>` with `<dt>` and `<dd>`.
- **Reason:** this is real, specific information (Go/Gin, Next.js, LangChain, Docker), which is exactly what a technical evaluator scans for.

#### PrincipleList
- **Purpose:** state how Arstech works, without numeric claims.
- **Anatomy:** `.principles` as a list of short statements, each with a small mark.
- **Tokens:** `--text-body`, `--ink`, `--blue`.
- **Accessibility:** a `<ul>`.
- **Reason:** replaces the v1 "100 percent delivery rate" style claims, which cannot be evidenced (R-17, R-36).

#### StatBlock
- **Purpose:** display a real metric when one exists.
- **Anatomy:** a value (`tabular-nums`), a label, and a source line.
- **Variants:** `.stat`, `.stat--on-dark`.
- **States:** `.stat--empty` renders `[REAL DATA]` in muted text.
- **Tokens:** `--text-h2`, `--muted`.
- **Rule:** a `StatBlock` is only rendered with a real, sourced number. With no source, the block shows `[REAL DATA]` or the section is omitted (R-17, R-36, R-38). The v2 page ships no stat blocks because no sourced numbers were provided.

#### ClientSlot
- **Purpose:** reserve the place for a real client.
- **Anatomy:** `.client-slot` with a dashed `1px --border-strong` border and a centred `[CLIENT]` label.
- **States:** default; hover raises the border to `--blue` for affordance only.
- **Tokens:** `--radius-md`, `--muted`, `--border-strong`.
- **Accessibility:** the label is real text, not an image, so it is announced.
- **Rule:** slots are never filled with an invented name or a fake logo (R-18, R-38).
- **Status:** specified and styled but **currently unused**, because the Clients section that hosts it is hidden (see 2.1).

#### Accordion / AccordionItem
- **Purpose:** reveal detail without leaving the page.
- **Anatomy:** a header button and a collapsible panel.
- **Variants:** used by `CapabilityItem`; also available standalone.
- **States:** collapsed, expanded, hover, focus-visible.
- **Tokens:** `--radius-md`, `--dur`, `--ease`.
- **Accessibility:** `aria-expanded` and `aria-controls` on the button; panel as a region; operable by keyboard.
- **Note:** height animates with `grid-template-rows` so the panel is measurable and accessible.

#### Card
- **Purpose:** a bordered surface for grouped content.
- **Anatomy:** `.card` with optional header, body, and footer regions.
- **Variants:** `.card` (bordered, flat), `.card--raised` (adds `--shadow-xs`), `.card--interactive` (hover lift plus `--blue-strong` border, used only when the whole card is a link).
- **States:** default, hover (interactive only), focus-within.
- **Tokens:** `--radius-md`, `--border`, `--shadow-xs`.
- **Rule:** cards are a tool, not a default. The page uses cards only where content is genuinely a discrete unit (R-14).

#### Callout
- **Purpose:** an inline note, placeholder explanation, or empty-state message.
- **Anatomy:** `.callout` with an optional leading icon, a title, and a body.
- **Variants:** `.callout--info`, `.callout--placeholder`, `.callout--on-dark`.
- **Tokens:** `--blue-tint`, `--border`, `--text-sm`.
- **Accessibility:** `role="note"` where it carries an explanation the reader needs.

#### EmptyState
- **Purpose:** the empty state required wherever data could be absent.
- **Anatomy:** `.empty` with a short cause line and one action.
- **Tokens:** `--muted`, `--blue-strong`.
- **Rule:** it names the cause and the next action, not "No data" (R-27).

### 3.7 Forms

#### Field
- **Purpose:** wrap one control with its label, help text, and error.
- **Anatomy:** `.field` containing `<label>`, the control, optional `.field__help`, and `.field__error`.
- **Variants:** `.field--required` (shows a "Required" hint, not a bare asterisk), `.field--full` (spans both form columns), `.field--check`.
- **States:** default, focus-within, invalid (`.is-invalid`), valid.
- **Tokens:** `--text-sm`, `--muted`, `--error`, `--success`.
- **Accessibility:** the label is bound with `for` and `id`; help and error are linked with `aria-describedby`; the control gets `aria-invalid` on error. The error is never colour-only: it is text.

#### TextInput / TextArea / Select
- **Purpose:** collect input.
- **Anatomy:** a native `<input>`, `<textarea>`, or `<select>`.
- **Variants:** `.input`, `.input--textarea`, `.input--select`.
- **States:** default (`1px --border-control` border, `--radius-sm`), hover (`--border-strong`), focus (`--blue-strong` border plus a `3px` `--blue-tint` ring, never `outline: none` without the replacement), invalid (`--error` border plus a message), disabled (`--surface-alt` fill), placeholder (`--muted`).
- **Tokens:** `--border-control` (3.06:1 for non-text contrast), `--radius-sm`, `--dur-fast`.
- **Sizes:** height `44px` for inputs and selects, `120px` minimum for the textarea.
- **Accessibility:** native elements, so keyboard and assistive-technology behaviour is inherited, not rebuilt.

#### Checkbox
- **Purpose:** a single boolean consent.
- **Anatomy:** a native `<input type="checkbox">` with a styled box and a label.
- **States:** unchecked, checked, focus-visible, invalid.
- **Tokens:** `--blue-strong` (checked), `--focus` (ring).
- **Accessibility:** the label is clickable and the box is a real checkbox; the box is `24 × 24px` and the label extends the target to `44px`.

#### FormStatus
- **Purpose:** confirm submission or report a failure.
- **Anatomy:** `.form-status` with a heading and a body.
- **Variants:** `.form-status--success`, `.form-status--error`.
- **States:** hidden, success, error.
- **Tokens:** `--success`, `--success-tint`, `--error`, `--error-tint`.
- **Accessibility:** `role="status"` with `aria-live="polite"` for success and an error variant for failures, so the message is announced.

#### ContactForm
- **Purpose:** start a conversation.
- **Anatomy:** a `<form>` containing Field plus TextInput for name and email, an optional company input, a Select for project type, a TextArea for the brief, a Checkbox for consent, a submit Button, and a FormStatus.
- **States:** idle, validating, invalid (per-field messages plus a summary), submitting (button loading), success, error.
- **Behaviour:** client-side validation runs on submit and on blur. A valid submission composes a `mailto:` to `info@arstech.my.id` with the field values and opens it, then shows the success state. This is a real behaviour with no backend. A server endpoint can replace the `mailto:` step without changing the markup.
- **Accessibility:** `novalidate` on the form so custom messages are used; focus moves to the first invalid field on a failed submit; the status region is announced.
- **Rule:** the form does something real. No decorative form (R-26).

### 3.8 Footer

#### Footer
- **Purpose:** close the page and route to the real destinations.
- **Anatomy:** three groups, not four template columns: (1) brand, mark plus wordmark plus tagline; (2) navigate, the real section links; (3) talk, email, Instagram, WhatsApp. A bottom bar carries the copyright and a back-to-top link.
- **Variants:** `.footer` (navy).
- **States:** links hover to white.
- **Tokens:** `--navy`, `--on-dark-faint`, `--navy-line`.
- **Accessibility:** `<footer>` with `<nav aria-label="Footer">`; link contrast verified (8.00:1); every link is at least `44px` tall.
- **Don't:** no Product/Company/Resources/Legal template columns with no content behind them (R-05).

#### SocialLink
- **Purpose:** link to a real Arstech channel.
- **Anatomy:** an icon plus a label.
- **Variants:** Instagram (real: `https://www.instagram.com/arstechid/`), WhatsApp (placeholder number, flagged with a code `TODO`).
- **States:** default (`--on-dark-faint`), hover (white), focus-visible.
- **Accessibility:** each link has an accessible name; the icon alone is not the name.

---

## 4. Responsive rules

Mobile is a designed state, not a squeeze of the desktop (R-03).

| Breakpoint | Range | Layout |
|---|---|---|
| `xs` | up to 479px | Single column, hero diagram as a rail list, timeline vertical, hero actions full width |
| `sm` | 480 to 639px | Single column, wider gutters, two-up client slots |
| `md` | 640 to 899px | Single column with two-up sub-grids, nav still collapsed, radial diagram |
| `lg` | 900 to 1199px | Two-column sections begin, nav expands, timeline horizontal |
| `xl` | 1200px and up | Full 12-column grid at the 1200px container |

**Rules**

- Type, section padding, and hero height all scale with `clamp()`; nothing is sized for one screen.
- Every multi-column grid collapses to a single column below `lg`. No grid keeps side-by-side columns on a phone.
- The layout is verified at `320`, `375`, `414`, `640`, `768`, `1024`, `1280`, `1440`, and `1920` px with zero horizontal scroll.
- Interactive targets meet WCAG AA (24 × 24px minimum). Primary controls (buttons, inputs, selects, textareas, nav links, and footer links) are at least `44px` tall, and the consent checkbox's label extends its target to `44px`.
- Hover-only interactions all have a tap or focus equivalent.
- No element is wider than its container; long strings wrap.

---

## 5. Accessibility

Accessibility is part of "the UI holds up", not an add-on (C-4). Brand-level expectations live in `design.md`; these are the site's obligations.

- **Contrast:** every pairing in `design.md` section 3 is verified against WCAG AA. Body and link text meet 4.5:1; large text and non-text marks meet 3:1; form control boundaries meet 3:1.
- **Keyboard:** every interactive element is reachable in visual order and operable with `Enter` and `Space`; the mobile menu closes on `Escape`; no `outline: none` without the replacement ring (R-32).
- **Focus:** a visible `2px --focus` ring with a `2px` offset on every focusable element, on every surface.
- **Semantics:** one `h1`; a logical heading order; landmarks (`header`, `nav`, `main`, `footer`); a skip link.
- **Non-colour signalling:** state is never carried by colour alone. Errors carry text; the active nav link carries an underline and `aria-current`; the diagram's active node carries a caption.
- **Motion:** `prefers-reduced-motion` removes all non-essential motion.
- **Zoom:** the layout holds at 200 percent zoom with no clipping and no horizontal scroll.
- **Forms:** labels bound to controls; help and error text linked with `aria-describedby`; invalid fields announced and focused.

---

## 6. Content for this site

Voice and copy rules live in `design.md` section 14 and apply unchanged. Site-specific notes:

- **Section headlines** state the offer, not the category. "Software and systems built around your operations", not "Our Services".
- **Calls to action** used here: "Start a project", "See our capabilities", "Send the brief".
- **No metrics, testimonials, or client names** appear until real ones exist. See 7.

---

## 7. Placeholders

Anything not yet real is written as what it is, never disguised (R-38):

| Placeholder | Where | Replace with |
|---|---|---|
| `[CLIENT]` / `[LOGO]` | Clients band (**currently hidden**) | A real, linked client name or logo. Re-enable the section first (see 2.1) |
| `[REAL DATA]` | `StatBlock` slots | A sourced metric, or remove the block |
| WhatsApp number | Contact section and footer | The real business WhatsApp number (flagged with a code `TODO`) |
| Logo mark | Header, footer, favicon | The official Arstech logo vector |

---

## 8. Decision log (R-31)

Every major website decision, in one line.

| Decision | Reason |
|---|---|
| Palette, type, spacing, radius, and motion taken from `design.md` unchanged | The site is an application of the brand, not a reinterpretation of it |
| `--blue-strong #0068DE` for text and buttons, `--blue #087CFF` for large and non-text | `#087CFF` fails AA for normal text (3.93:1); the darker step passes at 5.20:1 |
| Inter only, no second family | The brand mandates one family; identity comes from layout and motif, not a font stack (R-06) |
| Numeric index plus sentence-case labels instead of uppercase tracking | Avoids the mono and wide-tracking tell (R-06) |
| Two-column hero (`6 / 6`) rather than centered | Breaks the v1 uniform rhythm and gives the headline a clear focal point (R-05) |
| Interactive system diagram instead of a fake terminal | Truthful depiction of the services and the strongest expression of the brand motif (R-05, R-22) |
| Numbered capability accordion instead of four identical cards | Creates real hierarchy and interaction; identical cards flatten content (R-14) |
| Process as a timeline with real artifacts | Avoids the "always 3 steps" template and adds information (R-05) |
| One navy band for the closing CTA | The brand's sanctioned dark block for high-contrast sections; also creates rhythm variation |
| No stat blocks and no client logos | No sourced numbers or clients were provided; honest placeholders are used instead (R-17, R-18, R-38) |
| Clients band hidden rather than deleted | Five empty `[CLIENT]` slots read as an unfinished page (C-1, R-31). The markup, styles, and component stay in place, so re-enabling is one attribute plus one renumber |
| Form submits via `mailto:` | A real behaviour with no backend; swappable for an endpoint without markup changes (R-26) |
| Light theme only on the site | Owner's decision. The brand's navy block is used for the closing band; a full dark mode is reserved for marketing surfaces |
| The rail motif in the diagram, the index, and the timeline | Expresses "we connect systems" and gives the page a signature that survives a logo swap (R-20) |
| Hero diagram carries a continuous data flow and an assembly | The section's claim is connectivity, so the diagram shows data moving rather than asserting it. The loop *is* the content, it is confined to one element, and it is removed under reduced motion. This is why the site declares MOTION 3 rather than the brand default of 2 (R-19, R-31) |
| Assembly trigger uses `threshold: 0` plus a 3s safety net | The nodes are hidden until assembly runs, and a fractional threshold left a 375px-wide phone with an empty hero (only 16 percent of the diagram is on screen at load). Content must never be able to strand itself |
| Diagram nodes carry real icons instead of a square marker | A dot marks nothing. Each glyph names its system (browser, server, chip, database, plug), which is what R-04 asks for and what makes the diagram legible at a glance |
| The two outer nodes moved inward (`14.5%`, `85.5%`) and their line endpoints with them | Adding icons widened the nodes, and the AI node began escaping the container by 5px. Line endpoints were moved in step so each still lands under its node |
| Assembly order is core, then rails and dots, then boxes | A connection cannot appear before the thing it connects. The first build drew the rails ahead of the core, so a reload showed a floating web of lines with no hub and no systems. Ordering the beats fixed it |
| Flow fades in on a `transition-delay`, with `0s` re-declared on the active and dim states | The dots must arrive with the rails, but interaction feedback must stay instant. Re-declaring the delay on the state rules keeps the entrance slow and the response immediate |

---

## 9. Delivery gate

The build is checked against the four antislop blocks before delivery. A build with any FAIL is not delivered. Report for v2.0, verified in a real browser (agent-browser CLI, Chromium):

### Block 1: Hard Gate (all must be "no")

| Rule | Result | Evidence |
|---|---|---|
| R-02 em dash | PASS | Grep for U+2014 / U+2013 across `index.html`, `styles.css`, `main.js`, `design.md`, `website-spec.md` returns nothing |
| R-03 mobile | PASS | No horizontal overflow at 320, 375, 414, 640, 768, 1024, 1280, 1440, 1920px; grids collapse; targets >= 44px |
| R-17 sourced numbers | PASS | No statistics on the page. No sourced numbers were provided, so none are shown |
| R-18 testimonials | PASS | No testimonials section exists |
| R-23 assets | PASS | Logo is a documented placeholder mark; no avatars. The `[CLIENT]` slots exist but their section is hidden |
| R-24 navigation | PASS | Every nav and footer link resolves: `#top`, `#capabilities`, `#process`, `#studio`, `#contact`, `#main` all exist |
| R-25 contrast | PASS | All token pairs and 11 rendered text samples measured >= 4.5:1 (lowest 4.67:1); non-text marks >= 3:1 |
| R-26 interactive | PASS | 11 buttons, 25 links, 1 form all wired. No dead controls |
| R-27 states | PASS | Form has empty/invalid/submitting/success/error; accordion has collapsed/expanded; no data views ship without states |
| R-28 FAQ | PASS | No FAQ section |
| R-32 keyboard | PASS | Tab order follows visual order; accordion toggles on Enter; drawer closes on Escape; visible focus ring everywhere |
| R-33 patch scripts | PASS | All features written in source; no patch scripts |
| R-34 themes | PASS | One theme shipped by owner decision; no broken second mode |
| R-35 verify | PASS | Full click-through recorded below; zero console and page errors |
| R-36 fabricated claims | PASS | No security, compliance, or performance claims; the WhatsApp number is flagged with a code `TODO` |
| R-37 direction | PASS | `design.md` is the direction; dials declared (ENERGY 2 / RHYTHM 3 / MOTION 3) |
| R-38 real content | PASS | Placeholders written as `[CLIENT]`, `[REAL DATA]`, `TODO`; nothing disguised as final |

### Block 2: Purpose-Gate (technique + written reason)

| Rule | Result | Written reason |
|---|---|---|
| R-01 gradients/glow | PASS | No gradient or glow used. Blue is a flat accent |
| R-04 icons | PASS | 7 inline icons, each drawn for its content: mail and WhatsApp in the contact block, plus the five system glyphs in the diagram (browser window, server stack, processor chip, database, plug). No sparkle, star, lightning, orb, or robot; no library look |
| R-06 typography | PASS | Inter only, justified by the brand system; no large mono, no wide-tracked uppercase labels |
| R-07 background | PASS | No grid, blueprint, or dot pattern |
| R-08 button arrows | PASS | No decorative arrows anywhere |
| R-09 badges | PASS | No capsule badge, no pill above the H1 (the v1 badge was removed) |
| R-10 glassmorphism | PASS | No backdrop-filter used |
| R-12 shadow | PASS | Shadows only on the scrolled header and the diagram nodes (elevation reasons in `design.md` section 8) |
| R-13 glow | PASS | No glow |
| R-14 feature cards | PASS | Capabilities are one varied accordion, not identical cards |
| R-19 animation | PASS | Two purposeful motions, both on the hero diagram: a one-time assembly and a continuous data flow whose loop *is* the content (connectivity). No decorative loop anywhere else. Matches the declared MOTION 3. Reduced motion removes the flow entirely and zeroes the assembly stagger |
| R-22 illustrations | PASS | No stock or generic illustration; the diagram is content |

### Block 3: Liveliness (all must be "yes")

- Dials declared: **yes** (ENERGY 2 / RHYTHM 3 / MOTION 3).
- Output consistent with dials: **yes**. Four different section splits (6/6, 4/8, 7/5, 8/4) plus a full-width timeline and a dark band. Motion is concentrated in one element (the hero diagram) and the rest of the page stays at reveal level, which is what MOTION 3 with a confined budget means here.
- One focal point per screen: **yes** (headline, open capability, active phase, narrative, form).
- Whitespace structural: **yes** (uneven section padding; hero and contact band most generous).
- One deliberate accent: **yes** (Ars Blue on the primary CTA, active nav, index numerals, diagram nodes only).
- Identity motif: **yes** (the System Rail plus the numeric index, in the diagram, the capability list, and the timeline).
- Design Read declared before generation: **yes** (1.1).

### Block 4: Craftsmanship and Quality Locks (all must be "no")

- C-1 AI-default decisions: **no**. Every choice has a reason in 8 or in `design.md`.
- C-2 dead controls: **no**. All controls verified.
- C-3 template sections: **no**. Each section answers a real question.
- C-4 broken states: **no**. Verified across 9 widths, keyboard-only, reduced motion, no-JS, and all form states.
- C-5 fabricated proof: **no**.
- R-05 template layout: **no**. No fake terminal, no "Trusted By" bar under the hero, no bento mosaic, no 3 pricing columns, no 4-column footer, no uniform rhythm.
- R-11 pill everything: **no**. Stepped radii; pill only on the tag component.
- R-15 generic CTAs: **no**. "Start a project", "See our capabilities", "Send the brief".
- R-16 buzzwords: **no**. Verified by grep.
- R-20 generic identity: **no**. The rail motif and numeric index survive a logo swap.
- R-21 dark mode: **no** (not applicable). Light-only is an owner decision, not a deferred requirement.
- R-29 palette: **no**. Two core colours (navy, white) plus one accent, plus neutrals and two semantic colours.
- R-30 clone: **no**. No popular product was imitated.
- R-31 unwritable reasons: **no**. See the decision log in 8.

### Recorded click-through

| Element | Action | Result |
|---|---|---|
| Skip link | Focus | Appears at top left, targets `#main` |
| Nav links | Click "Process" | Scrolls to `#process`; section top clears the sticky header (92px vs 77px) |
| Mobile drawer | Click toggle | Opens, `aria-expanded=true`, body scroll locked, focus moves into drawer |
| Mobile drawer | Press Escape | Closes, focus returns to the toggle |
| Mobile drawer | Click a link | Closes, navigates to the section |
| Header | Scroll 600px | Gains `is-scrolled` (border + shadow) |
| Scrollspy | Scroll to Process / Studio | The matching nav link gains `is-active` |
| Capability 02 | Click toggle | `aria-expanded` false, true, false, true across four clicks; panel height animates |
| Capability 03 | Focus + Enter | Opens from the keyboard |
| Diagram | Load at page top | Assembles once in three beats: core first, then rails plus dots, then the five boxes. Measured in-page at `0.13s` core `0.80`, rails `0%`; `0.39s` core `1.00`, rails `84%`, boxes `0.00`; `0.78s` rails `100%`, dots `0.49`, boxes `0.19`; `1.04s` all settled. Nodes end at opacity 1 at 375, 390, 414, 768 and 1440px |
| Diagram flow | Measure `stroke-dashoffset` over 300ms | `45.1` units/s, matching the designed `34` units per `0.75s`; about 5 to 6 dots per connection |
| Diagram node icons | Inspect | All five render at `18x18` in `--blue-strong`, one distinct glyph each. No `::before` marker remains. No label overflow, and every node sits inside the container |
| Diagram node | Hover / focus | Node and its connection take the accent, siblings dim, caption updates, and the node icon shifts from `--blue-strong` to `--navy` |
| Diagram node | Hover, flow layer | That node's flow goes to full opacity in `--blue-strong` at `5px`; the other four drop to 10 percent |
| Diagram assembly | 320x640, no scroll | Not assembled at 1.5s (diagram below the fold); the 3s safety net assembles it by 3.5s. Scrolling to it triggers immediately instead of waiting |
| Reduced motion, diagram | Emulated | Flow layer `display: none`, nodes visible immediately, assembly delays zeroed, rails drawn |
| Form | Submit empty | 4 fields flagged, error status shown, focus moves to the first invalid field |
| Form | Bad email, short brief | Email and brief flagged with specific messages; focus moves to email |
| Form | Valid submit | No invalid fields, success status shown, mail client opened |
| Reveal | Gradual scroll | 15 of 15 elements revealed, none stuck at opacity 0 |
| Reduced motion | Emulated | All 15 elements visible immediately, no motion |
| Clients section | Inspect | `display: none`, absent from the accessibility tree, indices run 01 to 04 with no gap |
| Console / page errors | All of the above | None |

**Gate result: PASS on all four blocks.**

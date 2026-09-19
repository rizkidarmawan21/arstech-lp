# Arstech Design System

**Version 2.0** | Owner: Arstech | Handle: @arstechid | Tagline: **Built to Innovate.**

---

## 0. What this document is

This is the Arstech design system. It defines how the brand looks, sounds, and behaves, and it applies to **every surface the brand appears on**: Instagram, the website, presentations, proposals, documents, business cards, campaign material.

**It is not tied to any repository.** Nothing in this file refers to a codebase, a framework, or a specific page. Drop it into any project, hand it to any designer or agent, and it describes the same brand. Website implementation details live separately, in that project's own spec.

**What belongs here:** brand direction, identity, colour, typography, spacing, grid, shape, elevation, motion, iconography, imagery, the brand's signature motif, voice, and the rules for applying all of that to each surface.

**What does not belong here:** page structure, component APIs, breakpoints for a specific build, or delivery checklists. Those are implementation, and they belong to the surface being built.

**Vocabulary.** `Token` means a named value (`--blue`, `--space-4`). A token's value is the source of truth; a surface may express it in any technology. `Surface` means any place the brand appears. `[REAL DATA]` and `[CLIENT]` are honest placeholders: written as what they are, never disguised as final.

---

## 1. Brand

### 1.1 Who Arstech is

Arstech builds custom software, AI systems, web platforms, and integrations for growing businesses. Two audiences read Arstech material at once:

- **Technical evaluators** (CTOs, engineering leads) who scan for stack, process, and delivery evidence.
- **Business owners** who scan for clarity, trust, and a fast way to start a conversation.

Every surface must satisfy the first without losing the second.

### 1.2 Personality

The brand should read as a modern technology company: precise, calm, and credible. Not a generic IT services shop, and not a corporate consultancy.

**Visual keywords:** Clean / Modern / Digital / Structured / Minimal / Technical / Blue.

**What that means in practice:** confident without volume, specific without decoration, and structured rather than styled. Arstech earns attention through hierarchy and clarity, not through effects.

### 1.3 Core principle

> Simple structure. Strong typography. Clear message. Purposeful visuals.

Clarity comes before decoration. Every visual decision should be explainable in one line. If the only reason for an element is that it looks impressive or looks safe, it should be removed or reworked.

### 1.4 Visual temperament: the three dials

Every surface sets three dials. They keep the brand recognisable while letting a surface adjust its energy.

| Dial | 1 (Calm) | 2 (Balanced) | 3 (Bold) | What it answers |
|---|---|---|---|---|
| **ENERGY** | Quiet, near-neutral | Confident, clear | Loud, expressive | How hard does this say hello? |
| **RHYTHM** | Uniform, predictable | A few deliberate breaks | Varied, mixed compositions | How much do sections or slides differ? |
| **MOTION** | Static or hover only | Transitions, reveals | Choreographed, sequenced, ambient flow | How much motion, and why? |

**Arstech's default: ENERGY 2 / RHYTHM 3 / MOTION 2.**

- **ENERGY 2.** This is a trust purchase. The brand earns attention through structure, not volume.
- **RHYTHM 3.** Arstech material must not repeat one layout. Variety is the default, not the exception.
- **MOTION 2.** Motion guides the eye and confirms interaction. Nothing moves for decoration: no pulse, no float, no performance. A loop is allowed only where the loop carries meaning (section 9).

**Surfaces may shift a dial, within the brand band:**

| Surface | ENERGY | RHYTHM | MOTION | Why |
|---|---|---|---|---|
| Instagram feed | 2 | 3 | 1 | A static canvas. Variety comes from the layout family, not from motion. |
| Instagram story / reel cover | 3 | 2 | 2 | The story format rewards a single louder statement. |
| Website | 2 | 3 | 3 | The hero diagram carries a content-bearing ambient flow plus an assembly on entry. The rest of the page stays at reveal-and-transition level. |
| Presentation | 2 | 2 | 1 | One idea per slide. Rhythm comes from section changes. |
| Document / proposal | 1 | 1 | 1 | Information density. Uniformity is a feature. |
| Campaign / poster | 3 | 2 | 1 | Larger type and stronger expression are allowed here. |

A surface may never exceed ENERGY 3 or drop below ENERGY 1. The brand never becomes a different brand.

### 1.5 Design principles

1. **Structure before decoration.** Layout, hierarchy, and whitespace carry the design. Decoration is optional and never load-bearing.
2. **One focal point.** Every composition names its single most important element. Everything else defers to it.
3. **One deliberate accent.** Ars Blue is spent at the key moment, not spread across every element.
4. **Evidence over claims.** Every number, client, and capability is real or an explicit placeholder. Never invented.
5. **The system is the story.** Arstech connects systems, so the brand is built from connected structure (the rail, the diagram, the timeline).
6. **It must work.** On any surface, at any size, for any reader, including those using assistive technology.

---

## 2. Logo system

### 2.1 The mark

The Arstech mark is a solid geometric monogram: two angled strokes meeting at an apex with a crossbar, reading as both an "A" and a structure or peak. It is drawn as a single path plus a bar so it scales crisply and inherits colour.

```svg
<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
  <path d="M16 3.5 L29.5 28.5 H22.6 L16 15.3 L9.4 28.5 H2.5 Z"/>
  <rect x="10.6" y="21.2" width="10.8" height="3.2" rx="0.4"/>
</svg>
```

The wordmark is set in Inter, weight 700, letter-spacing `-0.02em`, in sentence case as "Arstech".

> **Status:** this mark is a **designed placeholder** pending the official Arstech logo vector. Replacing it means swapping the path, nothing else. Until then, every surface uses this mark consistently.

### 2.2 Variants

| Variant | Use |
|---|---|
| **Full lockup** | Mark plus wordmark. The default for headers, footers, decks, documents. |
| **Mark only** | Where width is tight: social avatars, favicons, stamps, small placements. |
| **Reversed** | Mark and wordmark in white on navy or on a dark photograph. |

**Mark colour:** Ars Blue `#087CFF` on light surfaces. Light Blue `#31B7FF` on navy. White on photography.

### 2.3 Clear space

Maintain clear space of **one mark height** on all sides. No text, rule, border, or image edge may enter it.

### 2.4 Minimum size

| Context | Minimum |
|---|---|
| Mark only, screen | `20px` |
| Mark only, print | `6mm` |
| Full lockup, screen | `100px` wide |
| Full lockup, print | `28mm` wide |

Below the lockup minimum, use the mark alone rather than shrinking the wordmark into illegibility.

### 2.5 Don't

- Do not stretch, condense, rotate, or skew the mark.
- Do not recolour it outside the palette in 3.1, or apply gradients, shadows, bevels, or outlines.
- Do not place it on a busy photograph or a pattern without a solid or scrimmed area behind it.
- Do not re-typeset the wordmark in another font, or add a tagline inside the lockup.

---

## 3. Colour

The palette is **two core colours plus one accent**, with neutrals and two semantic colours. Restraint is what makes the accent land.

### 3.1 Core

| Token | Value | Role |
|---|---|---|
| `--navy` | `#071A3D` | Deep Navy. Headings, dark surfaces, high-contrast blocks. |
| `--surface` | `#FFFFFF` | White. Primary light surface. |
| `--surface-alt` | `#F5F8FC` | Soft Background. Subtle separation on light layouts. |

### 3.2 Accent: the Ars Blue family

| Token | Value | Role | Note |
|---|---|---|---|
| `--blue` | `#087CFF` | **Ars Blue.** The brand accent. | 3.93:1 on white. **Large text and non-text only.** |
| `--blue-strong` | `#0068DE` | Interactive blue: link text, button fills, focus rings. | 5.20:1 both ways with white. The accessible blue. |
| `--blue-hover` | `#0056BC` | Hover and active states. | 6.87:1 with white. |
| `--blue-tint` | `#EAF3FF` | Quiet fills, icon wells, hover rows. | Keeps blue present without spending the accent. |
| `--blue-light` | `#31B7FF` | Accent on navy. | 7.64:1 on navy. The light stop of the brand gradient. |

### 3.3 Text and structure

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--ink` | `#1B2A44` | Body text. | 14.37:1 on white |
| `--muted` | `#667085` | Secondary text, captions, metadata. | 4.97:1 on white, 4.67:1 on soft |
| `--border` | `#E5EAF0` | Hairlines, dividers, card edges. | Decorative |
| `--border-strong` | `#D5DEE9` | Emphasised dividers. | Decorative |
| `--border-control` | `#8A94A6` | Interactive control boundaries. | 3.06:1, meets non-text contrast |

### 3.4 Semantic

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--success` | `#0B7A4B` | Valid state, confirmation. | 5.39:1 on white |
| `--success-tint` | `#E9F7F0` | Success background. | |
| `--error` | `#C0392B` | Error state, failure. | 5.44:1 on white |
| `--error-tint` | `#FDF3F2` | Error background. | |
| `--focus` | `#0068DE` | Focus ring on light surfaces. | 5.20:1 |

### 3.5 On navy

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--on-dark` | `#FFFFFF` | Primary text on navy. | 17.15:1 |
| `--on-dark-muted` | `#C9D6E8` | Secondary text on navy. | 11.65:1 |
| `--on-dark-faint` | `#9FB3CC` | Captions and legal on navy. | 8.00:1 |
| `--navy-line` | `rgba(255,255,255,0.14)` | Dividers on navy. | Decorative |

### 3.6 Gradient

Gradients are a supporting element, never the identity. The only sanctioned direction is **Deep Navy to Ars Blue to Light Blue** (`#071A3D → #087CFF → #31B7FF`), and it may appear only where it separates one level of hierarchy from another, or as a small highlight. Blue stays dominant. No rainbow or multicolour gradients.

### 3.7 Colour rules

- **Ars Blue `#087CFF` is never used for normal-size text on a light surface.** Use `--blue-strong` for text, and `--blue` for large text, icons, and non-text marks.
- **Blue is spent, not spread.** One accent per composition.
- **Never encode meaning in colour alone.** Pair every colour signal with text, an icon, or a shape.
- **Verify before use.** Every pairing in this section is measured. Any new pairing must be measured before it ships: 4.5:1 for normal text, 3:1 for large text and non-text marks.

---

## 4. Typography

### 4.1 Family

**Inter**, weights 400, 500, 600, 700, 800. Fallback: `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.

**One family only.** No second family, no decorative font, no display serif. The brand's character comes from layout, the rail motif, and colour, not from a font stack. This also keeps the system portable: Inter is available everywhere, including Instagram templates and slide decks.

### 4.2 Roles and scale

The system defines **roles**, not fixed sizes. Each surface maps the roles to its own canvas.

| Role | Weight | Tracking | Web size | Use |
|---|---|---|---|---|
| **Display** | 800 | `-0.03em` | `clamp(2.5rem, 1.5rem + 3vw, 3.5rem)` | Hero statements, campaign headlines, poster type |
| **Heading** | 700 | `-0.02em` | `clamp(1.75rem, 1.2rem + 2.1vw, 2.75rem)` | Section titles, slide titles, post headlines |
| **Subheading** | 700 | `-0.02em` | `clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)` | Card titles, item titles |
| **Minor heading** | 700 | `-0.01em` | `1.125rem` | Small titles, form legends |
| **Lead** | 400 | normal | `clamp(1.0625rem, 1rem + 0.5vw, 1.25rem)` | Introductory paragraphs |
| **Body** | 400 | normal | `1rem` | Paragraphs, descriptions |
| **Small** | 400 | normal | `0.875rem` | Secondary copy, button labels |
| **Label** | 600 | `0.01em` max | `0.8125rem` | Category labels, metadata |
| **Caption** | 400 | normal | `0.75rem` | Fine print, legal, source lines |

**Line height:** `1.05` for display, `1.15` for headings, `1.55` for lead, `1.6` for body.

**Figures:** use `font-variant-numeric: tabular-nums` for any number in a column, a table, a price, or an index.

### 4.3 Typography rules

- **Sentence case everywhere.** Headings, labels, and buttons. Uppercase is reserved for a genuine acronym, never for emphasis, and never with wide letter-spacing.
- **One emphasis per headline.** Only key words take `--blue-strong`. A headline with three blue phrases has no emphasis.
- **Keep headlines short.** Display statements stay around 12 words. If a headline needs three lines on a desktop canvas, it is too long.
- **Left-aligned by default.** Centering is reserved for a single closing statement, so it reads as a deliberate change.
- **Do not shrink type to fit content.** Reduce the copy, break it into more slides, or move detail to a caption.

---

## 5. Spacing

An **8-point system**. Every margin, padding, and gap uses a step.

| Token | Value | Typical use |
|---|---|---|
| `--space-1` | `8px` | Inline gaps, icon padding |
| `--space-2` | `16px` | Tight stacks |
| `--space-3` | `24px` | Compact padding, list gaps |
| `--space-4` | `32px` | Standard padding, group separation |
| `--space-5` | `48px` | Sub-section separation |
| `--space-6` | `64px` | Generous separation |
| `--space-7` | `80px` | Section separation |
| `--space-8` | `96px` | Wide section separation |
| `--space-9` | `128px` | Opening and closing blocks |

**Rules**

- Spacing is **deliberately uneven** between blocks (RHYTHM 3). Two blocks separated by the same gap everywhere produce a flat page or a flat deck.
- Whitespace is structure. It separates and groups; it is not leftover space.
- Avoid arbitrary values such as `13px` or `43px` unless a technical constraint demands it.
- On a non-web canvas, scale the steps proportionally: a `1080 × 1350` post uses roughly `2×` the web steps.

---

## 6. Grid and alignment

- **Left-aligned by default.** Centered composition is allowed when the composition genuinely calls for it (a closing statement, a single-message poster).
- **One alignment system per surface.** Do not mix left, centered, and justified within one document or one deck.
- **Web:** `1200px` container, `12` columns, `24px` gutter, gutter `clamp(20px, 5vw, 40px)`. A narrow measure of `760px` for long prose.
- **Social:** a `4:5` canvas with a `64` to `80px` safe margin. Content never enters the margin.
- **Presentation:** a `12`-column grid, one idea per slide.
- **Never let a column of body text exceed roughly `70` characters.** Beyond that, reading breaks down.

**Asymmetry is the rhythm tool.** Vary the column split between blocks (`6 / 6`, `4 / 8`, `7 / 5`, `8 / 4`). Two adjacent blocks should not repeat the same split.

---

## 7. Shape: corner radius

Arstech uses soft geometric shapes, applied in steps so that shape itself carries hierarchy.

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | `6px` | Chips, small marks |
| `--radius-sm` | `8px` | Buttons, inputs, small cards |
| `--radius-md` | `12px` | Cards, panels |
| `--radius-lg` | `16px` | Large panels, frames |
| `--radius-full` | `999px` | Chips and tags only |

**Do not make everything pill-shaped.** When buttons, inputs, cards, and badges all share the pill radius, shape stops communicating anything. Pill radius is reserved for chips and tags.

---

## 8. Elevation and borders

**Borders do the structural work. Shadow is an elevation marker, not a default.**

| Token | Value | Use |
|---|---|---|
| `--shadow-xs` | `0 1px 2px rgba(7,26,61,0.05)` | Resting cards |
| `--shadow-sm` | `0 1px 3px rgba(7,26,61,0.06), 0 1px 2px rgba(7,26,61,0.04)` | A surface that sits above the page |
| `--shadow-md` | `0 8px 24px rgba(7,26,61,0.07)` | Hover lift, floating frames |

**Rules**

- A shadow appears only where an element genuinely lifts above its surface, and the elevation reason must be statable.
- Everything else is flat with a `1px` border.
- No heavy drop shadows, no black dramatic shadows, no glow on every object.
- Never stack shadow and glow on the same element.

---

## 9. Motion

MOTION 2 by default. Motion exists to orient, to confirm, or to explain. It never decorates. A surface that carries a content-bearing flow, such as the website hero diagram, declares MOTION 3 instead.

| Token | Value |
|---|---|
| `--dur-fast` | `140ms` |
| `--dur` | `220ms` |
| `--dur-slow` | `420ms` |
| `--ease` | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |

**Rules**

- **Enter:** fade in and rise a short distance once, staggered within a group. Never re-trigger.
- **Interact:** colour, border, and a small lift. No scale bounce.
- **A loop must carry meaning.** A looping animation is allowed only when the loop *is* the content, for example a flow showing data moving between connected systems. It must be confined to one element, slower than the eye expects, and it must stop entirely under reduced motion. Decorative loops stay banned: a dot that pulses to look alive marks nothing, and a glow that breathes says nothing.
- **Respect reduced motion.** Where the platform exposes a reduced-motion preference, all non-essential motion resolves immediately to its final state.
- **Static surfaces carry no motion.** An Instagram post, a printed document, and a slide are judged on composition alone.

---

## 10. Iconography

- **One set, one style:** inline SVG, `1.75px` stroke, `24 × 24` grid, round caps and joins. Consistent stroke weight within a surface.
- **Drawn for relevance.** No sparkle, star, magic, lightning, diamond, cube, robot, or orb. Those glyphs say "AI product" and nothing about Arstech.
- **No default library look.** A single recognisable icon library (thin rounded strokes) makes every brand's icons identical. Choose icons for meaning first, then check that the set's weight suits the piece.
- **Each icon earns its place.** If a label is clear without an icon, omit the icon.
- **Colour:** `--blue-strong` on light surfaces, `--blue-light` on navy. Never a different hue per icon.
- **No emoji as decoration.** Not in headings, not in bullets, not in captions, not in UI. If a concept needs a mark, use a relevant icon or nothing.
- **No 3D, no filled cartoon, no mixed styles** within one surface.

---

## 11. Imagery and illustration

**The visual language is diagrams, structure, and typography.** Not photography of people, not stock imagery, not decorative illustration.

**Approved:**

- System and architecture diagrams, drawn from real concepts.
- Real product screenshots, when the product exists and works.
- Abstract geometric forms: thin connecting lines, node structures, subtle blue depth.
- Grid and dot patterns only when they support a stated identity purpose.

**Not approved:**

- Generic 3D blobs, Undraw or Storyset illustrations, cartoon characters.
- Staged corporate stock photography: handshakes, people pointing at invisible charts, over-lit offices.
- Fabricated product screenshots, skeleton mockups presented as a product, or fake terminal windows.
- Any illustration added to fill empty space.

**Rule:** every visual must support the message. If it does not, remove it and let the type carry the piece.

---

## 12. The identity motif: the System Rail

One repeated gesture gives Arstech material its signature, so the brand is recognisable even with the logo removed.

**The rail** is a `1px` hairline (`--border`) carrying small `8px` nodes at the points where content attaches to it. It expresses the brand's product truth: *Arstech connects systems.* It runs through:

- A diagram, where nodes are systems and the rail is the connection.
- A list or index, where each item attaches to the rail.
- A process or timeline, where each step hangs from the rail.

**The index** is the secondary motif. Blocks and items are numbered (`01`, `02`, `03`) in tabular figures. Numbering is real ordering, not decoration, and it must always be sequential with no gaps.

**Why it matters:** it is specific, repeatable, and portable. It works on a slide, a post, and a page alike, and it survives a logo swap.

---

## 13. Themes

### 13.1 Light

| Element | Value |
|---|---|
| Background | White `#FFFFFF` or Soft Background `#F5F8FC` |
| Text | Deep Navy `#071A3D`, body `#1B2A44` |
| Accent | Ars Blue `#087CFF` (large and non-text), `#0068DE` (text and controls) |

Best for: documents, proposals, information-dense layouts, process explanation, most web pages.

### 13.2 Dark

| Element | Value |
|---|---|
| Background | Deep Navy `#071A3D`, raised `#0C2450` |
| Text | White `#FFFFFF`, secondary `#C9D6E8`, captions `#9FB3CC` |
| Accent | Light Blue `#31B7FF`, Ars Blue for non-text marks |

Best for: a single high-contrast block, hero statements, campaign pieces, product showcases.

### 13.3 Using the two together

- **Dark is a block, not a mode.** The brand is light by default. Use navy for one deliberate block to create contrast and rhythm, not as a page-wide default.
- **Both themes belong to the same brand.** Type, spacing, rail, and radius are identical; only the surface values change.
- **Never put a dark block adjacent to another dark block** without a light separator. The contrast is the point.
- **Verify contrast in the theme you ship.** A pairing that passes on light may fail on navy, and vice versa.

---

## 14. Voice and tone

### 14.1 Voice

Direct, specific, technical without jargon. Short sentences. The voice of an engineer explaining a decision to a peer, not a brochure. First person plural ("we build"), active voice, named actors.

### 14.2 Copy rules

- **No em dashes or en dashes.** Use a comma, period, colon, or parentheses. This is absolute.
- **No buzzwords.** No "seamless", "cutting-edge", "revolutionary", "AI-powered", "next-generation", "elevate", "unlock", "empower", "leverage", "robust".
- **No fabricated facts.** No invented numbers, clients, testimonials, certifications, or performance claims. If there is no real data, show no claim.
- **Specific calls to action.** "Start a project", "See our capabilities", "Send the brief". Never "Get started" or "Learn more" on their own.
- **Name the actor.** Avoid the actorless passive ("the page was updated") and avoid giving abstractions human verbs ("the dashboard understands").
- **No forced trios.** Real lists have the number of items the content needs.
- **No generic closers.** Do not end with "the future looks bright" or an equivalent.

### 14.3 Placeholders

Anything not yet real is written as what it is, never disguised:

| Placeholder | Meaning |
|---|---|
| `[CLIENT]` / `[LOGO]` | A real, linked client name or logo goes here |
| `[REAL DATA]` | A sourced metric goes here, or the block is removed |
| `[PROJECT NAME]` | A real project goes here |
| `TODO` (in code) | A value still to be replaced, paired with a visible label |

An empty block is better than a fabricated one. Never fill a placeholder with a realistic-looking invention.

---

## 15. Applications

Every surface draws from the same system: same palette, same type family, same spacing logic, same rail motif, same voice. Layouts change. The rules do not.

### 15.1 Instagram and social

**Canvases**

| Format | Size | Ratio | Safe margin |
|---|---|---|---|
| Feed portrait | `1080 × 1350` | 4:5 | `72px` |
| Feed square | `1080 × 1080` | 1:1 | `64px` |
| Carousel slide | `1080 × 1350` | 4:5 | `72px` |
| Story / Reel cover | `1080 × 1920` | 9:16 | `64px` sides, `250px` top, `420px` bottom |
| Profile avatar | `320 × 320` | 1:1 | Mark only, centred, one mark height of padding |

**Type at social scale.** Map the roles to the canvas: Display around `88` to `104px`, Heading around `64px`, Lead around `40px`, Body around `36px`, Label around `28px`. Body copy on a post should be readable at thumbnail size, which usually means fewer words, not smaller type.

**Layout families.** Rotate through these so the grid and the feed stay varied (RHYTHM 3):

| Family | Composition | Use |
|---|---|---|
| **Hero** | One large statement plus a supporting visual or diagram | Announcements, positioning |
| **Educational** | Headline plus structured information in 2 to 4 blocks | Explaining a concept or a process |
| **Service** | One capability as the focal point, with its deliverables | Service spotlights |
| **Case study** | Problem, then solution, then result, stacked | Real client work only |
| **Process** | Sequential steps on the rail | How Arstech works |
| **Quote** | One short statement, generous whitespace, attribution only if real | Point of view |

**Social rules**

- One focal point per post. If two elements compete, split it into two posts or a carousel.
- Blue appears once per composition, at the key moment.
- No emoji, no fake statistics, no invented client names, no stock imagery.
- Keep the footer system (16.1) consistent across posts so the feed reads as one system.
- A carousel must carry a real sequence. Do not split one idea across six slides to look substantial.

### 15.2 Website

- Left-aligned, structured, generous whitespace, one focal point per screen.
- A real, working call to action. Every control does something, or it does not exist.
- The rail motif appears in at least one structural element (a diagram, an index, a timeline).
- Sections must visibly differ in composition. No two adjacent sections share a skeleton.
- Responsive behaviour, component APIs, and breakpoints belong to the project's own website spec, not to this document.

### 15.3 Presentation

- One idea per slide. If a slide needs two ideas, it is two slides.
- Strong hierarchy: a Display or Heading statement, then at most one supporting block.
- Use the navy block for section breaks and the closing statement.
- No slide transitions beyond a simple fade, and no animated builds that require narration to make sense.
- Diagrams and the rail carry the visual weight, not stock imagery.

### 15.4 Document and proposal

- White background, clear hierarchy, restrained accent.
- Uniform rhythm is correct here (RHYTHM 1). A document should be predictable.
- Body at a comfortable reading size with a measure of about `70` characters.
- Use the navy block only for a cover or a section divider.
- Every number carries a source, or it is removed.

### 15.5 Business card

- Mark plus wordmark, one contact line, one handle. Nothing else.
- Keep the information minimal and the typography clean. Use the soft background or navy, not both.
- The tagline is optional here, and usually better omitted.

### 15.6 Campaign and poster

- Larger type and stronger expression are allowed, within the palette and the one-accent rule.
- One statement, one focal point. No supporting paragraph unless it earns its place.
- The rail and the index may be used at a larger scale as graphic structure.
- ENERGY may rise to 3. It may not become a different brand: same blue, same type, same restraint.

### 15.7 Product and packaging

- Prioritise mark recognition and one clear line of copy.
- Reversed lockup on navy or on a dark product surface.
- No effects on the mark, no busy background behind it.

---

## 16. Recurring systems

### 16.1 The footer line

For branded material that needs a sign-off, an optional footer carries:

- Left: **Built to Innovate.**
- Right: **@arstechid**

It stays secondary to the main content, and it is omitted where it would compete with the message.

### 16.2 Calls to action

Primary: Ars Blue fill with white text. Secondary: transparent or light fill with Deep Navy text. Never two competing primary calls to action in one composition.

---

## 17. Do and Don't

**Do**

- Use strong hierarchy, and let one element lead.
- Keep layouts clean and whitespace generous.
- Use blue intentionally, at the key moment.
- Keep typography consistent: one family, sentence case, one emphasis.
- Use one icon set with a consistent stroke.
- Maintain grid alignment, and vary the split between blocks.
- Make the message understandable at a glance.
- Keep decorative elements subtle and explainable.

**Don't**

- Introduce colours outside the palette.
- Use gradients or glow as a default treatment.
- Mix illustration styles, or mix icon styles.
- Add a second typeface.
- Overload a layout, or shrink type to make it fit.
- Stretch, recolour, or decorate the logo.
- Fill every empty area.
- Make every element blue, or every shape pill.
- Use emoji as decoration.
- Invent numbers, clients, or testimonials.
- Change the visual direction from one piece to the next.

---

## 18. AI design instructions

When generating Arstech material with an AI tool, use this baseline:

> Create a modern, clean technology brand visual for Arstech. Use a structured minimal layout, strong typography, generous whitespace, deep navy (`#071A3D`) and white as the primary surfaces, Ars Blue (`#087CFF`) as the main accent, subtle technology-inspired structure such as thin connecting lines and node marks, and a professional digital-product aesthetic. Type is Inter, sentence case, one emphasis per composition.
>
> Avoid generic corporate templates, excessive gradients, glow, random colours, cartoon or 3D-blob styling, emoji, stock photography, fake statistics, invented client names, and overcrowded layouts. Do not use em dashes.

Then state, per asset:

1. Format and dimensions
2. The one message
3. The surface and the dial values
4. Light or navy
5. Logo variant required
6. Call to action, if any
7. Supporting visual, if any

An individual prompt never overrides this system unless the owner explicitly says so. If a prompt asks for something the system forbids, name the conflict and ask.

---

## 19. Brand consistency test

Before approving any asset, check:

1. Does it look like Arstech without reading the handle?
2. Is blue used once, at the key moment?
3. Is the typography consistent: one family, sentence case, one emphasis?
4. Is there one obvious focal point?
5. Is the spacing structured, and does it vary between blocks?
6. Is every visual supporting the message, with no filler?
7. Is the logo used correctly, with clear space intact?
8. Is every number, client, and claim real, or an explicit placeholder?
9. Would it still work at half the size, or in greyscale?
10. Would it sit comfortably beside the other Arstech material?

If several answers are no, revise before publishing.

---

## 20. The core rule

The Arstech brand does not require every asset to look identical. It requires every asset to feel like it came from the same system.

Consistency comes from **colour + typography + spacing + grid + the rail + voice**, not from repeating one template.

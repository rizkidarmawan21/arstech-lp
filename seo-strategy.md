# Arstech SEO Strategy

**Version 1.0** | Companion to `design.md` (brand) and `website-spec.md` (build) | Owner: Arstech | Domain: arstech.my.id

---

## 0. Scope

This is the organic search plan for arstech.my.id. It covers the diagnosis, the architecture decision, the keyword map, the content plan, local search, technical SEO, off-page, and measurement.

Two things it deliberately does **not** contain: invented search volumes, and invented competitor data. I have no keyword tool wired in, so any volume numbers here would be fabricated. Section 3.4 says where to get the real ones and how to drop them into this document.

**Confirmed direction:** Indonesian primary with an English version, both the contact form and WhatsApp count as conversions, and there is appetite for ongoing content.

---

## 1. Diagnosis

### 1.1 The live site today

Measured against arstech.my.id on 19 September 2026.

| Item | State | Consequence |
|---|---|---|
| Meta description | **Absent** | Google writes its own snippet from page text. You lose control of the click-through pitch on every query. |
| Canonical tag | **Absent** | Any duplicate URL variant (trailing slash, `www`, query strings) competes with the real page instead of consolidating. |
| Open Graph / Twitter Card | **Absent** | Shared links on WhatsApp, LinkedIn, and X render as a bare URL. For a business whose main channel is WhatsApp, this is a direct conversion leak. |
| Structured data | **Absent** | No entity signals. Google has to infer who Arstech is, what it does, and where it operates. |
| `robots.txt` | **404** | No crawl guidance and no sitemap declaration. |
| `sitemap.xml` | **404** | Discovery depends entirely on links. |
| Page title | `Arstech - Digital Systems & Software Engineering` | Brand-first, with no service or location term. Nobody searches your brand yet. |
| JavaScript payload | `cdn.tailwindcss.com` | A render-blocking third-party script. Google's own documentation says the CDN build is for prototyping, not production. |
| Fonts | Google Fonts, render-blocking | Second blocking request before first paint. |
| Content claims | "100% Delivery Rate", "24/7 Host Monitoring", three client logos | Unsupported. This is a trust problem first and a rankings problem second: Google's helpful-content signals are built to demote exactly this. |
| Content depth | One page | One page can rank for brand terms and a handful of long-tail phrases. It cannot rank for a commercial service term. |
| Language | English | Your market searches in Bahasa Indonesia. See section 2. |

### 1.2 What the competitive results actually look like

I checked what currently ranks, and the pattern is consistent enough to plan against.

For **"jasa pembuatan software"**, the results are all dedicated service URLs:

- `buatsoftware.com/jasa-pembuatan-software`
- `saka-erp.id/jasa-pembuatan-software-custom`
- `solusitech.com/jasa-pembuatan-software`
- `jasasoftware.com`
- `funtechno.id`

For **"jasa pembuatan software Semarang"**, the results are all city landing pages:

- `cekotechnology.com/jasa-software-semarang`
- `karyastudio.com/jasa-pembuatan-software-semarang`
- `jasasoftware.com/software-house/semarang`
- `techarea.co.id`, `semarangsoftware.com`

Two conclusions, and they drive the whole plan:

1. **Nobody ranks a single page for a commercial service term.** Every result is a page dedicated to one service or one city. Your current one-pager is structurally unable to compete, no matter how good it is.
2. **The city query is a real, winnable niche.** Local pages rank, the competition is regional rather than national, and you are based in Semarang. This is the fastest path to a page-one position.

### 1.3 The honest starting position

- **Brand searches:** essentially zero volume today. Nobody is looking for Arstech.
- **Commercial national terms:** 6 to 12 months of consistent work before you are competitive, against agencies with years of accumulated links.
- **Local terms:** the realistic first win, plausibly 2 to 4 months for a well-built Semarang page plus a Google Business Profile.
- **AI-specific terms:** an emerging category where the established players have not yet entrenched. Your strongest differentiator and your best long-term bet.

---

## 2. The structural decision: two languages, one primary

### 2.1 Why Indonesian is primary

Your buyers search in Bahasa Indonesia. The evidence is in section 1.2: every page ranking for the commercial terms you care about is written in Indonesian, for Indonesian businesses. An English page can rank for those queries in principle, but it starts at a disadvantage and reads as foreign to the buyer.

English stays, because a meaningful slice of your work is technical and some buyers evaluate offshore partners in English. But it is the **secondary** tree, not the default.

### 2.2 URL architecture

Indonesian at the root, English under a subdirectory. One domain, so authority accumulates in one place.

```
/                      Indonesian (primary, x-default)
/jasa-pembuatan-software/
/jasa-pembuatan-aplikasi-ai/
/jasa-pembuatan-website/
/jasa-integrasi-sistem/
/software-house-semarang/
/studi-kasus/
/blog/
/tentang/
/kontak/

/en/                   English
/en/custom-software-development/
/en/ai-systems/
/en/web-platforms/
/en/systems-integration/
/en/case-studies/
/en/about/
/en/contact/
```

**Do not use a subdomain for English.** `en.arstech.my.id` splits your authority across two hosts and doubles the work for no benefit at this size.

**Do not use a language parameter** (`?lang=en`). It fragments indexing and is worse for every purpose.

### 2.3 hreflang

Every page carries a full set, self-referencing:

```html
<link rel="alternate" hreflang="id" href="https://arstech.my.id/jasa-pembuatan-software/">
<link rel="alternate" hreflang="en" href="https://arstech.my.id/en/custom-software-development/">
<link rel="alternate" hreflang="x-default" href="https://arstech.my.id/jasa-pembuatan-software/">
```

Rules that are easy to get wrong:

- hreflang is **reciprocal**. If page A points to page B, page B must point back to page A. A one-way annotation is ignored.
- Every page must reference **itself** in the set.
- `x-default` points at the Indonesian version, since that is what a user with no language signal should get.
- Do not machine-translate the English pages into Indonesian or the reverse. Translated duplicates with no added value are exactly what Google's guidance on scaled content abuse targets. Each tree needs to be written for its own reader.

---

## 3. Keyword strategy

### 3.1 How to read this

Clusters are grouped by **intent**, because intent determines the page type, and page type determines whether you can rank at all.

| Tier | Intent | Page type | Priority |
|---|---|---|---|
| 1 | Service, buying intent | Service page | Highest commercial value |
| 2 | Service, specific or technical | Service page variant | High, lower competition |
| 3 | Local | City landing page | Fastest to rank |
| 4 | Problem-aware, research | Article | Feeds the funnel, builds authority |
| 5 | Emerging category | Service page plus articles | Best long-term bet |

### 3.2 Indonesian clusters (primary)

**Tier 1: service, buying intent**

- jasa pembuatan software
- jasa pembuatan software custom
- jasa pembuatan aplikasi
- jasa pembuatan aplikasi bisnis
- jasa pembuatan website
- jasa pembuatan sistem informasi
- software house
- jasa pengembangan software

**Tier 2: specific and technical**

- jasa pembuatan aplikasi AI
- implementasi AI untuk bisnis
- jasa integrasi API
- jasa integrasi sistem
- jasa pembuatan dashboard
- jasa pembuatan ERP custom
- otomasi WhatsApp untuk bisnis
- jasa migrasi sistem lama
- jasa pembuatan API backend

**Tier 3: local**

Start with Semarang, then expand only after Semarang ranks.

- jasa pembuatan software Semarang
- software house Semarang
- jasa pembuatan aplikasi Semarang
- jasa pembuatan website Semarang
- konsultan IT Semarang
- Then: Yogyakarta, Surabaya, Solo, Kudus, Jakarta

**Tier 4: problem-aware (article topics)**

- cara memilih software house
- berapa biaya pembuatan software custom
- berapa lama proses pembuatan aplikasi
- apa itu integrasi sistem
- ERP siap pakai vs software custom
- cara menghitung ROI otomasi proses bisnis
- tanda bisnis butuh sistem custom

**Tier 5: emerging AI category**

- implementasi AI agent untuk bisnis
- chatbot WhatsApp AI untuk customer service
- otomasi proses bisnis dengan AI
- AI untuk laporan dan analitik bisnis

### 3.3 English clusters (secondary)

- custom software development Indonesia
- software house Indonesia
- offshore development team Indonesia
- AI integration services Indonesia
- hire Golang developer Indonesia
- custom ERP development Indonesia

Lower volume, higher budget per lead. Worth the secondary tree, not worth primary effort yet.

### 3.4 Getting real volumes, and where to put them

Do not plan the roadmap on guessed numbers.

1. **Google Keyword Planner** (free with an Ads account). Export the clusters above, get monthly volume and competition.
2. **Google Search Console.** Once live, the Performance report shows the real queries you already appear for. This beats any tool.
3. **Search the terms yourself, in an incognito window, set to Indonesia.** Record which page types rank. That is what you are competing against.

Drop the numbers into this table as you gather them:

| Cluster | Keyword | Volume | Competition | Target URL | Priority |
|---|---|---|---|---|---|
| Local | jasa pembuatan software Semarang | _pending_ | _pending_ | `/software-house-semarang/` | 1 |
| Service | jasa pembuatan software custom | _pending_ | _pending_ | `/jasa-pembuatan-software/` | 1 |
| AI | jasa pembuatan aplikasi AI | _pending_ | _pending_ | `/jasa-pembuatan-aplikasi-ai/` | 1 |
| Web | jasa pembuatan website | _pending_ | _pending_ | `/jasa-pembuatan-website/` | 2 |
| Integration | jasa integrasi sistem | _pending_ | _pending_ | `/jasa-integrasi-sistem/` | 2 |

### 3.5 What not to target

- **Head terms you cannot win yet:** "software house" and "jasa pembuatan website" nationally are dominated by agencies with years of links. Target them, but expect a long game, and do not judge the strategy on them in month two.
- **Terms you cannot serve:** anything implying services you do not offer, or cities you cannot actually meet clients in.
- **Keyword variants as separate pages:** "jasa pembuatan software" and "jasa bikin software" are the same intent. One page, both phrasings used naturally. Separate pages for each is doorway-page territory.
- **English and Indonesian for the same keyword.** Pick one target per page.

---

## 4. Site architecture

The full target URL map. Build order is in section 5.

### Indonesian tree

| URL | Page | Primary target |
|---|---|---|
| `/` | Beranda | Brand plus positioning |
| `/jasa-pembuatan-software/` | Custom software | jasa pembuatan software custom |
| `/jasa-pembuatan-aplikasi-ai/` | AI systems | jasa pembuatan aplikasi AI |
| `/jasa-pembuatan-website/` | Web platforms | jasa pembuatan website |
| `/jasa-integrasi-sistem/` | Integrations | jasa integrasi sistem |
| `/software-house-semarang/` | Local landing | software house Semarang |
| `/studi-kasus/` | Case study index | Real project names |
| `/studi-kasus/[slug]/` | One per project | Project plus industry |
| `/blog/` | Article index | Topic hub |
| `/blog/[slug]/` | One per article | Tier 4 and 5 topics |
| `/tentang/` | About | Brand plus team credibility |
| `/kontak/` | Contact | Conversion |

### English tree

Mirror of the above under `/en/`, built only after the Indonesian equivalents are live and indexed. Do not launch both trees at once: you will spread thin and learn nothing from either.

### Internal linking rules

- Every service page links to the two related service pages and to the contact page.
- Every article links to the service page it supports, using the service's own phrase as anchor text.
- Every city page links to all four service pages.
- The home page links to all four service pages and the city page. One link each, in body content, not a footer dump.
- Anchor text describes the destination. Never "click here", never a keyword stuffed into every link.

---

## 5. Content plan

### 5.1 Content standards (non-negotiable)

These come from the brand system and they matter for ranking as much as for credibility.

1. **No invented numbers, clients, or testimonials.** Not a delivery rate, not a client logo, not a review. Unsupported claims are both an antislop violation and a helpful-content liability. If a case study has no measurable outcome, describe what was built and skip the numbers.
2. **Write for the reader, then check the keyword is present.** Not the reverse. A page written around a phrase reads like a page written around a phrase, and Google's systems are good at spotting it.
3. **One page, one intent.** Two intents means two pages.
4. **Every page answers the next question.** A service page that ends without saying what happens next loses the reader it just earned.
5. **Indonesian pages are written in Indonesian**, by someone who writes it natively. Machine translation is detectable and reads as foreign to the buyer.
6. **Case studies need real clients.** If a client will not be named, write it as an anonymised pattern ("a logistics company") and say so. Never imply a named client you do not have.

### 5.2 Phase 1: service pages (weeks 1 to 4)

Four pages, Indonesian, 900 to 1,400 words each. These carry the commercial value.

Each page needs, in this order:

1. `H1` naming the service in the words the buyer uses
2. A short opening that states who it is for and what changes
3. The problem, described in the buyer's terms
4. What you actually build, as concrete deliverables
5. How the engagement runs, with the real phases
6. What you need from them to start
7. Honest limits: what this is not suited to
8. FAQ, three to five questions that are genuinely asked (pricing, timeline, handover, who owns the code)
9. One call to action, repeated at the top and bottom

Also on each page: `Service` structured data, a canonical, and hreflang once the English twin exists.

### 5.3 Phase 2: city pages (weeks 4 to 8)

One page per city, starting with Semarang. This is the fastest ranking win available.

A city page is **not** a service page with the city name inserted. That is a doorway page and it will not rank. It must contain something true about serving that city:

- Real local context: which industries are concentrated there, what their systems problems look like
- Whether you meet clients in person, and where
- Any genuinely local case study
- Local contact details and hours
- A map or directions if you have a physical location

Build Semarang first. Add the next city only when Semarang ranks.

### 5.4 Phase 3: case studies (weeks 8 to 16)

This is the highest-trust content you can produce, and the hardest for a competitor to copy.

Each case study covers: the situation, the constraint, what was built, what changed, and what you would do differently. Screenshots of the real product are worth more than any amount of prose.

**If you have no case studies yet:** build the first one from a project you have already delivered. If a client will not be named, say "a manufacturing client in Central Java" and be explicit that the name is withheld at their request.

### 5.5 Phase 4: articles (ongoing, from week 12)

Two per month, minimum, indefinitely. Topics come from Tier 4 and Tier 5.

Prioritise in this order:

1. **Buying-decision articles.** "Berapa biaya pembuatan software custom" and "cara memilih software house". These capture people actively choosing a vendor.
2. **AI implementation articles.** Your differentiator, and the category where competition is still thin.
3. **Technical explainers.** "Apa itu integrasi sistem". Lower commercial intent, but they build topical authority and earn links from developers.

### 5.6 Publishing cadence, honestly

A realistic minimum for compounding results:

- Month 1: four service pages, plus the technical fixes
- Month 2: the Semarang page, two articles
- Month 3: two city pages, two case studies, two articles
- Month 4 onward: two articles and one case study per month

If you cannot sustain that, cut the scope rather than the quality. Four excellent pages beat twenty thin ones, and thin pages actively suppress the good ones on the same site.

---

## 6. Local SEO

For a studio in Semarang selling to regional businesses, this is where the fastest wins are.

1. **Google Business Profile.** Claim it, verify it, and complete every field: category (Software company, plus IT consultant as secondary), service area, hours, description, services list, and the website URL. This is the single highest-return action on this page.
2. **NAP consistency.** Name, address, and phone must be byte-identical everywhere they appear: GBP, website footer, Instagram bio, directories. Inconsistent NAP splits your local signals.
3. **Reviews.** Ask every delivered client, once, politely. Reviews are a direct local ranking factor and the strongest conversion asset you can have. Never buy or write them.
4. **Local citations.** Indonesian business directories, the local chamber of commerce, university and startup-community listings in Central Java, and any industry association you qualify for.
5. **Location page.** If you have a real address, the Semarang page should carry it with `LocalBusiness` structured data. If you work remotely, say so and use `areaServed` instead. Do not publish an address you do not actually use.
6. **Instagram as a traffic source.** Your handle is already in the footer. It is a referral channel, not a ranking factor, but it is where your buyers are.

---

## 7. Technical SEO

### 7.1 What this build now ships

Already implemented in the redesign branch:

- Meta description, tuned for length and intent
- Canonical tag pointing at `https://arstech.my.id/`
- `robots` directive with `max-image-preview:large`
- Full Open Graph set (type, site name, locale, url, title, description)
- Twitter Card set
- JSON-LD `@graph`: Organization, WebSite, WebPage, and four `Service` nodes, with `areaServed: Indonesia`
- `robots.txt` with a sitemap declaration
- `sitemap.xml`
- Semantic HTML: one `h1`, ordered headings, landmarks, skip link
- No render-blocking third-party script. The Tailwind CDN is gone; the CSS is 39 KB of hand-written, cacheable stylesheet
- Fonts preconnected

### 7.2 Still missing

| Item | Action | Why it matters |
|---|---|---|
| `LocalBusiness` schema | Add once a real public address exists | Local pack eligibility. Needs a true address, so it waits. |
| Custom 404 page | Add, and return a real 404 status | Keeps a lost visitor on the site. The status code is already correct (nginx returns a genuine 404), only the page itself is missing. |
| Search Console | Verify the domain, submit the sitemap | Without this you are flying blind. Do it the day the site goes live. |
| Analytics | GA4 with form and WhatsApp tracked as conversions | You asked for both channels to count. They must be measured separately. |
| Font self-hosting | Serve Inter from your own domain | Removes a third-party round trip. Modest gain, easy win. |
| Per-article social cards | One 1200×630 card per article | All pages currently share one card. Fine for launch, better with distinct cards once the articles are established. |

**Done:** `og:image` now exists. `assets/og-card.png` is a 1200×630 PNG built from the brand system, wired into `og:image` and `twitter:image` on every page with explicit width, height, and alt text. Regenerate with `tools/make-og-card.sh`. A page can override it with an `og_image` front-matter field.

### 7.3 Performance

Core Web Vitals feed into rankings, and your current site is carrying avoidable weight.

- **Already fixed:** Tailwind CDN removed, no framework, no runtime dependencies, no images above the fold.
- **nginx config is now applied.** `nginx.conf` ships in the repository and the Dockerfile installs it, so gzip, cache lifetimes, two security headers, and real 404s are live rather than advisory. Two things in it matter for SEO specifically: no SPA fallback, because answering 200 for a missing page is a soft 404, and `try_files ... =404` so a wrong URL returns a genuine 404 status. Reference copy:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 512;
    gzip_types text/html text/css application/javascript application/json image/svg+xml;

    # No hashed filenames yet, so keep the cache modest. Raise to 1y
    # and add immutable once asset filenames are content-hashed.
    location /assets/ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }

    location = /robots.txt  { add_header Cache-Control "public, max-age=86400"; }
    location = /sitemap.xml { add_header Cache-Control "public, max-age=86400"; }

    # Real 404s. Do not add an SPA fallback: returning 200 for a missing
    # page is a soft 404 and it harms indexing.
    location / {
        try_files $uri $uri/ =404;
    }
}
```

- **HTTPS and redirects:** confirm `http` and the `www` variant both 301 to `https://arstech.my.id/`. Cloudflare is already in front, so this is a rules check, not new infrastructure.

---

## 8. Off-page

Realistic link sources for an Indonesian software studio. No link buying, no private blog networks, no comment spam.

1. **Client sites.** Ask to be credited in the footer or on an about page for work you delivered. The most natural link you will ever get.
2. **GitHub.** Your profile already exists and links to your site. Keep public repos for tools you genuinely use, with a real README.
3. **LinkedIn.** Company page plus personal profiles, all linking to the site.
4. **Indonesian tech communities and directories.** Startup directories, local tech meetups, university alumni and incubator listings in Central Java.
5. **Guest articles.** Write for Indonesian business or tech publications about AI implementation or systems integration. Real articles with a real byline, not SEO filler.
6. **Open-source contributions.** One maintained utility that developers actually use earns more durable links than any outreach campaign.
7. **Speaking.** Local meetups and campus talks. Slow, but it produces both links and clients.

What to avoid: paid link packages, directory spam, reciprocal link schemes, and any "100 backlinks for $50" offer. These are detectable and the downside is a manual penalty.

---

## 9. Measurement

### 9.1 Set up before launch

1. **Google Search Console.** Verify the domain, submit `sitemap.xml`, watch the Pages report for indexing problems.
2. **GA4.** Track the contact form submission and the WhatsApp click as **separate** conversions, since you named both as wins.
3. **Bing Webmaster Tools.** Small effort, some traffic.
4. **Rank tracking.** A simple spreadsheet of ten to fifteen target keywords, checked monthly in an incognito window set to Indonesia. No tool needed at this scale.

### 9.2 The numbers that matter

| Metric | Why | Where |
|---|---|---|
| Organic sessions | The headline | GA4 |
| Non-brand organic sessions | Brand traffic hides whether SEO is working | GSC, filtering out "arstech" |
| Impressions and average position | Leading indicators, they move before clicks | GSC |
| Indexed pages | Should track the number of pages you have published | GSC Pages report |
| Form submissions from organic | The actual goal | GA4 |
| WhatsApp clicks from organic | The other goal | GA4 |
| Queries per page | Shows whether pages target the right intent | GSC |

### 9.3 Realistic expectations

| Timeframe | What should be true |
|---|---|
| Month 1 | Technical fixes live, service pages indexed, GSC showing impressions for long-tail terms |
| Month 3 | First page-one positions for Semarang local terms, growing long-tail impressions |
| Month 6 | Non-brand organic traffic compounding, first enquiries attributable to organic, ranking for Tier 2 and 5 terms |
| Month 12 | Competing for Tier 1 national terms, organic a dependable share of new business |

If nothing moves by month four, the cause is almost always one of three things: pages not indexed, content too thin to compete, or targeting keywords the buyer does not use. Check indexing first.

---

## 10. What not to do

- **Do not keyword-stuff.** Indonesian SEO has a visible culture of "jasa X kota Y" repetition in body text. It reads as spam to buyers and it does not work.
- **Do not publish a page per keyword variant.** One intent, one page.
- **Do not mass-produce AI articles.** Google's scaled content abuse policy targets exactly this, and thin pages drag down the good ones on the same domain.
- **Do not invent proof.** No delivery rates, no client logos, no testimonials you cannot evidence. This is both an antislop rule and the fastest way to lose a technical buyer.
- **Do not buy links.** The risk is a manual action, and recovery takes longer than earning the links honestly.
- **Do not launch the English tree before the Indonesian one is working.** Finish one, learn from it, then mirror it.
- **Do not expect results in a month.** Anyone promising that is selling something else.

---

## 11. Roadmap

### Days 1 to 30: foundation

- [ ] Merge the redesign and deploy, so the technical fixes in section 7.1 go live
- [x] Create the 1200×630 `og:image` (`assets/og-card.png`, regenerate with `tools/make-og-card.sh`)
- [ ] Verify Search Console, submit the sitemap, confirm indexing
- [ ] Set up GA4 with both conversions tracked
- [ ] Claim and fully complete the Google Business Profile
- [ ] Fix NAP consistency across site, GBP, and Instagram
- [ ] Write the four Indonesian service pages
- [ ] Rewrite the home page in Indonesian

### Days 31 to 60: first wins

- [ ] Publish `/software-house-semarang/` with genuine local content
- [ ] Publish two Tier 4 articles
- [ ] Build the case study index and publish the first case study
- [ ] First review request round to past clients
- [ ] Add `LocalBusiness` schema if a real address exists
- [ ] Add the custom 404 page
- [ ] Add internal links from every article to its service page

### Days 61 to 90: compound

- [ ] Two more city pages (Yogyakarta, Surabaya)
- [ ] Two more articles, at least one on AI implementation
- [ ] Second case study
- [ ] Begin the English tree, mirroring what works
- [ ] First monthly rank check, and prune or rewrite anything that has not indexed
- [ ] Apply the nginx gzip and caching config

### Beyond 90 days

- [ ] Two articles and one case study per month, indefinitely
- [ ] Guest articles in Indonesian tech or business publications
- [ ] Expand city pages only after Semarang holds its position
- [ ] Review the keyword table in 3.4 quarterly, with real Search Console data

---

## 12. The one thing to remember

Your competitors rank with a **page per service and a page per city**, and they have been doing it for years.

The plan above is not clever. It is the standard play, executed properly: fix the technical foundation, build one honest page per thing you actually sell, add local pages where you have a real advantage, and publish real work steadily.

The advantage you have that they do not is **AI implementation delivered by an actual engineering team**, and a market where almost nobody has claimed that position yet in Indonesian. That is the bet worth making.

# Dekorfabrik website redesign Concept

Here is a granular implementation plan derived from the redesign_plan.md. It is organised into **epics** with detailed tasks and notes on prerequisites and dependencies.

---

## **Epic 1 – Project setup & research**

**Goal:** Assemble the foundation for the redesign, align stakeholders, and gather required data.

1. **Kickoff & requirements gathering**  
   * Review the redesign report with the team; list mandatory features (upload form, pricing, FAQ, contact).  
   * Define roles: product owner, designer, developer(s), content writer, SEO specialist.  
   * Establish project timeline and tools (e.g., project management software).  
2. **Review style guide & technical stack**  
   * Study the new design system at `clc-dekorfabrik-website-230637311615.europe-west1.run.app` to understand components, typography, colour palette.  
   * Choose or confirm framework/CMS (e.g., headless CMS \+ React/Vue or static-site generator) that supports the design system and allows future expansion.  
3. **Competitive and keyword research**  
   * Perform competitor deep‑dive: map features, pricing models, calculators.  
   * Conduct German‑language keyword research focusing on long‑tail, intent‑driven phrases.  
   * Compile a glossary of compound words and industry terminology for transcreation.  
4. **Data collection**  
   * Gather all existing assets: logo, images, testimonials, pricing sheets, FAQs, case studies.  
   * Extract current site analytics to identify top‑visited sections and user behaviour.  
   * Assemble legal documentation (company registration, VAT number, terms) for Impressum.

---

## **Epic 2 – MVP: Barebone website replacement**

**Goal:** Launch a minimal but fully functional website using the new design system, replicating the current site’s core functionality to replace the old site.

### **Tasks**

1. **Information architecture and wireframes (MVP)**  
   * Define essential pages: Home, Services overview (single combined page), Pricing/Process, FAQ, Contact with file upload.  
   * Create wireframes for each page using the design system’s components.  
2. **Content preparation**  
   * Transcreate copy from the existing site for German clarity and tone.  
   * Prepare benefit statements, process descriptions, pricing overview, and basic FAQs.  
   * Obtain updated testimonials and metrics (numbers of files processed, average turnaround time).  
3. **Home page implementation**  
   * Build hero section with headline, subheading, metrics and two CTAs (Upload file / See examples).  
   * Add benefits bar with icons and short text.  
   * Implement process overview (4 steps) with icons.  
   * Display basic testimonials carousel.  
   * Include contact CTA.  
4. **Service overview page (combined)**  
   * Summarise vectorization and digitization services; highlight turnaround time and starting price.  
   * Provide a simple before/after gallery slider.  
5. **FAQ page**  
   * Convert existing FAQs into an accordion component.  
   * Include file format types, turnaround times, pricing structure.  
6. **Contact page with file upload form**  
   * Implement multi‑field upload form: name, email, phone (optional), brief description, file attachments.  
   * Add privacy/consent checkbox with link to privacy policy.  
   * Route submissions to email or CRM and send acknowledgement email.  
   * Include phone number and email contact.  
7. **Legal pages**  
   * Draft Impressum with company details, registration number and VAT ID.  
   * Provide basic privacy policy (data collection, cookies, contact form usage).  
   * Create terms of service placeholder (details can be expanded later).  
8. **Basic on‑page SEO**  
   * Set up page titles, meta descriptions, and alt text for all images.  
   * Create robots.txt allowing crawlers; add sitemap.xml.  
9. **Testing and deployment**  
   * Perform responsive testing across devices and browsers.  
   * Validate forms and file upload.  
   * Launch the MVP and redirect the domain to the new site.

---

## **Epic 3 – Service pages & pricing enhancement**

**Goal:** Expand from a combined services page to dedicated pages with detailed process and dynamic pricing tools.

1. **Detailed service pages (vectorization, stickfile digitization, AI upscaling, print‑data check)**  
   * Create separate URL for each service with in‑depth description.  
   * Add process breakdown with timeline and visuals.  
   * Insert before/after gallery specific to the service.  
2. **Dynamic pricing calculators**  
   * Research and design complexity parameters (e.g., stitch count for embroidery, number of paths for vectorisation).  
   * Develop calculators that estimate price based on user inputs (file complexity, turnaround time, add‑ons).  
   * Show a summary quote and optional extras before submission.  
3. **Portfolio galleries**  
   * Organize high‑resolution examples by service and category.  
   * Implement interactive sliders for before/after comparisons.  
4. **Service‑specific FAQs and CTAs**  
   * Expand FAQ lists for each page, including file requirements, colour profiles, revision policy.  
   * Include CTAs (“Get exact quote,” “See more examples”) aligned with page context.  
5. **Review & update legal content**  
   * Add revision policy and service scope to terms and conditions.  
6. **On‑page schema markup**  
   * Implement `Service` or `Product` schema for each page with price range and properties.

---

## **Epic 4 – Resource centre & content pipeline**

**Goal:** Establish a knowledge hub that supports buyers throughout the journey and feeds continuous content for SEO and GEO.

1. **Resource centre architecture**  
   * Define categories (Tutorials, Guides, Case studies, Freebies).  
   * Design and implement the resource centre template with filters by topic, persona and stage.  
2. **Content strategy setup**  
   * Finalize content calendar for the first six months.  
   * Identify authors and subject‑matter experts; define workflow for ideation → drafting → editing → publishing.  
3. **Template creation**  
   * Develop post templates that include a 40‑60‑word summary, headings, last updated date, author bio, and call‑to‑action.  
   * Implement `Article`, `FAQPage` and `HowTo` schema in templates.  
4. **Initial content batch**  
   * Produce at least 10 cornerstone articles covering: why manual vectorization matters, preparing files for embroidery, differences between AI and hand vectorisation, print‑ready file checklist, and case studies.  
   * Design freebies such as Figma grids or print templates; upload and gate via email opt‑in.  
5. **Content publishing & tagging**  
   * Publish articles with appropriate categories and tags.  
   * Add internal links to service pages and cross‑references to related articles.  
6. **Analytics & GEO integration**  
   * Set up event tracking (GA4, Piwik) for article views, downloads, and conversions.  
   * Introduce llms.txt to instruct AI crawlers; test schema markup in Google’s rich results tester.

---

## **Epic 5 – Customer portal & account features**

**Goal:** Improve customer experience and retention through self‑service capabilities.

1. **Account system design**  
   * Determine user roles (client, admin); plan authentication and data storage.  
   * Create wireframes for dashboard: order history, file downloads, invoice management.  
2. **Portal development**  
   * Implement login/registration flows with email verification.  
   * Integrate with upload form to save orders to the user’s account.  
   * Allow users to submit revisions, track project status, and reorder easily.  
3. **Security & compliance**  
   * Ensure strong password policies and encryption.  
   * Review GDPR implications of storing client data; update privacy policy accordingly.

---

## **Epic 6 – Marketing & lead generation**

**Goal:** Activate growth levers through lead magnets, email nurturing and partnerships.

1. **Lead magnet rollout**  
   * Identify topics for e‑books, checklists, calculators as gated content.  
   * Design landing pages with clear value propositions and double opt‑in forms.  
2. **Email marketing setup**  
   * Choose a GDPR‑compliant email service provider.  
   * Create segmented lists (industry, persona, lead stage).  
   * Write a nurture sequence introducing services, educational resources and special offers.  
3. **Retargeting & advertising**  
   * Implement tracking pixels (in compliance with cookie consent) for LinkedIn/Meta.  
   * Design and schedule remarketing campaigns for visitors who did not convert.  
4. **Partner outreach**  
   * Compile a list of design schools, print shops, and software partners.  
   * Contact them for guest posts, backlink opportunities and joint webinars/workshops.

---

## **Epic 7 – SEO & GEO optimisation**

**Goal:** Transition from basic on‑page SEO to advanced local SEO and generative engine readiness.

1. **Advanced keyword mapping**  
   * Map long‑tail keywords to specific pages and articles.  
   * Incorporate synonyms and compound words in headings, meta titles and alt text.  
2. **Structured data enrichment**  
   * Implement `Organization`, `Service`, `BreadcrumbList`, `FAQPage`, `HowTo`, and `Product` schema site‑wide.  
   * Maintain and regularly update llms.txt and robots.txt to include new AI crawlers.  
3. **Local & directory outreach**  
   * Create or update listings on German directories (DasÖrtliche, wlw.de, GelbeSeiten).  
   * Pursue guest posts on local design blogs and industry magazines for backlinks.  
4. **AI‑focused metrics & monitoring**  
   * Set up tools (e.g., Geoptie or equivalent) to track AI citation frequency and share of voice.  
   * Review metrics monthly; adjust content topics and update existing articles accordingly.  
5. **Performance improvements**  
   * Continuously monitor Core Web Vitals; address issues (image sizes, JS bundling, caching).  
   * Run A/B tests on CTAs and forms to improve conversion rates.

---

## **Epic 8 – Legal & compliance expansion**

**Goal:** Ensure the website meets all legal requirements in DACH and builds trust with visitors.

1. **Impressum & legal pages update**  
   * Expand Impressum with regulatory authority details, professional affiliations and multilingual versions.  
   * Finalise terms and conditions, revision policy, refund policy.  
2. **Privacy & cookie management**  
   * Implement a granular cookie consent banner with categories.  
   * Provide data subject rights request forms and data deletion request options.  
3. **Accessibility audit**  
   * Perform WCAG 2.2 audit; fix contrast issues, keyboard navigation, ARIA labels.  
   * Provide alt text for all images and transcripts for videos.

---

## **Epic 9 – Continuous improvement & scaling**

**Goal:** Iterate on the site based on analytics, user feedback and market changes.

1. **User feedback loops**  
   * Introduce satisfaction surveys after order completion.  
   * Monitor support queries to identify information gaps for new FAQs or content.  
2. **Quarterly content refresh**  
   * Review cornerstone articles; update data, examples and “Last updated” dates.  
   * Publish new case studies and research to stay authoritative.  
3. **New feature experimentation**  
   * Explore AI‑assisted chat for quick quote estimates.  
   * Consider multilingual expansion for English or French (with proper localization).  
   * Evaluate integration with design tools (plugins for Figma/Adobe to send files directly).  
4. **Market monitoring**  
   * Keep track of changes in SEO/GEO practices and DACH regulations; adjust accordingly.  
   * Attend industry events to network and capture emerging trends.

---

### **How to phase the work**

* **Phase 1 (Weeks 1–4):** Complete Epic 1 and start Epic 2 (pages, content, legal). The focus is to get the barebone site live with current functionality.  
* **Phase 2 (Weeks 5–10):** Launch dynamic service pages, calculators and expand SEO (Epic 3). Begin content strategy and build resource centre architecture (Epic 4).  
* **Phase 3 (Weeks 11–20):** Populate the resource centre with initial content, roll out customer portal (Epics 4 & 5). Start marketing campaigns (Epic 6).  
* **Phase 4 (Weeks 21–30):** Implement advanced SEO/GEO (Epic 7), finalise legal/compliance items (Epic 8\) and refine marketing funnels.  
* **Phase 5 (ongoing):** Continuous improvement and scaling (Epic 9); run experiments and add new features while maintaining site stability.

This structured plan ensures you replicate the old site’s core functionality quickly, then progressively enhance the website to fully realise the strategic vision while keeping it live and evolving in the background.


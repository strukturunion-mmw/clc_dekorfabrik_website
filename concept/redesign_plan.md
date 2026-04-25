# Dekorfabrik website redesign Report (2026)

## **1 Goal & target audience**

Dekorfabrik is a German vector‑art and embroidery digitization studio.  The existing website (dekorfabrik.de) uses a one‑page layout, explains the services, lists benefits (fair price, fast delivery, personal support) and provides a simple upload form .  To grow the business the site must evolve into a modern lead‑generation platform built on the new design system at `clc‑dekorfabrik‑website‑230637311615.europe-west1.run.app/`.  Key goals:

* **Primary audience** – small and medium businesses and design studios in Germany, Austria and Switzerland (DACH) who need logos and illustrations turned into clean vector files, embroidery files (Stickdateien) and print‑ready data.  
* **Business objectives** – increase qualified leads, shorten decision cycles, upsell additional services (AI upscaling, print data checks), build authority in the niche and achieve high visibility in both traditional search and AI‑generated answers.  
* **User experience objectives** – provide clear value proposition, showcase craftmanship, guide visitors through a structured journey (learn → validate → decide), remove friction (fast uploads, transparent pricing) and build trust (testimonials, portfolio, certifications).

## **2 Analysis of current site and competitive landscape**

### **2.1 Current Dekorfabrik site**

The current site offers a simple hero section explaining that Dekorfabrik creates professional embroidery and vector files.  It highlights benefits such as fast turnaround (delivery within 24 h), fair pricing and personal service .  Process steps explain that the client uploads a logo, the team digitizes/vectorizes it and sends back the file .  Pricing is transparent (from 25 € for stick files and 15 € for vectorization) and there are testimonials, a FAQ covering file formats and processing times, and a contact form.

While this one‑page layout is concise, it lacks depth for different buyer stages.  There is no blog or knowledge center, the copy is thin, and key pages (pricing, services) do not have dedicated URLs.  The visual design feels outdated compared with the new design system’s clean typography and grid.  The site also does not employ schema markup or generative‑engine optimization, and the content is static, so AI engines may not cite it.

### **2.2 Benchmarking competitors**

* **Smartpunchen.de** – offers login/registration, categories (Stickdateien, Vektorgrafiken), price calculators, a gallery of finished files and blog posts.  Their **Stich­anzahl­rechner** (stitch count calculator) and login system encourage repeat business and quoting.  
* **VectorArtConversion.com** – collects detailed information in its quote form (name, email, number of files, output format, project details, service frequency) and promises fast response .  Their multi‑step form sets client expectations and qualifies leads.  
* **Punchcloud.eu / makema.de** – include e‑commerce functionality and ready‑made motifs.  They provide user ratings and product reviews, giving social proof.

Comparing with these competitors, Dekorfabrik lacks advanced quoting features, user accounts, calculators and case studies.  The content also needs to emphasise the craftsmanship and technical expertise to justify premium pricing.

### **2.3 Insights from industry research**

Research on B2B websites and marketing in 2026 yields several relevant insights:

* **Strategic buyer journeys** – A high‑performing B2B website should be built around buyer intent rather than just menus.  Early‑stage visitors need educational content, mid‑stage prospects need validation via case studies and whitepapers, and late‑stage buyers need clarity on pricing and next steps .  The site should map pages and internal links to these stages .  
* **Trust signals** – Credibility is crucial.  The placement of client logos, testimonials with real names, case studies with measurable outcomes and certifications should be distributed near CTAs and service pages to reduce doubt .  
* **Resource centers over simple blogs** – Instead of a chronological blog, a resource center should organize content by topic, buyer stage and industry with filters, categories and varied formats .  It should include how‑to guides, tutorials, checklists, FAQs and downloadable templates.  
* **Mobile‑first and performance** – Buyers research on phones and tablets; slow loading or complex forms lead to drop‑off.  Fast load times, clean layouts and minimal forms are priority .  
* **Clear, action‑oriented CTAs** – CTAs should be specific, value‑driven and aligned with the buyer journey (e.g., “Get free vector check,” “Request quote,” “Book consultation”) .  
* **German localisation** – The DACH audience values direct communication, detailed product information and privacy.  Translating English copy is insufficient; content must be localised with cultural adaptation and compound‑word keyword research .  Long‑tail phrases with precise terminology improve discoverability .  High‑quality local backlinks and directory listings are expensive but necessary for authority .  
* **Generative engine optimization (GEO)** – AI search engines select sources that use structured data and provide fresh, in‑depth content.  Implementing schema markup for Article, Organization, FAQ, HowTo and Breadcrumb helps AI engines parse the site .  The `robots.txt` file should allow AI crawlers and an `llms.txt` file should guide models on content use .  Regularly updating cornerstone articles, publishing original research and including clear “Last updated” timestamps increase citation likelihood .  Metrics such as AI citation frequency, share of voice and AI‑referred traffic should be monitored .  
* **Content marketing pipeline** – B2B buyers complete 70 % of research before contacting sales .  A structured pipeline uses AI to assist research and outline but relies on human expertise for tone; posts should start with a concise (40‑60‑word) answer to ensure LLMs extract the correct summary .  Publishing 8–12 posts per month and creating a content library with tags for industry, persona and buyer stage can reduce costs and improve engagement .  
* **Legal compliance** – German law requires an Impressum accessible from every page.  It must include business name and structure, address, contact details, commercial register number, VAT number and regulatory authority; missing details can incur fines .  For email marketing, Germany and Austria require double opt‑in, meaning users must confirm their subscription via a confirmation link before being added .

## **3 Website architecture & user experience**

Based on the research, the new Dekorfabrik website should be organized into clear sections, each optimized for a different stage of the buyer journey.  The design should follow the new style guide (typography, color palette, grid, micro‑interactions) while emphasizing whitespace and contrast to draw attention to CTAs .  A suggested architecture includes:

### **3.1 Home/landing page**

* **Hero section** – A concise value proposition (“Hand‑drawn vectorization and embroidery digitization delivered within 24 hours”) with supporting subheading and metrics (years in business, number of files processed, starting price).  Provide two prominent CTAs: “Upload file” (primary) and “See examples” (secondary).  Use a background illustration showing a sketch transforming into a vector (see image below) to visually convey the service.  
* **Benefits bar** – Highlight key differentiators (24 h delivery, hand‑drawn quality, fair prices, personal support).  Use icons and short descriptions.  
* **Process overview** – Four steps (1 clarify requirements, 2 upload file, 3 choose format & colors, 4 approve & receive) displayed with icons and short text; link each step to detailed pages.  
* **Service teasers** – Brief summary of each service (vectorization, embroidery digitization, AI upscaling, print‑data check) with links to dedicated pages.  
* **Testimonials & case studies** – Carousel or grid of client logos, quotes, and measurable results; place these near CTAs .  
* **Journal highlights** – Feature the latest articles or tutorials to demonstrate expertise and encourage deeper exploration.

### **3.2 Service pages**

Create separate pages for each core service: **Vektorisierung**, **Stickdatei‑Digitalisierung**, **AI‑Upscaling** and **Druckdaten‑Check**.  Each page should include:

* **Detailed description** – Explain what the service entails, who benefits from it and why Dekorfabrik’s hand‑drawn approach produces better results than auto‑tracing.  Use localised German copy; avoid literal translations and incorporate common industry terms and compound keywords .  
* **Process breakdown** – Step‑by‑step guide (with timeline) and visuals or videos.  Consider adding downloadable “spec sheets” with file requirements and colour profiles.  
* **Portfolio gallery** – Before/after examples with interactive sliders to show the difference between raster and vector, or non‑digitized vs. digitized files.  
* **Pricing table** – Transparent pricing tiers based on complexity (simple logo vs. detailed illustration), file types and turnaround time; incorporate a dynamic calculator (e.g., stitch count or vector complexity estimator) inspired by Smartpunchen.  
* **FAQs** specific to the service.  
* **CTA** to upload a file or schedule a consultation.

### **3.3 Resource center (Journal & Guides)**

Replace the simple blog with a **resource center** organised by topic (Vectorisation, Embroidery, Print Design, AI & Tools), format (Tutorials, Guides, Checklists, Case studies, Freebies) and buyer stage (Learn, Validate, Decide).  Provide filters and search.  Each article should:

1. Start with a 40‑60‑word answer that summarises the main point .  This helps AI engines extract the answer for AI Overviews.  
2. Contain headings and anchor links for easy navigation.  
3. Use long‑tail German keywords and synonyms, incorporate relevant compound words, and provide examples in bullet lists.  
4. Include multimedia (diagrams, short videos, downloadable templates).  Freebies like Figma grids or print templates can build goodwill.  
5. Provide internal links to related services and external links to authoritative sources.  
6. Show “Last updated” dates and authorship with short bios to establish expertise.  
7. Apply schema markup (`Article`, `FAQPage`, `HowTo`) and include JSON‑LD code in the page header .

### **3.4 About & studio page**

Present the story of the studio in Leipzig, team bios with photos (opt‑in), mission, values and craft ethos.  Emphasize the hand‑drawn process and in‑house experts.  Provide behind‑the‑scenes images or video tours.  Include legal information (Impressum, company registration number, VAT ID) in the footer and a dedicated legal page .

### **3.5 Contact & file upload page**

The contact page should offer multiple channels: telephone, email, chat widget and a file upload form.  The form should:

* Collect necessary fields (name, company, email, phone, number of files, desired output format, project details) similar to VectorArtConversion.com  but in German.  
* Provide options for preferred communication (call, email, video consultation).  
* Offer optional login/registration for returning customers.  A customer dashboard can store previous orders, track progress and facilitate re‑orders.  
* Display a GDPR consent checkbox and double opt‑in for newsletter subscription .

### **3.6 Freebies and tools**

Provide value‑adding tools and downloads, such as:

* **Stitch count calculator** and **vector complexity estimator** – interactive calculators that give estimated pricing/time; integrate them into service pages.  
* **Templates and checklists** – e.g., print‑ready settings (CMYK, bleed, overprint), embroidery file guidelines.  
* **AI logo converter** – a small tool that cleans up AI‑generated logos and explains why additional hand‑drawn vectorization is still required; link to an article about AI limitations.

### **3.7 FAQ and legal pages**

Create a structured FAQ page answering common questions (formats accepted, processing time, costs, differences between embroidery digitizing and vectorization).  Apply `FAQPage` schema.  Provide separate pages for **Impressum**, **Datenschutz** (privacy), **AGB** (terms of service) and cookie preferences.  Ensure the Impressum includes all required details .

## **4 SEO and generative‑engine optimization**

### **4.1 Traditional & local SEO**

* **Keyword research** – Conduct German‑language keyword research focusing on long‑tail, intent‑driven phrases (e.g., “Logo vektorisieren lassen Berlin,” “Stickdatei digitalisieren lassen günstig,” “Vektorisierung Dienstleistung DACH”).  Use tools like Sistrix to analyse competitors; pay attention to compound words and synonyms .  Avoid direct translation; create transcreated copy with local idioms and technical terms .  
* **On‑page optimization** – Use keywords in page titles, meta descriptions, H1–H3 headings, image alt text and file names; include internal links with descriptive anchor text; maintain a clean URL structure (`/vektorisierung/`, `/stickdatei/`, `/journal/` etc.).  Add breadcrumbs and implement `BreadcrumbList` schema to help AI and search bots .  
* **Technical SEO** – Ensure Core Web Vitals (Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint) are within the “good” thresholds.  Optimize images with modern formats (WebP/AVIF), enable lazy loading, minify CSS/JS and implement HTTP/2 or HTTP/3.  Use a static site generator or headless CMS with caching to achieve fast load times .  
* **Local SEO & link building** – Create listings on local directories (DasÖrtliche, GelbeSeiten, wlw.de) and craft guest articles on German design and print blogs.  Acquire backlinks from universities and design communities.  Consider sponsoring design competitions to earn authoritative mentions.  For quality link building, allocate a realistic budget because local directories often charge fees .  
* **International SEO** – If expanding beyond DACH, implement hreflang tags for each language/country version and ensure correct translation/localization.

### **4.2 Generative engine optimization (GEO)**

* **Structured data & AI crawlers** – Implement comprehensive schema markup across the site.  Use `Organization` with contact details and social links; `Service` or `Product` for each offering; `Article`, `FAQPage`, `HowTo` and `BreadcrumbList` in the resource centre.  Add an `llms.txt` file at the root to instruct AI models how to cite and attribute content, and ensure `robots.txt` permits AI bots (GPTBot, ClaudeBot, PerplexityBot) .  
* **Content freshness & depth** – Regularly update cornerstone pages with new examples, updated specifications and a “Last updated” notice .  Publish original research or surveys (e.g., average price of vectorization in DACH, typical turnaround times) to provide proprietary data that AI engines value .  
* **Extractable answers** – Start articles with concise answers or definitions (40‑60 words) followed by deeper sections to help generative models cite your content .  Use bullet lists and numbered steps to structure information clearly.  
* **GEO analytics** – Track AI citation frequency, share of voice, sentiment, and AI‑referred traffic .  Evaluate which content pieces get cited by ChatGPT, Perplexity and Google AI Overviews; iterate on topics that perform well .

## **5 Content creation pipeline**

To support continuous growth and GEO, implement a hybrid AI/human content pipeline:

1. **Content strategy & ideation** – Define buyer personas (e.g., textile manufacturer, marketing agency, tattoo artist) and map their pain points across the journey (discovering vectorization, evaluating providers, selecting a partner).  Use AI tools for competitor gap analysis and keyword clustering but validate topics manually .  
2. **Topic prioritization** – Select topics based on search volume, business value and buyer stage.  Combine evergreen themes (e.g., “Vectorizing logos for screen printing”) with trending subjects (e.g., “Why AI‑generated logos need manual clean‑up”).  
3. **Content drafting** – Have writers create outlines using AI research assistance.  Writers should craft the narrative, add examples, cite authoritative sources and maintain brand voice.  The AI can generate data tables, descriptions or synonyms.  Aim for 70 % human content and 30 % AI‑assisted research to ensure quality and authenticity .  
4. **Review & compliance** – Editors review for accuracy, tone, localisation and legal compliance.  Add schema markup, metadata and images; ensure each post includes a summary, headings and FAQs.  
5. **Publication & promotion** – Publish via a headless CMS integrated with the new design system.  Tag each article by topic, persona and stage; share on LinkedIn, Instagram and design forums; invite industry partners to link back.  
6. **Measurement & optimisation** – Track SEO ranking, AI citations, engagement metrics (time on page, scroll depth), conversions and user feedback.  Use insights to refine topics and update existing articles .

## **6 Functional features & integrations**

* **File upload & quote workflow** – Build a multi‑step form that collects client requirements, auto‑calculates estimated cost via complexity metrics, offers optional extras (express delivery, editing revisions) and summarises the quote before submission.  Provide an instant chat assistant (with human fallback) to answer questions.  
* **Customer portal** – Allow clients to create accounts, save files, track project status, request revisions, download finished files and reorder services.  Provide invoice history and allow repeating similar orders.  
* **Search & filtering** – Implement a robust search bar with auto‑suggest; filter resource centre by topic, format, persona and service.  
* **Analytics & CRM integration** – Connect the site to GA4, Matomo or Piwik Pro (for GDPR), CRM (HubSpot or MailerLite) and marketing automation for segmentation.  Use tag management to track micro‑conversions (CTA clicks, downloads, video views).  
* **Accessibility & localisation** – Ensure WCAG 2.2 compliance (contrast ratios, alt text, keyboard navigation).  Offer simplified German as default; consider optional English translation.  Provide measurement units (cm, mm, pts) and DACH‑specific formats.  
* **Security & privacy** – Use HTTPS, implement Content Security Policy and regularly update dependencies.  Provide cookie consent banners with granular control.  Ensure forms implement double opt‑in for newsletter sign‑up .

## **7 Lead generation & marketing funnels**

* **Lead magnets** – Offer downloadable templates, calculators and mini‑courses (e.g., “Preparing your logo for embroidery”) in exchange for email addresses.  Use exit‑intent pop‑ups or slide‑ins with a clear value proposition.  
* **Email nurturing** – After double opt‑in, segment subscribers by industry and interest.  Send educational drip sequences: introduction to vectorization, case studies, special offers, cross‑selling AI‑upscaling.  Include call‑to‑actions directing to service pages.  
* **Retargeting & remarketing** – Use privacy‑compliant retargeting on platforms like LinkedIn and Meta to re‑engage visitors who interacted with calculators or downloads but did not convert.  
* **Partnerships & sponsorships** – Collaborate with design schools, print shops and software providers to exchange backlinks and guest posts.  Sponsor webinars or workshops on digital design to build authority.

## **8 Legal compliance & trust**

* **Impressum & legal pages** – Provide a comprehensive Impressum with company name and legal structure, address, contact details, commercial register number, VAT ID, professional affiliations and regulatory authority information .  Make it accessible from every page and include an English version for international visitors.  
* **Data protection** – Publish a privacy policy detailing data collection, use of analytics and cookies, and third‑party processors.  Provide a cookie preferences centre.  Implement double opt‑in for newsletters .  Offer Data Processing Agreements for B2B clients if necessary.  
* **Terms & conditions** – Outline scope of services, turnaround times, revision policy, payment terms, copyright ownership and liability limitations.  Ensure translations match the German legal text.  
* **Accessibility & non‑discrimination** – Provide alt text for images, transcripts for videos and accessible forms.  Avoid discriminatory content or assumptions; design inclusive features (e.g., color‑blind safe palettes).  Allow anonymous browsing without forced registration.

## **9 Implementation roadmap**

1. **Discovery & strategy (Weeks 1–2)**  
   * Audit current site and analytics; identify high‑performing pages and keywords.  
   * Define buyer personas, content themes and KPIs.  
   * Review the new style guide and create mood boards.  
2. **Information architecture & wireframes (Weeks 2–4)**  
   * Map site structure (pages, categories, resource centre) based on buyer journey.  
   * Create wireframes for key templates (home, service pages, article, calculator).  
   * Plan navigation, breadcrumbs and internal linking.  
3. **Content development (Weeks 4–12)**  
   * Conduct keyword research and topic ideation.  
   * Write/translate/transcreate page copy and draft 20–30 initial resources.  
   * Develop calculators, templates and freebies.  
4. **Design & front‑end development (Weeks 4–12)**  
   * Implement UI components in the new design system (colors, typography, buttons, forms, cards).  
   * Ensure mobile‑first responsive layouts and micro‑interactions.  
   * Integrate with CMS, forms, file upload service and CRM.  
5. **Technical SEO & GEO implementation (Weeks 8–14)**  
   * Generate schema markup, `sitemap.xml`, `robots.txt` and `llms.txt` files .  
   * Set up analytics, event tracking and GEO monitoring tools.  
   * Test site speed and fix issues.  
6. **Legal & compliance (Weeks 8–14)**  
   * Draft Impressum, privacy policy, T\&C; review with legal counsel .  
   * Implement cookie consent banner and double opt‑in flows .  
7. **Testing & launch (Weeks 14–16)**  
   * Conduct accessibility tests (WCAG), cross‑browser and device testing.  
   * Perform A/B tests on CTAs and forms .  
   * Soft launch to selected clients; gather feedback and adjust.  
8. **Post‑launch & continuous improvement (ongoing)**  
   * Monitor SEO, GEO and analytics metrics; update content regularly .  
   * Expand resource centre and freebies; run new campaigns and tests.


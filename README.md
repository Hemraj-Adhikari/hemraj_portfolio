# Hemraj Adhikari · Portfolio

Personal website of **Hemraj Adhikari**, full-stack developer and Head of IT in Kathmandu, Nepal.

I build CRM platforms and internal tools with Next.js, NestJS and PostgreSQL, and run the AWS infrastructure under them. Right now I lead the CRM rebuild at Route2Uni International Group and manage a CRM and staff-compliance portal for Dreams Care Homes in the UK.

**Live site:** [hemrajadhikari.info.np](https://hemrajadhikari.info.np) · **LinkedIn:** [in/hemrajadhikariy](https://www.linkedin.com/in/hemrajadhikariy/) · **CV:** [PDF](https://hemrajadhikari.info.np/CV-Hemraj%20Adhikari.pdf)

![Hemraj Adhikari](assets/img/og-image.jpg)

## Pages

| Page | What is on it |
|---|---|
| [`index.html`](https://hemrajadhikari.info.np/) | Home: introduction, services, selected projects, career timeline, certificates, education, contact |
| [`about.html`](https://hemrajadhikari.info.np/about.html) | Background, how I work, photos and a short clip from a talk |
| [`services.html`](https://hemrajadhikari.info.np/services.html) | CRM and internal tools, web apps, cloud and DevOps, IT setup, security review, reporting |
| [`projects.html`](https://hemrajadhikari.info.np/projects.html) | 14 projects with a details panel for each one |
| [`experience.html`](https://hemrajadhikari.info.np/experience.html) | Roles since 2023 and the skills I use at work |
| [`education.html`](https://hemrajadhikari.info.np/education.html) | BSc CSIT, BIT and +2 Computer Science |
| [`credentials.html`](https://hemrajadhikari.info.np/credentials.html) | 7 professional certificates and 37 course certificates, each with a Coursera verification link |
| [`contact.html`](https://hemrajadhikari.info.np/contact.html) | Contact form, email, WhatsApp and FAQ |
| [`resume.html`](https://hemrajadhikari.info.np/resume.html) | One-page resume, same content as the PDF CV |
| `blog.html`, `blog-*.html` | Articles for people starting in IT in Nepal |

## Selected projects

- **Route2Uni CRM**: student pipeline from enquiry to visa for 50+ staff and 30+ partners, now being rebuilt on Next.js, NestJS, PostgreSQL, Prisma, Redis and AWS.
- **Dreams Care Homes CRM** (UK): right-to-work, visa sponsorship and DBS expiry tracking with an audit log. I lead the roadmap and the build.
- **Hajiri HR and Attendance**: attendance, leave and approvals for Route2Uni, with Bikram Sambat and AD dates.
- **Kaam Khoj**: free app that helps daily-wage workers find nearby jobs and call employers directly.
- **Slotly**: booking app and web app any business can use.
- **Partner Bulk Messaging**: WhatsApp and email outreach to partner agents for the B2B team.

## How the site is built

Plain HTML, CSS and JavaScript. No framework, no build step and no tracking. GitHub Pages serves it straight from this repository, with the custom domain in `CNAME`.

```
index.html, about.html, ...   one file per page
assets/css/portfolio.css      styles for the main pages (light and dark mode)
assets/js/portfolio.js        project and certificate data, menu, search, project panel,
                              certificate viewer, contact form
assets/css/site.css           styles for the blog and older pages
assets/img/                   photos (me/), certificates (courses/), icons, social image
CV-Hemraj Adhikari.pdf        the CV every "Download CV" button links to
sitemap.xml, robots.txt       for search engines
```

Each main page has its own title, description, Open Graph tags and schema.org data (Person, WebPage, BreadcrumbList) so it shows up properly in Google and when shared on LinkedIn or WhatsApp.

## Updating

- **Text:** edit the page's `.html` file.
- **Projects:** edit the `PROJECTS` list near the top of `assets/js/portfolio.js`. Extra details for the project panel live in `DETAIL` in the same file.
- **Certificates:** professional certificates are in `CERTS`, course certificates in `COURSES` (title, programme, date, Coursera verify code). Put the image in `assets/img/courses/` named after the verify code in lowercase, as `code.webp` and `code-sm.webp`.
- **CV:** replace `CV-Hemraj Adhikari.pdf` with a new file of the same name.
- **After changing CSS or JS:** raise the `?v=` number in the `<link>` and `<script>` tags so browsers load the new file.

## Contact

hemrajhadhikari@gmail.com · +977 986-5802093 · Kathmandu, Nepal

© 2026 Hemraj Adhikari

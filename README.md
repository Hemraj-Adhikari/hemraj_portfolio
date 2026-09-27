# hemrajadhikari.info.np

Personal website of **Hemraj Adhikari**: Head of IT at Route 2 Uni International Group, Project Manager for Dreams Care Homes (UK), iOS Developer Intern at Apple and full-stack developer, based in Kathmandu, Nepal.

**Live site:** https://hemrajadhikari.info.np · **LinkedIn:** https://www.linkedin.com/in/hemrajadhikariy/

![Hemraj Adhikari](assets/img/og-image.jpg)

## Pages

| File | Content |
|---|---|
| `index.html` | Introduction, current roles, certifications, latest posts |
| `about.html` | Background and how I work |
| `experience.html` | Roles from 2021 to now, with skills |
| `projects.html` | CRM and internal-tool project cards, and the list of client websites |
| `credentials.html` | Google and IBM professional certificates (with Coursera verification links), other courses, education |
| `services.html`, `clients.html`, `contact.html` | Freelance services, organisations, contact form |
| `blog.html`, `blog-*.html`, `it-freelance-blog.html` | Articles for people starting in IT in Nepal |

## How it is built

Plain HTML and CSS with one small JavaScript file. No framework, no build step, no tracking. GitHub Pages serves it straight from this repository (custom domain in `CNAME`).

```
assets/css/site.css   the only stylesheet
assets/js/site.js     mobile menu, filters, image preview, contact form, role durations
assets/fonts/         Manrope (SIL Open Font License)
assets/img/           photos and certificates (WebP), icons, social image
```

## Updating

- **Text:** edit the page's `.html` file.
- **New certificate:** copy one `<article class="cert-full">` block in `credentials.html`, change the text, image and Coursera link. Add the image to `assets/img/` as WebP.
- **CV:** replace `CV-Hemraj Adhikari.pdf` in the root with a new file of the same name. Every "Download CV" button downloads that file directly.
- **New website:** add a `<tr>` to the table in `projects.html` (`data-tags` controls the filter buttons).
- **After changing CSS or JS:** change the `?v=` value in the `<link>` and `<script>` tags so browsers load the new file.

## Contact

hemrajhadhikari@gmail.com · +977 986-5802093

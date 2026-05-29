# International Student Hub

> ⚠️ **Preview / work-in-progress.** This is an early preview version of the International
> Student Hub portal, **co-designed by the [Time to Thrive Research Group](https://www.ualberta.ca/)**.
> Content is placeholder or drawn from public University of Alberta sources for demonstration
> purposes, and the design is still being refined.

A single, friendly starting point that helps international students at the University of
Alberta find the information and services they need — without having to hunt across dozens
of separate university websites.

## About the hub

International students juggle a lot at once: immigration paperwork, academics, settling in,
staying well, and finding their community. The Student Hub brings the most relevant
information into one place, organised around the things students actually look for:

- **Mental Health** — wellbeing and personal support
- **Immigration** — study/work permits, visas, and newcomer guidance
- **Academic Resources** — tutoring, advising, and learning supports
- **Campus Life** — housing, dining, and everyday campus living
- **Student Groups** — clubs, communities, and cultural connection
- **Events & Workshops** — what's happening on and around campus
- **Job Opportunities** — career fairs, hiring, and work experience
- **Campus Map** — finding your way around

It also surfaces the **latest announcements** so students don't miss time-sensitive notices.

## What's in this preview

| Page | Purpose |
|------|---------|
| **Home** (`index.html`) | Landing page: category grid, quick access, latest announcements, upcoming events |
| **Announcements** (`announcements.html`) | Full, searchable, filterable list of notices (Immigration · Academic · Wellness · Campus Life) |

## Tech stack

- [Jekyll](https://jekyllrb.com/) static site generator (Liquid templates)
- Content managed as JSON data files in [`_data/`](_data/)
- Plain CSS design system (no framework), responsive down to mobile
- Inline SVG icon set
- Deployed via **GitHub Actions** to **GitHub Pages**

## Run it locally

This project needs **Ruby 3+** and Bundler. macOS ships with an old system Ruby, so use the
Homebrew Ruby. Open the **Terminal** (default shell: **zsh**) and run:

```bash
# 1. Install Homebrew Ruby (one time, if you don't have it)
brew install ruby

# 2. Put Homebrew Ruby ahead of the system Ruby for this session
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"

# 3. Go to the project folder
cd ~/Desktop/student-hub/international-student-hub

# 4. Install the gems (one time, or after Gemfile changes)
bundle install

# 5. Build and serve with live reload
bundle exec jekyll serve --livereload
```

Then open **http://localhost:4000/international-student-hub/** in your browser.

> The site uses a `baseurl` of `/international-student-hub`, so the local URL **includes that
> path** — `http://localhost:4000/` alone will show "Not Found". Always use the full URL above.

To make the Homebrew Ruby permanent (so you can skip step 2 next time), add it to your shell
profile once:

```bash
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
```

Stop the server with **Ctrl+C**.

## Project structure

```
international-student-hub/
├── _config.yml             # Site settings (title, baseurl, build options)
├── index.html              # Home page
├── announcements.html      # Announcements page
├── _layouts/
│   └── default.html        # Shared HTML shell (head, header, footer)
├── _includes/
│   ├── header.html         # Top navigation + brand
│   ├── footer.html         # Footer links + social
│   └── icon.html           # Inline SVG icon set
├── _data/
│   ├── announcements.json  # All announcements
│   ├── categories.json     # Home category cards
│   ├── events.json         # Upcoming events
│   └── quick_access.json   # Quick-access links
└── assets/
    ├── css/style.css       # Design system & page styles
    ├── js/announcements.js # Filter + search on the announcements page
    └── img/                # Logo, favicon, hero artwork
```

## Editing content

Most content lives in [`_data/`](_data/) — edit the JSON files and rebuild; no HTML changes
needed. For example, each announcement looks like:

```json
{
  "title": "Announcement title",
  "blurb": "One-line summary shown under the title.",
  "date": "May 5, 2026",
  "datetime": "2026-05-05",
  "category": "immigration",      // immigration | academic | wellness | campus-life
  "pinned": false,                // true floats it to the top with a badge
  "url": "https://example.com/full-story"
}
```

## Deployment

Pushing to the `main` branch triggers the GitHub Actions workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and
publishes it to GitHub Pages.

**One-time setup:** in the GitHub repo, go to **Settings → Pages → Build and deployment →
Source = GitHub Actions**.

Live site: **https://timetothrivewebpage.github.io/international-student-hub/**

## Credits

Co-designed by the **Time to Thrive Research Group**, University of Alberta. This preview is
for demonstration and feedback; content and features are subject to change.

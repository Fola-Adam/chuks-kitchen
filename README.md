# Chuks Kitchen — Frontend Developer Intern Deliverable

**Program:** Trueminds Innovations Internship  
**Duration:** Feb 13 – Feb 27, 2026
**Name:** Agbalaya Adam Abdullahi
**Role:** Frontend Developer  

---

## What Is This?

This is a responsive multi-page frontend for **Chuks Kitchen** — a Nigerian home cooking food ordering business. The brief was simple: take the Figma designs the UI/UX team built, and turn them into actual working webpages. No backend, no APIs, no authentication. Just HTML, CSS, and enough JavaScript to make a hamburger menu work.

Five screens. Two weeks. One developer who learned a lot of things the hard way.

---

## Pages Built

| Page | File | What It Does |
|------|------|--------------|
| Landing Page | `index.html` | The first impression. Hero image, feature cards, CTAs |
| Sign In | `signin.html` | Login form with validation and social login buttons |
| Sign Up | `signup.html` | Registration with phone, confirm password, terms checkbox |
| Home | `home.html` | Dashboard with hero, search bar, food categories, Chef's Specials |
| Explore | `explore.html` | Full menu broken into sections with a dropdown category filter |

---

## Tech Stack

No frameworks. No libraries. Nothing fancy.

- **HTML5** — semantic tags where appropriate (`nav`, `main`, `section`, `footer`)
- **CSS3** — Flexbox, Grid, custom properties, media queries. Mobile-first throughout
- **Vanilla JavaScript** — hamburger menu toggle and back-to-top button. That's genuinely all the JS on this project
- **Remix Icon** — icon library via CDN. Learned the hard way that forgetting the CDN link means the icons just... don't show up. No error. Nothing. Just silence.
- **Google Fonts** — Island Moments for the brand logo only
- **Inter** — system font for body text. Already installed on most devices, so no import needed. Small win for performance.

---

## File Structure

```
project/
├── index.html
├── signin.html
├── signup.html
├── home.html
├── explore.html
├── README.md
│
├── css/
│   ├── styles.css      # Global variables, shared components, animations
│   ├── auth.css        # Auth pages (imports styles.css)
│   ├── home.css        # Home page (imports styles.css)
│   └── explore.css     # Explore page (imports home.css → styles.css)
│
├── js/
│   ├── home.js
│   └── explore.js
│
└── images/
```

The CSS import chain is as follows: `explore.css → home.css → styles.css`. Shared styles flow down automatically, so there's no duplication of variables or base components.

---

## How to Run

No setup. No installs. No terminal commands.

1. Download or unzip the project folder
2. Open `index.html` in a browser
3. Or use VS Code Live Server if you want hot reload

Intended user flow:  
**Landing Page → Sign In / Sign Up → Home → Explore**

---

## Design Decisions & Assumptions

- **Auth layout** — left panel is a full-bleed image with a semi-transparent orange overlay, right panel is the form. The overlay uses `rgba` directly on `background-colour` rather than the `opacity` property — because `opacity` affects child elements too and would make the text transparent. Took a minute to figure that one out.
- **Search bar overlap** — the search bar on the home page sits half on the hero image and half below it. Achieved with `margin-top: -28px` and `z-index: 10`. Looks intentional. Is intentional.
- **Form submissions** — there's no backend so forms use `onsubmit="window.location.href='home.html'; return false"` to simulate a successful login. It works for demonstration purposes.
- **Footer duplication** — the footer HTML is copy-pasted across all 5 files because pure HTML has no templating. Not ideal, but it's the reality of the constraint.
- **Food images** — filenames in the HTML match the files in the `images/` folder. If anything doesn't load, check that the filename casing matches exactly — servers are case-sensitive even if Windows isn't.
- **Prices** — made up but realistic. Based on actual Nigerian naira pricing for the described food types.

---

## Known Issues

- `: has()` CSS selector used for input validation styling isn't supported in older Firefox versions. Native `required` attribute validation still works — just without the green/red border feedback.
- Hamburger menu doesn't close when clicking outside it. Clicking a nav link closes it; clicking randomly on the page does not. Would need one more event listener to fix.
- Global class names like `primary-btn`, `navbar`, and `hero-logo` are defined in `styles.css` and imported everywhere. This caused some unintended style leaking between pages that had to be manually overridden. Works fine at this scale, would be a real problem on a larger project.
- Some food images are placeholders. Drop real images into the `images/` folder with matching filenames, and they'll load automatically.

---

## What I'd Add With More Time

- The food detail screen (visible in the Figma designs — protein options, extra sides, special instructions form)
- A working cart with item count in the navbar
- Custom JavaScript form validation with proper inline error messages instead of browser default tooltips
- Refactor navbar and footer into reusable components, so I'm not copy-pasting HTML across 5 files
- Better tablet responsiveness — the 768px breakpoint jumps straight from mobile to desktop, the range in between is a bit awkward on some devices

---

## Reflections — The Honest Part

I'm not going to pretend this was smooth sailing. It wasn't. But it also wasn't as bad as it could have been — and I came out genuinely better at this than when I went in. Here's the unfiltered version.

**Things that wasted time and taught me something:**

The Remix Icons disappearing act. I spent an embarrassing amount of time staring at empty spaces where icons should have been, refreshing the page like that was going to help, before I realised I had simply forgotten to paste the CDN link into the new HTML file. The browser doesn't throw an error. It just shows nothing and lets you suffer. Lesson: Every new HTML file needs its `<head>` fully set up before you write a single line of content.

`opacity: 75%`. Not valid CSS. `opacity` takes a number between 0 and 1, not a percentage. The browser silently ignored it and I ended up with a solid orange wall instead of a see-through overlay. Silent failures in CSS are genuinely evil — at least JavaScript throws an error and tells you what went wrong.

`font-weight: 400px`. Units on a property that doesn't take units. Same silent failure. Browser shrugs and moves on. You just have to know.

Hiding `.primary-btn` on mobile to hide the navbar Login button — then wondering why every other button on the page also disappeared. Add to Cart, the hero button, all of them. Gone. Because they all shared the same class. Had to go back and explicitly restore each one with more specific selectors. CSS specificity is humbling.

**Things that actually clicked:**

Once z-index and positioning made sense — like actually made sense, not just "throw z-index: 999 at it and hope" — the whole overlay system became obvious. The image is layer 0, the colour overlay is layer 1, the text is layer 2. It's literally just paper on a desk. Once you see it that way, it never leaves you.

Mobile-first was uncomfortable at first because I kept wanting to style what I could see on my big screen. But starting mobile and adding complexity for larger screens via media queries produces cleaner CSS. It forces you to decide what's essential before you think about what's decorative.

The CSS import chain (`explore.css → home.css → styles.css`) clicked about halfway through and made the whole thing feel organised. One change to a variable in `styles.css` updates everywhere. That's the closest thing to a satisfying moment in vanilla CSS.

**Overall:** I'm proud of what got built. It's not perfect — there are rough edges I can see clearly — but it's real, it's responsive, and it works. The gaps I have now are gaps I can actually name, which is more than I could say two weeks ago.

---

*Built with HTML, CSS, and an ungodly amount of browser refreshes. Submitted to Trueminds Innovations, February 2026.*

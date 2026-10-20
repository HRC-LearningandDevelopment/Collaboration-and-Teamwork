# Collaboration and Teamwork: Every Piece Matters

A self-paced e-learning course for ATLs, Team Leaders, AMs, and Managers, converted from the *Collaboration & Teamwork* self-paced module. Plain HTML, CSS, and JavaScript: no build step, no framework, no backend, no login. Visual system and course engine match *Managing Change: From Resistance to Readiness* and *Planning and Prioritising for Results*.

## Deploy to GitHub Pages

1. Create the repository on GitHub (for example, `Collaboration_Teamwork`).
2. Upload **everything in this folder** to the root of the repository, keeping the folder structure. Include the empty `.nojekyll` file (it stops GitHub from processing the site with Jekyll).
3. In the repository, go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, and save.
4. The course will be live at `https://hrc-learninganddevelopment.github.io/<repo-name>/` within a minute or two.

## Cache-busting: bump `?v=N` on every update

Every CSS and JS file is loaded in `index.html` with a version suffix, for example `js/app.js?v=1`. Whenever you change any file, increase the number on every tag in `index.html`:

```
sed -i 's/?v=1"/?v=2"/g' index.html
```

## What's where

| Path | Contents |
| --- | --- |
| `index.html` | Page shell and asset tags |
| `js/config.js` | Storage key (no videos in this course) |
| `js/content-core.js` | Titles, welcome text, roles, functions, the four profile scenarios and casts, and shared pieces (crossword, concept cards) |
| `js/content-foundation.js` | Part 1 (all profiles): Every piece matters; What kind of team player are you? |
| `js/content-tl.js` | Stronger Together path (ATLs and TLs) |
| `js/content-mgr.js` | Leading Connected Teams path (AMs and Managers) |
| `js/content-final.js` | 10-question final check (4 shared + 6 per role) |
| `js/app.js` | Course engine: navigation, activity types, progress, timer, certificate, PDF |
| `css/styles.css` | Brand styles; additions for this course are at the end of the file |
| `fonts/`, `img/`, `vendor/` | Proxima Nova, HealthRecon Connect logos and hero artwork, PDF library |

## Course structure and tailoring

On the welcome screen, learners choose their **role** (ATL or Team Leader / AM or Manager) and their **function** (Operations / Support functions such as QA, Training, HR, IT, WFM, MIS, Solutions, and Finance). That creates four versions, each with one running scenario and a recurring cast:

| Profile | Scenario | Cast |
| --- | --- | --- |
| ATL/TL, Operations | *Month-end crunch*: claims team 1,200 behind, payer rule change, QA error spike | Priya, Carlo, Bea, Marco (ATL), Joy (QA), Asha (peer TL) |
| ATL/TL, Support | *The new-hire wave*: 80 new hires go live Monday; access, HR list changes, Training tests | Ana, Ramon, Lia, Paolo (ATL), Rina (HR), Kevin (peer TL) |
| AM/Manager, Operations | *The unapplied-cash escalation*: Posting vs AR blame, Quality's missed warning | Nisha (peer Manager), Leo, Dana, Mara (Quality), Ken (MIS), the client |
| AM/Manager, Support | *The onboarding breakdown*: HR, IT, and Training blame each other for idle new hires | Carmela (peer Manager), Chris, Dana, Paul (Training), Ken (WFM), the Ops Director |

- **Part 1: the foundation (all profiles).** The missing line (story warm-up), word search, skills preview (accordion); team-player self-assessment, flip cards, reflection, drag-and-drop sort.
- **Part 2: your path.** Four skill modules (psychological safety, conflict, mutual support, networks) and a capstone: branching scenario, quiz-board review game, the missing piece, and an action plan built from the learner's own answers.
- **Wrap-up.** 10-question final check (80% to pass, retakes allowed), certificate (PNG), and a PDF of every answer, including the action plan.

### Activity types

Branching scenario (`sim`), drag-and-drop sort (`bucket`), drag to rearrange (`sequence`), connect the dots (`match`), scavenger hunt (`hotspot`), flip cards (`flip`), collapse and expand (`accordion`), crossword (`crossword`), word search (`wordsearch`), quiz-board game (`jeopardy`), self-assessment (`styleassess`), rewrite with model answer (`rewrite`), network map (`netmap`), story warm-up (`story`), recognition message (`appreciate`), and action plan (`plan`).

The self-assessment shows options in a random order for each learner and states that no option is better than another, so learners answer honestly rather than picking the "ideal" answer.

### How to edit tailored content

Any value can be wrapped in `V({...})` with variant keys. The most specific match wins: `tl_ops`, `tl_sup`, `mgr_ops`, `mgr_sup`, then `ops` / `sup`, then `tl` / `mgr`, then `all`. If you add an Operations variant, add the Support one too, or that profile falls back to the Operations wording.

To change the crossword, edit `CT_SHARED.crossword` in `content-core.js`. Each word needs its row, column, and direction; the grid must stay connected and words may only cross on matching letters. The word search grid is generated automatically from the word list.

## Copy and paste

Copy, cut, paste, and drag-and-drop text are turned off across the course, and course text can't be selected. Learners see a short message asking them to type answers in their own words. This discourages pasting AI-written answers, but it isn't a security control: a determined learner can still get around it.

## Progress and data

Progress, answers, and time are saved in the learner's browser (`localStorage`) on every interaction. Nothing is sent anywhere. Progress is tied to one browser on one device; learners can download their PDF as a record. A "Reset my progress" link sits at the bottom of the menu.

## Fonts

Proxima Nova is a commercial typeface. Publishing the font files on a public GitHub Pages site makes them downloadable by anyone, so confirm your license covers web embedding on a public site.

## Content governance

Scenarios are de-identified and illustrative. Framework credits: team-player styles (Glenn Parker), the Thomas-Kilmann conflict modes, psychological safety (Amy Edmondson; Google's Project Aristotle), and leadership networks (Herminia Ibarra). DIAL is the course's own conversation framework.

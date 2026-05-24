# Ethics Revision App

A Loughborough University themed revision app for `25COP928 Professionalism, Ethics & Cyber Security`.

It includes topic hubs, flashcards, quizzes, case studies, exam practice, full mock papers, examiner traps, a 90%+ strategy hub, an interactive mindmap, podcasts, slide decks, PDFs, and MP4 revision videos.

## Requirements

- Node.js 20 or newer
- npm, included with Node.js

## Run Locally

Clone the repository:

```bash
git clone https://github.com/rayhanpatel88/ethics-revision-app.git
cd ethics-revision-app
```

Install the exact dependency versions from the lockfile:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite. It is usually:

```text
http://localhost:5173/
```

If port `5173` is already in use, Vite will print another local URL such as `http://localhost:5174/`.

To make it available on your local network:

```bash
npm run dev -- --host 0.0.0.0
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Then open the URL printed by Vite Preview, usually:

```text
http://localhost:4173/
```

## Local Hosting Checklist

For a fresh machine, this complete sequence should work:

```bash
git clone https://github.com/rayhanpatel88/ethics-revision-app.git
cd ethics-revision-app
npm ci
npm run build
npm run dev
```

Use `npm run preview` instead of `npm run dev` if you want to serve the already-built production version from `dist/`.

## Troubleshooting

- If `npm ci` fails, check that Node.js is version 20 or newer with `node -v`.
- If the browser shows a blank page, stop the dev server and run `npm run build` to reveal TypeScript or bundling errors.
- If the port is busy, use the alternate URL Vite prints in the terminal.
- If media resources do not load, make sure the `public/podcasts` and `public/resources` folders are present after cloning.

## Main Sections

- `Dashboard`: progress overview and readiness score
- `Mastery Map`: topic and flashcard mastery by week
- `Mindmap`: interactive topic map, podcasts, slide decks, PDFs, and videos
- `Topic Hubs`: core examinable content by week
- `Flashcards`: base and expanded revision deck
- `Quiz`: multiple-choice scenario practice
- `Exam Practice`: source-paper style questions
- `Mock Exams`: full exam-style papers
- `90%+ Strategy`: command words, answer templates, issue spotting, self-grading, and cram mode
- `Hard Mode`: timed high-pressure recall
- `Examiner Traps`: common mistakes and high-mark corrections

## Media Resources

Large media files are stored under:

```text
public/podcasts
public/resources
```

These are served directly by Vite. The repository is therefore large, because it includes local podcast, slide deck, PDF, and MP4 resources needed by the Mindmap library.

## Useful Commands

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

The app stores revision progress in browser `localStorage`, so progress is per browser/device.

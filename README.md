# Ethics Revision App

A Loughborough University themed revision app for `25COP928 Professionalism, Ethics & Cyber Security`.

It includes topic hubs, flashcards, quizzes, case studies, exam practice, full mock papers, examiner traps, a 90%+ strategy hub, an interactive mindmap, podcasts, slide decks, PDFs, and MP4 revision videos.

## Requirements

- Node.js 20 or newer
- npm

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173/
```

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

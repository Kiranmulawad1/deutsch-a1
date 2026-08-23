# Deutsch A1 Trainer

An offline-capable, installable German A1 study app — grammar, vocabulary with
spaced repetition, listening, and Goethe-Zertifikat A1 mock exams.

No account, no server, no network calls at runtime. Everything ships in the
bundle and runs on a phone in airplane mode.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview    # http://localhost:4173
```

## Put it on your phone

The service worker and manifest only work over HTTPS (or `localhost`), so
deploy the `dist/` folder to any static host:

```bash
npm run build
npx vercel deploy --prod dist      # or: npx netlify deploy --prod --dir dist
```

Then on your phone:

- **iOS Safari** — open the URL → Share → *Add to Home Screen*
- **Android Chrome** — open the URL → menu → *Install app*

It gets its own icon, opens full-screen with no browser chrome, and works
offline from then on.

To try it on your phone over local Wi-Fi without deploying:

```bash
npm run dev -- --host      # then open the Network URL shown
```

Note that iOS will not install a PWA from a plain-HTTP address — local Wi-Fi is
fine for previewing, but installing needs a real HTTPS deploy.

## What's inside

| Area | Content |
|---|---|
| Grammar | 8 chapters, 40 topics, 62 authored questions |
| Vocabulary | 629 words (258 nouns with articles + plurals), SM-2 spaced repetition |
| Exercises | multiple choice, type-in, gender drill, conjugation table, sentence builder, case picker, dictation |
| Exams | 2 full Goethe A1 mocks — Hören, Lesen, Schreiben, Sprechen, timed, 60 % pass mark |

### Source layout

```
src/
  data/grammar.js   40 topics, extracted verbatim from the original DeutschA1.jsx
  data/vocab.js     629-word list as editable tuples
  data/exams.js     2 mock exams
  lib/srs.js        SM-2 lite scheduler
  lib/generate.js   turns data into exercises; German conjugation rules
  lib/speech.js     Web Speech wrapper, German-voice detection
  lib/storage.js    versioned localStorage, export/import
  lib/text.js       forgiving answer matching (ss/ae/oe/ue, case, punctuation)
  components/       Exercise.jsx (all exercise types) + ui.jsx
  screens/          Home, Grammar, Vocab, Exams, Settings
```

## Adding vocabulary

`src/data/vocab.js` is a list of tuples:

```js
["Buch", "book", "das", "Bücher", "noun", "Das Buch ist gut.", "The book is good.", 8, "thing study"]
//  de     en      article  plural   type    example DE          example EN        chapter  tags
```

Append a row and it enters the review rotation automatically. Duplicates of the
same word *in the same role* are dropped; genuine homographs (`sein` = "to be"
vs "his") are kept as separate cards because they differ in `type`.

## Audio

Speech uses the browser's built-in `speechSynthesis` — free, no key, and offline
on most phones. **If the device has no German voice installed, every audio
control hides itself** rather than reading German aloud in an English voice.

- iOS: Settings → Accessibility → Spoken Content → Voices → add *Deutsch*
- Android: Settings → Accessibility → Text-to-speech → install the German pack

Speed is adjustable under *Mehr* (0.6× is worth using early on).

## Your progress

Kept in `localStorage` under one versioned key, and it is **only in that
browser**. Clearing site data erases it.

*Mehr → Exportieren* writes a JSON backup; *Importieren* restores it. Worth
doing every few weeks.

## Deliberate non-goals

No accounts, no cloud sync, no analytics, no paid APIs, no LLM calls, no
TypeScript, no CSS framework. The app is a static bundle and nothing it does
leaves your device.

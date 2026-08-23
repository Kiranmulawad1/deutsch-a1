/* SM-2 lite. One card per vocabulary word.
   Grades: 0 Again · 1 Hard · 2 Good · 3 Easy */

export const AGAIN = 0, HARD = 1, GOOD = 2, EASY = 3;
export const GRADES = [
  { g: AGAIN, label: "Again", hint: "no idea" },
  { g: HARD,  label: "Hard",  hint: "barely" },
  { g: GOOD,  label: "Good",  hint: "got it" },
  { g: EASY,  label: "Easy",  hint: "instant" },
];

const EASE_MIN = 1.3, EASE_MAX = 3.0;
const clampEase = (e) => Math.max(EASE_MIN, Math.min(EASE_MAX, e));

export const today = () => new Date().toISOString().slice(0, 10);

const addDays = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + Math.round(days));
  return d.toISOString().slice(0, 10);
};

export function newCard() {
  return { ease: 2.5, interval: 0, reps: 0, due: today(), lapses: 0 };
}

export function schedule(card, grade) {
  const c = card ? { ...card } : newCard();

  if (grade === AGAIN) {
    // Reset — the word comes back in this same session's relearn queue.
    return { ...c, ease: clampEase(c.ease - 0.2), interval: 0, reps: 0,
             due: today(), lapses: c.lapses + 1 };
  }

  let ease = c.ease;
  if (grade === HARD) ease = clampEase(ease - 0.15);
  if (grade === EASY) ease = clampEase(ease + 0.15);

  let interval;
  if (c.reps === 0) interval = 1;          // first success: tomorrow
  else if (c.reps === 1) interval = 3;     // second success: three days
  else if (grade === HARD) interval = c.interval * 1.2;
  else if (grade === EASY) interval = c.interval * ease * 1.3;
  else interval = c.interval * ease;

  interval = Math.max(1, Math.min(interval, 365));
  return { ...c, ease, interval, reps: c.reps + 1, due: addDays(interval) };
}

export function isDue(card) {
  return !card || card.due <= today();
}

/* The day's queue: everything due, plus up to `newPerDay` unseen words. */
export function buildQueue(words, cards, newPerDay) {
  const due = [], fresh = [];
  for (const w of words) {
    const c = cards[w.id];
    if (!c) fresh.push(w);
    else if (c.due <= today()) due.push(w);
  }
  return [...due, ...fresh.slice(0, newPerDay)];
}

export function dueCount(words, cards, newPerDay) {
  return buildQueue(words, cards, newPerDay).length;
}

export function bumpStreak(streak) {
  const t = today();
  if (streak.last === t) return streak;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  return { count: streak.last === y ? streak.count + 1 : 1, last: t };
}

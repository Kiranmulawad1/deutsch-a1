/* Single versioned localStorage key, behind a swappable module.
   Every read and write is guarded: Safari private mode throws on access. */

const KEY = "deutsch-a1:v1";

const EMPTY = {
  version: 1,
  best: {},        // { [chapterNumber|"final"]: ratio }
  cards: {},       // { [wordId]: { ease, interval, reps, due, lapses } }
  exams: [],       // [{ id, date, sections, total, passed }]
  streak: { count: 0, last: null },
  settings: { newPerDay: 10, rate: 0.85 },
};

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw);
    // Migrate forward from any older/partial shape rather than crashing.
    return {
      ...EMPTY,
      ...parsed,
      settings: { ...EMPTY.settings, ...(parsed.settings || {}) },
      streak: { ...EMPTY.streak, ...(parsed.streak || {}) },
    };
  } catch {
    return { ...EMPTY };
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    return false; // quota exceeded or storage blocked — continue in memory
  }
}

export function exportJSON(state) {
  return JSON.stringify(state, null, 2);
}

export function importJSON(text) {
  const parsed = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null) throw new Error("Not an object");
  return { ...EMPTY, ...parsed, settings: { ...EMPTY.settings, ...(parsed.settings || {}) } };
}

export const EMPTY_STATE = EMPTY;

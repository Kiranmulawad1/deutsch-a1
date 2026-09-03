/* Single versioned localStorage key, behind a swappable module.
   Every read and write is guarded: Safari private mode throws on access.

   v2 introduced levels. Progress is namespaced per level so an A1 card and
   an A2 card never share a schedule; `settings` and `streak` stay shared
   because they describe you, not a level. */

const KEY = "deutsch-a1:v1";   // key kept for continuity — `version` gates the shape

export const LEVELS = ["a1", "a2"];

const emptyLevel = () => ({
  best: {},   // { [chapterNumber|"final"]: ratio }
  cards: {},  // { [wordId]: { ease, interval, reps, due, lapses } }
  exams: [],  // [{ id, date, sections, ratio }]
});

const EMPTY = {
  version: 2,
  level: "a1",
  a1: emptyLevel(),
  a2: emptyLevel(),
  streak: { count: 0, last: null },
  settings: { newPerDay: 10, rate: 0.85 },
};

/* v1 stored best/cards/exams at the top level, before A2 existed.
   Everything there was A1 work, so it moves into the a1 namespace intact. */
function migrate(p) {
  if (!p || typeof p !== "object") return { ...EMPTY };
  if (p.version >= 2) {
    return {
      ...EMPTY,
      ...p,
      a1: { ...emptyLevel(), ...(p.a1 || {}) },
      a2: { ...emptyLevel(), ...(p.a2 || {}) },
      settings: { ...EMPTY.settings, ...(p.settings || {}) },
      streak: { ...EMPTY.streak, ...(p.streak || {}) },
      level: LEVELS.includes(p.level) ? p.level : "a1",
    };
  }
  return {
    ...EMPTY,
    a1: {
      best: p.best || {},
      cards: p.cards || {},
      exams: Array.isArray(p.exams) ? p.exams : [],
    },
    a2: emptyLevel(),
    streak: { ...EMPTY.streak, ...(p.streak || {}) },
    settings: { ...EMPTY.settings, ...(p.settings || {}) },
    level: "a1",
  };
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    return migrate(JSON.parse(raw));
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

/* Accepts a v1 or v2 backup — an old export must still import cleanly. */
export function importJSON(text) {
  const parsed = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null) throw new Error("Not an object");
  return migrate(parsed);
}

export const EMPTY_STATE = EMPTY;

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { load, save, EMPTY_STATE } from "./storage.js";
import { bumpStreak } from "./srs.js";

/* One store for the whole app. Writes are debounced so a fast review
   session doesn't hit localStorage on every keystroke.

   Everything level-scoped is read and written through `level`, so screens
   never have to know which namespace they are in. */
export function useStore() {
  const [state, setState] = useState(load);
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => save(state), 250);
    return () => clearTimeout(timer.current);
  }, [state]);

  // Flush immediately when the app is backgrounded — mobile tabs get killed.
  useEffect(() => {
    const flush = () => save(state);
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", flush);
    };
  }, [state]);

  const level = state.level;
  const patchLevel = useCallback((fn) => {
    setState((s) => ({ ...s, [s.level]: fn(s[s.level]) }));
  }, []);

  const recordBest = useCallback((key, ratio) => {
    patchLevel((L) => {
      const cur = L.best[key] ?? 0;
      if (ratio <= cur) return L;
      return { ...L, best: { ...L.best, [key]: ratio } };
    });
  }, [patchLevel]);

  const gradeCard = useCallback((wordId, card) => {
    setState((s) => ({
      ...s,
      [s.level]: { ...s[s.level], cards: { ...s[s.level].cards, [wordId]: card } },
      streak: bumpStreak(s.streak),
    }));
  }, []);

  const addExam = useCallback((result) => {
    patchLevel((L) => ({ ...L, exams: [result, ...L.exams].slice(0, 20) }));
  }, [patchLevel]);

  const setSettings = useCallback((patch) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  }, []);

  const setLevel = useCallback((next) => {
    setState((s) => (s.level === next ? s : { ...s, level: next }));
  }, []);

  const resetLevel = useCallback(() => {
    setState((s) => ({ ...s, [s.level]: { best: {}, cards: {}, exams: [] } }));
  }, []);

  const replaceAll = useCallback((next) => setState(next), []);

  /* Flattened view of the active level, so screens can keep using
     store.progress.best / .cards / .exams without branching. */
  const progress = useMemo(() => state[level] ?? EMPTY_STATE.a1, [state, level]);

  return {
    state, level, progress,
    recordBest, gradeCard, addExam, setSettings, setLevel, resetLevel, replaceAll,
  };
}

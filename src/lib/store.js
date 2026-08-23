import { useState, useEffect, useCallback, useRef } from "react";
import { load, save } from "./storage.js";
import { bumpStreak } from "./srs.js";

/* One store for the whole app. Writes are debounced so a fast review
   session doesn't hit localStorage on every keystroke. */
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

  const recordBest = useCallback((key, ratio) => {
    setState((s) => {
      const cur = s.best[key] ?? 0;
      if (ratio <= cur) return s;
      return { ...s, best: { ...s.best, [key]: ratio } };
    });
  }, []);

  const gradeCard = useCallback((wordId, card) => {
    setState((s) => ({
      ...s,
      cards: { ...s.cards, [wordId]: card },
      streak: bumpStreak(s.streak),
    }));
  }, []);

  const addExam = useCallback((result) => {
    setState((s) => ({ ...s, exams: [result, ...s.exams].slice(0, 20) }));
  }, []);

  const setSettings = useCallback((patch) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  }, []);

  const replaceAll = useCallback((next) => setState(next), []);

  return { state, recordBest, gradeCard, addExam, setSettings, replaceAll };
}

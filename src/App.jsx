import React, { useState, useEffect } from "react";
import { Home as HomeIcon, BookOpen, Layers, Mic, Trophy, Settings as Cog } from "lucide-react";
import { C, serif, sans } from "./theme.js";
import { useStore } from "./lib/store.js";
import { initSpeech } from "./lib/speech.js";
import { TAP } from "./components/ui.jsx";
import Home from "./screens/Home.jsx";
import Grammar from "./screens/Grammar.jsx";
import Vocab from "./screens/Vocab.jsx";
import Exams from "./screens/Exams.jsx";
import Sprechen from "./screens/Sprechen.jsx";
import Settings from "./screens/Settings.jsx";
import { LEVEL_IDS, levelData } from "./data/levels.js";

const TABS = [
  { id: "home",    label: "Start",     icon: HomeIcon },
  { id: "grammar", label: "Grammatik", icon: BookOpen },
  { id: "vocab",   label: "Wörter",    icon: Layers },
  { id: "speak",   label: "Sprechen",  icon: Mic },
  { id: "exams",   label: "Prüfung",   icon: Trophy },
  { id: "more",    label: "Mehr",      icon: Cog },
];

const TAB_IDS = TABS.map((t) => t.id);
const tabFromHash = () => {
  const h = window.location.hash.replace("#", "");
  return TAB_IDS.includes(h) ? h : "home";
};

export default function App() {
  const store = useStore();
  const [tab, setTab] = useState(tabFromHash);
  const [, force] = useState(0);

  // Voices load asynchronously; re-render once we know if German exists.
  useEffect(() => { initSpeech(() => force((n) => n + 1)); }, []);

  /* Tabs live in the URL hash so the phone's back button steps between
     them instead of closing the app. */
  useEffect(() => {
    if (tabFromHash() !== tab) window.location.hash = tab;
  }, [tab]);

  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Each tab keeps its own internal navigation, so remount on switch.
  const screens = {
    home:    <Home store={store} go={setTab} />,
    grammar: <Grammar key={`g-${store.level}`} store={store} />,
    vocab:   <Vocab key={`v-${store.level}`} store={store} />,
    speak:   <Sprechen key={`s-${store.level}`} store={store} />,
    exams:   <Exams key={`e-${store.level}`} store={store} />,
    more:    <Settings store={store} />,
  };

  return (
    <div style={{
      minHeight: "100dvh",
      background: C.paper,
      display: "flex",
      flexDirection: "column",
      paddingTop: "var(--safe-t)",
    }}>
      {/* Level switcher — always visible, because which level you are in
          changes every screen below it. */}
      <header style={{
        position: "sticky", top: 0, zIndex: 15,
        background: C.paper, borderBottom: `1px solid ${C.line}`,
        display: "flex", alignItems: "center", gap: 10,
        padding: "8px 14px",
      }}>
        <div style={{
          fontFamily: serif, fontWeight: 700, fontSize: 15, color: C.ink,
          flex: 1, minWidth: 0,
        }}>
          Deutsch
        </div>
        <div role="group" aria-label="Niveau wählen" style={{
          display: "flex", gap: 4, background: C.paper2,
          border: `1px solid ${C.line}`, borderRadius: 10, padding: 3,
        }}>
          {LEVEL_IDS.map((id) => {
            const on = store.level === id;
            const L = levelData(id);
            return (
              <button key={id} onClick={() => store.setLevel(id)}
                aria-pressed={on}
                style={{
                  minHeight: 34, minWidth: 52, borderRadius: 8, border: "none",
                  background: on ? C.plum : "transparent",
                  color: on ? "#fff" : C.inkSoft,
                  fontFamily: sans, fontWeight: 700, fontSize: 14,
                  transition: "background .15s ease",
                }}>
                {L.label}
              </button>
            );
          })}
        </div>
      </header>

      <main style={{
        flex: 1,
        // clear the fixed tab bar plus the iPhone home indicator
        paddingBottom: `calc(72px + var(--safe-b))`,
      }}>
        {screens[tab]}
      </main>

      <nav style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 20,
        background: C.surface,
        borderTop: `1px solid ${C.line}`,
        paddingBottom: "var(--safe-b)",
        display: "grid",
        gridTemplateColumns: `repeat(${TABS.length}, 1fr)`,
      }}>
        {TABS.map(({ id, label, icon: Icon }) => {
          const on = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} aria-current={on ? "page" : undefined}
              style={{
                minHeight: TAP + 12, border: "none", background: "transparent", overflow: "hidden",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 3, padding: "8px 2px",
                color: on ? C.plum : C.inkSoft,
              }}>
              <Icon size={20} strokeWidth={on ? 2.4 : 1.9} />
              <span style={{ fontFamily: sans, fontSize: 9.5, fontWeight: on ? 700 : 500 }}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

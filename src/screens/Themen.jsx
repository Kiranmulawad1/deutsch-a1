import React, { useState, useMemo } from "react";
import {
  ArrowLeft, ChevronRight, Search, Lightbulb, ChevronDown, X,
  Users, Hash, Palette, Clock, UtensilsCrossed, Sofa, Shirt, PersonStanding,
  PawPrint, Briefcase, Building2, Bus, CloudSun, Trees, GraduationCap,
  Laptop, Dumbbell, Smile, Sparkles, Zap, Shuffle, MessageCircle,
} from "lucide-react";
import { C, serif, sans } from "../theme.js";
import { Card, Btn, SectionLabel, Screen, Speak, Article, TAP } from "../components/ui.jsx";
import { CATEGORIES, THEMEN_WORDS, wordsOf, TOTAL, STUDY_TIPS } from "../data/themen.js";

const ICONS = {
  Users, Hash, Palette, Clock, UtensilsCrossed, Sofa, Shirt, PersonStanding,
  PawPrint, Briefcase, Building2, Bus, CloudSun, Trees, GraduationCap,
  Laptop, Dumbbell, Smile, Sparkles, Zap, Shuffle, MessageCircle,
};

export default function Themen({ onExit }) {
  const [cat, setCat] = useState(null);
  const [q, setQ] = useState("");

  if (cat) return <CategoryView cat={cat} onBack={() => setCat(null)} />;
  if (q.trim()) return <SearchView q={q} setQ={setQ} onExit={() => setQ("")} />;

  return (
    <Screen>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <Btn kind="quiet" onClick={onExit} style={{ padding: 0, minHeight: TAP, width: TAP }}>
          <ArrowLeft size={20} />
        </Btn>
        <h1 style={{ fontFamily: serif, fontSize: 24, margin: 0, color: C.ink }}>Themen</h1>
      </div>
      <div style={{ fontFamily: sans, fontSize: 13.5, color: C.inkSoft, marginBottom: 16, paddingLeft: 4 }}>
        {TOTAL} Wörter mit Beispielsätzen · {CATEGORIES.length} Kategorien
      </div>

      <SearchBar q={q} setQ={setQ} />
      <ColourKey />
      <StudyTips />

      <SectionLabel>Kategorien</SectionLabel>
      <div style={{ display: "grid", gap: 9 }}>
        {CATEGORIES.map((c) => {
          const Icon = ICONS[c.icon] || Sparkles;
          return (
            <Card key={c.id} onClick={() => setCat(c)} style={{
              display: "flex", alignItems: "center", gap: 13, cursor: "pointer", padding: 13,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, background: C.plumSoft, color: C.plum,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon size={19} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: serif, fontSize: 16.5, color: C.ink }}>{c.de}</div>
                <div style={{ fontFamily: sans, fontSize: 12.5, color: C.inkSoft }}>
                  {c.en} · {c.words.length} Wörter
                </div>
              </div>
              <ChevronRight size={17} color={C.inkSoft} />
            </Card>
          );
        })}
      </div>
    </Screen>
  );
}

function SearchBar({ q, setQ }) {
  return (
    <div style={{ position: "relative", marginBottom: 16 }}>
      <Search size={17} color={C.inkSoft} style={{
        position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
        pointerEvents: "none",
      }} />
      <input
        value={q} onChange={(e) => setQ(e.target.value)}
        placeholder="Alle 860 Wörter durchsuchen…"
        autoCapitalize="off" autoCorrect="off" spellCheck={false}
        style={{
          width: "100%", minHeight: TAP, padding: "11px 14px 11px 38px", borderRadius: 12,
          border: `1px solid ${C.line}`, background: C.surface, color: C.ink, fontFamily: sans,
        }}
      />
    </div>
  );
}

/* The booklet's colour key, so the code is learnable before it is useful. */
function ColourKey() {
  return (
    <Card style={{ marginBottom: 12, padding: 13 }}>
      <SectionLabel>Die Farben</SectionLabel>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[["der", "maskulin"], ["die", "feminin"], ["das", "neutral"]].map(([a, label]) => (
          <div key={a} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Article article={a} />
            <span style={{ fontFamily: sans, fontSize: 12.5, color: C.inkSoft }}>{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function StudyTips() {
  const [open, setOpen] = useState(false);
  return (
    <Card style={{
      marginBottom: 18, padding: 0, overflow: "hidden",
      background: C.goldSoft, borderColor: C.gold,
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", minHeight: TAP, border: "none", background: "transparent",
        display: "flex", alignItems: "center", gap: 10, padding: "13px 14px",
        color: C.ink, textAlign: "left",
      }}>
        <Lightbulb size={17} color={C.gold} style={{ flexShrink: 0 }} />
        <span style={{ flex: 1, fontFamily: serif, fontSize: 15.5 }}>So lernst du damit</span>
        <ChevronDown size={17} color={C.inkSoft} style={{
          transform: open ? "rotate(180deg)" : "none", transition: "transform .2s ease",
        }} />
      </button>
      {open && (
        <div style={{ padding: "0 14px 14px" }}>
          {STUDY_TIPS.map(([de, en], i) => (
            <div key={i} style={{
              display: "flex", gap: 11, paddingTop: 12,
              borderTop: i ? `1px solid ${C.gold}33` : "none",
              marginTop: i ? 12 : 0,
            }}>
              <span style={{
                fontFamily: sans, fontSize: 12, fontWeight: 700, color: C.gold, flexShrink: 0,
              }}>
                {i + 1}
              </span>
              <div>
                <div style={{ fontFamily: serif, fontSize: 15, color: C.ink, marginBottom: 3 }}>
                  {de}
                </div>
                <div style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.55, color: C.inkSoft }}>
                  {en}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function CategoryView({ cat, onBack }) {
  const words = useMemo(() => wordsOf(cat.id), [cat.id]);
  const Icon = ICONS[cat.icon] || Sparkles;
  return (
    <Screen>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Btn kind="quiet" onClick={onBack} style={{ padding: 0, minHeight: TAP, width: TAP }}>
          <ArrowLeft size={20} />
        </Btn>
        <Icon size={19} color={C.plum} />
        <h1 style={{ fontFamily: serif, fontSize: 22, margin: 0, color: C.ink }}>{cat.de}</h1>
      </div>
      <div style={{
        fontFamily: sans, fontSize: 13, color: C.inkSoft, marginBottom: 16, paddingLeft: 52,
      }}>
        {cat.en} · {words.length} Wörter
      </div>
      <WordList words={words} />
    </Screen>
  );
}

function SearchView({ q, setQ, onExit }) {
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return THEMEN_WORDS.filter(
      (w) =>
        w.de.toLowerCase().includes(s) ||
        w.en.toLowerCase().includes(s) ||
        w.ex_de.toLowerCase().includes(s)
    ).slice(0, 120);
  }, [q]);

  return (
    <Screen>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Btn kind="quiet" onClick={onExit} style={{ padding: 0, minHeight: TAP, width: TAP }}>
          <ArrowLeft size={20} />
        </Btn>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            value={q} onChange={(e) => setQ(e.target.value)} autoFocus
            autoCapitalize="off" autoCorrect="off" spellCheck={false}
            style={{
              width: "100%", minHeight: TAP, padding: "11px 38px 11px 14px", borderRadius: 12,
              border: `1px solid ${C.line}`, background: C.surface, color: C.ink, fontFamily: sans,
            }}
          />
          <button onClick={() => setQ("")} style={{
            position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)",
            border: "none", background: "transparent", color: C.inkSoft,
            width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <X size={16} />
          </button>
        </div>
      </div>
      <div style={{ fontFamily: sans, fontSize: 12.5, color: C.inkSoft, marginBottom: 10 }}>
        {results.length} {results.length === 120 ? "+ Treffer" : "Treffer"}
      </div>
      <WordList words={results} showCat />
    </Screen>
  );
}

/* The booklet page itself: number, colour-coded article, word, English,
   and the example sentence with a translation underneath. */
function WordList({ words, showCat }) {
  if (!words.length) {
    return (
      <div style={{
        fontFamily: sans, fontSize: 14, color: C.inkSoft, textAlign: "center", padding: "40px 0",
      }}>
        Nichts gefunden.
      </div>
    );
  }
  return (
    <div style={{ display: "grid", gap: 9 }}>
      {words.map((w) => (
        <Card key={w.n} style={{ padding: 13 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{
              fontFamily: sans, fontSize: 11, color: C.inkSoft, minWidth: 26, flexShrink: 0,
            }}>
              {w.n}
            </span>
            <Article article={w.article} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: serif, fontSize: 17, color: C.ink, lineHeight: 1.3 }}>
                {w.de}
              </div>
              <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft }}>{w.en}</div>
            </div>
            <Speak text={w.full} size={17} />
          </div>

          <div style={{
            marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.line}`,
            display: "flex", alignItems: "flex-start", gap: 6,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: serif, fontSize: 15.5, color: C.ink, lineHeight: 1.45 }}>
                {w.ex_de}
              </div>
              <div style={{
                fontFamily: sans, fontSize: 13, color: C.inkSoft, fontStyle: "italic", marginTop: 2,
              }}>
                {w.ex_en}
              </div>
              {showCat && (
                <div style={{ fontFamily: sans, fontSize: 11.5, color: C.plum, marginTop: 5 }}>
                  {w.catName}
                </div>
              )}
            </div>
            <Speak text={w.ex_de} size={16} />
          </div>
        </Card>
      ))}
    </div>
  );
}

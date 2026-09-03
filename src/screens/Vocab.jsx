import React, { useState, useMemo } from "react";
import {
  ArrowLeft, Layers, Search, Flame, Check, Shuffle, Type, Ear, Table2, BookMarked, ChevronRight,
} from "lucide-react";
import { C, serif, sans } from "../theme.js";
import { Card, Btn, ProgressRing, SectionLabel, Screen, Speak, TAP } from "../components/ui.jsx";
import Exercise from "../components/Exercise.jsx";
import { levelData } from "../data/levels.js";
import { buildQueue, schedule, GRADES, today, newCard } from "../lib/srs.js";
import {
  vocabChoice, vocabTypeIn, genderDrill, clozeFromWord, dictation,
  conjugationExercise, caseExercises, shuffle,
} from "../lib/generate.js";
import { hasGerman } from "../lib/speech.js";
import Themen from "./Themen.jsx";
import { TOTAL as THEMEN_TOTAL, CATEGORIES } from "../data/themen.js";

export default function Vocab({ store }) {
  const [mode, setMode] = useState(null);
  const { progress, gradeCard, state, level } = store;
  const L = levelData(level);
  const { vocab: VOCAB, nouns: NOUNS } = L;
  const cards = progress.cards;
  const settings = state.settings;

  const queue = useMemo(
    () => buildQueue(VOCAB, cards, settings.newPerDay),
    [cards, settings.newPerDay]
  );
  const learned = Object.keys(cards).length;
  const mature = Object.values(cards).filter((c) => c.interval >= 21).length;

  if (mode === "review") {
    return <Review queue={queue} cards={cards} gradeCard={gradeCard} onExit={() => setMode(null)} />;
  }
  if (mode === "themen") return <Themen onExit={() => setMode(null)} />;
  if (mode) {
    return <Drill mode={mode} vocab={VOCAB} nouns={NOUNS} onExit={() => setMode(null)} />;
  }

  return (
    <Screen title={`Wortschatz · ${L.label}`}>
      <Card style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <ProgressRing value={learned / VOCAB.length} size={62} stroke={7}
          label={`${learned}`} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: serif, fontSize: 17, color: C.ink }}>
            {learned} von {VOCAB.length} Wörtern
          </div>
          <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, marginTop: 2 }}>
            {mature} sitzen fest · {VOCAB.length - learned} noch neu
          </div>
        </div>
      </Card>

      <Card style={{
        marginBottom: 20,
        background: queue.length ? C.plumSoft : C.greenSoft,
        borderColor: queue.length ? C.plum : C.green,
      }}>
        <SectionLabel>Heute</SectionLabel>
        <div style={{ fontFamily: serif, fontSize: 21, marginBottom: 4, color: C.ink }}>
          {queue.length ? `${queue.length} Karten fällig` : "Alles wiederholt!"}
        </div>
        <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, marginBottom: 14 }}>
          {queue.length
            ? `Inklusive bis zu ${settings.newPerDay} neuen Wörtern`
            : "Komm morgen wieder — oder üb unten frei weiter."}
        </div>
        {queue.length > 0 && (
          <Btn full onClick={() => setMode("review")}>
            <Layers size={17} /> Wiederholen starten
          </Btn>
        )}
      </Card>

      {L.hasThemen && (<>
      <SectionLabel>Nachschlagen</SectionLabel>
      <Card onClick={() => setMode("themen")} style={{
        marginBottom: 20, cursor: "pointer", padding: 15,
        display: "flex", alignItems: "center", gap: 13,
        background: C.goldSoft, borderColor: C.gold,
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: 11, background: C.gold, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <BookMarked size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: serif, fontSize: 17.5, color: C.ink }}>Themen</div>
          <div style={{ fontFamily: sans, fontSize: 12.5, color: C.inkSoft, lineHeight: 1.45 }}>
            {THEMEN_TOTAL} Wörter mit Beispielsätzen<br />
            {CATEGORIES.length} Kategorien · zum Lesen und Nachschlagen
          </div>
        </div>
        <ChevronRight size={18} color={C.inkSoft} />
      </Card>
      </>)}

      <SectionLabel>Freies Üben</SectionLabel>
      <div style={{ display: "grid", gap: 10 }}>
        <DrillCard icon={<Type size={18} />} title="der / die / das"
          sub={`Artikel-Training · ${NOUNS.length} Nomen`}
          onClick={() => setMode("gender")} />
        <DrillCard icon={<Table2 size={18} />} title="Verben konjugieren"
          sub="Präsens, alle sechs Formen"
          onClick={() => setMode("conjugate")} />
        <DrillCard icon={<Shuffle size={18} />} title="Kasus üben"
          sub="Nominativ · Akkusativ · Dativ"
          onClick={() => setMode("case")} />
        {hasGerman() && (
          <DrillCard icon={<Ear size={18} />} title="Diktat"
            sub="Hören und schreiben"
            onClick={() => setMode("dictation")} />
        )}
        <DrillCard icon={<Search size={18} />} title="Wörterbuch"
          sub="Alle Wörter durchsuchen"
          onClick={() => setMode("browse")} />
      </div>
    </Screen>
  );
}

function DrillCard({ icon, title, sub, onClick }) {
  return (
    <Card onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 13, cursor: "pointer", padding: 14,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, background: C.plumSoft, color: C.plum,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: serif, fontSize: 16.5, color: C.ink }}>{title}</div>
        <div style={{ fontFamily: sans, fontSize: 12.5, color: C.inkSoft }}>{sub}</div>
      </div>
    </Card>
  );
}

/* ---------------- SRS review session ---------------- */
function Review({ queue, cards, gradeCard, onExit }) {
  const [session, setSession] = useState(() => [...queue]);
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  const word = session[i];

  if (!word) {
    return (
      <Screen>
        <div style={{ textAlign: "center", paddingTop: 50 }}>
          <div style={{ fontSize: 46, marginBottom: 14 }}>🎉</div>
          <div style={{ fontFamily: serif, fontSize: 23, color: C.ink, marginBottom: 6 }}>
            Session fertig!
          </div>
          <div style={{ fontFamily: sans, fontSize: 14.5, color: C.inkSoft, marginBottom: 26 }}>
            {reviewed} Karten wiederholt
          </div>
          <Btn full onClick={onExit}>Zurück</Btn>
        </div>
      </Screen>
    );
  }

  const grade = (g) => {
    const card = schedule(cards[word.id] || newCard(), g);
    gradeCard(word.id, card);
    setReviewed((r) => r + 1);

    // "Again" puts the card back near the end of this same session.
    const rest = session.slice(i + 1);
    if (g === 0) {
      const insertAt = Math.min(rest.length, 4);
      setSession([...session.slice(0, i + 1), ...rest.slice(0, insertAt), word, ...rest.slice(insertAt)]);
    }
    setI(i + 1);
    setRevealed(false);
  };

  const isNew = !cards[word.id];

  return (
    <Screen>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <Btn kind="quiet" onClick={onExit} style={{ padding: 0, minHeight: TAP, width: TAP }}>
          <ArrowLeft size={20} />
        </Btn>
        <div style={{ flex: 1, height: 5, background: C.line, borderRadius: 3 }}>
          <div style={{
            height: "100%", width: `${(i / session.length) * 100}%`,
            background: C.plum, borderRadius: 3, transition: "width .3s ease",
          }} />
        </div>
        <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: C.inkSoft }}>
          {session.length - i}
        </div>
      </div>

      <Card style={{ padding: "34px 20px", textAlign: "center", minHeight: 220 }}>
        {isNew && (
          <div style={{
            display: "inline-block", fontFamily: sans, fontSize: 11, fontWeight: 700,
            letterSpacing: 1.2, textTransform: "uppercase", color: C.gold,
            background: C.goldSoft, borderRadius: 20, padding: "4px 11px", marginBottom: 16,
          }}>
            Neu
          </div>
        )}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
        }}>
          <div style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: C.ink }}>
            {word.full}
          </div>
          <Speak text={word.full} size={22} />
        </div>
        {word.plural && (
          <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, marginTop: 6 }}>
            Plural: {word.plural}
          </div>
        )}

        {revealed ? (
          <div style={{ marginTop: 22 }}>
            <div style={{
              fontFamily: sans, fontSize: 19, color: C.plum, fontWeight: 600, marginBottom: 16,
            }}>
              {word.en}
            </div>
            <div style={{
              borderTop: `1px solid ${C.line}`, paddingTop: 16, textAlign: "left",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                <div style={{ fontFamily: serif, fontSize: 16.5, color: C.ink, flex: 1, lineHeight: 1.5 }}>
                  {word.ex_de}
                </div>
                <Speak text={word.ex_de} size={16} />
              </div>
              <div style={{ fontFamily: sans, fontSize: 13.5, color: C.inkSoft, marginTop: 4 }}>
                {word.ex_en}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 30, fontFamily: sans, fontSize: 14, color: C.inkSoft }}>
            Denk nach, dann aufdecken
          </div>
        )}
      </Card>

      <div style={{ marginTop: 18 }}>
        {revealed ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
            {GRADES.map(({ g, label, hint }) => (
              <button key={g} onClick={() => grade(g)} style={{
                minHeight: 62, borderRadius: 12, border: `1.5px solid ${gradeColor(g)}`,
                background: "transparent", color: gradeColor(g), fontFamily: sans,
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 2, padding: 4,
              }}>
                <span style={{ fontWeight: 700, fontSize: 13.5 }}>{label}</span>
                <span style={{ fontSize: 10.5, opacity: 0.75 }}>{hint}</span>
              </button>
            ))}
          </div>
        ) : (
          <Btn full onClick={() => setRevealed(true)}>Aufdecken</Btn>
        )}
      </div>
    </Screen>
  );
}

const gradeColor = (g) => [C.red, C.gold, C.green, C.plum][g];

/* ---------------- free drills ---------------- */
function Drill({ mode, vocab: VOCAB, nouns: NOUNS, onExit }) {
  const items = useMemo(() => {
    if (mode === "gender") return shuffle(NOUNS).slice(0, 20).map(genderDrill);
    if (mode === "case") return caseExercises(12);
    if (mode === "conjugate")
      return shuffle(VOCAB.filter((w) => w.type === "verb"))
        .map(conjugationExercise).filter(Boolean).slice(0, 8);
    if (mode === "dictation")
      return shuffle(VOCAB.filter((w) => w.ex_de.split(" ").length <= 7))
        .slice(0, 10).map(dictation);
    return [];
  }, [mode, VOCAB, NOUNS]);

  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);

  if (mode === "browse") return <Browse vocab={VOCAB} onExit={onExit} />;

  if (done || !items.length) {
    const ratio = items.length ? score / items.length : 0;
    return (
      <Screen>
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          <ProgressRing value={ratio} size={110} stroke={10}
            color={ratio >= 0.7 ? C.green : C.plum} />
          <div style={{ fontFamily: serif, fontSize: 21, margin: "20px 0 26px", color: C.ink }}>
            {score} von {items.length} richtig
          </div>
          <Btn full onClick={onExit}>Fertig</Btn>
        </div>
      </Screen>
    );
  }

  const TITLES = {
    gender: "der / die / das", case: "Kasus üben",
    conjugate: "Verben konjugieren", dictation: "Diktat",
  };

  return (
    <Screen>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <Btn kind="quiet" onClick={onExit} style={{ padding: 0, minHeight: TAP, width: TAP }}>
          <ArrowLeft size={20} />
        </Btn>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft }}>{TITLES[mode]}</div>
          <div style={{ height: 5, background: C.line, borderRadius: 3, marginTop: 5 }}>
            <div style={{
              height: "100%", width: `${(i / items.length) * 100}%`,
              background: C.plum, borderRadius: 3, transition: "width .3s ease",
            }} />
          </div>
        </div>
        <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: C.inkSoft }}>
          {i + 1}/{items.length}
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <Exercise key={i} ex={items[i]}
          onAnswer={(ok) => { setAnswered(true); if (ok) setScore((s) => s + 1); }} />
      </div>

      {answered && (
        <Btn full style={{ marginTop: 18 }} onClick={() => {
          if (i + 1 >= items.length) setDone(true);
          else { setI(i + 1); setAnswered(false); }
        }}>
          {i + 1 >= items.length ? "Ergebnis" : "Weiter"}
        </Btn>
      )}
    </Screen>
  );
}

/* ---------------- dictionary ---------------- */
function Browse({ vocab: VOCAB, onExit }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return VOCAB.slice(0, 60);
    return VOCAB.filter(
      (w) => w.de.toLowerCase().includes(s) || w.en.toLowerCase().includes(s)
    ).slice(0, 80);
  }, [q, VOCAB]);

  return (
    <Screen>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <Btn kind="quiet" onClick={onExit} style={{ padding: 0, minHeight: TAP, width: TAP }}>
          <ArrowLeft size={20} />
        </Btn>
        <input
          value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Wort suchen…"
          autoCapitalize="off" autoCorrect="off" spellCheck={false}
          style={{
            flex: 1, minHeight: TAP, padding: "10px 14px", borderRadius: 12,
            border: `1px solid ${C.line}`, background: C.surface, color: C.ink,
            fontFamily: sans,
          }}
        />
      </div>
      <div style={{ fontFamily: sans, fontSize: 12.5, color: C.inkSoft, marginBottom: 10 }}>
        {results.length} {q ? "Treffer" : "von " + VOCAB.length + " Wörtern"}
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {results.map((w) => (
          <Card key={w.id} style={{ padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ fontFamily: serif, fontSize: 17, color: C.ink, flex: 1 }}>
                {w.full}
                {w.plural && (
                  <span style={{ fontSize: 12.5, color: C.inkSoft, fontFamily: sans }}>
                    {" "}· Pl. {w.plural}
                  </span>
                )}
              </div>
              <Speak text={w.full} size={16} />
            </div>
            <div style={{ fontFamily: sans, fontSize: 13.5, color: C.plum, marginTop: 2 }}>
              {w.en}
            </div>
            <div style={{ fontFamily: serif, fontSize: 14, color: C.inkSoft, marginTop: 5 }}>
              {w.ex_de}
            </div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

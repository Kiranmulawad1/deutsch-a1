import React, { useState, useMemo } from "react";
import {
  ArrowLeft, ChevronRight, Mic, Repeat, Ear, Volume2, MicOff,
  ChevronLeft, Waves, MessageSquare,
} from "lucide-react";
import { C, serif, sans } from "../theme.js";
import { Card, Btn, SectionLabel, Screen, Speak, TAP } from "../components/ui.jsx";
import Recorder from "../components/Recorder.jsx";
import { SOUNDS, PAIRS, TONGUE_TWISTERS } from "../data/pronunciation.js";
import { VOCAB } from "../data/vocab.js";
import { hasGerman, speak, stopSpeaking } from "../lib/speech.js";
import { canRecord } from "../lib/record.js";
import { shuffle } from "../lib/generate.js";
import { CHAPTERS, TOPICS } from "../data/grammar.js";

export default function Sprechen({ store }) {
  const [mode, setMode] = useState(null);
  const rate = store.state.settings.rate;

  if (mode === "shadow") return <Shadowing rate={rate} onExit={() => setMode(null)} />;
  if (mode === "sounds") return <SoundGuide rate={rate} onExit={() => setMode(null)} />;
  if (mode === "pairs") return <MinimalPairs rate={rate} onExit={() => setMode(null)} />;
  if (mode === "free") return <FreeSpeak rate={rate} onExit={() => setMode(null)} />;

  return (
    <Screen title="Sprechen">
      <Card style={{ marginBottom: 18, background: C.paper2 }}>
        <div style={{ fontFamily: sans, fontSize: 14, lineHeight: 1.65, color: C.ink }}>
          Hör das Vorbild, sprich nach, nimm dich auf — und vergleiche.
          Den Unterschied zu hören ist der schnellste Weg zu besserer Aussprache.
        </div>
        <div style={{
          fontFamily: sans, fontSize: 12.5, color: C.inkSoft, marginTop: 10, lineHeight: 1.55,
        }}>
          Alle Aufnahmen bleiben auf diesem Gerät. Nichts wird hochgeladen.
        </div>
      </Card>

      {!hasGerman() && (
        <Card style={{ marginBottom: 16, background: C.goldSoft, borderColor: C.gold }}>
          <div style={{ fontFamily: sans, fontSize: 13.5, lineHeight: 1.6, color: C.ink }}>
            Dieses Gerät hat keine deutsche Stimme, also gibt es kein Vorbild zum
            Anhören. Du kannst trotzdem aufnehmen und dich selbst hören.
            <br /><br />
            <strong>iPhone:</strong> Einstellungen → Bedienungshilfen → Gesprochene
            Inhalte → Stimmen → Deutsch.<br />
            <strong>Android:</strong> Einstellungen → Bedienungshilfen →
            Text-in-Sprache → Deutsch installieren.
          </div>
        </Card>
      )}

      {!canRecord() && (
        <Card style={{ marginBottom: 16, background: C.redSoft, borderColor: C.red }}>
          <div style={{ fontFamily: sans, fontSize: 13.5, lineHeight: 1.6, color: C.ink }}>
            Dieses Gerät kann nicht aufnehmen. Die Übungen funktionieren trotzdem —
            du hörst das Vorbild und sprichst laut mit.
          </div>
        </Card>
      )}

      <SectionLabel>Übungen</SectionLabel>
      <div style={{ display: "grid", gap: 10 }}>
        <Tile icon={<Repeat size={19} />} title="Nachsprechen"
          sub="Satz hören, nachsprechen, vergleichen"
          onClick={() => setMode("shadow")} />
        <Tile icon={<Waves size={19} />} title="Laute"
          sub={`${SOUNDS.length} schwierige Laute — ü, ö, ch, r, z…`}
          onClick={() => setMode("sounds")} />
        <Tile icon={<Ear size={19} />} title="Minimalpaare"
          sub={`${PAIRS.length} Paare — hörst du den Unterschied?`}
          onClick={() => setMode("pairs")} />
        <Tile icon={<MessageSquare size={19} />} title="Frei sprechen"
          sub="Themen aus der Prüfung, ohne Zeitdruck"
          onClick={() => setMode("free")} />
      </div>
    </Screen>
  );
}

function Tile({ icon, title, sub, onClick }) {
  return (
    <Card onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 13, cursor: "pointer", padding: 14,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 11, background: C.plumSoft, color: C.plum,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: serif, fontSize: 17, color: C.ink }}>{title}</div>
        <div style={{ fontFamily: sans, fontSize: 12.5, color: C.inkSoft }}>{sub}</div>
      </div>
      <ChevronRight size={18} color={C.inkSoft} />
    </Card>
  );
}

function Head({ title, sub, onExit }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Btn kind="quiet" onClick={() => { stopSpeaking(); onExit(); }}
          style={{ padding: 0, minHeight: TAP, width: TAP }}>
          <ArrowLeft size={20} />
        </Btn>
        <h1 style={{ fontFamily: serif, fontSize: 22, margin: 0, color: C.ink }}>{title}</h1>
      </div>
      {sub && (
        <div style={{
          fontFamily: sans, fontSize: 13, color: C.inkSoft, paddingLeft: 52, marginTop: 2,
        }}>
          {sub}
        </div>
      )}
    </div>
  );
}

/* ---------- Nachsprechen: sentences from the app's own content ---------- */
function Shadowing({ rate, onExit }) {
  const items = useMemo(() => {
    const fromGrammar = TOPICS.flatMap((t) =>
      t.ex.map(([de, en]) => ({ de, en, src: t.title }))
    );
    const fromVocab = VOCAB.map((w) => ({ de: w.ex_de, en: w.ex_en, src: w.full }));
    const twisters = TONGUE_TWISTERS.map(([de, en]) => ({ de, en, src: "Zungenbrecher" }));
    return shuffle([...twisters, ...fromGrammar, ...fromVocab]).slice(0, 40);
  }, []);

  const [i, setI] = useState(0);
  const it = items[i];

  return (
    <Screen>
      <Head title="Nachsprechen" sub={`${i + 1} von ${items.length}`} onExit={onExit} />

      <Card style={{ padding: "26px 18px", marginBottom: 16, textAlign: "center" }}>
        <div style={{
          fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: 1.2,
          textTransform: "uppercase", color: C.inkSoft, marginBottom: 14,
        }}>
          {it.src}
        </div>
        <div style={{
          fontFamily: serif, fontSize: 23, lineHeight: 1.45, color: C.ink, marginBottom: 10,
        }}>
          {it.de}
        </div>
        <div style={{ fontFamily: sans, fontSize: 14, color: C.inkSoft }}>{it.en}</div>
      </Card>

      <Recorder key={it.de} target={it.de} rate={rate} />

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <Btn kind="ghost" style={{ flex: 1 }} disabled={i === 0}
          onClick={() => { stopSpeaking(); setI(i - 1); }}>
          <ChevronLeft size={16} /> Zurück
        </Btn>
        <Btn kind="ghost" style={{ flex: 1 }} disabled={i >= items.length - 1}
          onClick={() => { stopSpeaking(); setI(i + 1); }}>
          Weiter <ChevronRight size={16} />
        </Btn>
      </div>
    </Screen>
  );
}

/* ---------- Laute: how to make each hard sound ---------- */
function SoundGuide({ rate, onExit }) {
  const [sel, setSel] = useState(null);

  if (!sel) {
    return (
      <Screen>
        <Head title="Laute" sub="Die Laute, die im Deutschen am schwersten sind" onExit={onExit} />
        <div style={{ display: "grid", gap: 9 }}>
          {SOUNDS.map((s) => (
            <Card key={s.id} onClick={() => setSel(s)} style={{
              display: "flex", alignItems: "center", gap: 13, cursor: "pointer", padding: 13,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 11, background: C.plumSoft,
                color: C.plum, display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
                fontFamily: serif, fontWeight: 700, whiteSpace: "nowrap",
                /* symbols run from "ü" to "-b -d -g" — scale to fit the chip */
                fontSize: s.symbol.length > 6 ? 11 : s.symbol.length > 2 ? 14 : 21,
              }}>
                {s.symbol}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: serif, fontSize: 16.5, color: C.ink }}>{s.name}</div>
                <div style={{
                  fontFamily: sans, fontSize: 12.5, color: C.inkSoft,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {s.words.slice(0, 4).join(" · ")}
                </div>
              </div>
              <ChevronRight size={17} color={C.inkSoft} />
            </Card>
          ))}
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <Head title={sel.name} onExit={() => setSel(null)} />

      <Card style={{ marginBottom: 14 }}>
        <SectionLabel>So machst du ihn</SectionLabel>
        <div style={{ fontFamily: sans, fontSize: 14.5, lineHeight: 1.65, color: C.ink }}>
          {sel.how}
        </div>
      </Card>

      <Card style={{ marginBottom: 18, background: C.redSoft, borderColor: C.red }}>
        <SectionLabel>Typischer Fehler</SectionLabel>
        <div style={{ fontFamily: sans, fontSize: 14, lineHeight: 1.6, color: C.ink }}>
          {sel.warn}
        </div>
      </Card>

      <SectionLabel>Üben</SectionLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        {sel.words.map((w) => (
          <button key={w} onClick={() => speak(w, rate)} disabled={!hasGerman()}
            style={{
              minHeight: TAP, padding: "10px 14px", borderRadius: 11,
              border: `1.5px solid ${C.line}`, background: C.surface, color: C.ink,
              fontFamily: serif, fontSize: 17,
              display: "inline-flex", alignItems: "center", gap: 7,
            }}>
            {w}
            {hasGerman() && <Volume2 size={14} color={C.plum} />}
          </button>
        ))}
      </div>

      <SectionLabel>Aufnehmen und vergleichen</SectionLabel>
      <Card>
        <div style={{
          fontFamily: serif, fontSize: 19, color: C.ink, marginBottom: 14, textAlign: "center",
        }}>
          {sel.words.join(", ")}
        </div>
        <Recorder key={sel.id} target={sel.words.join(", ")} rate={rate} compact />
      </Card>
    </Screen>
  );
}

/* ---------- Minimalpaare: hear the difference, then make it ---------- */
function MinimalPairs({ rate, onExit }) {
  const items = useMemo(() => shuffle(PAIRS), []);
  const [i, setI] = useState(0);
  const p = items[i];

  return (
    <Screen>
      <Head title="Minimalpaare" sub={`${i + 1} von ${items.length}`} onExit={onExit} />

      <Card style={{ padding: "22px 16px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {[p.a, p.b].map((w, k) => (
            <React.Fragment key={w}>
              {k === 1 && (
                <div style={{
                  fontFamily: sans, fontSize: 13, color: C.inkSoft, flexShrink: 0,
                }}>
                  vs
                </div>
              )}
              <button onClick={() => speak(w, rate)} disabled={!hasGerman()} style={{
                flex: 1, minHeight: 78, borderRadius: 13,
                border: `1.5px solid ${C.line}`, background: C.surface, color: C.ink,
                fontFamily: serif, fontSize: 21, fontWeight: 700,
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 6, padding: 8,
              }}>
                {w}
                {hasGerman() && <Volume2 size={15} color={C.plum} />}
              </button>
            </React.Fragment>
          ))}
        </div>
        <div style={{
          fontFamily: sans, fontSize: 13, color: C.plum, textAlign: "center", marginTop: 14,
        }}>
          {p.hint}
        </div>
      </Card>

      {hasGerman() && (
        <Btn kind="ghost" full style={{ marginBottom: 14 }} onClick={() => {
          speak(p.a, rate);
          setTimeout(() => speak(`${p.a}, ${p.b}`, rate), 900);
        }}>
          <Volume2 size={16} /> Beide nacheinander
        </Btn>
      )}

      <Recorder key={p.a + p.b} target={`${p.a}, ${p.b}`} rate={rate} compact />

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <Btn kind="ghost" style={{ flex: 1 }} disabled={i === 0}
          onClick={() => { stopSpeaking(); setI(i - 1); }}>
          <ChevronLeft size={16} /> Zurück
        </Btn>
        <Btn kind="ghost" style={{ flex: 1 }} disabled={i >= items.length - 1}
          onClick={() => { stopSpeaking(); setI(i + 1); }}>
          Weiter <ChevronRight size={16} />
        </Btn>
      </div>
    </Screen>
  );
}

/* ---------- Frei sprechen: exam-style prompts, no timer ---------- */
const FREE_PROMPTS = [
  { cue: "Stell dich vor", hints: ["Name", "Alter", "Land", "Wohnort", "Beruf", "Hobby"],
    model: "Ich heiße Kiran. Ich bin 28 Jahre alt und komme aus Indien. Jetzt wohne ich in Deutschland und arbeite als Ingenieur. In meiner Freizeit koche ich gern." },
  { cue: "Deine Familie", hints: ["Eltern", "Geschwister", "wo sie wohnen", "Beruf"],
    model: "Meine Familie lebt in Indien. Mein Vater ist Lehrer und meine Mutter arbeitet zu Hause. Ich habe einen Bruder und eine Schwester. Meine Schwester ist Ärztin." },
  { cue: "Dein Tag", hints: ["aufstehen", "Frühstück", "Arbeit", "Abend"],
    model: "Ich stehe um sieben Uhr auf. Zum Frühstück esse ich Brot und trinke Tee. Dann fahre ich mit dem Bus zur Arbeit. Am Abend lerne ich Deutsch." },
  { cue: "Deine Wohnung", hints: ["Zimmer", "Küche", "Miete", "Nachbarn"],
    model: "Meine Wohnung ist klein, aber sehr hell. Sie hat zwei Zimmer, eine Küche und ein Bad. Die Miete ist leider ziemlich hoch. Meine Nachbarn sind sehr nett." },
  { cue: "Essen und Trinken", hints: ["Frühstück", "Lieblingsessen", "kochen", "Restaurant"],
    model: "Ich koche sehr gern, meistens indisch. Mein Lieblingsessen ist Reis mit Gemüse. Ich esse kein Fleisch. Am Wochenende gehe ich manchmal ins Restaurant." },
  { cue: "Einkaufen", hints: ["Supermarkt", "was", "wann", "wie viel"],
    model: "Am Samstag kaufe ich im Supermarkt ein. Ich kaufe Obst, Gemüse, Brot und Milch. Das kostet ungefähr dreißig Euro." },
  { cue: "Das Wetter", hints: ["heute", "Lieblingsjahreszeit", "Winter", "Sommer"],
    model: "Heute ist das Wetter schön, die Sonne scheint. Im Sommer ist es warm, das mag ich. Der Winter in Deutschland ist sehr kalt für mich." },
  { cue: "Deine Freizeit", hints: ["Hobby", "Wochenende", "Sport", "Freunde"],
    model: "In meiner Freizeit koche ich gern und höre Musik. Am Wochenende treffe ich meine Freunde. Manchmal spielen wir Fußball im Park." },
  { cue: "Deutsch lernen", hints: ["seit wann", "warum", "schwer", "Ziel"],
    model: "Ich lerne seit einem Jahr Deutsch, weil ich hier wohne und arbeite. Die Grammatik ist schwer, besonders die Artikel. Mein Ziel ist das B1-Zertifikat." },
  { cue: "Bitte höflich um etwas", hints: ["ein Glas Wasser", "die Rechnung", "langsamer sprechen", "Hilfe"],
    model: "Entschuldigung, können Sie mir bitte helfen? — Könnten Sie bitte langsamer sprechen? — Die Rechnung, bitte." },
];

function FreeSpeak({ rate, onExit }) {
  const [i, setI] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const p = FREE_PROMPTS[i];

  const go = (d) => { stopSpeaking(); setShowModel(false); setI(i + d); };

  return (
    <Screen>
      <Head title="Frei sprechen" sub={`${i + 1} von ${FREE_PROMPTS.length}`} onExit={onExit} />

      <Card style={{ marginBottom: 14, padding: "22px 18px", textAlign: "center" }}>
        <div style={{ fontFamily: serif, fontSize: 23, color: C.ink, marginBottom: 16 }}>
          {p.cue}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>
          {p.hints.map((h) => (
            <span key={h} style={{
              fontFamily: sans, fontSize: 13.5, color: C.plum, background: C.plumSoft,
              border: `1px solid ${C.plum}`, borderRadius: 9, padding: "6px 11px",
            }}>
              {h}
            </span>
          ))}
        </div>
      </Card>

      <Recorder key={p.cue} target={p.model} rate={rate} compact />

      {showModel ? (
        <Card style={{ marginTop: 16, background: C.greenSoft, borderColor: C.green }}>
          <SectionLabel>Ein möglicher Text</SectionLabel>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
            <div style={{
              fontFamily: serif, fontSize: 16, lineHeight: 1.65, color: C.ink, flex: 1,
            }}>
              {p.model}
            </div>
            <Speak text={p.model} size={17} />
          </div>
        </Card>
      ) : (
        <Btn kind="ghost" full style={{ marginTop: 16 }} onClick={() => setShowModel(true)}>
          Beispiel zeigen
        </Btn>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <Btn kind="ghost" style={{ flex: 1 }} disabled={i === 0} onClick={() => go(-1)}>
          <ChevronLeft size={16} /> Zurück
        </Btn>
        <Btn kind="ghost" style={{ flex: 1 }} disabled={i >= FREE_PROMPTS.length - 1}
          onClick={() => go(1)}>
          Weiter <ChevronRight size={16} />
        </Btn>
      </div>
    </Screen>
  );
}

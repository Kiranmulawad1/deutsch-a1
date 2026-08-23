import React, { useMemo } from "react";
import { Flame, Layers, BookOpen, Trophy, ChevronRight } from "lucide-react";
import { C, serif, sans } from "../theme.js";
import { Card, Btn, ProgressRing, SectionLabel, Screen } from "../components/ui.jsx";
import { CHAPTERS, TOPICS } from "../data/grammar.js";
import { VOCAB } from "../data/vocab.js";
import { buildQueue } from "../lib/srs.js";
import { PASS_MARK } from "../data/exams.js";

export default function Home({ store, go }) {
  const { state } = store;
  const { best, cards, settings, streak, exams } = state;

  const due = useMemo(
    () => buildQueue(VOCAB, cards, settings.newPerDay).length,
    [cards, settings.newPerDay]
  );
  const learned = Object.keys(cards).length;
  const chaptersPassed = CHAPTERS.filter((c) => (best[c.n] ?? 0) >= 0.7).length;
  const bestExam = exams.length ? Math.max(...exams.map((e) => e.ratio)) : 0;

  // A rough "how ready am I" number: grammar, vocabulary and exam evenly weighted.
  const readiness =
    (chaptersPassed / CHAPTERS.length) * 0.4 +
    (learned / VOCAB.length) * 0.4 +
    Math.min(bestExam / PASS_MARK, 1) * 0.2;

  const hour = new Date().getHours();
  const greeting = hour < 11 ? "Guten Morgen" : hour < 18 ? "Guten Tag" : "Guten Abend";

  return (
    <Screen>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: sans, fontSize: 14, color: C.inkSoft }}>{greeting},</div>
        <h1 style={{ fontFamily: serif, fontSize: 27, margin: "2px 0 0", color: C.ink }}>
          Deutsch A1
        </h1>
      </div>

      <Card style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <ProgressRing value={readiness} size={72} stroke={8} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: serif, fontSize: 17, color: C.ink }}>
            Bereit für die Prüfung
          </div>
          <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, marginTop: 3, lineHeight: 1.5 }}>
            {chaptersPassed}/{CHAPTERS.length} Kapitel · {learned}/{VOCAB.length} Wörter
          </div>
        </div>
        {streak.count > 0 && (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            color: C.gold, flexShrink: 0,
          }}>
            <Flame size={22} />
            <span style={{ fontFamily: sans, fontSize: 15, fontWeight: 700 }}>
              {streak.count}
            </span>
          </div>
        )}
      </Card>

      <Card style={{
        marginBottom: 22,
        background: due ? C.plumSoft : C.greenSoft,
        borderColor: due ? C.plum : C.green,
      }}>
        <SectionLabel>{due ? "Heute dran" : "Heute erledigt"}</SectionLabel>
        <div style={{ fontFamily: serif, fontSize: 21, color: C.ink, marginBottom: 4 }}>
          {due ? `${due} Vokabelkarten` : "Alles wiederholt!"}
        </div>
        <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, marginBottom: 14 }}>
          {due
            ? "Fünf Minuten reichen schon."
            : "Schön gemacht. Üb weiter oder mach einen Modelltest."}
        </div>
        <Btn full onClick={() => go(due ? "vocab" : "exams")}>
          {due ? <><Layers size={17} /> Jetzt wiederholen</> : <><Trophy size={17} /> Modelltest machen</>}
        </Btn>
      </Card>

      <SectionLabel>Weitermachen</SectionLabel>
      <div style={{ display: "grid", gap: 10 }}>
        <Tile icon={<BookOpen size={19} />} title="Grammatik"
          sub={`${TOPICS.length} Themen · ${chaptersPassed} Kapitel bestanden`}
          onClick={() => go("grammar")} />
        <Tile icon={<Layers size={19} />} title="Wortschatz"
          sub={`${VOCAB.length} Wörter · ${learned} gelernt`}
          onClick={() => go("vocab")} />
        <Tile icon={<Trophy size={19} />} title="Prüfung"
          sub={bestExam ? `Bestes Ergebnis: ${Math.round(bestExam * 100)} %` : "Noch kein Versuch"}
          onClick={() => go("exams")} />
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

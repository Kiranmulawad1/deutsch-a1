import React, { useState, useMemo } from "react";
import {
  ChevronRight, ChevronLeft, ArrowLeft, ListChecks, Check, Trophy, Layers,
} from "lucide-react";
import { C, serif, sans } from "../theme.js";
import { Card, Btn, ProgressRing, Stamp, SectionLabel, Screen, Speak, TAP } from "../components/ui.jsx";
import Exercise from "../components/Exercise.jsx";
import { levelData } from "../data/levels.js";
import { fromQuiz, shuffle, orderFromExample } from "../lib/generate.js";

const PASS = 0.7;

export default function Grammar({ store }) {
  const [view, setView] = useState({ name: "chapters" });
  const { progress, recordBest, level } = store;
  const L = levelData(level);
  const { CHAPTERS, TOPICS, topicsOf, quizOfChapter, ALL_Q } = L.grammar;
  const state = progress;

  if (view.name === "chapters") {
    return (
      <Screen title={`Grammatik · ${L.label}`}>
        <div style={{ display: "grid", gap: 12 }}>
          {CHAPTERS.map((c) => {
            const best = state.best[c.n] ?? 0;
            const passed = best >= PASS;
            return (
              <Card key={c.n} onClick={() => setView({ name: "chapter", ch: c.n })}
                style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                <ProgressRing value={best} size={46} stroke={5}
                  color={passed ? C.green : C.plum} label={`${c.n}`} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: serif, fontSize: 17, fontWeight: 700, color: C.ink }}>
                    {c.title}
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft }}>
                    {c.en} · {topicsOf(c.n).length} Themen
                  </div>
                </div>
                {passed && <Check size={18} color={C.green} />}
                <ChevronRight size={18} color={C.inkSoft} />
              </Card>
            );
          })}
        </div>

        <Card style={{ marginTop: 18, background: C.plumSoft, borderColor: C.plum }}>
          <SectionLabel>Alles zusammen</SectionLabel>
          <div style={{ fontFamily: serif, fontSize: 18, marginBottom: 4 }}>Große Prüfung</div>
          <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, marginBottom: 12 }}>
            20 zufällige Fragen aus allen 8 Kapiteln
          </div>
          <Btn full onClick={() => setView({ name: "quiz", scope: "final" })}>
            <Trophy size={17} /> Prüfung starten
          </Btn>
          {(state.best.final ?? 0) > 0 && (
            <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, marginTop: 10, textAlign: "center" }}>
              Bestes Ergebnis: {Math.round(state.best.final * 100)} %
            </div>
          )}
        </Card>
      </Screen>
    );
  }

  if (view.name === "chapter") {
    const ch = CHAPTERS.find((c) => c.n === view.ch);
    const topics = topicsOf(view.ch);
    const best = state.best[view.ch] ?? 0;
    return (
      <Screen>
        <Back onClick={() => setView({ name: "chapters" })} label="Kapitel" />
        <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "8px 0 20px" }}>
          <ProgressRing value={best} size={54} color={best >= PASS ? C.green : C.plum} />
          <div>
            <h1 style={{ fontFamily: serif, fontSize: 23, margin: 0, color: C.ink }}>
              {ch.n}. {ch.title}
            </h1>
            <div style={{ fontFamily: sans, fontSize: 14, color: C.inkSoft }}>{ch.en}</div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {topics.map((t, i) => (
            <Card key={t.id} onClick={() => setView({ name: "lesson", ch: view.ch, ti: i })}
              style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", padding: 14 }}>
              <span style={{
                fontFamily: sans, fontSize: 12, fontWeight: 700, color: C.plum,
                background: C.plumSoft, borderRadius: 7, padding: "5px 8px", flexShrink: 0,
              }}>
                {t.id}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: serif, fontSize: 16, color: C.ink }}>{t.title}</div>
                <div style={{ fontFamily: sans, fontSize: 12.5, color: C.inkSoft }}>{t.en}</div>
              </div>
              <ChevronRight size={17} color={C.inkSoft} />
            </Card>
          ))}
        </div>

        <Btn full style={{ marginTop: 18 }}
          onClick={() => setView({ name: "quiz", scope: "chapter", ch: view.ch })}>
          <ListChecks size={17} /> Kapitel {view.ch} testen ({quizOfChapter(view.ch).length} Fragen)
        </Btn>
      </Screen>
    );
  }

  if (view.name === "lesson") {
    const topics = topicsOf(view.ch);
    const t = topics[view.ti];
    return (
      <Screen>
        <Back onClick={() => setView({ name: "chapter", ch: view.ch })}
          label={`Kapitel ${view.ch}`} />

        <div style={{ margin: "8px 0 6px" }}>
          <span style={{
            fontFamily: sans, fontSize: 12, fontWeight: 700, color: C.plum,
            background: C.plumSoft, borderRadius: 7, padding: "5px 9px",
          }}>
            {t.id}
          </span>
        </div>
        <h1 style={{ fontFamily: serif, fontSize: 25, margin: "8px 0 2px", color: C.ink }}>
          {t.title}
        </h1>
        <div style={{ fontFamily: sans, fontSize: 14.5, color: C.inkSoft, marginBottom: 18 }}>
          {t.en}
        </div>

        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.65, color: C.ink }}>
            {t.def}
          </div>
        </Card>

        <SectionLabel>Struktur</SectionLabel>
        <Card style={{
          marginBottom: 18, background: C.paper2, fontFamily: serif, fontSize: 16.5,
          textAlign: "center", lineHeight: 1.5,
        }}>
          {t.struktur}
        </Card>

        <SectionLabel>Beispiele</SectionLabel>
        <div style={{ display: "grid", gap: 8, marginBottom: 18 }}>
          {t.ex.map(([de, en], i) => (
            <Card key={i} style={{ padding: 13 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                <div style={{ fontFamily: serif, fontSize: 17.5, color: C.ink, flex: 1, lineHeight: 1.45 }}>
                  {de}
                </div>
                <Speak text={de} />
              </div>
              <div style={{ fontFamily: sans, fontSize: 13.5, color: C.inkSoft, marginTop: 3 }}>
                {en}
              </div>
            </Card>
          ))}
        </div>

        <Card style={{ background: C.goldSoft, borderColor: C.gold, marginBottom: 20 }}>
          <SectionLabel>Tipp</SectionLabel>
          <div style={{ fontFamily: sans, fontSize: 14.5, lineHeight: 1.6, color: C.ink }}>
            {t.tip}
          </div>
        </Card>

        <Btn full onClick={() => setView({ name: "quiz", scope: "topic", ch: view.ch, ti: view.ti })}>
          <ListChecks size={17} /> Üben ({t.quiz.length} Fragen)
        </Btn>

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <Btn kind="ghost" style={{ flex: 1 }} disabled={view.ti === 0}
            onClick={() => setView({ ...view, ti: view.ti - 1 })}>
            <ChevronLeft size={16} /> Zurück
          </Btn>
          <Btn kind="ghost" style={{ flex: 1 }} disabled={view.ti >= topics.length - 1}
            onClick={() => setView({ ...view, ti: view.ti + 1 })}>
            Weiter <ChevronRight size={16} />
          </Btn>
        </div>
      </Screen>
    );
  }

  /* ---- quiz ---- */
  const { questions, title, key, back } = buildQuiz(view, L.grammar);
  return (
    <QuizRunner
      key={`${view.scope}-${view.ch ?? ""}-${view.ti ?? ""}`}
      questions={questions} title={title}
      onFinish={(ratio) => key && recordBest(key, ratio)}
      onExit={() => setView(back)}
    />
  );
}

function buildQuiz(view, G) {
  const { topicsOf, quizOfChapter, ALL_Q } = G;
  if (view.scope === "final") {
    return {
      questions: shuffle(ALL_Q).slice(0, 20),
      title: "Große Prüfung", key: "final", back: { name: "chapters" },
    };
  }
  if (view.scope === "chapter") {
    return {
      questions: quizOfChapter(view.ch),
      title: `Kapitel ${view.ch}`, key: view.ch,
      back: { name: "chapter", ch: view.ch },
    };
  }
  const t = topicsOf(view.ch)[view.ti];
  return {
    questions: t.quiz.map((q) => ({ ...q, topic: t.title })),
    title: `${t.id} · ${t.title}`, key: null,
    back: { name: "lesson", ch: view.ch, ti: view.ti },
  };
}

const NO_EXTRA = [];

export function QuizRunner({ questions, title, onFinish, onExit, extra = NO_EXTRA }) {
  /* Built once on mount. useMemo would re-run on every render here, because
     the caller rebuilds `questions` each time — that reshuffled the quiz
     mid-answer. Remount with a `key` to start a different quiz. */
  const [items] = useState(() => shuffle([...questions.map(fromQuiz), ...extra]));

  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);

  const next = () => {
    if (i + 1 >= items.length) {
      setDone(true);
      onFinish?.((score) / items.length);
    } else {
      setI(i + 1);
      setAnswered(false);
    }
  };

  if (done) {
    const ratio = score / items.length;
    const passed = ratio >= PASS;
    return (
      <Screen>
        <div style={{ textAlign: "center", paddingTop: 30 }}>
          <ProgressRing value={ratio} size={124} stroke={11}
            color={passed ? C.green : C.plum} />
          <div style={{ fontFamily: serif, fontSize: 22, margin: "20px 0 6px", color: C.ink }}>
            {score} von {items.length} richtig
          </div>
          <div style={{ fontFamily: sans, fontSize: 14.5, color: C.inkSoft, marginBottom: 22 }}>
            {passed ? "Bestanden — sehr gut!" : `Ab ${Math.round(PASS * 100)} % bestanden. Noch mal!`}
          </div>
          {passed && <div style={{ marginBottom: 24 }}><Stamp icon={<Trophy size={20} />} /></div>}
          <Btn full onClick={onExit}>Fertig</Btn>
        </div>
      </Screen>
    );
  }

  const ex = items[i];
  return (
    <Screen>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <Btn kind="quiet" onClick={onExit} style={{ padding: 0, minHeight: TAP, width: TAP }}>
          <ArrowLeft size={20} />
        </Btn>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft }}>{title}</div>
          <div style={{ height: 5, background: C.line, borderRadius: 3, marginTop: 5 }}>
            <div style={{
              height: "100%", width: `${((i + (answered ? 1 : 0)) / items.length) * 100}%`,
              background: C.plum, borderRadius: 3, transition: "width .3s ease",
            }} />
          </div>
        </div>
        <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: C.inkSoft }}>
          {i + 1}/{items.length}
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <Exercise
          key={i} ex={ex}
          onAnswer={(ok) => { setAnswered(true); if (ok) setScore((s) => s + 1); }}
        />
      </div>

      {answered && (
        <Btn full style={{ marginTop: 18 }} onClick={next}>
          {i + 1 >= items.length ? "Ergebnis ansehen" : "Weiter"}
          <ChevronRight size={17} />
        </Btn>
      )}
    </Screen>
  );
}

function Back({ onClick, label }) {
  return (
    <Btn kind="quiet" onClick={onClick} style={{ padding: 0, marginLeft: -4 }}>
      <ArrowLeft size={18} /> {label}
    </Btn>
  );
}

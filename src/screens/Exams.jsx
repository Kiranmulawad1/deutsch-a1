import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Clock, Volume2, Check, X, Trophy, ChevronRight } from "lucide-react";
import { C, serif, sans } from "../theme.js";
import { Card, Btn, ProgressRing, Stamp, SectionLabel, Screen, TAP } from "../components/ui.jsx";
import { levelData } from "../data/levels.js";
import { speak, hasGerman, stopSpeaking } from "../lib/speech.js";
import { matches } from "../lib/text.js";
import { shuffle } from "../lib/generate.js";

export default function Exams({ store }) {
  const [run, setRun] = useState(null);
  const { state, progress, addExam, level } = store;
  const L = levelData(level);
  const { exams: EXAMS, examSections: SECTIONS, passMark: PASS_MARK } = L;

  if (run) {
    return <ExamRun exam={run} rate={state.settings.rate} sections={SECTIONS} passMark={PASS_MARK}
      onDone={(r) => { addExam(r); setRun(null); }}
      onQuit={() => { stopSpeaking(); setRun(null); }} />;
  }

  return (
    <Screen title={`Prüfung · ${L.label}`}>
      <Card style={{ marginBottom: 18, background: C.paper2 }}>
        <SectionLabel>{`Goethe-Zertifikat ${L.label}`}</SectionLabel>
        <div style={{ fontFamily: sans, fontSize: 14, lineHeight: 1.6, color: C.ink }}>
          Vier Teile, wie in der echten Prüfung. Bestanden ab{" "}
          <strong>{Math.round(PASS_MARK * 100)} %</strong>.
        </div>
        <div style={{ display: "grid", gap: 6, marginTop: 12 }}>
          {SECTIONS.map((s) => (
            <div key={s.id} style={{
              display: "flex", justifyContent: "space-between",
              fontFamily: sans, fontSize: 13, color: C.inkSoft,
            }}>
              <span>{s.name}</span>
              <span>{s.minutes} Min · {s.items} Aufgaben</span>
            </div>
          ))}
        </div>
      </Card>

      {!hasGerman() && (
        <Card style={{ marginBottom: 16, background: C.goldSoft, borderColor: C.gold }}>
          <div style={{ fontFamily: sans, fontSize: 13.5, lineHeight: 1.55, color: C.ink }}>
            Dieses Gerät hat keine deutsche Stimme. Im Hörteil siehst du den Text
            statt ihn zu hören.
          </div>
        </Card>
      )}

      <SectionLabel>Modelltests</SectionLabel>
      <div style={{ display: "grid", gap: 10 }}>
        {EXAMS.map((e) => {
          const past = progress.exams.filter((r) => r.examId === e.id);
          const best = past.length ? Math.max(...past.map((r) => r.ratio)) : null;
          return (
            <Card key={e.id} onClick={() => setRun(e)} style={{
              display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
            }}>
              <ProgressRing value={best ?? 0} size={46} stroke={5}
                color={best >= PASS_MARK ? C.green : C.plum}
                label={best == null ? "–" : `${Math.round(best * 100)}`} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: serif, fontSize: 17, color: C.ink }}>{e.name}</div>
                <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft }}>
                  {past.length ? `${past.length}× versucht` : "Noch nicht versucht"}
                </div>
              </div>
              <ChevronRight size={18} color={C.inkSoft} />
            </Card>
          );
        })}
      </div>

      {progress.exams.length > 0 && (
        <>
          <SectionLabel style={{ marginTop: 22 }}>Verlauf</SectionLabel>
          <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
            {progress.exams.slice(0, 6).map((r, i) => (
              <Card key={i} style={{
                padding: 12, display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 4,
                  background: r.ratio >= PASS_MARK ? C.green : C.red, flexShrink: 0,
                }} />
                <div style={{ flex: 1, fontFamily: sans, fontSize: 13.5, color: C.ink }}>
                  {r.examName}
                  <span style={{ color: C.inkSoft }}> · {r.date}</span>
                </div>
                <div style={{
                  fontFamily: sans, fontSize: 14, fontWeight: 700,
                  color: r.ratio >= PASS_MARK ? C.green : C.red,
                }}>
                  {Math.round(r.ratio * 100)} %
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </Screen>
  );
}

/* ---------------- running an exam ---------------- */
function ExamRun({ exam, rate, sections: SECTIONS, passMark: PASS_MARK, onDone, onQuit }) {
  const [step, setStep] = useState(0); // 0 hören 1 lesen 2 schreiben 3 sprechen 4 result
  const [scores, setScores] = useState({});

  const finish = (id, got, max) => {
    const next = { ...scores, [id]: { got, max } };
    setScores(next);
    if (step === 3) {
      const got_ = Object.values(next).reduce((a, s) => a + s.got, 0);
      const max_ = Object.values(next).reduce((a, s) => a + s.max, 0);
      onDone({
        examId: exam.id, examName: exam.name,
        date: new Date().toISOString().slice(0, 10),
        sections: next, ratio: max_ ? got_ / max_ : 0,
      });
    } else {
      setStep(step + 1);
    }
  };

  const header = (
    <ExamHeader section={SECTIONS[step]} onQuit={onQuit} />
  );

  if (step === 0)
    return <MCSection key="h" header={header} items={exam.hoeren} audio rate={rate}
      onDone={(g, m) => finish("hoeren", g, m)} />;
  if (step === 1)
    return <MCSection key="l" header={header} items={exam.lesen}
      onDone={(g, m) => finish("lesen", g, m)} />;
  if (step === 2)
    return <WriteSection header={header} tasks={exam.schreiben}
      onDone={(g, m) => finish("schreiben", g, m)} />;
  return <SpeakSection header={header} tasks={exam.sprechen} rate={rate}
    onDone={(g, m) => finish("sprechen", g, m)} />;
}

function ExamHeader({ section, onQuit }) {
  const [left, setLeft] = useState(section.minutes * 60);
  useEffect(() => {
    setLeft(section.minutes * 60);
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [section]);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const low = left < 120;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
      <Btn kind="quiet" onClick={onQuit} style={{ padding: 0, minHeight: TAP, width: TAP }}>
        <ArrowLeft size={20} />
      </Btn>
      <div style={{ flex: 1, fontFamily: serif, fontSize: 19, color: C.ink }}>
        {section.name}
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 5, fontFamily: sans,
        fontSize: 14, fontWeight: 700, color: low ? C.red : C.inkSoft,
        background: low ? C.redSoft : "transparent", padding: "5px 9px", borderRadius: 8,
      }}>
        <Clock size={14} /> {mm}:{ss}
      </div>
    </div>
  );
}

/* Hören and Lesen share one multiple-choice runner. */
function MCSection({ header, items, audio, rate, onDone }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [got, setGot] = useState(0);
  const it = items[i];
  const canHear = audio && hasGerman();

  useEffect(() => {
    if (canHear) setTimeout(() => speak(it.audio, rate), 300);
    return stopSpeaking;
  }, [i, canHear, it, rate]);

  const next = () => {
    if (picked === it.a) setGot(got + 1);
    if (i + 1 >= items.length) onDone(got + (picked === it.a ? 1 : 0), items.length);
    else { setI(i + 1); setPicked(null); }
  };

  return (
    <Screen>
      {header}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft }}>
          Aufgabe {i + 1} von {items.length}
        </span>
        <div style={{ width: 120, height: 5, background: C.line, borderRadius: 3, alignSelf: "center" }}>
          <div style={{
            height: "100%", width: `${(i / items.length) * 100}%`,
            background: C.plum, borderRadius: 3,
          }} />
        </div>
      </div>

      {audio ? (
        canHear ? (
          <Card style={{ textAlign: "center", padding: 26, marginBottom: 18 }}>
            <Btn onClick={() => speak(it.audio, rate)}>
              <Volume2 size={18} /> Noch einmal hören
            </Btn>
            <div style={{ fontFamily: sans, fontSize: 12.5, color: C.inkSoft, marginTop: 12 }}>
              Du kannst so oft hören, wie du möchtest
            </div>
          </Card>
        ) : (
          <Card style={{ marginBottom: 18, background: C.paper2 }}>
            <div style={{ fontFamily: serif, fontSize: 17, lineHeight: 1.55, color: C.ink }}>
              „{it.audio}“
            </div>
          </Card>
        )
      ) : (
        <Card style={{ marginBottom: 18, background: C.paper2 }}>
          <div style={{ fontFamily: serif, fontSize: 16.5, lineHeight: 1.6, color: C.ink }}>
            {it.text}
          </div>
        </Card>
      )}

      <div style={{ fontFamily: serif, fontSize: 18, color: C.ink, marginBottom: 14 }}>
        {it.q}
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {it.opts.map((o, k) => (
          <button key={k} onClick={() => setPicked(k)} style={{
            minHeight: TAP + 6, borderRadius: 12, textAlign: "left", padding: "12px 14px",
            border: `1.5px solid ${picked === k ? C.plum : C.line}`,
            background: picked === k ? C.plumSoft : C.surface,
            color: C.ink, fontFamily: sans, fontSize: 15.5,
          }}>
            {o}
          </button>
        ))}
      </div>

      <Btn full style={{ marginTop: 18 }} disabled={picked === null} onClick={next}>
        {i + 1 >= items.length ? "Teil abschließen" : "Weiter"}
      </Btn>
    </Screen>
  );
}

/* Schreiben — form is auto-scored, the message is self-assessed. */
function WriteSection({ header, tasks, onDone }) {
  const [part, setPart] = useState(0);
  const [vals, setVals] = useState({});
  const [text, setText] = useState("");
  const [checked, setChecked] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [formScore, setFormScore] = useState(0);

  const t = tasks[part];

  if (t.type === "form") {
    const submit = () => {
      const got = t.fields.filter((f, i) => matches(vals[i] || "", f.answer)).length;
      setFormScore(got);
      setShowModel(true);
    };
    return (
      <Screen>
        {header}
        <Card style={{ marginBottom: 16, background: C.paper2 }}>
          <div style={{ fontFamily: sans, fontSize: 14.5, lineHeight: 1.6, color: C.ink, marginBottom: 10 }}>
            {t.task}
          </div>
          <div style={{ fontFamily: serif, fontSize: 15.5, lineHeight: 1.6, color: C.inkSoft }}>
            {t.context}
          </div>
        </Card>

        <div style={{ display: "grid", gap: 10 }}>
          {t.fields.map((f, i) => {
            const ok = showModel && matches(vals[i] || "", f.answer);
            return (
              <div key={i}>
                <div style={{ fontFamily: sans, fontSize: 12.5, color: C.inkSoft, marginBottom: 4 }}>
                  {f.label}
                </div>
                <input
                  value={vals[i] || ""} disabled={showModel}
                  onChange={(e) => setVals({ ...vals, [i]: e.target.value })}
                  autoCapitalize="off" autoCorrect="off" spellCheck={false}
                  style={{
                    width: "100%", minHeight: TAP, padding: "10px 13px", borderRadius: 11,
                    border: `1px solid ${showModel ? (ok ? C.green : C.red) : C.line}`,
                    background: showModel ? (ok ? C.greenSoft : C.redSoft) : C.surface,
                    color: C.ink, fontFamily: sans,
                  }}
                />
                {showModel && !ok && (
                  <div style={{ fontFamily: sans, fontSize: 12.5, color: C.green, marginTop: 3 }}>
                    Richtig: {f.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!showModel ? (
          <Btn full style={{ marginTop: 18 }} onClick={submit}>Formular abgeben</Btn>
        ) : (
          <>
            <div style={{
              fontFamily: sans, fontSize: 14, color: C.inkSoft,
              textAlign: "center", margin: "16px 0",
            }}>
              {formScore} von {t.fields.length} Feldern richtig
            </div>
            <Btn full onClick={() => { setPart(1); setShowModel(false); }}>
              Weiter zu Teil 2
            </Btn>
          </>
        )}
      </Screen>
    );
  }

  /* message */
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return (
    <Screen>
      {header}
      <Card style={{ marginBottom: 16, background: C.paper2 }}>
        <div style={{ fontFamily: sans, fontSize: 14.5, lineHeight: 1.6, color: C.ink }}>
          {t.task}
        </div>
      </Card>

      <SectionLabel>Diese Punkte müssen vorkommen</SectionLabel>
      <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
        {t.points.map((p, i) => {
          const on = checked.includes(i);
          return (
            <button key={i} onClick={() =>
              setChecked(on ? checked.filter((x) => x !== i) : [...checked, i])}
              style={{
                display: "flex", alignItems: "center", gap: 10, minHeight: TAP,
                padding: "10px 13px", borderRadius: 11, textAlign: "left",
                border: `1.5px solid ${on ? C.green : C.line}`,
                background: on ? C.greenSoft : C.surface,
                color: C.ink, fontFamily: sans, fontSize: 14,
              }}>
              <span style={{
                width: 21, height: 21, borderRadius: 6, flexShrink: 0,
                border: `1.5px solid ${on ? C.green : C.line}`,
                background: on ? C.green : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {on && <Check size={13} color="#fff" />}
              </span>
              {p}
            </button>
          );
        })}
      </div>

      <textarea
        value={text} onChange={(e) => setText(e.target.value)} rows={7}
        placeholder="Schreib hier deine Nachricht…"
        autoCapitalize="sentences" autoCorrect="off" spellCheck={false} lang="de"
        style={{
          width: "100%", padding: 13, borderRadius: 12, border: `1px solid ${C.line}`,
          background: C.surface, color: C.ink, fontFamily: serif, fontSize: 16,
          lineHeight: 1.6, resize: "vertical",
        }}
      />
      <div style={{
        fontFamily: sans, fontSize: 12.5, color: words >= 25 ? C.green : C.inkSoft,
        marginTop: 6, textAlign: "right",
      }}>
        {words} Wörter {words < 25 && "· ca. 30 empfohlen"}
      </div>

      {showModel && (
        <Card style={{ marginTop: 16, background: C.greenSoft, borderColor: C.green }}>
          <SectionLabel>Musterlösung</SectionLabel>
          <div style={{
            fontFamily: serif, fontSize: 15.5, lineHeight: 1.65,
            color: C.ink, whiteSpace: "pre-wrap",
          }}>
            {t.model}
          </div>
        </Card>
      )}

      {!showModel ? (
        <Btn full style={{ marginTop: 16 }} disabled={!text.trim()}
          onClick={() => setShowModel(true)}>
          Abgeben und Musterlösung sehen
        </Btn>
      ) : (
        <Btn full style={{ marginTop: 16 }}
          onClick={() => onDone(formScore + checked.length, tasks[0].fields.length + t.points.length)}>
          Weiter zum Sprechen
        </Btn>
      )}
    </Screen>
  );
}

/* Sprechen — prompt-and-self-assess; no recognition API (unreliable offline). */
function SpeakSection({ header, tasks, rate, onDone }) {
  const [part, setPart] = useState(0);
  const [done, setDone] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const t = tasks[part];

  const nextPart = (ok) => {
    const d = [...done, ok];
    setDone(d);
    setShowModel(false);
    if (part + 1 >= tasks.length) onDone(d.filter(Boolean).length, tasks.length);
    else setPart(part + 1);
  };

  return (
    <Screen>
      {header}
      <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, marginBottom: 10 }}>
        Teil {part + 1} von {tasks.length}
      </div>

      <Card style={{ marginBottom: 16, background: C.paper2 }}>
        <div style={{ fontFamily: sans, fontSize: 14.5, lineHeight: 1.6, color: C.ink }}>
          {t.task}
        </div>
      </Card>

      <SectionLabel>Stichwörter</SectionLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {t.cues.map((c, i) => (
          <span key={i} style={{
            fontFamily: serif, fontSize: 16.5, color: C.plum, background: C.plumSoft,
            border: `1px solid ${C.plum}`, borderRadius: 10, padding: "9px 14px",
          }}>
            {c}
          </span>
        ))}
      </div>

      <Card style={{ background: C.goldSoft, borderColor: C.gold, marginBottom: 18 }}>
        <div style={{ fontFamily: sans, fontSize: 13.5, lineHeight: 1.6, color: C.ink }}>
          Sprich laut — am besten nimm dich mit dem Handy auf und hör dir zu.
          Vergleich dich danach mit der Musterlösung.
        </div>
      </Card>

      {showModel && (
        <Card style={{ marginBottom: 18, background: C.greenSoft, borderColor: C.green }}>
          <SectionLabel>Musterlösung</SectionLabel>
          <div style={{
            fontFamily: serif, fontSize: 15.5, lineHeight: 1.65, color: C.ink,
          }}>
            {t.model}
          </div>
          {hasGerman() && (
            <Btn kind="ghost" style={{ marginTop: 12 }} onClick={() => speak(t.model, rate)}>
              <Volume2 size={16} /> Vorlesen
            </Btn>
          )}
        </Card>
      )}

      {!showModel ? (
        <Btn full onClick={() => setShowModel(true)}>Musterlösung zeigen</Btn>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{
            fontFamily: sans, fontSize: 14, color: C.inkSoft, textAlign: "center",
          }}>
            Wie ist es gelaufen?
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn kind="ghost" style={{ flex: 1 }} onClick={() => nextPart(false)}>
              <X size={16} /> Schwierig
            </Btn>
            <Btn kind="good" style={{ flex: 1 }} onClick={() => nextPart(true)}>
              <Check size={16} /> Gut gemacht
            </Btn>
          </div>
        </div>
      )}
    </Screen>
  );
}

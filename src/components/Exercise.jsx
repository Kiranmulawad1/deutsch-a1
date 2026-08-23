import React, { useState, useRef, useEffect } from "react";
import { Check, X, ArrowRight } from "lucide-react";
import { C, serif, sans } from "../theme.js";
import { Btn, Card, Speak, TAP } from "./ui.jsx";
import { matches, diffWords } from "../lib/text.js";

/* One component renders every exercise type. Each returns the same
   { correct, explanation } shape so the host screen stays simple.

   Types: choice | type-in | gender | conjugate | order | dictation  */

const feedbackBox = (ok) => ({
  background: ok ? C.greenSoft : C.redSoft,
  border: `1px solid ${ok ? C.green : C.red}`,
  borderRadius: 12,
  padding: 14,
  marginTop: 14,
  fontFamily: sans,
  fontSize: 14,
  lineHeight: 1.55,
  color: C.ink,
});

export default function Exercise({ ex, onAnswer, autoFocus = true }) {
  const [state, setState] = useState({ done: false, ok: false });
  const [input, setInput] = useState("");
  const [picked, setPicked] = useState(null);
  const [cells, setCells] = useState({});
  const [built, setBuilt] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    setState({ done: false, ok: false });
    setInput(""); setPicked(null); setCells({}); setBuilt([]);
    if (autoFocus && (ex.kind === "type-in" || ex.kind === "dictation")) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [ex, autoFocus]);

  const settle = (ok) => {
    setState({ done: true, ok });
    onAnswer?.(ok);
  };

  const germanInput = {
    autoCapitalize: "off", autoCorrect: "off", spellCheck: false,
    autoComplete: "off", lang: "de",
  };

  const inputStyle = {
    width: "100%", minHeight: TAP, padding: "12px 14px", borderRadius: 12,
    border: `1px solid ${C.line}`, background: C.surface, color: C.ink,
    fontFamily: sans,
  };

  /* ---------- multiple choice / gender ---------- */
  if (ex.kind === "choice" || ex.kind === "gender") {
    const isGender = ex.kind === "gender";
    return (
      <div>
        <Prompt ex={ex} />
        <div style={{
          display: "grid",
          gridTemplateColumns: isGender ? "repeat(3, 1fr)" : "1fr",
          gap: 10,
        }}>
          {ex.options.map((opt, i) => {
            const chosen = picked === i;
            const correct = i === ex.answer;
            let bg = C.surface, bd = C.line, fg = C.ink;
            if (state.done) {
              if (correct) { bg = C.greenSoft; bd = C.green; fg = C.green; }
              else if (chosen) { bg = C.redSoft; bd = C.red; fg = C.red; }
            }
            return (
              <button
                key={i}
                disabled={state.done}
                onClick={() => { setPicked(i); settle(correct); }}
                style={{
                  minHeight: isGender ? 64 : TAP + 8,
                  borderRadius: 12, border: `1.5px solid ${bd}`, background: bg,
                  color: fg, fontFamily: isGender ? serif : sans,
                  fontSize: isGender ? 22 : 16, fontWeight: isGender ? 700 : 500,
                  textAlign: isGender ? "center" : "left",
                  padding: isGender ? 8 : "12px 14px",
                  display: "flex", alignItems: "center",
                  justifyContent: isGender ? "center" : "space-between", gap: 8,
                }}
              >
                <span>{opt}</span>
                {state.done && correct && <Check size={18} />}
                {state.done && chosen && !correct && <X size={18} />}
              </button>
            );
          })}
        </div>
        {state.done && <Feedback ex={ex} ok={state.ok} />}
      </div>
    );
  }

  /* ---------- typed answer ---------- */
  if (ex.kind === "type-in") {
    return (
      <div>
        <Prompt ex={ex} />
        <form onSubmit={(e) => { e.preventDefault(); if (!state.done) settle(matches(input, ex.answer)); }}>
          <input
            ref={inputRef} value={input} disabled={state.done}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Antwort eingeben…"
            {...germanInput}
            style={{
              ...inputStyle,
              borderColor: state.done ? (state.ok ? C.green : C.red) : C.line,
            }}
          />
          {!state.done && (
            <Btn full style={{ marginTop: 12 }} type="submit" disabled={!input.trim()}>
              Prüfen
            </Btn>
          )}
        </form>
        {state.done && <Feedback ex={ex} ok={state.ok} showAnswer />}
      </div>
    );
  }

  /* ---------- conjugation table ---------- */
  if (ex.kind === "conjugate") {
    const persons = ex.rows.map((r) => r[0]);
    const check = () => settle(ex.rows.every((r, i) => matches(cells[i] || "", r[1])));
    return (
      <div>
        <Prompt ex={ex} />
        <div style={{ display: "grid", gap: 8 }}>
          {ex.rows.map((r, i) => {
            const val = cells[i] || "";
            const ok = state.done && matches(val, r[1]);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  fontFamily: serif, fontSize: 16, width: 78, flexShrink: 0, color: C.inkSoft,
                }}>
                  {persons[i]}
                </span>
                <input
                  value={val} disabled={state.done}
                  onChange={(e) => setCells({ ...cells, [i]: e.target.value })}
                  {...germanInput}
                  style={{
                    ...inputStyle, flex: 1,
                    borderColor: state.done ? (ok ? C.green : C.red) : C.line,
                    background: state.done ? (ok ? C.greenSoft : C.redSoft) : C.surface,
                  }}
                />
                {state.done && !ok && (
                  <span style={{ fontFamily: serif, fontSize: 14, color: C.green, minWidth: 70 }}>
                    {r[1]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {!state.done && <Btn full style={{ marginTop: 14 }} onClick={check}>Prüfen</Btn>}
        {state.done && <Feedback ex={ex} ok={state.ok} />}
      </div>
    );
  }

  /* ---------- sentence builder ---------- */
  if (ex.kind === "order") {
    // Track indices, not values — a sentence can repeat a word ("Ich ... ich")
    const remaining = ex.tiles.map((t, i) => [t, i]).filter(([, i]) => !built.includes(i));
    const sentence = built.map((i) => ex.tiles[i]).join(" ");
    const check = () => settle(matches(sentence, ex.answer));
    return (
      <div>
        <Prompt ex={ex} />
        <div style={{
          minHeight: 68, border: `1.5px dashed ${C.line}`, borderRadius: 12,
          padding: 12, background: C.paper2, display: "flex", flexWrap: "wrap",
          gap: 8, alignContent: "flex-start", marginBottom: 12,
        }}>
          {built.length === 0 && (
            <span style={{ fontFamily: sans, fontSize: 14, color: C.inkSoft }}>
              Tippe die Wörter in der richtigen Reihenfolge an
            </span>
          )}
          {built.map((ti, pos) => (
            <Tile key={pos} disabled={state.done}
              onClick={() => setBuilt(built.filter((_, p) => p !== pos))}>
              {ex.tiles[ti]}
            </Tile>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {remaining.map(([t, i]) => (
            <Tile key={i} disabled={state.done} onClick={() => setBuilt([...built, i])}>
              {t}
            </Tile>
          ))}
        </div>
        {!state.done && (
          <Btn full style={{ marginTop: 14 }} disabled={!built.length} onClick={check}>
            Prüfen
          </Btn>
        )}
        {state.done && <Feedback ex={ex} ok={state.ok} showAnswer />}
      </div>
    );
  }

  /* ---------- dictation ---------- */
  if (ex.kind === "dictation") {
    const parts = state.done ? diffWords(input, ex.answer) : [];
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <Speak text={ex.answer} size={26} />
          <span style={{ fontFamily: sans, fontSize: 15, color: C.inkSoft }}>
            Hör zu und schreib den Satz
          </span>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (!state.done) settle(matches(input, ex.answer)); }}>
          <textarea
            ref={inputRef} value={input} disabled={state.done} rows={3}
            onChange={(e) => setInput(e.target.value)}
            {...germanInput}
            style={{ ...inputStyle, resize: "vertical" }}
          />
          {!state.done && (
            <Btn full style={{ marginTop: 12 }} type="submit" disabled={!input.trim()}>
              Prüfen
            </Btn>
          )}
        </form>
        {state.done && (
          <div style={feedbackBox(state.ok)}>
            <div style={{ fontFamily: serif, fontSize: 17, marginBottom: 6 }}>
              {parts.map((p, i) => (
                <span key={i} style={{
                  color: p.ok ? C.green : C.red,
                  textDecoration: p.ok ? "none" : "underline",
                  textDecorationStyle: "wavy",
                }}>
                  {p.word}{" "}
                </span>
              ))}
            </div>
            <div style={{ color: C.inkSoft }}>{ex.translation}</div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function Tile({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      minHeight: TAP, padding: "10px 14px", borderRadius: 10,
      border: `1.5px solid ${C.line}`, background: C.surface, color: C.ink,
      fontFamily: serif, fontSize: 17,
    }}>
      {children}
    </button>
  );
}

function Prompt({ ex }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {ex.hint && (
        <div style={{
          fontFamily: sans, fontSize: 12, fontWeight: 700, letterSpacing: 1,
          textTransform: "uppercase", color: C.inkSoft, marginBottom: 6,
        }}>
          {ex.hint}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
        <div style={{
          fontFamily: serif, fontSize: 20, lineHeight: 1.45, color: C.ink, flex: 1,
        }}>
          {ex.prompt}
        </div>
        {ex.say && <Speak text={ex.say} />}
      </div>
      {ex.sub && (
        <div style={{ fontFamily: sans, fontSize: 14, color: C.inkSoft, marginTop: 6 }}>
          {ex.sub}
        </div>
      )}
    </div>
  );
}

function Feedback({ ex, ok, showAnswer }) {
  return (
    <div style={feedbackBox(ok)}>
      <div style={{
        fontWeight: 700, color: ok ? C.green : C.red, marginBottom: 6,
        display: "flex", alignItems: "center", gap: 6,
      }}>
        {ok ? <Check size={16} /> : <X size={16} />}
        {ok ? "Richtig!" : "Nicht ganz."}
      </div>
      {showAnswer && !ok && (
        <div style={{ fontFamily: serif, fontSize: 17, marginBottom: 6 }}>
          {Array.isArray(ex.answer) ? ex.answer[0] : ex.answer}
        </div>
      )}
      {ex.explanation && <div>{ex.explanation}</div>}
    </div>
  );
}

import React, { useRef, useState } from "react";
import { Download, Upload, Trash2, Volume2 } from "lucide-react";
import { C, serif, sans } from "../theme.js";
import { Card, Btn, SectionLabel, Screen, TAP } from "../components/ui.jsx";
import { exportJSON, importJSON, EMPTY_STATE } from "../lib/storage.js";
import { speak, hasGerman } from "../lib/speech.js";
import { VOCAB } from "../data/vocab.js";

export default function Settings({ store }) {
  const { state, setSettings, replaceAll } = store;
  const fileRef = useRef(null);
  const [msg, setMsg] = useState(null);

  const doExport = () => {
    const blob = new Blob([exportJSON(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deutsch-a1-fortschritt-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMsg({ ok: true, text: "Datei gespeichert." });
  };

  const doImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        replaceAll(importJSON(String(reader.result)));
        setMsg({ ok: true, text: "Fortschritt geladen." });
      } catch {
        setMsg({ ok: false, text: "Datei konnte nicht gelesen werden." });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const reset = () => {
    if (confirm("Wirklich allen Fortschritt löschen? Das kann nicht rückgängig gemacht werden.")) {
      replaceAll({ ...EMPTY_STATE });
      setMsg({ ok: true, text: "Alles zurückgesetzt." });
    }
  };

  const learned = Object.keys(state.cards).length;

  return (
    <Screen title="Einstellungen">
      <SectionLabel>Wiederholen</SectionLabel>
      <Card style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: sans, fontSize: 15, color: C.ink, marginBottom: 4 }}>
          Neue Wörter pro Tag
        </div>
        <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, marginBottom: 14 }}>
          Mehr neue Karten heute heißt mehr Wiederholungen in den nächsten Tagen.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[5, 10, 15, 20, 30].map((n) => (
            <button key={n} onClick={() => setSettings({ newPerDay: n })} style={{
              flex: 1, minHeight: TAP, borderRadius: 11,
              border: `1.5px solid ${state.settings.newPerDay === n ? C.plum : C.line}`,
              background: state.settings.newPerDay === n ? C.plumSoft : C.surface,
              color: state.settings.newPerDay === n ? C.plum : C.ink,
              fontFamily: sans, fontWeight: 700, fontSize: 15,
            }}>
              {n}
            </button>
          ))}
        </div>
      </Card>

      {hasGerman() && (
        <>
          <SectionLabel>Aussprache</SectionLabel>
          <Card style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: sans, fontSize: 15, color: C.ink, marginBottom: 4 }}>
              Sprechgeschwindigkeit
            </div>
            <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, marginBottom: 14 }}>
              Langsam ist am Anfang besser.
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {[["Langsam", 0.6], ["Normal", 0.85], ["Schnell", 1.0]].map(([label, r]) => (
                <button key={r} onClick={() => setSettings({ rate: r })} style={{
                  flex: 1, minHeight: TAP, borderRadius: 11,
                  border: `1.5px solid ${state.settings.rate === r ? C.plum : C.line}`,
                  background: state.settings.rate === r ? C.plumSoft : C.surface,
                  color: state.settings.rate === r ? C.plum : C.ink,
                  fontFamily: sans, fontWeight: 600, fontSize: 14,
                }}>
                  {label}
                </button>
              ))}
            </div>
            <Btn kind="ghost" full
              onClick={() => speak("Guten Tag! Ich lerne Deutsch.", state.settings.rate)}>
              <Volume2 size={16} /> Anhören
            </Btn>
          </Card>
        </>
      )}

      <SectionLabel>Fortschritt sichern</SectionLabel>
      <Card style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: sans, fontSize: 13, color: C.inkSoft, lineHeight: 1.6, marginBottom: 14 }}>
          Dein Fortschritt liegt nur in diesem Browser. Wenn du die Browserdaten
          löschst, ist er weg — exportier ihn ab und zu als Datei.
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <Btn kind="ghost" full onClick={doExport}>
            <Download size={16} /> Exportieren ({learned} Karten)
          </Btn>
          <Btn kind="ghost" full onClick={() => fileRef.current?.click()}>
            <Upload size={16} /> Importieren
          </Btn>
          <input ref={fileRef} type="file" accept="application/json,.json"
            onChange={doImport} style={{ display: "none" }} />
        </div>
        {msg && (
          <div style={{
            fontFamily: sans, fontSize: 13, marginTop: 12, textAlign: "center",
            color: msg.ok ? C.green : C.red,
          }}>
            {msg.text}
          </div>
        )}
      </Card>

      <Card style={{ borderColor: C.red }}>
        <Btn kind="quiet" full onClick={reset} style={{ color: C.red }}>
          <Trash2 size={16} /> Allen Fortschritt löschen
        </Btn>
      </Card>

      <div style={{
        fontFamily: sans, fontSize: 12, color: C.inkSoft,
        textAlign: "center", marginTop: 26, lineHeight: 1.7,
      }}>
        Deutsch A1 Trainer · {VOCAB.length} Wörter · offline nutzbar<br />
        Läuft ohne Konto, ohne Server, ohne Internet.
      </div>
    </Screen>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { Mic, Square, Play, RotateCcw, Volume2, AlertCircle } from "lucide-react";
import { C, serif, sans } from "../theme.js";
import { Btn, TAP } from "./ui.jsx";
import { startRecording, releaseRecording, canRecord } from "../lib/record.js";
import { speak, hasGerman, stopSpeaking } from "../lib/speech.js";

/* Record yourself, then hear the model and yourself back to back.
   Everything stays in memory on this device. */
export default function Recorder({ target, rate = 0.85, compact }) {
  const [rec, setRec] = useState(null);       // active recorder handle
  const [clip, setClip] = useState(null);     // { blob, url, ms }
  const [err, setErr] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // Drop the clip whenever the target changes, and on unmount — object URLs
  // leak otherwise, and a stale recording next to a new word is confusing.
  useEffect(() => {
    return () => {
      setClip((c) => { releaseRecording(c); return null; });
      clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, [target]);

  if (!canRecord()) {
    return (
      <Note>
        Dieses Gerät kann nicht aufnehmen. Du kannst trotzdem zuhören und laut
        mitsprechen.
      </Note>
    );
  }

  const begin = async () => {
    setErr(null);
    releaseRecording(clip);
    setClip(null);
    stopSpeaking();
    try {
      const handle = await startRecording();
      setRec(handle);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } catch (e) {
      const msg = {
        denied: "Kein Zugriff auf das Mikrofon. Erlaube es in den Browser-Einstellungen.",
        nodevice: "Kein Mikrofon gefunden.",
        unsupported: "Dieser Browser kann nicht aufnehmen.",
      }[e.message] || "Aufnahme nicht möglich.";
      setErr(msg);
    }
  };

  const end = async () => {
    clearInterval(timerRef.current);
    if (!rec) return;
    const result = await rec.stop();
    setRec(null);
    setClip(result);
  };

  const playMine = () => {
    stopSpeaking();
    audioRef.current?.play?.();
  };

  /* The whole point of the drill: model, then you, immediately after. */
  const playBoth = () => {
    if (!hasGerman()) return playMine();
    speak(target, rate);
    const wait = Math.max(1400, target.length * 90);
    setTimeout(playMine, wait);
  };

  return (
    <div>
      {err && <Note error>{err}</Note>}

      <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
        {rec ? (
          <Btn kind="bad" onClick={end} style={{ flex: 1 }}>
            <Square size={16} fill="currentColor" /> Stopp · {elapsed}s
          </Btn>
        ) : (
          <Btn onClick={begin} style={{ flex: 1 }}>
            <Mic size={17} /> {clip ? "Nochmal aufnehmen" : "Aufnehmen"}
          </Btn>
        )}

        {hasGerman() && !rec && (
          <Btn kind="ghost" onClick={() => speak(target, rate)}
            style={{ width: TAP + 8, padding: 0 }} aria-label="Vorbild anhören">
            <Volume2 size={18} />
          </Btn>
        )}
      </div>

      {rec && (
        <div style={{
          fontFamily: sans, fontSize: 13, color: C.red, textAlign: "center",
          marginTop: 10, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 7,
        }}>
          <span style={{
            width: 9, height: 9, borderRadius: 5, background: C.red,
            animation: "pulse 1s ease-in-out infinite",
          }} />
          Sprich jetzt…
        </div>
      )}

      {clip && !rec && (
        <>
          <audio ref={audioRef} src={clip.url} preload="auto" />
          <div style={{ display: "flex", gap: 9, marginTop: 10 }}>
            <Btn kind="ghost" onClick={playMine} style={{ flex: 1 }}>
              <Play size={16} /> Meine Aufnahme
            </Btn>
            {hasGerman() && (
              <Btn kind="ghost" onClick={playBoth} style={{ flex: 1 }}>
                <RotateCcw size={16} /> Vergleichen
              </Btn>
            )}
          </div>
          {!compact && (
            <div style={{
              fontFamily: sans, fontSize: 12.5, color: C.inkSoft,
              textAlign: "center", marginTop: 9, lineHeight: 1.5,
            }}>
              „Vergleichen“ spielt erst das Vorbild, dann dich.
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Note({ children, error }) {
  return (
    <div style={{
      display: "flex", gap: 9, alignItems: "flex-start",
      background: error ? C.redSoft : C.goldSoft,
      border: `1px solid ${error ? C.red : C.gold}`,
      borderRadius: 11, padding: 12, marginBottom: 12,
      fontFamily: sans, fontSize: 13.5, lineHeight: 1.55, color: C.ink,
    }}>
      <AlertCircle size={16} color={error ? C.red : C.gold} style={{ flexShrink: 0, marginTop: 1 }} />
      <div>{children}</div>
    </div>
  );
}

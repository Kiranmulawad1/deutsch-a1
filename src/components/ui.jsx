import React from "react";
import { Volume2 } from "lucide-react";
import { C, serif, sans } from "../theme.js";
import { speak, hasGerman } from "../lib/speech.js";

export const TAP = 44; // minimum touch target, px

export function Card({ children, style, onClick, ...rest }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.surface,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        padding: 16,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Btn({ kind = "primary", children, style, full, ...rest }) {
  const base = {
    minHeight: TAP,
    borderRadius: 12,
    fontFamily: sans,
    fontWeight: 600,
    fontSize: 16,
    padding: "12px 18px",
    border: "1px solid transparent",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: full ? "100%" : undefined,
    transition: "transform .08s ease",
  };
  const kinds = {
    primary: { background: C.plum, color: "#fff" },
    ghost: { background: "transparent", color: C.ink, borderColor: C.line },
    quiet: { background: "transparent", color: C.inkSoft, border: "none" },
    good: { background: C.green, color: "#fff" },
    bad: { background: C.red, color: "#fff" },
  };
  return (
    <button
      style={{ ...base, ...kinds[kind], ...style }}
      onPointerDown={(e) => (e.currentTarget.style.transform = "scale(.97)")}
      onPointerUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onPointerLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ProgressRing({ value, size = 54, stroke = 6, color = C.plum, label }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - Math.max(0, Math.min(1, value)));
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.line} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset .6s ease" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: sans, fontSize: size * 0.24,
        fontWeight: 700, color: C.ink,
      }}>
        {label ?? `${Math.round(value * 100)}%`}
      </div>
    </div>
  );
}

export function Stamp({ label = "Geschafft!", icon }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8, transform: "rotate(-8deg)",
      border: `3px solid ${C.green}`, color: C.green, borderRadius: 12, padding: "8px 16px",
      fontFamily: serif, fontWeight: 700, fontSize: 20, letterSpacing: 1,
      background: C.greenSoft,
    }}>
      {icon} {label}
    </div>
  );
}

export function SectionLabel({ children, style }) {
  return (
    <div style={{
      fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: 1.4,
      textTransform: "uppercase", color: C.inkSoft, marginBottom: 8, ...style,
    }}>
      {children}
    </div>
  );
}

/* Hidden entirely when the device has no German voice — an English voice
   reading German would teach the wrong pronunciation. */
export function Speak({ text, rate = 0.85, size = 18 }) {
  if (!hasGerman() || !text) return null;
  return (
    <button
      aria-label={`Say "${text}" in German`}
      onClick={(e) => { e.stopPropagation(); speak(text, rate); }}
      style={{
        minWidth: TAP, minHeight: TAP, border: "none", background: "transparent",
        color: C.plum, display: "inline-flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0,
      }}
    >
      <Volume2 size={size} />
    </button>
  );
}

export function Screen({ title, children, pad = 16 }) {
  return (
    <div style={{ padding: pad, paddingBottom: 24, maxWidth: 720, margin: "0 auto" }}>
      {title && (
        <h1 style={{
          fontFamily: serif, fontSize: 26, margin: "4px 0 18px", color: C.ink, fontWeight: 700,
        }}>
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}

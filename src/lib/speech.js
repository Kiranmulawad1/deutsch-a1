/* Web Speech API wrapper. Offline on most devices, no key, no network.
   If the device has no German voice we report unavailable and the UI
   hides every audio control rather than reading German in an English voice. */

let cachedVoice = null;
let resolved = false;

function pickVoice() {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  return (
    voices.find((v) => v.lang === "de-DE" && v.localService) ||
    voices.find((v) => v.lang === "de-DE") ||
    voices.find((v) => v.lang?.startsWith("de")) ||
    null
  );
}

export function initSpeech(onReady) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    resolved = true;
    onReady?.(false);
    return;
  }
  const settle = () => {
    cachedVoice = pickVoice();
    resolved = true;
    onReady?.(!!cachedVoice);
  };
  if (window.speechSynthesis.getVoices().length) settle();
  else {
    window.speechSynthesis.addEventListener("voiceschanged", settle, { once: true });
    // Some browsers never fire the event; settle anyway so the UI resolves.
    setTimeout(settle, 1200);
  }
}

export const speechReady = () => resolved;
export const hasGerman = () => !!cachedVoice;

export function speak(text, rate = 0.85) {
  if (!cachedVoice || !text) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = cachedVoice;
    u.lang = cachedVoice.lang || "de-DE";
    u.rate = rate;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  } catch { /* device refused — silently no-op */ }
}

export function stopSpeaking() {
  try { window.speechSynthesis?.cancel(); } catch {}
}

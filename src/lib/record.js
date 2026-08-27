/* Microphone recording, entirely local.
   Audio is captured to a Blob in memory, played back from an object URL,
   and dropped when you leave the screen. Nothing is uploaded, stored, or
   sent anywhere — this works in airplane mode. */

/* Safari and Chrome disagree on container format, so ask rather than assume. */
function pickMime() {
  if (typeof MediaRecorder === "undefined") return null;
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",           // Safari / iOS
    "audio/ogg;codecs=opus",
  ];
  return candidates.find((t) => {
    try { return MediaRecorder.isTypeSupported(t); } catch { return false; }
  }) || null;
}

export function canRecord() {
  return !!(
    typeof navigator !== "undefined" &&
    navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined"
  );
}

/* Returns { stop } — call stop() to get the recording as { blob, url, ms }.
   onError receives a short, human reason (permission, no device, unsupported). */
export async function startRecording() {
  if (!canRecord()) throw new Error("unsupported");

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true },
    });
  } catch (e) {
    // NotAllowedError = denied; NotFoundError = no microphone
    throw new Error(e?.name === "NotAllowedError" ? "denied" : "nodevice");
  }

  const mime = pickMime();
  const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
  const chunks = [];
  const started = Date.now();
  rec.ondataavailable = (e) => { if (e.data?.size) chunks.push(e.data); };
  rec.start();

  return {
    stop: () =>
      new Promise((resolve) => {
        rec.onstop = () => {
          // Always release the mic — otherwise the browser keeps the
          // recording indicator on and the phone keeps the mic hot.
          stream.getTracks().forEach((t) => t.stop());
          const blob = new Blob(chunks, { type: mime || "audio/webm" });
          resolve({ blob, url: URL.createObjectURL(blob), ms: Date.now() - started });
        };
        try { rec.stop(); } catch { rec.onstop?.(); }
      }),
    cancel: () => {
      try { rec.stop(); } catch {}
      stream.getTracks().forEach((t) => t.stop());
    },
  };
}

export function releaseRecording(rec) {
  if (rec?.url) { try { URL.revokeObjectURL(rec.url); } catch {} }
}

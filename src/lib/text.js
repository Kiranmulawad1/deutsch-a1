/* Forgiving answer matching for typed German.
   Accepts ss/ae/oe/ue transliterations, ignores case, spacing and
   trailing punctuation — then the UI shows the correct spelling anyway. */

export function normalize(s) {
  return (s || "")
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:]+$/g, "")
    .replace(/\s+/g, " ")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue");
}

export function matches(input, expected) {
  const a = normalize(input);
  if (!a) return false;
  const list = Array.isArray(expected) ? expected : [expected];
  return list.some((e) => normalize(e) === a);
}

/* Word-level diff for dictation feedback. */
export function diffWords(input, expected) {
  const got = (input || "").trim().split(/\s+/).filter(Boolean);
  const want = expected.trim().split(/\s+/);
  return want.map((w, i) => ({
    word: w,
    ok: got[i] != null && normalize(got[i]) === normalize(w),
  }));
}

/* Turns the static content into runnable exercises.
   Every generator returns objects the <Exercise> component understands. */

/* The distractor pool is passed in, so exercises stay inside the level
   the learner is studying. */

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const pick = (arr, n) => shuffle(arr).slice(0, n);

/* ---- from the authored grammar quizzes ---- */
export function fromQuiz(q) {
  // Options are shuffled, so the stored answer index has to move with them.
  const tagged = shuffle(q.opts.map((o, i) => ({ o, correct: i === q.a })));
  return {
    kind: "choice",
    hint: q.topic,
    prompt: q.q,
    options: tagged.map((t) => t.o),
    answer: tagged.findIndex((t) => t.correct),
    explanation: q.ex,
  };
}

/* ---- vocabulary: recognition and production ---- */
export function vocabChoice(word, dir = "de-en", all = []) {
  const others = all.filter((w) => w.id !== word.id);
  const sameType = others.filter((w) => w.type === word.type);
  const distractors = pick(sameType.length >= 3 ? sameType : others, 3);
  const deToEn = dir === "de-en";
  const correct = deToEn ? word.en : word.full;
  const opts = shuffle([correct, ...distractors.map((d) => (deToEn ? d.en : d.full))]);
  return {
    kind: "choice",
    hint: deToEn ? "Was bedeutet das?" : "Wie sagt man das?",
    prompt: deToEn ? word.full : word.en,
    say: deToEn ? word.full : null,
    options: opts,
    answer: opts.indexOf(correct),
    explanation: `${word.full} — ${word.en}\n${word.ex_de}`,
  };
}

export function vocabTypeIn(word) {
  return {
    kind: "type-in",
    hint: "Auf Deutsch schreiben",
    prompt: word.en,
    sub: word.article ? "Mit Artikel schreiben (der/die/das)" : null,
    answer: word.article ? [word.full, word.de] : [word.de],
    explanation: `${word.full} — ${word.en}\n${word.ex_de}`,
  };
}

export function genderDrill(noun) {
  const opts = ["der", "die", "das"];
  return {
    kind: "gender",
    hint: "Welcher Artikel?",
    prompt: noun.de,
    say: noun.full,
    options: opts,
    answer: opts.indexOf(noun.article),
    explanation: `${noun.full}${noun.plural ? ` (Pl. ${noun.plural})` : ""} — ${noun.en}`,
  };
}

export function clozeFromWord(word) {
  // Blank the target word out of its own example sentence.
  const re = new RegExp(`\\b${word.de.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  if (!re.test(word.ex_de)) return null;
  return {
    kind: "type-in",
    hint: "Lücke füllen",
    prompt: word.ex_de.replace(re, "______"),
    sub: word.en,
    answer: [word.de],
    explanation: `${word.ex_de}\n${word.ex_en}`,
  };
}

export function dictation(word) {
  return {
    kind: "dictation",
    answer: word.ex_de,
    translation: word.ex_en,
  };
}

/* ---- sentence building from grammar examples ---- */
export function orderFromExample(de, en, topicTitle) {
  const tiles = de.replace(/[.?!]$/, "").split(/\s+/);
  if (tiles.length < 3 || tiles.length > 9) return null;
  return {
    kind: "order",
    hint: topicTitle,
    prompt: en,
    sub: "Bau den deutschen Satz",
    tiles: shuffle(tiles),
    answer: de.replace(/[.?!]$/, ""),
    explanation: de,
  };
}

/* ---- verb conjugation ---- */
const PERSONS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

const IRREGULAR = {
  sein:    ["bin", "bist", "ist", "sind", "seid", "sind"],
  haben:   ["habe", "hast", "hat", "haben", "habt", "haben"],
  werden:  ["werde", "wirst", "wird", "werden", "werdet", "werden"],
  können:  ["kann", "kannst", "kann", "können", "könnt", "können"],
  müssen:  ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
  wollen:  ["will", "willst", "will", "wollen", "wollt", "wollen"],
  dürfen:  ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
  sollen:  ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
  mögen:   ["mag", "magst", "mag", "mögen", "mögt", "mögen"],
  möchten: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"],
  wissen:  ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"],
  fahren:  ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"],
  lesen:   ["lese", "liest", "liest", "lesen", "lest", "lesen"],
  sehen:   ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"],
  essen:   ["esse", "isst", "isst", "essen", "esst", "essen"],
  sprechen:["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"],
  nehmen:  ["nehme", "nimmst", "nimmt", "nehmen", "nehmt", "nehmen"],
  geben:   ["gebe", "gibst", "gibt", "geben", "gebt", "geben"],
  helfen:  ["helfe", "hilfst", "hilft", "helfen", "helft", "helfen"],
  laufen:  ["laufe", "läufst", "läuft", "laufen", "lauft", "laufen"],
  schlafen:["schlafe", "schläfst", "schläft", "schlafen", "schlaft", "schlafen"],
  tragen:  ["trage", "trägst", "trägt", "tragen", "tragt", "tragen"],
  treffen: ["treffe", "triffst", "trifft", "treffen", "trefft", "treffen"],
  vergessen:["vergesse", "vergisst", "vergisst", "vergessen", "vergesst", "vergessen"],
};

export function conjugate(verb) {
  if (IRREGULAR[verb]) return IRREGULAR[verb];
  if (!verb.endsWith("en")) return null;
  const stem = verb.slice(0, -2);
  // Stems ending -t/-d/-chn take a linking -e: du arbeitest, er arbeitet
  const needsE = /[td]$/.test(stem) || /[gc]hn$/.test(stem);
  const e = needsE ? "e" : "";
  // Stems ending in a sibilant absorb the -st: du heißt, not du heißst
  const sib = /[sßxz]$/.test(stem);
  return [
    stem + "e",
    stem + e + (sib && !needsE ? "t" : "st"),
    stem + e + "t",
    verb,
    stem + e + "t",
    verb,
  ];
}

export function conjugationExercise(verbWord) {
  const forms = conjugate(verbWord.de);
  if (!forms) return null;
  return {
    kind: "conjugate",
    hint: "Präsens konjugieren",
    prompt: verbWord.de,
    sub: verbWord.en,
    rows: PERSONS.map((p, i) => [p, forms[i]]),
    explanation: `${verbWord.ex_de} — ${verbWord.ex_en}`,
  };
}

/* ---- case picking ---- */
const CASE_ITEMS = [
  { s: "Ich sehe ___ Mann.", o: ["der", "den", "dem"], a: 1, ex: "Direct object → Akkusativ; masculine der → den." },
  { s: "___ Frau kommt aus Berlin.", o: ["Die", "Der", "Den"], a: 0, ex: "Subject → Nominativ; Frau is feminine → die." },
  { s: "Ich gebe ___ Kind das Buch.", o: ["das", "dem", "den"], a: 1, ex: "Indirect object → Dativ; neuter das → dem." },
  { s: "Wir besuchen ___ Museum.", o: ["das", "dem", "der"], a: 0, ex: "Neuter does not change in the Akkusativ: das Museum." },
  { s: "Ich fahre mit ___ Bus.", o: ["den", "dem", "der"], a: 1, ex: "„mit“ always takes Dativ; der Bus → dem Bus." },
  { s: "Ich kaufe ___ Tasche.", o: ["eine", "einen", "einem"], a: 0, ex: "Feminine does not change in the Akkusativ: eine Tasche." },
  { s: "Er hilft ___ Kollegin.", o: ["die", "der", "den"], a: 1, ex: "„helfen“ takes Dativ; die Kollegin → der Kollegin." },
  { s: "Das Buch liegt auf ___ Tisch.", o: ["den", "dem", "der"], a: 1, ex: "Wechselpräposition + position (wo?) → Dativ: auf dem Tisch." },
  { s: "Ich lege das Buch auf ___ Tisch.", o: ["den", "dem", "der"], a: 0, ex: "Wechselpräposition + movement (wohin?) → Akkusativ: auf den Tisch." },
  { s: "Ich habe ___ Bruder.", o: ["ein", "einen", "einem"], a: 1, ex: "„haben“ takes Akkusativ; masculine ein → einen." },
  { s: "Der Termin passt ___ gut.", o: ["mich", "mir", "ich"], a: 1, ex: "„passen“ takes Dativ → mir." },
  { s: "Kannst du ___ helfen?", o: ["mich", "mir", "ich"], a: 1, ex: "„helfen“ takes Dativ → mir." },
  { s: "Ich verstehe ___ nicht.", o: ["dir", "dich", "du"], a: 1, ex: "„verstehen“ takes Akkusativ → dich." },
  { s: "Die Stadt gefällt ___.", o: ["mich", "mir", "ich"], a: 1, ex: "„gefallen“ takes Dativ → mir." },
  { s: "Wir gehen in ___ Park.", o: ["den", "dem", "der"], a: 0, ex: "Movement (wohin?) → Akkusativ: in den Park." },
];

export function caseExercises(n = 10) {
  return pick(CASE_ITEMS, Math.min(n, CASE_ITEMS.length)).map((it) => {
    const tagged = shuffle(it.o.map((o, i) => ({ o, correct: i === it.a })));
    return {
      kind: "choice",
      hint: "Welcher Kasus?",
      prompt: it.s,
      options: tagged.map((t) => t.o),
      answer: tagged.findIndex((t) => t.correct),
      explanation: it.ex,
    };
  });
}

/* ---- mixed session builder for a vocabulary review card ---- */
export function exercisesForWord(word, all = []) {
  const out = [vocabChoice(word, "de-en", all)];
  if (word.article) out.push(genderDrill(word));
  const cloze = clozeFromWord(word);
  if (cloze) out.push(cloze);
  out.push(vocabTypeIn(word));
  return out;
}

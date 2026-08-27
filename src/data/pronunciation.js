/* Pronunciation content aimed at the sounds English and Hindi speakers
   actually get wrong in German — not a general phonetics reference.

   SOUNDS  = how to make it, plus words to try
   PAIRS   = minimal pairs: two words differing in one sound, so the ear
             has to make the distinction before the mouth can.
*/

export const SOUNDS = [
  {
    id: "ue", symbol: "ü", name: "Das ü",
    how: "Say “ee” as in see — then, without moving your tongue at all, round your lips as if for “oo”. The tongue position is the whole trick; English has no equivalent, so your mouth will want to slide to “oo”.",
    warn: "If it comes out as “oo”, your tongue moved back. Keep it forward.",
    words: ["für", "über", "Tür", "müde", "grün", "fünf", "Bücher", "natürlich"],
  },
  {
    id: "oe", symbol: "ö", name: "Das ö",
    how: "Say “eh” as in bed — then round your lips while holding the tongue still. Same move as ü, but starting from a more open vowel.",
    warn: "Not “oh”. If your tongue slid back, you'll get schon instead of schön.",
    words: ["schön", "können", "möchten", "hören", "Köln", "zwölf", "Löffel"],
  },
  {
    id: "ae", symbol: "ä", name: "Das ä",
    how: "Close to the “e” in bed. Long ä (spät, Käse) is that same sound held longer — not the “ay” of English day.",
    warn: "Don't let it drift to an English “ay” diphthong. It's one steady vowel.",
    words: ["spät", "Käse", "Mädchen", "erzählen", "Universität"],
  },
  {
    id: "ich", symbol: "ch", name: "Der ich-Laut",
    how: "After i, e, ä, ö, ü, ei, eu and after consonants. Start from the “h” in huge or the middle of Hindi “ही” — breath hissing over the middle of the tongue. Never a “k”.",
    warn: "“ish” is the common substitute and is instantly audible. Keep the tongue high and forward, lips unrounded.",
    words: ["ich", "nicht", "richtig", "Milch", "München", "sprechen", "möchte"],
  },
  {
    id: "ach", symbol: "ch", name: "Der ach-Laut",
    how: "After a, o, u, au — much further back, a rasp at the throat. Similar to Hindi “ख़” or the ch in Scottish loch.",
    warn: "Same spelling as the ich-Laut, different sound. The vowel before it decides which one you use.",
    words: ["auch", "Buch", "acht", "Sprache", "besuchen", "Woche", "kochen"],
  },
  {
    id: "r", symbol: "r", name: "Das R",
    how: "German r is uvular — made at the very back, near where you gargle. At the end of a syllable (Vater, Bier, mehr) it barely sounds like an r at all; it softens into a short “uh”.",
    warn: "Don't roll it with the tongue tip like the Hindi र, and don't curl it like the American r.",
    words: ["rot", "Frau", "sprechen", "Vater", "Bier", "vier", "Uhr"],
  },
  {
    id: "z", symbol: "z", name: "Das Z",
    how: "Always “ts”, never English “z”. Zeit sounds like tsait. The t is part of the letter.",
    warn: "This one is worth over-doing at first — English speakers drop the t almost every time.",
    words: ["Zeit", "zehn", "zwei", "Zimmer", "Zucker", "tanzen", "Platz"],
  },
  {
    id: "w", symbol: "w / v", name: "W und V",
    how: "German w is the English v — Wein sounds like vine. German v is usually the English f — Vater sounds like fah-ter.",
    warn: "The two letters swap roles compared to English. In loanwords (Video, Vase) v does sound like v.",
    words: ["Wein", "Wasser", "wohnen", "Vater", "vier", "verstehen", "viel"],
  },
  {
    id: "s", symbol: "s", name: "Das S",
    how: "Before a vowel, s is voiced like an English z — Sonne is zonne, sieben is zieben. At the end of a word it's a plain s.",
    warn: "ß and ss are always the sharp, unvoiced s: heißen, Wasser.",
    words: ["Sonne", "sieben", "sagen", "Haus", "heißen", "Wasser"],
  },
  {
    id: "stsp", symbol: "st / sp", name: "St und Sp",
    how: "At the start of a word or stem, st is “sht” and sp is “shp”. Straße is shtrasse, sprechen is shprechen.",
    warn: "Only at the beginning. In the middle or end it stays “st”: ist, Fenster.",
    words: ["Straße", "Student", "stehen", "sprechen", "Sport", "spät"],
  },
  {
    id: "eiie", symbol: "ei / ie", name: "Ei und Ie",
    how: "Read the second letter. “ei” says the name of the letter i — mein rhymes with mine. “ie” is a long ee — vier sounds like feer.",
    warn: "This is the single most common reading mistake for English speakers. Wein and Wien are different words.",
    words: ["mein", "heißen", "Zeit", "vier", "sieben", "Bier", "wieder"],
  },
  {
    id: "final", symbol: "-b -d -g", name: "Auslautverhärtung",
    how: "At the end of a word, b, d and g harden to p, t and k. Rad sounds exactly like Rat. Tag ends like Tak.",
    warn: "This means some pairs are pronounced identically and only spelling tells them apart.",
    words: ["Rad", "Tag", "halb", "und", "Kind", "Berg", "gelb"],
  },
  {
    id: "er", symbol: "-er", name: "Endung -er",
    how: "An unstressed -er at the end of a word is a soft “uh”, not an American r. Vater is fah-tuh, Wasser is vass-uh.",
    warn: "Pronouncing the r here is one of the strongest English-accent markers in German.",
    words: ["Vater", "Mutter", "Wasser", "Lehrer", "besser", "Zimmer", "aber"],
  },
];

/* Two words that differ in exactly one sound. If you can hear the
   difference, you can learn to make it. */
export const PAIRS = [
  { sound: "ue", a: "vier", b: "für", hint: "ie → ü" },
  { sound: "ue", a: "Tier", b: "Tür", hint: "ie → ü" },
  { sound: "ue", a: "missen", b: "müssen", hint: "i → ü" },
  { sound: "ue", a: "Mutter", b: "Mütter", hint: "u → ü (singular → plural)" },
  { sound: "ue", a: "Bruder", b: "Brüder", hint: "u → ü (singular → plural)" },
  { sound: "oe", a: "schon", b: "schön", hint: "o → ö · already → beautiful" },
  { sound: "oe", a: "konnte", b: "könnte", hint: "o → ö · could → would be able to" },
  { sound: "oe", a: "Sohn", b: "Söhne", hint: "o → ö (singular → plural)" },
  { sound: "ae", a: "Bett", b: "Beet", hint: "short e → long e" },
  { sound: "ae", a: "Stadt", b: "Staat", hint: "short a → long a · city → state" },
  { sound: "ich", a: "ich", b: "auch", hint: "ich-Laut → ach-Laut" },
  { sound: "ich", a: "dich", b: "Dach", hint: "ich-Laut → ach-Laut" },
  { sound: "ich", a: "Kirche", b: "Kirsche", hint: "ch → sch · church → cherry" },
  { sound: "z", a: "Zeit", b: "seit", hint: "ts → z · time → since" },
  { sound: "z", a: "zehn", b: "sehen", hint: "ts → z · ten → to see" },
  { sound: "w", a: "Wein", b: "fein", hint: "v → f · wine → fine" },
  { sound: "w", a: "Wetter", b: "Vetter", hint: "w → v · weather → cousin" },
  { sound: "eiie", a: "Wein", b: "Wien", hint: "ei → ie · wine → Vienna" },
  { sound: "eiie", a: "heißen", b: "hießen", hint: "ei → ie" },
  { sound: "eiie", a: "Bein", b: "Biene", hint: "ei → ie · leg → bee" },
  { sound: "final", a: "Rad", b: "Rat", hint: "spelled apart, said the same" },
  { sound: "final", a: "seit", b: "seid", hint: "spelled apart, said the same" },
  { sound: "ue", a: "Hütte", b: "Hüte", hint: "short ü → long ü · hut → hats" },
  { sound: "s", a: "reisen", b: "reißen", hint: "voiced s → sharp ß" },
];

/* Longer sentences worth shadowing — chosen because they stack several
   hard sounds into one breath. */
export const TONGUE_TWISTERS = [
  ["Ich möchte fünf Brötchen, bitte.", "I'd like five bread rolls, please."],
  ["Der Zug nach Zürich fährt um zwölf.", "The train to Zurich leaves at twelve."],
  ["Meine Schwester spricht sehr schnell Deutsch.", "My sister speaks German very fast."],
  ["Wir wohnen in einer schönen Wohnung.", "We live in a beautiful flat."],
  ["Können Sie das bitte wiederholen?", "Could you please repeat that?"],
  ["Ich verstehe nicht, sprechen Sie bitte langsamer.", "I don't understand, please speak more slowly."],
  ["Am Mittwoch möchte ich früh aufstehen.", "On Wednesday I'd like to get up early."],
  ["Die Kirche ist zwischen der Post und der Bäckerei.", "The church is between the post office and the bakery."],
  ["Zwölf Zwerge zeigen zwei Zitronen.", "Twelve dwarves show two lemons."],
  ["Natürlich trinke ich türkischen Tee.", "Of course I drink Turkish tea."],
];

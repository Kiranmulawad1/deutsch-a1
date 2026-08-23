/* Chapters + grammar topics — extracted verbatim from DeutschA1.jsx.
   Wording of def/struktur/ex/tip/quiz is authored content: do not paraphrase. */

const CHAPTERS = [
  { n: 1, title: "Guten Tag!", en: "Greetings & introductions" },
  { n: 2, title: "Erste Kontakte am Arbeitsplatz", en: "First contacts at work" },
  { n: 3, title: "Unterwegs in München", en: "Out and about in Munich" },
  { n: 4, title: "Essen und Trinken", en: "Food and drink" },
  { n: 5, title: "Alltag", en: "Everyday life" },
  { n: 6, title: "Reisen", en: "Travel" },
  { n: 7, title: "Wohnen", en: "Living / housing" },
  { n: 8, title: "Begegnungen und Ereignisse", en: "Encounters and events" },
];

const TOPICS = [
  /* ---------------- KAPITEL 1 ---------------- */
  {
    ch: 1, id: "1.1", title: "Personalpronomen", en: "Personal pronouns",
    def: "Personalpronomen replace a person's name (I, you, he, she…). German has more forms than English because the verb ending changes with each pronoun.",
    struktur: "Pronomen + Verb (conjugated)",
    ex: [
      ["ich komme", "I come"],
      ["du kommst", "you come (informal, 1 person)"],
      ["er / sie / es kommt", "he / she / it comes"],
      ["wir kommen", "we come"],
      ["ihr kommt", "you come (informal group)"],
      ["sie / Sie kommen", "they come / you (formal)"],
    ],
    tip: "Sie (capital S) = formal “you”. It always looks like “they” in the verb form.",
    quiz: [
      { q: "Which pronoun means the formal “you”?", opts: ["du", "ihr", "Sie", "es"], a: 2,
        ex: "“Sie” (capital S) is the polite/formal “you”. “du” and “ihr” are informal." },
      { q: "Complete: ___ kommt aus Indien. (he)", opts: ["ich", "er", "wir", "ihr"], a: 1,
        ex: "“er” = he. The verb “kommt” matches er/sie/es." },
    ],
  },
  {
    ch: 1, id: "1.2", title: "Verben im Präsens", en: "Present-tense verbs",
    def: "Present tense is used for things happening now, general facts, or habits. Take the stem of the verb (drop -en) and add an ending that matches the subject.",
    struktur: "Stamm + Endung  (-e, -st, -t, -en, -t, -en)",
    ex: [
      ["Ich wohne in Basavana Bagewadi.", "I live in Basavana Bagewadi."],
      ["Du lernst Deutsch.", "You are learning German."],
      ["Wir spielen Fußball.", "We play football."],
    ],
    tip: "If the stem ends in -t or -d (arbeiten), add an extra -e: du arbeitest, er arbeitet.",
    quiz: [
      { q: "Complete: Du ___ Deutsch. (lernen)", opts: ["lerne", "lernst", "lernt", "lernen"], a: 1,
        ex: "With “du”, add -st: du lernst." },
      { q: "Complete: Er ___ in München. (wohnen)", opts: ["wohne", "wohnst", "wohnt", "wohnen"], a: 2,
        ex: "With er/sie/es, add -t: er wohnt." },
    ],
  },
  {
    ch: 1, id: "1.3", title: "Aussagesätze", en: "Statement sentences",
    def: "A normal statement. The key rule: the conjugated verb is always in position 2 — no matter what comes first.",
    struktur: "Position 1 (Subjekt/other) + Position 2 (Verb) + rest",
    ex: [
      ["Ich heiße Kiran.", "My name is Kiran."],
      ["Heute lerne ich Deutsch.", "Today I am learning German. (verb stays in position 2!)"],
      ["Mein Freund kommt aus Indien.", "My friend comes from India."],
    ],
    tip: "English allows “Today I learn” — German keeps the verb in position 2, so “ich” jumps behind it.",
    quiz: [
      { q: "Which is correct German word order?", opts: ["Heute ich lerne Deutsch.", "Heute lerne ich Deutsch.", "Ich heute lerne Deutsch.", "Lerne heute ich Deutsch."], a: 1,
        ex: "The verb must be in position 2, so the subject “ich” moves after “lerne”." },
    ],
  },
  {
    ch: 1, id: "1.4", title: "Fragesätze", en: "Questions",
    def: "Two kinds: W-Fragen use a question word (wer, was, wie, wo, woher…) and keep the verb in position 2. Ja/Nein-Fragen have no question word and the verb jumps to position 1.",
    struktur: "W-Frage: Fragewort + Verb + Subjekt … ?   |   Ja/Nein: Verb + Subjekt … ?",
    ex: [
      ["Wie heißt du?", "What is your name?"],
      ["Woher kommst du?", "Where are you from?"],
      ["Kommst du aus Indien?", "Are you from India?"],
    ],
    tip: "No question word → verb goes first (a yes/no question).",
    quiz: [
      { q: "How do you ask a yes/no question: “Do you come from India?”", opts: ["Du kommst aus Indien?", "Woher kommst du?", "Kommst du aus Indien?", "Aus Indien du kommst?"], a: 2,
        ex: "In a yes/no question the verb comes first: “Kommst du …?”" },
      { q: "Which word asks “where … from?”", opts: ["wo", "wohin", "woher", "wer"], a: 2,
        ex: "“woher” = where from (origin). “wo” = where, “wohin” = where to." },
    ],
  },
  {
    ch: 1, id: "1.5", title: "Bestimmter Artikel", en: "Definite article (“the”)",
    def: "German nouns have three genders: der (masc.), die (fem.), das (neuter), plus die for plural. You usually memorize the gender with the noun.",
    struktur: "der / die / das + Nomen",
    ex: [
      ["der Mann", "the man (masc.)"],
      ["die Frau", "the woman (fem.)"],
      ["das Kind", "the child (neuter)"],
    ],
    tip: "Always learn a new noun WITH its article, e.g. “die Stadt”, not just “Stadt”.",
    quiz: [
      { q: "Which article goes with “Frau”?", opts: ["der", "die", "das", "den"], a: 1,
        ex: "Frau is feminine → die Frau." },
      { q: "Which article goes with “Kind”?", opts: ["der", "die", "das", "dem"], a: 2,
        ex: "Kind is neuter → das Kind." },
    ],
  },
  {
    ch: 1, id: "1.6", title: "Possessivartikel", en: "Possessive articles",
    def: "Words like my, your, his, her that show ownership. They match the gender of the noun that follows — not the speaker.",
    struktur: "mein / dein / sein / ihr … + Nomen",
    ex: [
      ["mein Name", "my name"],
      ["deine Stadt", "your city"],
      ["sein Bruder / ihre Schwester", "his brother / her sister"],
    ],
    tip: "mein → masc./neuter, meine → fem./plural. It matches the noun, not you!",
    quiz: [
      { q: "“my city” — Stadt is feminine. Choose:", opts: ["mein Stadt", "meine Stadt", "meinen Stadt", "meins Stadt"], a: 1,
        ex: "Feminine nouns take -e: meine Stadt." },
      { q: "“her brother” =", opts: ["sein Bruder", "ihre Bruder", "ihr Bruder", "seine Bruder"], a: 2,
        ex: "“her” = ihr; Bruder is masculine so no ending: ihr Bruder." },
    ],
  },

  /* ---------------- KAPITEL 2 ---------------- */
  {
    ch: 2, id: "2.1", title: "Nomengruppe im Nominativ", en: "Noun phrase — nominative",
    def: "Nominative is the case for the subject — the one doing the action. It uses the basic article forms (der/die/das, ein/eine/ein).",
    struktur: "der / die / das / ein / eine + Nomen (as subject)",
    ex: [
      ["Der Computer ist neu.", "The computer is new."],
      ["Eine Kollegin kommt.", "A (female) colleague is coming."],
      ["Das Büro ist groß.", "The office is big."],
    ],
    tip: "Ask “who or what is doing the verb?” — that part is in the nominative.",
    quiz: [
      { q: "The subject of a sentence is in which case?", opts: ["Akkusativ", "Dativ", "Nominativ", "Genitiv"], a: 2,
        ex: "The subject (the doer) is always nominative." },
    ],
  },
  {
    ch: 2, id: "2.2", title: "Unbestimmter Artikel", en: "Indefinite article (“a/an”)",
    def: "Used for something non-specific or mentioned for the first time. There is no plural form of “ein” — you just drop it in the plural.",
    struktur: "ein (masc./neuter) / eine (fem.) + Nomen",
    ex: [
      ["ein Tisch", "a table (masc.)"],
      ["eine Tasche", "a bag (fem.)"],
      ["ein Handy", "a phone (neuter)"],
    ],
    tip: "eine = feminine only. Masculine and neuter both use “ein” in the nominative.",
    quiz: [
      { q: "“a bag” — Tasche is feminine:", opts: ["ein Tasche", "eine Tasche", "einen Tasche", "das Tasche"], a: 1,
        ex: "Feminine → eine Tasche." },
    ],
  },
  {
    ch: 2, id: "2.3", title: "Modalverb: können", en: "Modal verb “can”",
    def: "“Können” = can / to be able to. A modal verb takes position 2 and pushes the main verb to the very end as an infinitive.",
    struktur: "Subjekt + Modalverb (Pos. 2) + … + Infinitiv (end)",
    ex: [
      ["Ich kann gut kochen.", "I can cook well."],
      ["Kannst du Deutsch sprechen?", "Can you speak German?"],
      ["Wir können heute nicht kommen.", "We cannot come today."],
    ],
    tip: "können: ich kann, du kannst, er kann, wir können, ihr könnt, sie können. No ending on ich/er!",
    quiz: [
      { q: "Where does the main verb “sprechen” go?", opts: ["Right after the subject", "In position 2", "At the very end", "It disappears"], a: 2,
        ex: "With a modal verb, the main verb goes to the end as an infinitive: “… Deutsch sprechen.”" },
      { q: "Complete: Ich ___ gut kochen.", opts: ["kannst", "kann", "können", "könnt"], a: 1,
        ex: "ich kann — no ending on the “ich” form." },
    ],
  },
  {
    ch: 2, id: "2.4", title: "Negation (nicht / kein)", en: "Negation",
    def: "“nicht” negates a verb, adjective, or the whole sentence. “kein/keine” negates a noun that would otherwise take “ein” or no article.",
    struktur: "nicht: usually at the end / before what it negates  •  kein/keine + Nomen",
    ex: [
      ["Ich arbeite heute nicht.", "I am not working today."],
      ["Das ist nicht mein Büro.", "That is not my office."],
      ["Ich habe keine Zeit.", "I don't have time."],
    ],
    tip: "Use “kein” wherever you'd use “ein” in the positive sentence: ein Auto → kein Auto.",
    quiz: [
      { q: "“I have no time.” (Zeit)", opts: ["Ich habe nicht Zeit.", "Ich habe keine Zeit.", "Ich habe kein Zeit.", "Ich nicht habe Zeit."], a: 1,
        ex: "Negating a noun → kein/keine. Zeit is feminine → keine Zeit." },
      { q: "“I am not working today.”", opts: ["Ich arbeite kein heute.", "Ich nicht arbeite heute.", "Ich arbeite heute nicht.", "Ich arbeite heute kein."], a: 2,
        ex: "Negating the verb/whole idea → nicht, usually at the end." },
    ],
  },
  {
    ch: 2, id: "2.5", title: "Präpositionen: aus, in, bei, nach", en: "Local prepositions",
    def: "Small words showing location or origin. Each takes a fixed case (here: Dativ) and a fixed meaning.",
    struktur: "Präposition + Dativ-Nomen / Ort",
    ex: [
      ["Ich komme aus Indien.", "I come from India. (origin)"],
      ["Ich arbeite in einem Büro.", "I work in an office."],
      ["Sie ist bei der Arbeit.", "She is at work."],
      ["Wir fahren nach Deutschland.", "We travel to Germany. (countries/cities)"],
    ],
    tip: "“nach” is used for directions to cities and most countries: nach Berlin, nach Indien.",
    quiz: [
      { q: "“I come ___ India.” (origin)", opts: ["in", "nach", "aus", "bei"], a: 2,
        ex: "Origin (from a country) → aus: aus Indien." },
      { q: "“We travel ___ Germany.”", opts: ["aus", "bei", "in", "nach"], a: 3,
        ex: "Direction to a country/city → nach: nach Deutschland." },
    ],
  },

  /* ---------------- KAPITEL 3 ---------------- */
  {
    ch: 3, id: "3.1", title: "Nomengruppe im Akkusativ", en: "Noun phrase — accusative",
    def: "Accusative is the case for the direct object — the thing that receives the action. Only the masculine article changes: der→den, ein→einen. Feminine, neuter and plural stay the same.",
    struktur: "Subjekt (Nom.) + Verb + Objekt (Akk.)",
    ex: [
      ["Ich sehe den Mann.", "I see the man. (der → den)"],
      ["Ich kaufe eine Tasche.", "I buy a bag. (eine stays)"],
      ["Wir besuchen das Museum.", "We visit the museum. (das stays)"],
    ],
    tip: "Only masculine changes in the accusative: der→den, ein→einen. Remember: “den/einen” both end in -en.",
    quiz: [
      { q: "“I see the man.” (der Mann, direct object)", opts: ["Ich sehe der Mann.", "Ich sehe den Mann.", "Ich sehe dem Mann.", "Ich sehe die Mann."], a: 1,
        ex: "Masculine object in accusative: der → den." },
      { q: "“I buy a bag.” (eine Tasche)", opts: ["Ich kaufe einen Tasche.", "Ich kaufe ein Tasche.", "Ich kaufe eine Tasche.", "Ich kaufe einem Tasche."], a: 2,
        ex: "Feminine doesn't change: eine Tasche stays eine Tasche." },
    ],
  },
  {
    ch: 3, id: "3.2", title: "Komposita", en: "Compound nouns",
    def: "German combines nouns into one long word. The LAST word decides the gender and article of the whole compound.",
    struktur: "Nomen 1 + Nomen 2 = neues Nomen (article of the last part)",
    ex: [
      ["die Stadt + der Plan = der Stadtplan", "city + plan = the city map"],
      ["das Hotel + das Zimmer = das Hotelzimmer", "hotel + room = the hotel room"],
      ["die Öffnung + die Zeiten = die Öffnungszeiten", "opening + times = opening hours"],
    ],
    tip: "The last noun rules: der Stadt·PLAN → der Plan → der Stadtplan.",
    quiz: [
      { q: "das Hotel + das Zimmer → which article?", opts: ["der Hotelzimmer", "die Hotelzimmer", "das Hotelzimmer", "den Hotelzimmer"], a: 2,
        ex: "The last word “Zimmer” is neuter → das Hotelzimmer." },
    ],
  },
  {
    ch: 3, id: "3.3", title: "Verben mit Akkusativ", en: "Verbs that take accusative",
    def: "Certain verbs always put their object in the accusative: haben, sehen, kaufen, suchen, brauchen, besuchen…",
    struktur: "Subjekt + Verb + Akkusativobjekt",
    ex: [
      ["Ich habe einen Bruder.", "I have a brother."],
      ["Ich suche den Bahnhof.", "I am looking for the train station."],
      ["Brauchst du ein Taxi?", "Do you need a taxi?"],
    ],
    tip: "“haben” is one of the most common accusative verbs: ich habe einen Hund.",
    quiz: [
      { q: "“I have a brother.” (der Bruder)", opts: ["Ich habe ein Bruder.", "Ich habe einen Bruder.", "Ich habe einem Bruder.", "Ich habe der Bruder."], a: 1,
        ex: "haben takes accusative; masculine ein → einen Bruder." },
    ],
  },
  {
    ch: 3, id: "3.4", title: "Modalverb: möchte(n)", en: "Modal verb “would like”",
    def: "The polite way to say “want” — like “would like to”. Same modal pattern: position 2, main verb at the end.",
    struktur: "Subjekt + möchte(n) (Pos. 2) + … + Infinitiv (end)",
    ex: [
      ["Ich möchte ein Zimmer reservieren.", "I would like to reserve a room."],
      ["Möchtest du einen Kaffee?", "Would you like a coffee?"],
      ["Wir möchten das Museum besuchen.", "We would like to visit the museum."],
    ],
    tip: "möchte: ich möchte, du möchtest, er möchte, wir möchten, ihr möchtet, sie möchten.",
    quiz: [
      { q: "Complete: Ich ___ ein Zimmer reservieren.", opts: ["möchtest", "möchte", "möchten", "möchtet"], a: 1,
        ex: "ich möchte — same form as er/sie/es." },
    ],
  },
  {
    ch: 3, id: "3.5", title: "Temporale & lokale Präpositionen", en: "Time & place prepositions",
    def: "Temporal prepositions say WHEN; local prepositions say WHERE. Common: um (clock time), am (days), im (months), in (place).",
    struktur: "Präposition + Zeit / Ort",
    ex: [
      ["Das Museum öffnet um 9 Uhr.", "The museum opens at 9 o'clock."],
      ["Am Montag arbeite ich nicht.", "On Monday I don't work."],
      ["Das Hotel ist in der Stadtmitte.", "The hotel is in the city center."],
    ],
    tip: "Don't forget “um” before a clock time — leaving it out is a very common mistake.",
    quiz: [
      { q: "“The museum opens ___ 9 o'clock.”", opts: ["am", "im", "um", "in"], a: 2,
        ex: "Clock times use “um”: um 9 Uhr." },
      { q: "“___ Monday I don't work.”", opts: ["Im", "Um", "In", "Am"], a: 3,
        ex: "Days of the week use “am”: am Montag." },
    ],
  },

  /* ---------------- KAPITEL 4 ---------------- */
  {
    ch: 4, id: "4.1", title: "Plural der Nomen", en: "Plural of nouns",
    def: "German plurals follow several patterns (-e, -er, -(e)n, -s, or no change), often with an Umlaut. The plural article is always “die”.",
    struktur: "die + Nomen(Pluralendung)",
    ex: [
      ["der Apfel → die Äpfel", "the apple → the apples"],
      ["die Tomate → die Tomaten", "the tomato → the tomatoes"],
      ["das Brot → die Brote", "the bread → the breads"],
    ],
    tip: "There's no single rule — learn each plural by heart, like you learn the gender.",
    quiz: [
      { q: "What article do ALL plural nouns use?", opts: ["der", "die", "das", "den"], a: 1,
        ex: "Plural is always “die”, whatever the singular gender was." },
      { q: "Plural of “die Tomate”:", opts: ["die Tomates", "die Tomaten", "die Tomate", "die Tomäte"], a: 1,
        ex: "die Tomate → die Tomaten (-n plural)." },
    ],
  },
  {
    ch: 4, id: "4.2", title: "Modalverb: mögen", en: "Modal verb “to like”",
    def: "“Mögen” expresses liking something, often used directly with a noun (no second verb needed).",
    struktur: "Subjekt + mag / magst / mögen + Nomen (Akk.)",
    ex: [
      ["Ich mag Pizza.", "I like pizza."],
      ["Magst du Kaffee?", "Do you like coffee?"],
      ["Wir mögen deutsches Brot.", "We like German bread."],
    ],
    tip: "mögen: ich mag, du magst, er mag, wir mögen, ihr mögt, sie mögen.",
    quiz: [
      { q: "Complete: Du ___ Kaffee?", opts: ["mag", "magst", "mögt", "mögen"], a: 1,
        ex: "du magst — the du-form of mögen." },
    ],
  },
  {
    ch: 4, id: "4.3", title: "Präteritum von sein & haben", en: "Simple past of sein/haben",
    def: "Most verbs use the Perfekt in speech, but “sein” (to be) and “haben” (to have) use the simple past (Präteritum) even when speaking.",
    struktur: "Subjekt + war / hatte (Präteritum)",
    ex: [
      ["Ich war gestern zu Hause.", "I was at home yesterday."],
      ["Du hattest keine Zeit.", "You didn't have time."],
      ["Wir waren im Restaurant.", "We were at the restaurant."],
    ],
    tip: "sein: war, warst, war, waren, wart, waren. haben: hatte, hattest, hatte, hatten, hattet, hatten.",
    quiz: [
      { q: "“I was at home.” (sein, past)", opts: ["Ich bin zu Hause.", "Ich war zu Hause.", "Ich hatte zu Hause.", "Ich habe zu Hause."], a: 1,
        ex: "Past of “ich bin” is “ich war”." },
      { q: "Past tense of “wir haben”:", opts: ["wir waren", "wir hatten", "wir haben", "wir hattet"], a: 1,
        ex: "haben → wir hatten." },
    ],
  },
  {
    ch: 4, id: "4.4", title: "Personalpronomen im Akkusativ", en: "Pronouns — accusative",
    def: "When a pronoun is the object of the sentence, it changes form — just like “I” becomes “me” in English.",
    struktur: "Verb + Personalpronomen (Akk.)",
    ex: [
      ["Ich sehe dich.", "I see you. (du → dich)"],
      ["Er liebt sie.", "He loves her. (sie stays sie)"],
      ["Wir besuchen euch.", "We visit you (plural). (ihr → euch)"],
    ],
    tip: "mich, dich, ihn, sie, es, uns, euch, sie/Sie — like me, you, him, her, it, us, you, them.",
    quiz: [
      { q: "“I see you.” (informal, 1 person)", opts: ["Ich sehe du.", "Ich sehe dir.", "Ich sehe dich.", "Ich sehe euch."], a: 2,
        ex: "du → dich in the accusative." },
      { q: "Accusative of “er” (him):", opts: ["ihm", "ihn", "er", "sie"], a: 1,
        ex: "er → ihn (him)." },
    ],
  },

  /* ---------------- KAPITEL 5 ---------------- */
  {
    ch: 5, id: "5.1", title: "Trennbare Verben", en: "Separable verbs",
    def: "Some verbs have a prefix that separates and jumps to the end of the sentence in the present tense. Common prefixes: auf-, an-, ein-, aus-, mit-, fern-.",
    struktur: "Subjekt + Verbstamm (Pos. 2) + … + Präfix (end)",
    ex: [
      ["Ich stehe um 7 Uhr auf.", "I get up at 7. (aufstehen)"],
      ["Er schaltet den Fernseher ein.", "He turns on the TV. (einschalten)"],
      ["Wir kaufen im Supermarkt ein.", "We shop at the supermarket. (einkaufen)"],
    ],
    tip: "The prefix flies to the very end: aufstehen → ich stehe … auf.",
    quiz: [
      { q: "“I get up at 7.” (aufstehen)", opts: ["Ich aufstehe um 7 Uhr.", "Ich stehe um 7 Uhr auf.", "Ich auf stehe um 7 Uhr.", "Ich stehe auf um 7 Uhr."], a: 1,
        ex: "The prefix “auf” separates and goes to the end: “… auf.”" },
    ],
  },
  {
    ch: 5, id: "5.2", title: "Nicht trennbare Verben", en: "Non-separable verbs",
    def: "Some prefixes NEVER separate: be-, ge-, er-, ver-, zer-, ent-, emp-. The verb stays as one word.",
    struktur: "Subjekt + Präfix+Verb (stays together, Pos. 2)",
    ex: [
      ["Ich verstehe das nicht.", "I don't understand that. (verstehen)"],
      ["Sie besucht ihre Familie.", "She visits her family. (besuchen)"],
      ["Wir bezahlen die Rechnung.", "We pay the bill. (bezahlen)"],
    ],
    tip: "Never separate: be-, ge-, er-, ver-, zer-, ent-, emp-. Everything else usually does.",
    quiz: [
      { q: "Which verb does NOT separate?", opts: ["aufstehen", "einkaufen", "verstehen", "mitkommen"], a: 2,
        ex: "“verstehen” has the prefix ver- → never separates." },
    ],
  },
  {
    ch: 5, id: "5.3", title: "Perfekt", en: "Present perfect (spoken past)",
    def: "The main past tense in everyday speech. Formed with a helper (haben or sein) in position 2 plus the Partizip II at the end.",
    struktur: "Subjekt + haben/sein (Pos. 2) + … + Partizip II (end)",
    ex: [
      ["Ich habe Deutsch gelernt.", "I learned German. (lernen → gelernt)"],
      ["Er ist nach Hause gegangen.", "He went home. (gehen → gegangen, uses sein)"],
      ["Wir haben den Fernseher eingeschaltet.", "We turned on the TV. (einschalten → eingeschaltet)"],
    ],
    tip: "Movement/change verbs (gehen, fahren, werden) use “sein”. For separable verbs the ge- sits in the MIDDLE: ein-ge-schaltet.",
    quiz: [
      { q: "“I learned German.” (Perfekt)", opts: ["Ich habe Deutsch lernen.", "Ich habe Deutsch gelernt.", "Ich bin Deutsch gelernt.", "Ich lerne Deutsch gehabt."], a: 1,
        ex: "haben + Partizip II: habe … gelernt." },
      { q: "Which uses “sein” in the Perfekt?", opts: ["lernen", "kaufen", "gehen", "essen"], a: 2,
        ex: "“gehen” is a movement verb → er ist gegangen." },
      { q: "Partizip II of “einschalten”:", opts: ["geeinschaltet", "eingeschaltet", "einschaltet", "geschalteinet"], a: 1,
        ex: "Separable verb: ge- goes in the middle → ein-ge-schaltet = eingeschaltet." },
    ],
  },
  {
    ch: 5, id: "5.4", title: "Modalverben: sollen & müssen", en: "Modal verbs should/must",
    def: "“müssen” = must / have to (necessity). “sollen” = should (a recommendation or something you were told to do).",
    struktur: "Subjekt + muss / soll (Pos. 2) + … + Infinitiv (end)",
    ex: [
      ["Ich muss heute arbeiten.", "I have to work today."],
      ["Du sollst mehr Wasser trinken.", "You should drink more water."],
      ["Wir müssen den Zug nehmen.", "We must take the train."],
    ],
    tip: "müssen: ich muss, du musst, er muss … • sollen: ich soll, du sollst, er soll …",
    quiz: [
      { q: "“I have to work today.”", opts: ["Ich soll heute arbeiten.", "Ich muss heute arbeiten.", "Ich kann heute arbeiten.", "Ich will heute arbeiten."], a: 1,
        ex: "Necessity (no choice) → müssen: ich muss." },
    ],
  },
  {
    ch: 5, id: "5.5", title: "Temporale Präpositionen", en: "Time prepositions",
    def: "Prepositions describing when, each pairing with certain time words.",
    struktur: "Präposition + Zeitangabe",
    ex: [
      ["am Montag / am Morgen", "on Monday / in the morning"],
      ["im Januar / im Sommer", "in January / in summer"],
      ["um 8 Uhr", "at 8 o'clock"],
      ["von Montag bis Freitag", "from Monday to Friday"],
    ],
    tip: "am → days & parts of the day, im → months & seasons, um → clock times.",
    quiz: [
      { q: "“___ summer” (season)", opts: ["am Sommer", "um Sommer", "im Sommer", "in Sommer"], a: 2,
        ex: "Seasons and months use “im”: im Sommer, im Januar." },
    ],
  },

  /* ---------------- KAPITEL 6 ---------------- */
  {
    ch: 6, id: "6.1", title: "Konjunktionen", en: "Conjunctions",
    def: "Words joining two ideas. “und, oder, aber, denn” keep normal word order (verb stays in position 2). “weil” (because) sends the verb to the very end of its clause.",
    struktur: "Satz 1 + und/oder/aber/denn + Satz 2   |   …, weil + Subjekt … + Verb (end)",
    ex: [
      ["Ich lerne Deutsch, aber es ist schwer.", "I'm learning German, but it's hard."],
      ["Wir bleiben zu Hause, weil es regnet.", "We stay home because it's raining. (verb at the end!)"],
      ["Möchtest du Tee oder Kaffee?", "Would you like tea or coffee?"],
    ],
    tip: "After “weil”, the verb goes to the very end: …, weil es regnet.",
    quiz: [
      { q: "“We stay home because it's raining.”", opts: ["…, weil es regnet.", "…, weil es regnet nicht.", "…, weil regnet es.", "…, weil es ist regnet."], a: 0,
        ex: "After “weil” the verb “regnet” moves to the end of the clause." },
      { q: "Which word does NOT change word order?", opts: ["weil", "aber", "dass", "wenn"], a: 1,
        ex: "“aber” keeps normal order; weil/dass/wenn send the verb to the end." },
    ],
  },
  {
    ch: 6, id: "6.2", title: "Modalverb: wollen", en: "Modal verb “to want”",
    def: "“wollen” = a strong wish or intention (stronger than möchten). Same modal pattern: position 2, infinitive at the end.",
    struktur: "Subjekt + will / willst / wollen + … + Infinitiv (end)",
    ex: [
      ["Ich will nach Deutschland reisen.", "I want to travel to Germany."],
      ["Willst du morgen kommen?", "Do you want to come tomorrow?"],
      ["Wir wollen ein Hotel buchen.", "We want to book a hotel."],
    ],
    tip: "wollen: ich will, du willst, er will, wir wollen, ihr wollt, sie wollen.",
    quiz: [
      { q: "Complete: Ich ___ nach Deutschland reisen.", opts: ["willst", "will", "wollen", "wollt"], a: 1,
        ex: "ich will — no ending on the ich-form." },
    ],
  },
  {
    ch: 6, id: "6.3", title: "Imperativ", en: "Imperative (commands)",
    def: "Used to give instructions or commands. Different forms for du, ihr, and Sie.",
    struktur: "du: Verbstamm!  |  ihr: Verbstamm+t!  |  Sie: Verb+en Sie!",
    ex: [
      ["Komm bitte!", "Come, please! (du)"],
      ["Kommt bitte!", "Come, please! (ihr group)"],
      ["Kommen Sie bitte!", "Please come! (Sie formal)"],
    ],
    tip: "The du-imperative drops the -st ending: du kommst → Komm!",
    quiz: [
      { q: "du-imperative of “kommen”:", opts: ["Kommst!", "Komm!", "Kommen!", "Kommt!"], a: 1,
        ex: "Drop -st from “du kommst” → Komm!" },
      { q: "Formal (Sie) command “please come”:", opts: ["Komm bitte!", "Kommt bitte!", "Kommen Sie bitte!", "Sie kommen bitte!"], a: 2,
        ex: "Sie-form: verb + Sie → Kommen Sie bitte!" },
    ],
  },
  {
    ch: 6, id: "6.4", title: "Verben mit Dativ", en: "Verbs that take dative",
    def: "Some verbs always put their object in the Dativ: helfen, danken, gefallen, gehören, antworten…",
    struktur: "Subjekt + Verb + Dativobjekt",
    ex: [
      ["Ich helfe meiner Mutter.", "I help my mother."],
      ["Das Buch gehört mir.", "The book belongs to me."],
      ["Die Stadt gefällt mir sehr.", "I like the city a lot. (lit. it pleases me)"],
    ],
    tip: "Learn these as a set: helfen, danken, gehören, gefallen, antworten → always Dativ.",
    quiz: [
      { q: "Which verb takes the dative?", opts: ["sehen", "kaufen", "helfen", "besuchen"], a: 2,
        ex: "“helfen” always takes a dative object: Ich helfe dir." },
    ],
  },
  {
    ch: 6, id: "6.5", title: "Personalpronomen im Dativ", en: "Pronouns — dative",
    def: "Pronouns also change in the Dativ (used for indirect objects and after dative verbs/prepositions).",
    struktur: "Verb + Personalpronomen (Dat.)",
    ex: [
      ["Er gibt mir das Buch.", "He gives me the book."],
      ["Ich danke dir.", "I thank you."],
      ["Das gehört uns.", "That belongs to us."],
    ],
    tip: "mir, dir, ihm, ihr, ihm, uns, euch, ihnen/Ihnen.",
    quiz: [
      { q: "“He gives ___ the book.” (me)", opts: ["mich", "mir", "ich", "mein"], a: 1,
        ex: "Indirect object “me” → dative “mir”." },
    ],
  },
  {
    ch: 6, id: "6.6", title: "Richtungsangaben", en: "Prepositions of direction",
    def: "Prepositions describing movement toward a destination — often with the accusative case.",
    struktur: "Präposition + Richtung / Ort",
    ex: [
      ["Wir fahren in die Stadt.", "We drive into the city."],
      ["Ich gehe zum Bahnhof.", "I go to the station. (zu + dem = zum)"],
      ["Sie fliegt nach München.", "She flies to Munich."],
    ],
    tip: "zu + dem = zum, zu + der = zur. Cities/countries usually use “nach”.",
    quiz: [
      { q: "“I go ___ Bahnhof.” (zu + dem)", opts: ["zu dem → zur", "zu dem → zum", "in dem → im", "an dem → am"], a: 1,
        ex: "zu + dem contracts to “zum”: zum Bahnhof." },
    ],
  },

  /* ---------------- KAPITEL 7 ---------------- */
  {
    ch: 7, id: "7.1", title: "Nomengruppe im Dativ", en: "Noun phrase — dative",
    def: "The third case. All articles change: der→dem, die→der, das→dem, plural die→den (and the plural noun adds -n).",
    struktur: "dem / der / dem / den(+n) + Nomen",
    ex: [
      ["Ich wohne in dem Haus. (= im Haus)", "I live in the house."],
      ["Sie spricht mit der Frau.", "She speaks with the woman."],
      ["Wir spielen mit den Kindern.", "We play with the children. (Kinder → Kindern)"],
    ],
    tip: "In the dative plural, add -n to the noun too: mit den Kindern.",
    quiz: [
      { q: "Dative form of “der Mann”:", opts: ["der Mann", "den Mann", "dem Mann", "des Mannes"], a: 2,
        ex: "Masculine der → dem in the dative: dem Mann." },
      { q: "“with the woman” (die Frau, dative)", opts: ["mit die Frau", "mit der Frau", "mit den Frau", "mit dem Frau"], a: 1,
        ex: "Feminine die → der in the dative: mit der Frau." },
    ],
  },
  {
    ch: 7, id: "7.2", title: "Wechselpräpositionen", en: "Two-way prepositions",
    def: "Nine prepositions (in, an, auf, über, unter, vor, hinter, neben, zwischen) take EITHER accusative or dative. Movement (wohin?) = Akkusativ; fixed location (wo?) = Dativ.",
    struktur: "wo? (location) + Dativ   |   wohin? (movement) + Akkusativ",
    ex: [
      ["Das Buch liegt auf dem Tisch.", "The book lies on the table. (wo? → Dativ)"],
      ["Ich lege das Buch auf den Tisch.", "I put the book on the table. (wohin? → Akkusativ)"],
      ["Die Lampe hängt über dem Bett.", "The lamp hangs above the bed. (wo? → Dativ)"],
    ],
    tip: "Ask “wo?” (no movement → Dativ) or “wohin?” (movement → Akkusativ).",
    quiz: [
      { q: "“The book lies on the table.” (no movement)", opts: ["auf den Tisch", "auf dem Tisch", "auf der Tisch", "auf das Tisch"], a: 1,
        ex: "Location (wo?) → dative: auf dem Tisch." },
      { q: "“I put the book on the table.” (movement)", opts: ["auf dem Tisch", "auf den Tisch", "auf der Tisch", "auf des Tisch"], a: 1,
        ex: "Movement (wohin?) → accusative: auf den Tisch." },
    ],
  },
  {
    ch: 7, id: "7.3", title: "Modalverb: dürfen", en: "Modal verb “to be allowed to”",
    def: "“dürfen” expresses permission. Negated (“nicht dürfen”) it means must not / is not allowed to.",
    struktur: "Subjekt + darf / darfst / dürfen + … + Infinitiv (end)",
    ex: [
      ["Ich darf hier parken.", "I am allowed to park here."],
      ["Du darfst nicht rauchen.", "You are not allowed to smoke."],
      ["Dürfen wir hereinkommen?", "May we come in?"],
    ],
    tip: "dürfen: ich darf, du darfst, er darf, wir dürfen, ihr dürft, sie dürfen.",
    quiz: [
      { q: "“You are not allowed to smoke.”", opts: ["Du musst nicht rauchen.", "Du darfst nicht rauchen.", "Du kannst nicht rauchen.", "Du willst nicht rauchen."], a: 1,
        ex: "“nicht dürfen” = not allowed to: Du darfst nicht rauchen." },
    ],
  },
  {
    ch: 7, id: "7.4", title: "Komparation der Adjektive", en: "Comparison of adjectives",
    def: "Adjectives have three forms: Positiv (basic), Komparativ (-er, “more/-er”), Superlativ (am -sten, “most/-est”).",
    struktur: "Positiv: schön | Komparativ: schöner (als …) | Superlativ: am schönsten",
    ex: [
      ["Meine Wohnung ist groß.", "My apartment is big."],
      ["Deine Wohnung ist größer als meine.", "Yours is bigger than mine."],
      ["Das ist die größte Wohnung im Haus.", "That's the biggest apartment in the house."],
    ],
    tip: "Many short adjectives add an Umlaut: groß→größer, alt→älter, jung→jünger.",
    quiz: [
      { q: "Comparative of “groß”:", opts: ["großer", "größer", "am größten", "grösser"], a: 1,
        ex: "groß → größer (with Umlaut)." },
      { q: "“bigger THAN mine” uses which word?", opts: ["wie", "als", "wenn", "dann"], a: 1,
        ex: "Comparisons use “als”: größer als meine." },
    ],
  },

  /* ---------------- KAPITEL 8 ---------------- */
  {
    ch: 8, id: "8.1", title: "Verb: werden", en: "Verb “to become”",
    def: "“werden” = to become (also used later for future tense and passive). At A1, focus on its basic meaning.",
    struktur: "Subjekt + werde / wirst / wird … + Adjektiv / Nomen",
    ex: [
      ["Ich werde müde.", "I am becoming tired."],
      ["Es wird kalt.", "It is getting cold."],
      ["Sie wird Lehrerin.", "She is becoming a teacher."],
    ],
    tip: "werden: ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden. Watch “du wirst / er wird”.",
    quiz: [
      { q: "Complete: Es ___ kalt.", opts: ["werde", "wirst", "wird", "werden"], a: 2,
        ex: "er/sie/es wird — “Es wird kalt.”" },
    ],
  },
  {
    ch: 8, id: "8.2", title: "Verben mit Dativ und Akkusativ", en: "Verbs with dative + accusative",
    def: "Some verbs take TWO objects: a person (Dativ = “to whom”) and a thing (Akkusativ = “what”). E.g. geben, schenken, zeigen, schicken, erzählen.",
    struktur: "Subjekt + Verb + Dativ (Person) + Akkusativ (Sache)",
    ex: [
      ["Ich gebe dir das Buch.", "I give you the book. (dir = Dativ, das Buch = Akk.)"],
      ["Er schenkt seiner Mutter Blumen.", "He gives his mother flowers."],
      ["Wir zeigen den Gästen die Stadt.", "We show the guests the city."],
    ],
    tip: "Order: if both are nouns, Dativ (person) before Akkusativ (thing).",
    quiz: [
      { q: "In “Ich gebe dir das Buch”, what case is “dir”?", opts: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"], a: 2,
        ex: "The person receiving (to you) is the dative object: dir." },
    ],
  },
  {
    ch: 8, id: "8.3", title: "Modalverben im Präteritum", en: "Modal verbs — simple past",
    def: "Like sein/haben, modal verbs use the Präteritum (simple past) rather than the Perfekt, even in speech.",
    struktur: "Subjekt + Modalverb-Präteritum + … + Infinitiv (end)",
    ex: [
      ["Ich musste gestern arbeiten.", "I had to work yesterday."],
      ["Wir konnten nicht kommen.", "We could not come."],
      ["Sie wollte ein Buch kaufen.", "She wanted to buy a book."],
    ],
    tip: "müssen→musste, können→konnte, wollen→wollte, dürfen→durfte, sollen→sollte, mögen→mochte.",
    quiz: [
      { q: "Past tense of “ich muss”:", opts: ["ich musste", "ich musse", "ich müsste", "ich gemusst"], a: 0,
        ex: "müssen → musste: ich musste." },
      { q: "Past tense of “wir können”:", opts: ["wir konnten", "wir könnten", "wir gekonnt", "wir kannten"], a: 0,
        ex: "können → konnte: wir konnten." },
    ],
  },
  {
    ch: 8, id: "8.4", title: "Vergangenheitsformen — Überblick", en: "Past forms — overview",
    def: "By now you know two past tenses: Perfekt (most verbs, in conversation) and Präteritum (sein, haben, modal verbs — even in speech).",
    struktur: "Perfekt: haben/sein + Partizip II   |   Präteritum: Verbstamm + Endung",
    ex: [
      ["Ich habe gestern gearbeitet.", "I worked yesterday. (Perfekt)"],
      ["Ich war gestern müde.", "I was tired yesterday. (Präteritum: sein)"],
      ["Ich konnte nicht kommen.", "I could not come. (Präteritum: können)"],
    ],
    tip: "Rule of thumb: normal verbs → Perfekt in speech; sein/haben/modals → Präteritum.",
    quiz: [
      { q: "Which past tense do you normally use for “arbeiten” when speaking?", opts: ["Präteritum", "Perfekt", "Futur", "Imperativ"], a: 1,
        ex: "Normal verbs use the Perfekt in conversation: Ich habe gearbeitet." },
    ],
  },
  {
    ch: 8, id: "8.5", title: "Präpositionen: zu, von, mit, für", en: "Prepositions zu/von/mit/für",
    def: "Four common prepositions. zu, von, mit take the Dativ. für takes the Akkusativ.",
    struktur: "zu / von / mit + Dativ   |   für + Akkusativ",
    ex: [
      ["Ich gehe zu meiner Freundin.", "I go to my friend's place."],
      ["Das Geschenk ist von meiner Mutter.", "The gift is from my mother."],
      ["Ich komme mit dir.", "I come with you."],
      ["Das Geschenk ist für dich.", "The gift is for you. (für → Akkusativ!)"],
    ],
    tip: "“für” is the odd one out — it always takes the accusative, not the dative.",
    quiz: [
      { q: "Which preposition takes the ACCUSATIVE?", opts: ["zu", "von", "mit", "für"], a: 3,
        ex: "für + Akkusativ (für dich). zu/von/mit take the dative." },
      { q: "“The gift is for you.”", opts: ["für dir", "für dich", "für du", "für dein"], a: 1,
        ex: "für + accusative: für dich." },
    ],
  },
];

export { CHAPTERS, TOPICS };
export const topicsOf = (ch) => TOPICS.filter((t) => t.ch === ch);
export const topicById = (id) => TOPICS.find((t) => t.id === id);
export const quizOfChapter = (ch) =>
  topicsOf(ch).flatMap((t) => t.quiz.map((q) => ({ ...q, topic: t.title, id: t.id })));
export const ALL_Q = TOPICS.flatMap((t) => t.quiz.map((q) => ({ ...q, topic: t.title, id: t.id, ch: t.ch })));

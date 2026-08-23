/* Two mock exams in the Goethe-Zertifikat A1 / Start Deutsch 1 format.

   Real exam: Hören ~20 min (3 parts, 15 items) · Lesen 25 min (3 parts,
   15 items) · Schreiben 20 min (form + short message) · Sprechen ~15 min
   (introduce yourself, ask/answer from cards, make a request).
   Pass mark: 60 %.

   Hören items carry `audio` — the text the device speaks. The learner
   never sees it until the answer is revealed. */

export const PASS_MARK = 0.6;

export const SECTIONS = [
  { id: "hoeren",     name: "Hören",     minutes: 20, items: 15 },
  { id: "lesen",      name: "Lesen",     minutes: 25, items: 15 },
  { id: "schreiben",  name: "Schreiben", minutes: 20, items: 2 },
  { id: "sprechen",   name: "Sprechen",  minutes: 15, items: 3 },
];

const exam1 = {
  id: "a1-mock-1",
  name: "Modelltest 1",
  hoeren: [
    { audio: "Der Zug nach Hamburg fährt heute von Gleis sieben ab.", q: "Von welchem Gleis fährt der Zug?", opts: ["Gleis fünf", "Gleis sieben", "Gleis neun"], a: 1 },
    { audio: "Guten Tag, mein Name ist Anna Weber. Ich komme aus Österreich.", q: "Woher kommt Anna?", opts: ["Aus Deutschland", "Aus Österreich", "Aus der Schweiz"], a: 1 },
    { audio: "Der Supermarkt öffnet um acht Uhr und schließt um zwanzig Uhr.", q: "Wann schließt der Supermarkt?", opts: ["Um acht Uhr", "Um achtzehn Uhr", "Um zwanzig Uhr"], a: 2 },
    { audio: "Es tut mir leid, der Termin am Montag geht nicht. Können wir am Mittwoch?", q: "Wann soll der Termin sein?", opts: ["Am Montag", "Am Mittwoch", "Am Freitag"], a: 1 },
    { audio: "Ein Kaffee kostet zwei Euro fünfzig.", q: "Was kostet ein Kaffee?", opts: ["2,15 €", "2,50 €", "5,20 €"], a: 1 },
    { audio: "Morgen wird es kalt und es regnet den ganzen Tag.", q: "Wie wird das Wetter morgen?", opts: ["Warm und sonnig", "Kalt und regnerisch", "Kalt mit Schnee"], a: 1 },
    { audio: "Die Apotheke ist gleich hier rechts neben der Post.", q: "Wo ist die Apotheke?", opts: ["Neben der Bank", "Neben der Post", "Neben dem Kino"], a: 1 },
    { audio: "Ich hätte gern zwei Brötchen und ein Stück Kuchen, bitte.", q: "Was möchte die Person?", opts: ["Brot und Kaffee", "Brötchen und Kuchen", "Kuchen und Milch"], a: 1 },
    { audio: "Der Deutschkurs beginnt am Montag um neun Uhr im Raum zwölf.", q: "Wo ist der Kurs?", opts: ["In Raum zwei", "In Raum zwölf", "In Raum zwanzig"], a: 1 },
    { audio: "Meine Telefonnummer ist null eins sieben sechs, drei drei zwei.", q: "Wie beginnt die Nummer?", opts: ["0176", "0170", "0165"], a: 0 },
    { audio: "Hallo Peter, ich bin krank. Ich komme heute nicht zur Arbeit.", q: "Warum kommt Peter nicht?", opts: ["Er hat Urlaub", "Er ist krank", "Er hat einen Termin"], a: 1 },
    { audio: "Fahren Sie geradeaus und dann die zweite Straße links.", q: "Wohin soll man gehen?", opts: ["Erste Straße rechts", "Zweite Straße links", "Zweite Straße rechts"], a: 1 },
    { audio: "Das Zimmer kostet fünfzig Euro pro Nacht, mit Frühstück.", q: "Was kostet das Zimmer?", opts: ["15 € pro Nacht", "50 € pro Nacht", "50 € pro Woche"], a: 1 },
    { audio: "Wir treffen uns am Samstag um sechs Uhr vor dem Kino.", q: "Wo treffen sie sich?", opts: ["Im Kino", "Vor dem Kino", "Im Restaurant"], a: 1 },
    { audio: "Entschuldigung, ich suche den Bahnhof. Ist er weit von hier?", q: "Was sucht die Person?", opts: ["Den Flughafen", "Den Bahnhof", "Das Hotel"], a: 1 },
  ],
  lesen: [
    { text: "Öffnungszeiten: Mo–Fr 9–18 Uhr, Sa 9–14 Uhr, So geschlossen.", q: "Wann ist am Samstag geöffnet?", opts: ["9–18 Uhr", "9–14 Uhr", "Geschlossen"], a: 1 },
    { text: "Liebe Maria, ich komme am Freitag um 19 Uhr an. Kannst du mich abholen? Kiran", q: "Wann kommt Kiran an?", opts: ["Freitag um 19 Uhr", "Samstag um 19 Uhr", "Freitag um 9 Uhr"], a: 0 },
    { text: "Zimmer zu vermieten. 25 m², möbliert, 450 € warm. Ab 1. Mai frei.", q: "Ab wann ist das Zimmer frei?", opts: ["Ab 1. März", "Ab 1. Mai", "Ab 25. Mai"], a: 1 },
    { text: "Achtung: Der Aufzug ist heute außer Betrieb. Bitte nehmen Sie die Treppe.", q: "Was funktioniert nicht?", opts: ["Die Treppe", "Der Aufzug", "Die Tür"], a: 1 },
    { text: "Deutschkurs A1 · Dienstag und Donnerstag · 18:00–20:00 · Raum 5", q: "An welchen Tagen ist der Kurs?", opts: ["Mo und Mi", "Di und Do", "Do und Fr"], a: 1 },
    { text: "Hallo Tom, ich kann heute nicht kommen. Mein Sohn ist krank. LG Sara", q: "Warum kommt Sara nicht?", opts: ["Sie ist krank", "Ihr Sohn ist krank", "Sie hat keine Zeit"], a: 1 },
    { text: "Sonderangebot! Äpfel 1 kg nur 1,99 € — nur heute!", q: "Wie lange gilt das Angebot?", opts: ["Eine Woche", "Nur heute", "Bis Samstag"], a: 1 },
    { text: "Der Arzt hat am Mittwochnachmittag keine Sprechstunde.", q: "Wann ist keine Sprechstunde?", opts: ["Mittwochvormittag", "Mittwochnachmittag", "Donnerstag"], a: 1 },
    { text: "Bitte hier nicht rauchen. Rauchen nur draußen im Hof erlaubt.", q: "Wo darf man rauchen?", opts: ["Hier drinnen", "Draußen im Hof", "Nirgends"], a: 1 },
    { text: "Bibliothek: Bücher können vier Wochen ausgeliehen werden.", q: "Wie lange kann man Bücher ausleihen?", opts: ["Zwei Wochen", "Vier Wochen", "Vier Tage"], a: 1 },
    { text: "Zug ICE 578 nach Berlin hat heute 20 Minuten Verspätung.", q: "Was ist mit dem Zug?", opts: ["Er fällt aus", "Er hat Verspätung", "Er ist pünktlich"], a: 1 },
    { text: "Anmeldung nur mit Termin. Bitte rufen Sie vorher an: 089 123456.", q: "Was muss man vorher tun?", opts: ["Eine E-Mail schreiben", "Anrufen", "Ein Formular schicken"], a: 1 },
    { text: "Frühstück gibt es von 7 bis 10 Uhr im Restaurant im Erdgeschoss.", q: "Wo gibt es Frühstück?", opts: ["Im Zimmer", "Im Erdgeschoss", "Im ersten Stock"], a: 1 },
    { text: "Wegen Umbau bleibt das Museum vom 1. bis 15. Juli geschlossen.", q: "Wann ist das Museum zu?", opts: ["1.–15. Juni", "1.–15. Juli", "Den ganzen Juli"], a: 1 },
    { text: "Kiran sucht eine Wohnung in München, max. 800 € warm, ab September.", q: "Was sucht Kiran?", opts: ["Ein Zimmer in Berlin", "Eine Wohnung in München", "Ein Haus in München"], a: 1 },
  ],
  schreiben: [
    {
      type: "form",
      task: "Ihre Freundin Sara möchte einen Deutschkurs besuchen. Füllen Sie das Formular für sie aus.",
      context: "Sara Meier, geboren am 12.03.1995, wohnt in der Hauptstraße 8, 80331 München. Telefon: 0176 4432211. Sie ist Studentin und kommt aus Frankreich.",
      fields: [
        { label: "Familienname", answer: "Meier" },
        { label: "Vorname", answer: "Sara" },
        { label: "Geburtsdatum", answer: "12.03.1995" },
        { label: "Straße / Hausnummer", answer: "Hauptstraße 8" },
        { label: "Postleitzahl / Ort", answer: "80331 München" },
        { label: "Telefonnummer", answer: "0176 4432211" },
        { label: "Beruf", answer: "Studentin" },
        { label: "Land", answer: "Frankreich" },
      ],
    },
    {
      type: "message",
      task: "Schreiben Sie eine kurze Nachricht (ca. 30 Wörter) an Ihren Lehrer. Sie sind krank und können morgen nicht zum Kurs kommen.",
      points: ["Anrede (z. B. Lieber Herr …)", "Sagen, dass Sie krank sind", "Sagen, dass Sie morgen nicht kommen", "Nach den Hausaufgaben fragen", "Gruß (z. B. Viele Grüße)"],
      model: "Lieber Herr Schmidt,\n\nleider bin ich krank und kann morgen nicht zum Deutschkurs kommen. Können Sie mir bitte die Hausaufgaben schicken?\n\nVielen Dank und viele Grüße,\nKiran",
    },
  ],
  sprechen: [
    {
      type: "intro",
      task: "Stellen Sie sich vor. Sagen Sie etwas zu jedem Stichwort.",
      cues: ["Name", "Alter", "Land", "Wohnort", "Sprachen", "Beruf", "Hobby"],
      model: "Ich heiße Kiran Mulawad. Ich bin 28 Jahre alt und komme aus Indien. Jetzt wohne ich in Deutschland. Ich spreche Englisch, Hindi und ein bisschen Deutsch. Ich bin Ingenieur von Beruf. In meiner Freizeit koche ich gern.",
    },
    {
      type: "cards",
      task: "Thema „Essen und Trinken“. Bilden Sie zu jedem Wort eine Frage und antworten Sie.",
      cues: ["Frühstück", "Restaurant", "trinken", "kochen"],
      model: "Frage: Was isst du zum Frühstück? — Antwort: Zum Frühstück esse ich Brot mit Käse und trinke Tee.",
    },
    {
      type: "request",
      task: "Bitten Sie höflich um etwas. Reagieren Sie auch auf eine Bitte.",
      cues: ["ein Glas Wasser", "das Fenster öffnen", "die Rechnung", "langsamer sprechen"],
      model: "Können Sie bitte das Fenster öffnen? — Ja, gern. / Entschuldigung, können Sie bitte langsamer sprechen? — Natürlich!",
    },
  ],
};

const exam2 = {
  id: "a1-mock-2",
  name: "Modelltest 2",
  hoeren: [
    { audio: "Der Bus Nummer zwölf fährt zum Flughafen.", q: "Welcher Bus fährt zum Flughafen?", opts: ["Nummer zwei", "Nummer zwölf", "Nummer zwanzig"], a: 1 },
    { audio: "Ich arbeite von Montag bis Freitag, am Wochenende habe ich frei.", q: "Wann hat die Person frei?", opts: ["Am Wochenende", "Am Montag", "Am Freitag"], a: 0 },
    { audio: "Das Konzert beginnt um halb acht am Abend.", q: "Wann beginnt das Konzert?", opts: ["Um 7:00", "Um 7:30", "Um 8:30"], a: 1 },
    { audio: "Wir haben leider kein Zimmer mehr frei. Das Hotel ist voll.", q: "Was ist das Problem?", opts: ["Das Hotel ist zu teuer", "Es gibt kein Zimmer", "Das Hotel ist geschlossen"], a: 1 },
    { audio: "Mein Bruder ist Arzt und arbeitet im Krankenhaus in Köln.", q: "Was ist der Bruder von Beruf?", opts: ["Lehrer", "Arzt", "Ingenieur"], a: 1 },
    { audio: "Bitte nehmen Sie die U-Bahn Linie drei bis zum Hauptbahnhof.", q: "Welche Linie soll man nehmen?", opts: ["Linie eins", "Linie drei", "Linie dreizehn"], a: 1 },
    { audio: "Im Sommer fahren wir immer ans Meer nach Italien.", q: "Wohin fahren sie im Sommer?", opts: ["In die Berge", "Ans Meer", "In die Stadt"], a: 1 },
    { audio: "Die Rechnung macht dreiundzwanzig Euro achtzig.", q: "Was kostet es?", opts: ["23,80 €", "32,80 €", "23,18 €"], a: 0 },
    { audio: "Können Sie bitte langsamer sprechen? Ich verstehe Sie nicht gut.", q: "Was möchte die Person?", opts: ["Lauter sprechen", "Langsamer sprechen", "Wiederholen"], a: 1 },
    { audio: "Meine Wohnung hat zwei Zimmer, eine Küche und ein Bad.", q: "Wie viele Zimmer hat die Wohnung?", opts: ["Ein Zimmer", "Zwei Zimmer", "Drei Zimmer"], a: 1 },
    { audio: "Am Sonntag sind alle Geschäfte in Deutschland geschlossen.", q: "Wann sind die Geschäfte zu?", opts: ["Am Samstag", "Am Sonntag", "Am Montag"], a: 1 },
    { audio: "Ich möchte einen Tisch für vier Personen reservieren, für heute Abend.", q: "Für wie viele Personen?", opts: ["Für zwei", "Für vier", "Für vierzehn"], a: 1 },
    { audio: "Der Kurs kostet zweihundert Euro für zehn Wochen.", q: "Was kostet der Kurs?", opts: ["200 € für 10 Wochen", "210 € für 10 Wochen", "200 € pro Woche"], a: 0 },
    { audio: "Vergiss nicht, morgen ist der Geburtstag von deiner Schwester!", q: "Wer hat Geburtstag?", opts: ["Der Bruder", "Die Schwester", "Die Mutter"], a: 1 },
    { audio: "Die Bibliothek ist im zweiten Stock, links neben dem Aufzug.", q: "Wo ist die Bibliothek?", opts: ["Im ersten Stock", "Im zweiten Stock", "Im Erdgeschoss"], a: 1 },
  ],
  lesen: [
    { text: "Restaurant Sonne — Warme Küche von 11:30 bis 22:00 Uhr. Montag Ruhetag.", q: "Wann ist das Restaurant geschlossen?", opts: ["Sonntag", "Montag", "Dienstag"], a: 1 },
    { text: "Hallo Lisa! Ich habe heute keine Zeit. Treffen wir uns morgen um vier? Max", q: "Wann will Max sich treffen?", opts: ["Heute um vier", "Morgen um vier", "Morgen um vierzehn Uhr"], a: 1 },
    { text: "Fahrrad zu verkaufen! Fast neu, nur 3 Monate alt. 120 €. Tel. 0170 998877", q: "Wie alt ist das Fahrrad?", opts: ["3 Jahre", "3 Monate", "3 Wochen"], a: 1 },
    { text: "Der Kurs fällt heute aus. Die Lehrerin ist krank. Nächster Termin: Donnerstag.", q: "Warum fällt der Kurs aus?", opts: ["Feiertag", "Die Lehrerin ist krank", "Der Raum ist zu"], a: 1 },
    { text: "Vorsicht, nasser Boden! Bitte langsam gehen.", q: "Was soll man tun?", opts: ["Schnell gehen", "Langsam gehen", "Nicht hineingehen"], a: 1 },
    { text: "Einladung: Meine Geburtstagsparty am Samstag ab 19 Uhr bei mir zu Hause.", q: "Wann ist die Party?", opts: ["Freitag ab 19 Uhr", "Samstag ab 19 Uhr", "Samstag ab 9 Uhr"], a: 1 },
    { text: "Schwimmbad: Kinder unter 6 Jahren frei. Erwachsene 5 €.", q: "Was zahlen Erwachsene?", opts: ["Nichts", "5 €", "6 €"], a: 1 },
    { text: "Bitte schließen Sie die Tür leise. Die Nachbarn schlafen.", q: "Warum soll man leise sein?", opts: ["Die Nachbarn schlafen", "Die Tür ist kaputt", "Es ist verboten"], a: 0 },
    { text: "Praxis Dr. Klein — Sprechzeiten: Mo, Di, Do 8–12 und 15–18 Uhr.", q: "Wann ist am Mittwoch Sprechzeit?", opts: ["8–12 Uhr", "15–18 Uhr", "Keine Sprechzeit"], a: 2 },
    { text: "Die Miete ist jeden Monat bis zum dritten Tag zu bezahlen.", q: "Bis wann muss man zahlen?", opts: ["Bis zum ersten", "Bis zum dritten", "Bis zum dreißigsten"], a: 1 },
    { text: "Deutschkurs für Anfänger. Keine Vorkenntnisse nötig. Start: 15. September.", q: "Für wen ist der Kurs?", opts: ["Für Anfänger", "Für Fortgeschrittene", "Für Kinder"], a: 0 },
    { text: "Achtung: Ab 1. Januar kostet die Fahrkarte 3,20 € statt 2,90 €.", q: "Was passiert am 1. Januar?", opts: ["Die Fahrkarte wird teurer", "Die Fahrkarte wird billiger", "Nichts ändert sich"], a: 0 },
    { text: "Wir suchen eine Kollegin für unser Büro. Gute Deutschkenntnisse nötig.", q: "Was braucht man für die Stelle?", opts: ["Ein Auto", "Gute Deutschkenntnisse", "Ein Studium"], a: 1 },
    { text: "Der Supermarkt liefert ab 40 € Einkaufswert kostenlos nach Hause.", q: "Ab wann ist die Lieferung kostenlos?", opts: ["Ab 4 €", "Ab 14 €", "Ab 40 €"], a: 2 },
    { text: "Liebe Nachbarn, am Samstag mache ich eine Party. Es kann etwas laut werden. Entschuldigung! Anna", q: "Was macht Anna am Samstag?", opts: ["Sie zieht um", "Sie macht eine Party", "Sie repariert etwas"], a: 1 },
  ],
  schreiben: [
    {
      type: "form",
      task: "Ihr Kollege Ahmed möchte ein Zimmer im Hotel buchen. Füllen Sie das Formular aus.",
      context: "Ahmed Hassan, geboren am 05.11.1990, wohnt in der Bahnhofstraße 22, 10115 Berlin. Telefon: 0151 7788990. Er ist Lehrer und kommt aus Ägypten.",
      fields: [
        { label: "Familienname", answer: "Hassan" },
        { label: "Vorname", answer: "Ahmed" },
        { label: "Geburtsdatum", answer: "05.11.1990" },
        { label: "Straße / Hausnummer", answer: "Bahnhofstraße 22" },
        { label: "Postleitzahl / Ort", answer: "10115 Berlin" },
        { label: "Telefonnummer", answer: "0151 7788990" },
        { label: "Beruf", answer: "Lehrer" },
        { label: "Land", answer: "Ägypten" },
      ],
    },
    {
      type: "message",
      task: "Schreiben Sie eine kurze Nachricht (ca. 30 Wörter) an eine Freundin. Sie möchten sie am Wochenende zum Essen einladen.",
      points: ["Anrede", "Einladung zum Essen", "Tag und Uhrzeit nennen", "Nach einer Antwort fragen", "Gruß"],
      model: "Liebe Sara,\n\nhast du am Samstag Zeit? Ich möchte dich gern zum Essen einladen. Wir können um 19 Uhr bei mir essen. Schreib mir bitte, ob du kommst!\n\nViele Grüße,\nKiran",
    },
  ],
  sprechen: [
    {
      type: "intro",
      task: "Stellen Sie sich vor. Sagen Sie etwas zu jedem Stichwort.",
      cues: ["Name", "Alter", "Land", "Wohnort", "Familie", "Arbeit", "Freizeit"],
      model: "Mein Name ist Kiran. Ich bin 28 Jahre alt und komme aus Indien. Ich wohne jetzt in München. Meine Familie lebt in Indien. Ich arbeite als Ingenieur. In der Freizeit spiele ich Fußball und lerne Deutsch.",
    },
    {
      type: "cards",
      task: "Thema „Wohnen“. Bilden Sie zu jedem Wort eine Frage und antworten Sie.",
      cues: ["Wohnung", "Zimmer", "Miete", "Nachbarn"],
      model: "Frage: Wie groß ist deine Wohnung? — Antwort: Meine Wohnung hat zwei Zimmer und ist ziemlich klein, aber sehr hell.",
    },
    {
      type: "request",
      task: "Bitten Sie höflich um etwas. Reagieren Sie auch auf eine Bitte.",
      cues: ["den Stadtplan", "einen Termin", "die Speisekarte", "Hilfe beim Formular"],
      model: "Können Sie mir bitte helfen? Ich verstehe dieses Formular nicht. — Ja, natürlich, gern!",
    },
  ],
};

export const EXAMS = [exam1, exam2];

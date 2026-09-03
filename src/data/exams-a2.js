/* Goethe-Zertifikat A2 mock exams.

   The A2 format differs from A1: Hören ~30 min / 4 parts / 20 items,
   Lesen 30 min / 4 parts / 20 items, Schreiben 30 min (two short written
   messages), Sprechen ~15 min (about yourself · a topic · planning
   something together). Pass mark is 60 %, same as A1. */

export const PASS_MARK = 0.6;

export const SECTIONS = [
  { id: "hoeren",    name: "Hören",     minutes: 30, items: 20 },
  { id: "lesen",     name: "Lesen",     minutes: 30, items: 20 },
  { id: "schreiben", name: "Schreiben", minutes: 30, items: 2 },
  { id: "sprechen",  name: "Sprechen",  minutes: 15, items: 3 },
];

const exam1 = {
  id: "a2-mock-1",
  name: "Modelltest 1",
  hoeren: [
    { audio: "Der Zug nach Hamburg hat heute leider fünfundzwanzig Minuten Verspätung.", q: "Wie viel Verspätung hat der Zug?", opts: ["15 Minuten", "25 Minuten", "35 Minuten"], a: 1 },
    { audio: "Guten Tag, hier ist die Praxis Dr. Weber. Ihr Termin am Dienstag muss leider ausfallen. Können Sie am Donnerstag um zehn?", q: "Was ist das Problem?", opts: ["Der Termin fällt aus", "Der Arzt ist krank", "Die Praxis zieht um"], a: 0 },
    { audio: "Ich habe die Wohnung leider nicht bekommen. Der Vermieter hat sie schon an jemand anderen vergeben.", q: "Was ist passiert?", opts: ["Die Wohnung war zu teuer", "Jemand anderes hat die Wohnung", "Die Wohnung war zu klein"], a: 1 },
    { audio: "Nächste Woche kann ich nicht zum Kurs kommen, weil ich beruflich in München bin.", q: "Warum kommt die Person nicht?", opts: ["Sie ist krank", "Sie ist beruflich unterwegs", "Sie hat Urlaub"], a: 1 },
    { audio: "Die Bibliothek ist ab Montag wegen Renovierung für drei Wochen geschlossen.", q: "Warum ist die Bibliothek zu?", opts: ["Wegen Feiertag", "Wegen Renovierung", "Wegen Umzug"], a: 1 },
    { audio: "Für die Anmeldung brauchen Sie Ihren Pass, eine Bescheinigung vom Vermieter und ein Passfoto.", q: "Was braucht man nicht?", opts: ["Einen Pass", "Ein Passfoto", "Einen Arbeitsvertrag"], a: 2 },
    { audio: "Ich würde gern das Zimmer besichtigen. Wäre Samstagnachmittag möglich?", q: "Was möchte die Person?", opts: ["Das Zimmer mieten", "Das Zimmer besichtigen", "Den Vertrag unterschreiben"], a: 1 },
    { audio: "Wenn Sie am Wochenende fahren, ist das Ticket zwanzig Prozent billiger.", q: "Wann ist das Ticket billiger?", opts: ["Am Wochenende", "Unter der Woche", "Am Abend"], a: 0 },
    { audio: "Mein Sohn hat seit gestern Fieber, deshalb bleibt er heute zu Hause.", q: "Warum bleibt der Sohn zu Hause?", opts: ["Er hat Ferien", "Er hat Fieber", "Er hat keine Lust"], a: 1 },
    { audio: "Die Stelle ist als Teilzeit gedacht, etwa zwanzig Stunden pro Woche.", q: "Wie viele Stunden pro Woche?", opts: ["Zehn", "Zwanzig", "Vierzig"], a: 1 },
    { audio: "Nach dem Konzert treffen wir uns am Ausgang, nicht am Eingang.", q: "Wo treffen sie sich?", opts: ["Am Eingang", "Am Ausgang", "An der Kasse"], a: 1 },
    { audio: "Ich habe mich für den Deutschkurs angemeldet, aber ich muss noch bezahlen.", q: "Was fehlt noch?", opts: ["Die Anmeldung", "Die Bezahlung", "Das Formular"], a: 1 },
    { audio: "Bei diesem Wetter würde ich lieber zu Hause bleiben, als spazieren zu gehen.", q: "Was möchte die Person?", opts: ["Spazieren gehen", "Zu Hause bleiben", "Ins Kino gehen"], a: 1 },
    { audio: "Der Handwerker kommt morgen zwischen acht und zwölf Uhr.", q: "Wann kommt der Handwerker?", opts: ["Morgens", "Nachmittags", "Abends"], a: 0 },
    { audio: "Ich habe das Paket nicht bekommen. Können Sie bitte prüfen, wo es ist?", q: "Was ist das Problem?", opts: ["Das Paket ist kaputt", "Das Paket fehlt", "Das Paket war zu teuer"], a: 1 },
    { audio: "Wir suchen jemanden, der gut Deutsch und Englisch spricht.", q: "Was ist wichtig für die Stelle?", opts: ["Zwei Sprachen", "Ein Führerschein", "Ein Studium"], a: 0 },
    { audio: "Das Museum ist für Studenten kostenlos, alle anderen zahlen acht Euro.", q: "Was zahlen Studenten?", opts: ["Acht Euro", "Nichts", "Vier Euro"], a: 1 },
    { audio: "Ich habe mich schon oft beschwert, aber die Nachbarn sind immer noch laut.", q: "Wie fühlt sich die Person?", opts: ["Zufrieden", "Genervt", "Überrascht"], a: 1 },
    { audio: "Bevor du gehst, mach bitte das Licht aus und schließ die Tür ab.", q: "Was soll die Person tun?", opts: ["Das Licht anmachen", "Licht aus und Tür abschließen", "Das Fenster öffnen"], a: 1 },
    { audio: "Der Kurs beginnt im September und dauert insgesamt sechs Monate.", q: "Wie lange dauert der Kurs?", opts: ["Sechs Wochen", "Sechs Monate", "Sechs Jahre"], a: 1 },
  ],
  lesen: [
    { text: "Liebe Kollegen, wegen einer Besprechung ist das Büro am Freitag erst ab 13 Uhr besetzt. Bei dringenden Fragen erreichen Sie mich per E-Mail.", q: "Ab wann ist das Büro besetzt?", opts: ["Ab 9 Uhr", "Ab 13 Uhr", "Gar nicht"], a: 1 },
    { text: "Zu vermieten: 2-Zimmer-Wohnung, 55 m², 3. Stock ohne Aufzug, 620 € warm, Kaution 2 Monatsmieten. Nur an Nichtraucher.", q: "Was gilt für die Wohnung?", opts: ["Es gibt einen Aufzug", "Nur Nichtraucher", "Die Kaution ist ein Monat"], a: 1 },
    { text: "Hallo Kiran, ich schaffe es heute nicht zum Sport. Können wir stattdessen morgen früh laufen gehen? LG Tom", q: "Was schlägt Tom vor?", opts: ["Heute Abend laufen", "Morgen früh laufen", "Gar nicht laufen"], a: 1 },
    { text: "Achtung: Ab dem 1. März wird der Müll nur noch alle zwei Wochen abgeholt. Bitte stellen Sie die Tonne am Vorabend raus.", q: "Was ändert sich?", opts: ["Der Müll wird seltener abgeholt", "Es gibt neue Tonnen", "Müll kostet mehr"], a: 0 },
    { text: "Sprachschule Aktiv — Intensivkurs A2: Mo–Fr, 9–12 Uhr, 8 Wochen, 480 €. Anmeldung bis 15. August.", q: "Bis wann muss man sich anmelden?", opts: ["1. August", "15. August", "15. September"], a: 1 },
    { text: "Sehr geehrte Frau Klein, wir haben Ihre Bewerbung erhalten. Wir melden uns bis Ende des Monats bei Ihnen.", q: "Was passiert als Nächstes?", opts: ["Sie hat die Stelle", "Sie bekommt bis Monatsende eine Antwort", "Sie muss noch mal schreiben"], a: 1 },
    { text: "Der Aufzug wird am Mittwoch gewartet und ist von 8 bis 16 Uhr außer Betrieb. Bitte benutzen Sie die Treppe.", q: "Wann funktioniert der Aufzug nicht?", opts: ["Den ganzen Tag", "Von 8 bis 16 Uhr", "Nur morgens"], a: 1 },
    { text: "Fahrrad gefunden! Blaues Damenrad, stand seit einer Woche im Hof. Bitte melden bei Familie Öztürk, Wohnung 4B.", q: "Was ist passiert?", opts: ["Ein Fahrrad wurde gefunden", "Ein Fahrrad wird verkauft", "Ein Fahrrad wurde gestohlen"], a: 0 },
    { text: "Hinweis für Patienten: Bitte bringen Sie zu jedem Termin Ihre Versichertenkarte mit. Ohne Karte müssen wir privat abrechnen.", q: "Was passiert ohne Karte?", opts: ["Kein Termin möglich", "Man zahlt privat", "Es kostet nichts"], a: 1 },
    { text: "Wir ziehen um! Ab dem 1. Juni finden Sie uns in der Bahnhofstraße 12. Die Telefonnummer bleibt gleich.", q: "Was bleibt gleich?", opts: ["Die Adresse", "Die Telefonnummer", "Die Öffnungszeiten"], a: 1 },
    { text: "Kursleiter gesucht: Wir suchen für unseren Sportverein einen Trainer, zweimal pro Woche abends. Erfahrung erwünscht, aber nicht Bedingung.", q: "Was ist nötig?", opts: ["Erfahrung ist Pflicht", "Erfahrung ist nur erwünscht", "Ein Studium"], a: 1 },
    { text: "Liebe Nachbarn, am Samstag feiere ich meinen Geburtstag. Es kann etwas lauter werden — bitte sagen Sie Bescheid, wenn es stört. Anna, 2. Stock", q: "Was möchte Anna?", opts: ["Dass niemand kommt", "Dass man Bescheid sagt bei Lärm", "Dass alle mitfeiern"], a: 1 },
    { text: "Online-Banking: Aus Sicherheitsgründen wird Ihr Passwort alle sechs Monate ungültig. Sie werden rechtzeitig informiert.", q: "Was passiert alle sechs Monate?", opts: ["Das Konto wird geprüft", "Das Passwort wird ungültig", "Die Gebühren steigen"], a: 1 },
    { text: "Restaurant Adler: Wir bitten um Reservierung für Gruppen ab 6 Personen. Für kleinere Gruppen ist keine Reservierung nötig.", q: "Wer muss reservieren?", opts: ["Alle Gäste", "Gruppen ab 6 Personen", "Niemand"], a: 1 },
    { text: "Der Deutschkurs fällt diese Woche aus. Die Lehrerin ist krank. Ersatztermin: Samstag, 10 Uhr, Raum 3.", q: "Wann ist der Ersatztermin?", opts: ["Freitag 10 Uhr", "Samstag 10 Uhr", "Montag 3 Uhr"], a: 1 },
    { text: "Neu im Angebot: Wer bis Ende des Monats ein Konto eröffnet, zahlt im ersten Jahr keine Kontogebühren.", q: "Was ist das Angebot?", opts: ["Ein Jahr ohne Gebühren", "Geld geschenkt", "Ein kostenloses Konto für immer"], a: 0 },
    { text: "Wichtig: Diese Fahrkarte gilt nur in Verbindung mit einem gültigen Ausweis. Ohne Ausweis ist sie ungültig.", q: "Was braucht man zusätzlich?", opts: ["Einen Ausweis", "Ein Foto", "Eine Quittung"], a: 0 },
    { text: "Praktikum gesucht? Wir bieten Studierenden ein dreimonatiges Praktikum im Marketing. Bewerbung mit Lebenslauf per E-Mail.", q: "Wie lange dauert das Praktikum?", opts: ["Einen Monat", "Drei Monate", "Ein Jahr"], a: 1 },
    { text: "Hallo Sara, danke für die Einladung! Leider habe ich am Samstag Spätschicht. Können wir uns am Sonntag treffen?", q: "Warum kann die Person nicht?", opts: ["Sie hat keine Lust", "Sie muss arbeiten", "Sie ist im Urlaub"], a: 1 },
    { text: "Bitte beachten: Im ganzen Gebäude gilt Rauchverbot. Rauchen ist nur im Hof neben dem Fahrradständer erlaubt.", q: "Wo darf man rauchen?", opts: ["Im Gebäude", "Im Hof", "Nirgends"], a: 1 },
  ],
  schreiben: [
    {
      type: "message",
      task: "Ihre Nachbarin Frau Berger hat Ihr Paket angenommen. Schreiben Sie ihr eine kurze Nachricht (ca. 25 Wörter).",
      points: ["Anrede", "Sich bedanken", "Sagen, wann Sie das Paket abholen", "Gruß"],
      model: "Liebe Frau Berger,\n\nvielen Dank, dass Sie mein Paket angenommen haben! Ich hole es heute Abend gegen 19 Uhr ab. Passt Ihnen das?\n\nViele Grüße\nKiran",
    },
    {
      type: "message",
      task: "Sie haben einen Deutschkurs gebucht, können aber nicht kommen. Schreiben Sie eine E-Mail an die Sprachschule (ca. 40 Wörter).",
      points: ["Förmliche Anrede", "Grund nennen, warum Sie nicht kommen", "Nach einem späteren Kurs fragen", "Nach dem Geld fragen", "Förmlicher Gruß"],
      model: "Sehr geehrte Damen und Herren,\n\nleider kann ich am Kurs im September nicht teilnehmen, weil ich beruflich im Ausland bin. Gibt es die Möglichkeit, in einen späteren Kurs zu wechseln? Und bekomme ich sonst die Kursgebühr zurück?\n\nMit freundlichen Grüßen\nKiran Mulawad",
    },
  ],
  sprechen: [
    {
      type: "intro",
      task: "Teil 1 — Fragen zur Person. Beantworte die Fragen in ganzen Sätzen.",
      cues: ["Name & Herkunft", "Wohnort", "Arbeit/Studium", "Sprachen", "Familie", "Freizeit"],
      model: "Ich heiße Kiran Mulawad und komme aus Indien. Seit zwei Jahren wohne ich in Deutschland und arbeite als Ingenieur. Ich spreche Hindi, Englisch und inzwischen ganz gut Deutsch. Meine Familie lebt noch in Indien. In meiner Freizeit koche ich gern und gehe joggen.",
    },
    {
      type: "topic",
      task: "Teil 2 — Über ein Thema sprechen: „Einkaufen“. Erzähle zusammenhängend, nicht nur einzelne Wörter.",
      cues: ["Wo kaufst du ein?", "Wie oft?", "Was kaufst du?", "Online oder im Geschäft?", "Was war früher anders?"],
      model: "Normalerweise kaufe ich einmal pro Woche im Supermarkt ein, meistens am Samstag. Ich kaufe vor allem Gemüse, Reis und Milch. Kleidung bestelle ich lieber online, weil es günstiger ist. Früher, in Indien, bin ich fast jeden Tag auf den Markt gegangen — das war frischer, aber es hat mehr Zeit gekostet.",
    },
    {
      type: "plan",
      task: "Teil 3 — Etwas gemeinsam planen: Ihr wollt zusammen den Geburtstag eines Freundes feiern. Macht Vorschläge und reagiert auf Vorschläge.",
      cues: ["Wann?", "Wo?", "Wer kommt?", "Essen & Getränke", "Geschenk"],
      model: "Sollen wir am Samstagabend feiern? — Ja, gute Idee. Wollen wir bei mir zu Hause feiern oder lieber ins Restaurant gehen? — Bei dir ist gemütlicher. Ich könnte einen Kuchen backen. — Super, dann kaufe ich die Getränke. Und was schenken wir ihm? — Vielleicht ein Buch, er liest gern.",
    },
  ],
};

const exam2 = {
  id: "a2-mock-2",
  name: "Modelltest 2",
  hoeren: [
    { audio: "Die Straßenbahn Linie vier fährt heute nicht. Bitte nehmen Sie den Ersatzbus.", q: "Was soll man tun?", opts: ["Warten", "Den Ersatzbus nehmen", "Zu Fuß gehen"], a: 1 },
    { audio: "Ich habe gestern angerufen, aber niemand ist rangegangen. Deshalb schreibe ich jetzt eine E-Mail.", q: "Warum schreibt die Person?", opts: ["Sie hat niemanden erreicht", "Sie hat die Nummer verloren", "Sie mag nicht telefonieren"], a: 0 },
    { audio: "Der Kurs ist schon voll. Aber ich kann Sie gern auf die Warteliste setzen.", q: "Was bietet die Person an?", opts: ["Einen anderen Kurs", "Die Warteliste", "Eine Rückzahlung"], a: 1 },
    { audio: "Wir haben uns entschieden, doch nicht umzuziehen. Die neue Wohnung war zu teuer.", q: "Warum ziehen sie nicht um?", opts: ["Zu teuer", "Zu klein", "Zu weit weg"], a: 0 },
    { audio: "Am Wochenende soll es sonnig und warm werden, bis zu sechsundzwanzig Grad.", q: "Wie wird das Wetter?", opts: ["Regnerisch", "Sonnig und warm", "Kalt"], a: 1 },
    { audio: "Denk bitte daran, das Formular zu unterschreiben. Ohne Unterschrift ist es ungültig.", q: "Was fehlt?", opts: ["Ein Foto", "Die Unterschrift", "Das Datum"], a: 1 },
    { audio: "Ich habe mir beim Sport das Knie verletzt und darf vier Wochen nicht laufen.", q: "Was ist passiert?", opts: ["Sie ist krank", "Sie hat sich verletzt", "Sie hat keine Zeit"], a: 1 },
    { audio: "Das Zimmer kostet fünfzig Euro pro Nacht, das Frühstück kostet zehn Euro extra.", q: "Was kostet das Frühstück?", opts: ["Nichts", "Zehn Euro extra", "Fünfzig Euro"], a: 1 },
    { audio: "Bitte melden Sie sich innerhalb von zwei Wochen nach dem Umzug beim Bürgeramt an.", q: "Wie schnell muss man sich anmelden?", opts: ["Sofort", "Innerhalb von zwei Wochen", "Innerhalb von zwei Monaten"], a: 1 },
    { audio: "Meine Kollegin ist im Urlaub, deshalb mache ich diese Woche ihre Arbeit mit.", q: "Warum hat die Person mehr Arbeit?", opts: ["Die Kollegin ist im Urlaub", "Sie wurde befördert", "Es gibt neue Kunden"], a: 0 },
    { audio: "Wenn Sie mit Karte bezahlen möchten, geht das leider erst ab zehn Euro.", q: "Ab wann kann man mit Karte zahlen?", opts: ["Immer", "Ab zehn Euro", "Gar nicht"], a: 1 },
    { audio: "Ich würde gern früher anfangen, dafür aber auch früher Feierabend machen.", q: "Was möchte die Person?", opts: ["Weniger arbeiten", "Früher anfangen und aufhören", "Von zu Hause arbeiten"], a: 1 },
    { audio: "Die Prüfung besteht aus vier Teilen. Für jeden Teil brauchen Sie mindestens sechzig Prozent.", q: "Wie viel Prozent braucht man?", opts: ["Fünfzig", "Sechzig", "Siebzig"], a: 1 },
    { audio: "Entschuldigung, dieser Platz ist leider besetzt. Meine Frau kommt gleich zurück.", q: "Warum ist der Platz nicht frei?", opts: ["Er ist kaputt", "Jemand sitzt dort schon", "Er ist reserviert für Kinder"], a: 1 },
    { audio: "Nach dem Essen sollten Sie die Tabletten nehmen, nicht davor.", q: "Wann nimmt man die Tabletten?", opts: ["Vor dem Essen", "Nach dem Essen", "Ohne Essen"], a: 1 },
    { audio: "Der Handwerker war da, aber er konnte die Heizung nicht reparieren. Er kommt nächste Woche wieder.", q: "Was ist mit der Heizung?", opts: ["Sie ist repariert", "Sie ist noch kaputt", "Sie wurde ersetzt"], a: 1 },
    { audio: "Für die Fahrt brauchen wir ungefähr drei Stunden, wenn es keinen Stau gibt.", q: "Wie lange dauert die Fahrt?", opts: ["Zwei Stunden", "Etwa drei Stunden", "Vier Stunden"], a: 1 },
    { audio: "Ich habe den Film schon gesehen. Können wir lieber etwas anderes machen?", q: "Was möchte die Person?", opts: ["Den Film sehen", "Etwas anderes machen", "Zu Hause bleiben"], a: 1 },
    { audio: "Bitte bringen Sie zum Termin alle Unterlagen mit, sonst müssen Sie noch einmal kommen.", q: "Was passiert ohne Unterlagen?", opts: ["Nichts", "Man muss noch einmal kommen", "Man zahlt mehr"], a: 1 },
    { audio: "Seit ich mehr Sport mache, fühle ich mich viel besser und schlafe auch besser.", q: "Was hat sich verbessert?", opts: ["Ihr Deutsch", "Ihr Befinden und Schlaf", "Ihre Arbeit"], a: 1 },
  ],
  lesen: [
    { text: "Schwimmbad Ostpark: Wegen Reinigung bleibt das Becken am Montagvormittag geschlossen. Ab 14 Uhr ist wieder geöffnet.", q: "Wann kann man montags schwimmen?", opts: ["Den ganzen Tag", "Ab 14 Uhr", "Gar nicht"], a: 1 },
    { text: "Suche Nachhilfe in Mathematik für meinen Sohn (8. Klasse), einmal pro Woche, 15 €/Stunde. Nur Nachmittags.", q: "Wann soll die Nachhilfe sein?", opts: ["Vormittags", "Nachmittags", "Am Wochenende"], a: 1 },
    { text: "Sehr geehrter Herr Mulawad, Ihr Antrag wurde bearbeitet. Bitte holen Sie das Dokument persönlich ab und bringen Sie Ihren Pass mit.", q: "Was muss Herr Mulawad tun?", opts: ["Warten", "Persönlich mit Pass kommen", "Noch einmal schreiben"], a: 1 },
    { text: "Café Central sucht Aushilfe für Samstag und Sonntag, jeweils 6 Stunden. Erfahrung nicht nötig, Deutschkenntnisse erforderlich.", q: "Was ist erforderlich?", opts: ["Erfahrung", "Deutschkenntnisse", "Ein Auto"], a: 1 },
    { text: "Hallo zusammen, unser Treffen verschiebt sich von Dienstag auf Mittwoch, gleiche Uhrzeit, gleicher Ort.", q: "Was ändert sich?", opts: ["Der Tag", "Die Uhrzeit", "Der Ort"], a: 0 },
    { text: "Achtung Fahrgäste: Ab Montag halten die Busse der Linie 7 nicht mehr am Marktplatz, sondern am Rathaus.", q: "Was ändert sich für Linie 7?", opts: ["Sie fährt nicht mehr", "Sie hält am Rathaus", "Sie fährt nur abends"], a: 1 },
    { text: "Verkaufe Waschmaschine, 3 Jahre alt, funktioniert einwandfrei, 150 € VB. Abholung in Hockenheim.", q: "Was muss der Käufer tun?", opts: ["Die Maschine abholen", "Auf Lieferung warten", "Reparieren lassen"], a: 0 },
    { text: "Liebe Eltern, der Ausflug findet auch bei Regen statt. Bitte geben Sie Ihrem Kind wetterfeste Kleidung mit.", q: "Was passiert bei Regen?", opts: ["Der Ausflug fällt aus", "Der Ausflug findet statt", "Der Ausflug wird verschoben"], a: 1 },
    { text: "Fitnessstudio Vital: Bei einem Jahresvertrag zahlen Sie nur 25 € statt 35 € im Monat. Kündigung drei Monate vorher.", q: "Was spart man mit dem Jahresvertrag?", opts: ["10 € im Monat", "25 € im Jahr", "Nichts"], a: 0 },
    { text: "Info an alle Mieter: Die Waschküche ist ab sofort nur noch von 7 bis 21 Uhr benutzbar. Bitte halten Sie sich daran.", q: "Wann darf man waschen?", opts: ["Rund um die Uhr", "7 bis 21 Uhr", "Nur am Wochenende"], a: 1 },
    { text: "Danke für Ihre Bestellung! Die Lieferung erfolgt in 3–5 Werktagen. Sie erhalten eine E-Mail mit der Sendungsnummer.", q: "Was bekommt der Kunde per E-Mail?", opts: ["Die Rechnung", "Die Sendungsnummer", "Einen Gutschein"], a: 1 },
    { text: "Der Sprachkurs richtet sich an Teilnehmer mit Vorkenntnissen auf Niveau A1. Anfänger ohne Vorkenntnisse können nicht teilnehmen.", q: "Wer kann teilnehmen?", opts: ["Alle", "Nur Leute mit A1", "Nur Anfänger"], a: 1 },
    { text: "Hinweis: Bitte parken Sie nicht vor der Garage. Bei Behinderung wird das Fahrzeug abgeschleppt.", q: "Was passiert, wenn man dort parkt?", opts: ["Man zahlt Miete", "Das Auto wird abgeschleppt", "Nichts"], a: 1 },
    { text: "Wir haben leider keine Zimmer mehr frei. Ich kann Ihnen aber ein Hotel in der Nähe empfehlen.", q: "Was bietet die Person an?", opts: ["Ein Zimmer", "Eine Empfehlung", "Eine Rückzahlung"], a: 1 },
    { text: "Neu: Ab September bieten wir auch Abendkurse an — dienstags und donnerstags von 18 bis 20 Uhr.", q: "Wann sind die Abendkurse?", opts: ["Mo und Mi", "Di und Do", "Nur freitags"], a: 1 },
    { text: "Liebe Anna, ich bin gut angekommen. Die Wohnung ist kleiner als auf den Fotos, aber die Lage ist super.", q: "Was sagt die Person über die Wohnung?", opts: ["Sie ist größer als erwartet", "Sie ist kleiner, aber gut gelegen", "Sie ist zu teuer"], a: 1 },
    { text: "Wichtig: Rückgabe nur mit Kassenbon und innerhalb von 14 Tagen. Reduzierte Ware ist vom Umtausch ausgeschlossen.", q: "Was kann man nicht umtauschen?", opts: ["Alles", "Reduzierte Ware", "Kleidung"], a: 1 },
    { text: "Die Firma bietet ihren Mitarbeitern ein günstiges Monatsticket für den Bus an. Interessierte melden sich im Personalbüro.", q: "Wo meldet man sich?", opts: ["Beim Chef", "Im Personalbüro", "Beim Busfahrer"], a: 1 },
    { text: "Am Sonntag ist das Restaurant geschlossen. Für Feiern ab 20 Personen öffnen wir aber auf Anfrage.", q: "Wann öffnet man sonntags doch?", opts: ["Nie", "Bei Feiern ab 20 Personen", "Nur mittags"], a: 1 },
    { text: "Bitte beachten Sie: Diese Bescheinigung ist nur sechs Monate gültig. Danach müssen Sie eine neue beantragen.", q: "Wie lange gilt die Bescheinigung?", opts: ["Drei Monate", "Sechs Monate", "Ein Jahr"], a: 1 },
  ],
  schreiben: [
    {
      type: "message",
      task: "Sie können zu einer Geburtstagsfeier nicht kommen. Schreiben Sie Ihrem Freund Tom eine Nachricht (ca. 25 Wörter).",
      points: ["Anrede", "Absagen", "Grund nennen", "Etwas vorschlagen", "Gruß"],
      model: "Hallo Tom,\n\nleider kann ich am Samstag nicht zu deiner Feier kommen, weil ich arbeiten muss. Das tut mir wirklich leid! Sollen wir nächste Woche zusammen essen gehen?\n\nLiebe Grüße\nKiran",
    },
    {
      type: "message",
      task: "Sie haben online eine Jacke bestellt, aber die falsche Größe bekommen. Schreiben Sie eine E-Mail an den Shop (ca. 40 Wörter).",
      points: ["Förmliche Anrede", "Bestellung nennen", "Problem beschreiben", "Sagen, was Sie möchten", "Förmlicher Gruß"],
      model: "Sehr geehrte Damen und Herren,\n\nam 3. Mai habe ich bei Ihnen eine Jacke bestellt (Bestellnummer 45821). Leider habe ich Größe M statt L bekommen. Können Sie mir bitte die richtige Größe schicken? Die falsche Jacke sende ich zurück.\n\nMit freundlichen Grüßen\nKiran Mulawad",
    },
  ],
  sprechen: [
    {
      type: "intro",
      task: "Teil 1 — Fragen zur Person. Antworte in ganzen Sätzen.",
      cues: ["Alter & Herkunft", "Wohnsituation", "Tagesablauf", "Deutsch lernen", "Zukunftspläne"],
      model: "Ich bin 28 Jahre alt und komme ursprünglich aus Indien. Ich wohne allein in einer kleinen Wohnung in Hockenheim. Normalerweise stehe ich um sieben auf und fahre mit dem Zug zur Arbeit. Deutsch lerne ich seit zwei Jahren, weil ich hier bleiben möchte. Nächstes Jahr will ich die B1-Prüfung machen.",
    },
    {
      type: "topic",
      task: "Teil 2 — Über ein Thema sprechen: „Wohnen“. Erzähle zusammenhängend.",
      cues: ["Wie wohnst du?", "Was gefällt dir?", "Was stört dich?", "Wie hast du früher gewohnt?", "Traumwohnung"],
      model: "Ich wohne in einer Zweizimmerwohnung im dritten Stock. Mir gefällt, dass sie sehr hell ist und dass der Bahnhof ganz in der Nähe liegt. Was mich stört, ist der Lärm von der Straße. Früher habe ich mit meiner Familie in einem großen Haus gewohnt, das war ganz anders. Meine Traumwohnung hätte einen Balkon und einen Garten.",
    },
    {
      type: "plan",
      task: "Teil 3 — Etwas gemeinsam planen: Ihr wollt am Wochenende einen Ausflug machen. Macht Vorschläge und einigt euch.",
      cues: ["Wohin?", "Wann losfahren?", "Wie hinkommen?", "Was mitnehmen?", "Was kostet es?"],
      model: "Wollen wir am Sonntag an den See fahren? — Gute Idee! Wann sollen wir losfahren? — Vielleicht um neun, dann sind wir früh da. Fahren wir mit dem Auto oder mit dem Zug? — Mit dem Zug ist billiger. Ich bringe Getränke mit. — Und ich mache Brote. Dann kostet es fast nichts.",
    },
  ],
};

export const EXAMS_A2 = [exam1, exam2];

/* One registry mapping a level id to all of its content.
   Screens read from here and never import a level's data directly, so
   adding B1 later is a matter of adding one entry. */

import * as A1_GRAMMAR from "./grammar.js";
import * as A2_GRAMMAR from "./grammar-a2.js";
import { VOCAB, NOUNS } from "./vocab.js";
import { VOCAB_A2, NOUNS_A2 } from "./vocab-a2.js";
import { EXAMS, PASS_MARK as A1_PASS, SECTIONS as A1_SECTIONS } from "./exams.js";
import { EXAMS_A2, PASS_MARK as A2_PASS, SECTIONS as A2_SECTIONS } from "./exams-a2.js";

export const LEVEL_IDS = ["a1", "a2"];

export const LEVELS = {
  a1: {
    id: "a1",
    label: "A1",
    name: "Anfänger",
    blurb: "Erste Schritte — sich vorstellen, einkaufen, den Alltag beschreiben.",
    grammar: A1_GRAMMAR,
    vocab: VOCAB,
    nouns: NOUNS,
    exams: EXAMS,
    examSections: A1_SECTIONS,
    passMark: A1_PASS,
    /* The 860-word thematic booklet is A1 material, so it only appears here. */
    hasThemen: true,
  },
  a2: {
    id: "a2",
    label: "A2",
    name: "Grundlagen",
    blurb: "Über Vergangenes sprechen, Meinungen äußern, Nebensätze bilden.",
    grammar: A2_GRAMMAR,
    vocab: VOCAB_A2,
    nouns: NOUNS_A2,
    exams: EXAMS_A2,
    examSections: A2_SECTIONS,
    passMark: A2_PASS,
    hasThemen: false,
  },
};

export const levelData = (id) => LEVELS[id] || LEVELS.a1;

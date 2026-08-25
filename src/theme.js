/* Design tokens — warm "study notebook" palette.
   Light values are the originals from DeutschA1.jsx; dark is a night-study
   counterpart that keeps the same hue relationships. */

export const serif = "Georgia, 'Iowan Old Style', 'Times New Roman', serif";
export const sans = "'Segoe UI', system-ui, -apple-system, sans-serif";

const LIGHT = {
  paper: "#F1EBDD",
  paper2: "#E9E1CF",
  surface: "#FCFAF4",
  ink: "#2B2333",
  inkSoft: "#6E6577",
  plum: "#6B2D5C",
  plumDark: "#4C1E41",
  plumSoft: "#F0E3EC",
  gold: "#C4972F",
  goldSoft: "#F5EAD0",
  green: "#2E7D57",
  greenSoft: "#E3EFE7",
  red: "#B84438",
  redSoft: "#F6E5E2",
  line: "#DED3BE",
  /* Booklet article colour code — der/die/das */
  artDer: "#1F4E79",
  artDie: "#C0392B",
  artDas: "#2E7D32",
  artDerSoft: "#E4EDF6",
  artDieSoft: "#F9E6E3",
  artDasSoft: "#E4F0E6",
};

const DARK = {
  paper: "#1B1622",
  paper2: "#241D2E",
  surface: "#262030",
  ink: "#EFE8DC",
  inkSoft: "#A79CB2",
  plum: "#C98FB4",
  plumDark: "#E0B4D0",
  plumSoft: "#3A2637",
  gold: "#E0B65A",
  goldSoft: "#3A2F1C",
  green: "#6BC095",
  greenSoft: "#1E3A2C",
  red: "#E58A7C",
  redSoft: "#3C2320",
  line: "#3B3247",
  /* Lightened for dark backgrounds — same hue relationships */
  artDer: "#8CB8E8",
  artDie: "#EB9084",
  artDas: "#82C98D",
  artDerSoft: "#1E2A3A",
  artDieSoft: "#3A241F",
  artDasSoft: "#1C3324",
};

/* Every token is exposed as a CSS custom property so the palette can flip
   with prefers-color-scheme without React re-rendering. `C` reads those
   variables, so components never hold a hard-coded hex. */
export const C = Object.fromEntries(
  Object.keys(LIGHT).map((k) => [k, `var(--c-${k})`])
);

const vars = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => `  --c-${k}: ${v};`)
    .join("\n");

export const themeCSS = `
:root {
${vars(LIGHT)}
  --safe-b: env(safe-area-inset-bottom, 0px);
  --safe-t: env(safe-area-inset-top, 0px);
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root {
${vars(DARK)}
    color-scheme: dark;
  }
}
`;

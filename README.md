# Navigate Student Survey — Prototype (POC)

Student-facing prototype for the Navigate research/polling feature. Throwaway
code for design exploration — the client will not use it.

## Run

```bash
cd prototype
npm install
npm run dev
```

## What it demonstrates

- **Full student journey**: login invitation → wizard → optional prize-draw
  contact → thank-you (spec §2).
- **Two interchangeable shells** from one survey engine — toggle in the top
  bar: **Full screen** (mobile-first takeover) vs **Modal** (centered card,
  desktop feel). The difference is clearest at desktop width.
- **All eight question/response types**, one live example of each:
  single choice, labelled rating (Likert), numeric rating (1–5), yes/no,
  multiple choice (with a max-selection cap), dropdown, numeric stepper,
  short text, long text.
- Progress bar + "x% complete", required/optional validation, back/next,
  character counters, keyboard focus management, ARIA roles (WCAG 2.1 AA aim).

## Re-theming for the Navigate brand

All brand styling lives in CSS variables in [`src/index.css`](src/index.css)
under `:root` — sourced from `design-tokens/colour-tokens.jpg` (Primary
`#459BA1`, Secondary `#703B77`, etc.). Change those values (colours, radius,
font) and the whole prototype re-themes — no component edits needed.

**Font.** The brand font is Whitney (licensed) with Open Sans as the site's
documented fallback. We don't have the Whitney web-font files and students'
devices won't have it installed, so the prototype renders in **Open Sans** —
the fallback most users actually see. On production, add the Whitney
`@font-face` and prepend `'Whitney'` to `--font-sans`.

## Structure

```
src/
  survey/        types, demo survey content, validation
  components/    Button, ProgressBar, Icon, question inputs
  screens/       Shell, Invitation, SurveyWizard, PrizeDraw, ThankYou, SurveyFlow
  App.tsx        demo chrome (faux dashboard + shell toggle) — not part of product
```

Adding / reordering questions = edit
[`src/survey/demoSurvey.ts`](src/survey/demoSurvey.ts). This mirrors the
admin "hand-pick a set of questions" model (Model 1) without branching.

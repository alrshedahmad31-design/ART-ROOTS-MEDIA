# ART ROOTS MEDIA — Design System & Visual Identity

This document outlines the visual language and technical design specifications for the **Brutalist Cinematic** identity of ART ROOTS MEDIA.

---

## 1. Aesthetic Philosophy: "Brutalist Cinematic"
The project follows a high-contrast, sharp-edged aesthetic that combines architectural brutality with premium cinematic lighting.

- **Brutalist Elements**: Sharp corners (radius 0), prominent grids, visible "noise" overlays, and bold, mechanical typography.
- **Cinematic Elements**: Deep gradients, backdrop blurs (glassmorphism), spotlight effects, and smooth high-end animations (via Framer Motion).

---

## 2. Color Palette
The identity is built on a limited, high-impact palette.

| Tone | Hex | Variable | Usage |
| :--- | :--- | :--- | :--- |
| **Onyx** | `#111111` | `--onyx` | Primary backgrounds, primary text, heavy borders. |
| **Signal Red** | `#E63B2E` | `--signal-red` | Call to action, highlights, active states. |
| **Off-White** | `#F5F3EE` | `--off-white` | Secondary backgrounds, inverse text. |
| **Sand** | `#E8E4DD` | `--sand` | Neutral dividers, background variants (Paper style). |

---

## 3. Typography
The system uses a bilingual typographic pairing designed for maximum impact and readability.

### Arabic (Primary)
- **Font**: `Cairo`
- **Fallback**: Sans-serif
- **Attributes**: Geometric, modern, high legibility.
- **Implementation**: Enforced via `[dir="rtl"]` overrides in `index.css`.

### English (Headings)
- **Font**: `DM Serif Display`
- **Fallback**: Serif
- **Attributes**: Elegant, high-contrast serif for a cinematic look.

### English (UI/Body)
- **Font**: `Space Grotesk`
- **Fallback**: Sans-serif
- **Attributes**: Industrial, geometric, clear hierarchy.

### Technical/Meta Data
- **Font**: `Space Mono`
- **Attributes**: Mechanical, data-driven feel. Used for labels like `01 / SERVICE`.

---

## 4. Layout & Grid
- **Container**: Max-width `1440px`.
- **Spacing**: Large, airy vertical padding (`py-24` or `py-32`) to separate "architectural blocks".
- **Borders**: Typically `1px` or `2px` solid Onyx or Off-White (10% - 20% opacity).

---

## 5. Components
### Magnetic Buttons
- **Shape**: Strictly rectangular (border-radius: 0).
- **Animation**: On hover, translates `-4px, -4px` with a persistent shadow box below it.

### Paper Cards
- **Style**: Sand background with structural borders.
- **Hover**: Subtle vertical lift.

### Glass Sheets
- **Attribute**: `backdrop-blur-xl` with semi-transparent backgrounds. Used for the Mobile Nav capsule and overlays.

---

## 6. Technical Enforcements
- **Global CSS**: `src/index.css` contains the source of truth for design tokens.
- **Tailwind Config**: `tailwind.config.js` maps these tokens to utility classes (e.g., `text-onyx`, `bg-signal-red`).
- **RTL Support**: Native RTL handling is baked into the layout using the `dir` attribute on the `html` element.

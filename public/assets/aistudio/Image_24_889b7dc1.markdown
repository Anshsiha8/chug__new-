---
name: Pop Comic Neo-Print
colors:
  surface: '#fff9e9'
  surface-dim: '#dfdac9'
  surface-bright: '#fff9e9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f3e2'
  surface-container: '#f4eedd'
  surface-container-high: '#eee8d7'
  surface-container-highest: '#e8e2d1'
  on-surface: '#1e1c12'
  on-surface-variant: '#3c494e'
  inverse-surface: '#333125'
  inverse-on-surface: '#f6f0df'
  outline: '#6c797f'
  outline-variant: '#bbc9cf'
  surface-tint: '#00677f'
  primary: '#00677f'
  on-primary: '#ffffff'
  primary-container: '#00d2ff'
  on-primary-container: '#00566a'
  inverse-primary: '#47d6ff'
  secondary: '#6a5f00'
  on-secondary: '#ffffff'
  secondary-container: '#fae100'
  on-secondary-container: '#6f6300'
  tertiary: '#bc0051'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffa9ba'
  on-tertiary-container: '#9f0044'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b6ebff'
  primary-fixed-dim: '#47d6ff'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#004e60'
  secondary-fixed: '#fde400'
  secondary-fixed-dim: '#dec800'
  on-secondary-fixed: '#201c00'
  on-secondary-fixed-variant: '#504700'
  tertiary-fixed: '#ffd9df'
  tertiary-fixed-dim: '#ffb1c0'
  on-tertiary-fixed: '#3f0017'
  on-tertiary-fixed-variant: '#90003d'
  background: '#fff9e9'
  on-background: '#1e1c12'
  surface-variant: '#e8e2d1'
typography:
  headline-xl:
    fontFamily: Anton
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 60px
    letterSpacing: 0.04em
  headline-xl-mobile:
    fontFamily: Anton
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 42px
    letterSpacing: 0.03em
  headline-lg:
    fontFamily: Anton
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: 0.03em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Anton
    fontSize: 26px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: 0.02em
  title-lg:
    fontFamily: Anton
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.03em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 22px
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.06em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels the visual vernacular of golden-age screen-printed comic strips and Roy Lichtenstein pop art into a high-utility, hyper-tactile user interface. Designed exclusively for light mode, the experience rejects standard digital neutralism in favor of saturated ink, physical paper textures, heavy outlines, and tactile action. 

The emotional tone is dynamic, unapologetic, precise, and graphic. Surfaces feel printed onto pulpy newsprint canvas, while actions trigger the punchy, kinetic impact of classic comic panel sequencing. It blends retro pop art nostalgia with sharp modern layout discipline, maintaining rigorous legibility alongside loud graphic personality.

## Colors

The color system is organized around pure process inks layered against warm, aged vintage pulp.

- **Primary (`#00D2FF` - Electric Cyan):** Used for focal interactive touchpoints, hero triggers, and active states.
- **Secondary (`#FFE600` - Pop Comic Yellow):** High-voltage accent used for alerts, starburst callouts, badges, and attention anchors.
- **Tertiary (`#FF2D78` - Punch Magenta):** Dynamic accent used for destructive states, critical highlights, and expressive floating indicators.
- **Cobalt Accent (`#1B56FD`):** Supporting print ink for secondary actions, tags, and contrasting link elements.
- **Neutral Surface Palette:**
  - Base Canvas: `#FDFBF7` with secondary warm newsprint bands in `#F4EEDD` and modal overlays in `#FFFDF8`.
  - Foreground Containers: Pure white `#FFFFFF` to make ink boundaries snap.
- **Ink Black (`#000000`):** Pure pitch black for all borders, structural divider rules, hard drop shadows, halftone screen simulation, and primary typography.
- Never introduce transparent blurs or translucent drop shadows. All contrast is binary, high-key, and opaque.

## Typography

Typography acts as physical block print. **Anton** brings dramatic, punchy editorial energy to all headlines and display roles, set strictly in uppercase with slight tracking to mirror vintage newspaper lead type.

**Space Grotesk** serves as the body and functional label font. Its mechanical geometry and technical letterforms ground Anton’s expressive nature, providing impeccable readability at small sizes while honoring the early print era's industrial qualities. All labels, badge copy, and button text must be set in bold uppercase weights.

## Layout & Spacing

The layout uses a structured 12-column grid on desktop and tablet, collapsing to a 4-column rhythmic stack on mobile devices. Spacing scales rhythmically from an 8px base block (`0.5rem`).

Layouts simulate graphic novel panel compositions:
- Elements snap directly to rigid grid borders.
- Gutters mimic gutter channels between comic strips.
- Outer canvas margins frame content within a bounded print sheet.
- Container padding is generous to ensure typography and ink borders have ample breathing room.

## Elevation & Depth

Depth in this system is strictly graphic and non-photorealistic. Soft blurs, diffuse ambient glows, and gradients are entirely prohibited.

- **Hard Cast Shadows:** Elevation is communicated through crisp, 100% opaque black offset shadows:
  - Surface Tier 1 (Cards, panels): `3px 3px 0px #000000` with a `2px solid #000000` border.
  - Surface Tier 2 (Interactive buttons, floating pills): `4px 4px 0px #000000` with a `3px solid #000000` border.
  - Surface Tier 3 (Modals, banners, popouts): `6px 6px 0px #000000` with a `3px solid #000000` border.
- **Ben-Day / Halftone Accents:** Subtle 45-degree radial dot screens (black or cyan ink dots on tinted newsprint) are used as decorative drop backdrops or card headers to emphasize print authenticity.
- **Interactive Press State:** When an elevated element is engaged or pressed, it translates down and right (`transform: translate(2px, 2px)`) while reducing its shadow by the exact offset distance to evoke mechanical resistance.

## Shapes

The design system maintains a controlled tactile shape language with tight, sturdy corners (`0.25rem` radius / soft). Containers avoid sterile 90-degree corners, opting instead for minimal curvature reminiscent of die-cut card stock. 

Pill shapes are reserved strictly for high-visibility interactive badges, counter chips, and floating sticker tags, creating instant visual contrast against structural panel cards.

## Components

### Buttons
- **Primary:** Background in `#00D2FF`, border `3px solid #000000`, shadow `3px 3px 0px #000000`. Text in `label-lg`, pure black ink, uppercase. Active state shifts by `2px 2px` offset with shadow reduced to `1px 1px 0px #000000`.
- **Secondary:** Background in `#FFE600` or `#FFFFFF`, border `3px solid #000000`, shadow `3px 3px 0px #000000`.
- **Destructive:** Background in `#FF2D78`, white or black text, same heavy border and offset treatment.

### Cards & Panels
- **Structure:** Crisp `#FFFFFF` background bound by a `2px` to `3px solid #000000` frame with `4px 4px 0px #000000` shadow.
- **Card Headers:** Often separated by a horizontal `2px solid #000000` rule or backed by an alternating `#FFE600` or `#F4EEDD` header strip.

### Chips & Sticker Tags
- High-contrast pills with `2px solid #000000` outline and `2px 2px 0px #000000` drop shadow.
- Saturated fills (`#FFE600`, `#FF2D78`, `#00D2FF`) with uppercase `label-md` tracking.
- Can feature a slight `-1.5deg` to `1.5deg` tilt for a physical sticker aesthetic.

### Form Inputs
- Background in `#FFFFFF` with `2px solid #000000` border.
- Default text in deep black; placeholder text in a distinct half-tone stippled gray or `#555555`.
- Focus state expands outline to `3px solid #000000` with an electric cyan `#00D2FF` hard drop shadow `3px 3px 0px #000000`.

### Checkboxes & Radios
- Boxy `2px solid #000000` frame with hard `2px 2px 0px #000000` shadow.
- Checked state fills with `#FFE600` or `#FF2D78` displaying a bold pure black checkmark glyph.

### Comic Callouts & Modals
- Dialogue bubble tails and speech-balloon indicators rendered using bold ink outlines and stark offset fills.
- Alert ribbons cut diagonally across headers or card corners with solid black hazard borders.
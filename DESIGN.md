---
name: CW Devs
description: Digital systems engineering firm for SMEs.
colors:
  charged-cyan: "#00E5FF"
  deep-signal-violet: "#7B61FF"
  alert-coral: "#FF4D6A"
  near-void: "#080A0F"
  deep-slate: "#0E1118"
  lifted-slate: "#141820"
  structural-line: "#1E2533"
  cold-white: "#E8EDF5"
  steel-fog: "#6B7A99"
  pure-white: "#FFFFFF"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  none: "0"
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  2xl: "80px"
  section: "clamp(64px, 10vw, 120px)"
components:
  button-primary:
    backgroundColor: "{colors.charged-cyan}"
    textColor: "{colors.near-void}"
    rounded: "{rounded.sm}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.near-void}"
    rounded: "{rounded.sm}"
    padding: "14px 32px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cold-white}"
    rounded: "{rounded.sm}"
    padding: "13px 31px"
  button-ghost-hover:
    backgroundColor: "{colors.lifted-slate}"
    textColor: "{colors.charged-cyan}"
    rounded: "{rounded.sm}"
    padding: "13px 31px"
  card-surface:
    backgroundColor: "{colors.lifted-slate}"
    textColor: "{colors.cold-white}"
    rounded: "{rounded.md}"
    padding: "24px"
  chip-tech:
    backgroundColor: "{colors.structural-line}"
    textColor: "{colors.steel-fog}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  chip-tech-active:
    backgroundColor: "{colors.charged-cyan}"
    textColor: "{colors.near-void}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Design System: CW Devs

## 1. Overview

**Creative North Star: "The Precision Engine"**

CW Devs is a digital systems engineering firm — and the design system is the proof. Every surface conveys engineered exactness: tight spacing, high-contrast type, restrained color use that makes the accent matter. Nothing is soft. Nothing is accidental. The system is dark by necessity — the audience is evaluating capability on a screen, often after hours, making a real business decision. The darkness creates focus; the cyan accent creates conviction.

This is not a design system that decorates. It does not reach for warmth or approachability. It reaches for credibility. SME founders and decision-makers arrive skeptical. They want to see that CW Devs has done the hard work before they hire them. The precision of the interface is the first proof point. A misaligned margin is a credibility risk. A weak CTA is a lost client.

The system explicitly rejects: sloppy spacing, soft neutrals, passive copy, generically "modern" layouts, motion that runs for its own sake, gradient text as decoration, side-stripe border accents, and anything that reads as uncertain of itself. If the design could belong to any agency, it has failed.

**Key Characteristics:**
- Near-void dark backgrounds with controlled surface layering
- Single charged-cyan accent used sparingly — its rarity is the point
- Space Grotesk display type with aggressive negative tracking
- JetBrains Mono for all technical labels, codes, and tags — never for body
- Glow-based depth: flat at rest, illuminated on interaction
- Motion serves the argument: entrance animations, scroll reveals, and hover states all point toward a CTA
- WCAG AAA contrast throughout; reduced motion respected system-wide

## 2. Colors: The Precision Palette

A near-void dark field, one charged accent, and two supporting signals — every color has a single job.

### Primary
- **Charged Cyan** (`#00E5FF`): The one voice in the room. Used for primary CTAs, active states, hover glows, and emphasis on hero text. Never used decoratively. Its rarity is what gives it force. Appears on less than 10% of any given screen at rest.

### Secondary
- **Deep Signal Violet** (`#7B61FF`): Gradient partner to Charged Cyan. Used only in gradient constructs (hero gradients, `.text-gradient` utility) and never as a standalone fill. Not a CTA color.

### Tertiary
- **Alert Coral** (`#FF4D6A`): Reserved for destructive actions, error states, and high-urgency attention — never for decoration or branding emphasis.

### Neutral
- **Near Void** (`#080A0F`): The page canvas. Hero sections and topmost backgrounds.
- **Deep Slate** (`#0E1118`): Section backgrounds, alternating content areas.
- **Lifted Slate** (`#141820`): Card and surface backgrounds — the first elevation step.
- **Structural Line** (`#1E2533`): Borders, dividers, chip backgrounds. The skeleton of layout.
- **Cold White** (`#E8EDF5`): Primary body text and headings on dark backgrounds.
- **Steel Fog** (`#6B7A99`): Secondary text, muted labels, supporting copy.
- **Pure White** (`#FFFFFF`): Emphasis only — never as a background, never used flat.

### Named Rules
**The One Voice Rule.** Charged Cyan is the only accent on a given screen at rest. Deep Signal Violet appears only inside gradients with Cyan — never solo. Alert Coral is a warning system, not a brand color. One voice. One direction.

**The No Decorative Gradient Rule.** `background-clip: text` with any gradient is prohibited. Gradient text is decorative, never meaningful. Use Charged Cyan solid for emphasis; use weight and scale for hierarchy.

## 3. Typography: The Signal Stack

**Display Font:** Space Grotesk (system-ui, sans-serif fallback)
**Body Font:** DM Sans (system-ui, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (monospace)

**Character:** Space Grotesk carries ambition — aggressive tracking, high weight contrast, the visual weight of conviction. DM Sans keeps the body human and readable without softening the overall register. JetBrains Mono marks anything technical: system names, stack labels, process codes. The three fonts never compete; they occupy distinct territories.

### Hierarchy
- **Display** (800 weight, clamp 2.5rem–5rem, line-height 1.05, tracking -0.02em): Hero headlines and section anchors. Used rarely — one per major scroll section at most.
- **Headline** (700 weight, clamp 1.75rem–2.5rem, line-height 1.15, tracking -0.015em): Section headings, case study titles, service names.
- **Title** (600 weight, 1.125rem, line-height 1.3, tracking -0.01em): Card headings, feature labels, sub-section titles.
- **Body** (400 weight, 1rem, line-height 1.65): All prose. Maximum line length 65ch — wider than that and the reader's eye loses the return. Never use DM Sans for technical labels.
- **Label** (JetBrains Mono, 500 weight, 0.75rem, letter-spacing 0.08em, uppercase): Tech stack tags, system type labels, process step identifiers, nav secondary labels. Mono font enforces the technical register without prose.

### Named Rules
**The Territory Rule.** Space Grotesk owns headings. DM Sans owns body. JetBrains Mono owns anything with a technical designation. No font crosses into another's territory. A service name is a Headline. A tech stack label is a Label in Mono. They do not swap.

**The Tight Crown Rule.** Display and Headline type always tracks negative. Loose tracking on large type reads as uncertain. At display scale, -0.02em is the minimum commitment.

## 4. Elevation

CW Devs uses **tonal layering + glow depth**, not traditional drop shadows. Surfaces are flat at rest. Depth is conveyed by the step between background tones (Near Void → Deep Slate → Lifted Slate → Structural Line) and by glow illumination on interaction. Shadows appear only as a state response — never as ambient decoration.

### Shadow Vocabulary
- **Cyan ambient hover** (`0 0 20px rgba(0, 229, 255, 0.15)`): Applied on card hover, button hover, and active nav items. The surface glows toward the user — it does not lift. Use only with Charged Cyan as the glow source.
- **Cyan pulse ring** (`0 0 0 4px rgba(0, 229, 255, 0.2)`): Focus rings on interactive elements. WCAG AAA focus visibility requirement. Never thinner.
- **Violet gradient glow** (`0 0 40px rgba(123, 97, 255, 0.12)`): Used only in hero orb and ambient background elements — never on UI components.

### Named Rules
**The Flat-By-Default Rule.** No surface carries a shadow at rest. Hover glows and focus rings are state — not decoration. A glowing card that isn't interactive is a lie.

**The Single Source Rule.** Glow color matches the accent that the element is affiliated with. A cyan CTA glows cyan. A destructive action glows coral. No element glows with a color it doesn't contain.

## 5. Components

### Buttons
Precise and loaded. Tight radius, maximum contrast, no ambiguity about what clicking does.

- **Shape:** Nearly square corners (4px radius) — sharp enough to read as engineered, not clinical.
- **Primary:** Charged Cyan background (`#00E5FF`), Near Void text (`#080A0F`), 14px/32px padding. The highest-contrast state in the entire UI.
- **Primary Hover:** Pure White background, Near Void text. The shift from Cyan to White on hover signals confidence — the color doesn't need to hold for impact.
- **Ghost:** 1px Structural Line border (`#1E2533`), Cold White text, transparent background. Used for secondary CTAs and nav actions.
- **Ghost Hover:** Lifted Slate background, Charged Cyan text. The border disappears — the fill arrives.
- **Focus:** Cyan pulse ring (4px, `rgba(0,229,255,0.2)`) offset 2px. WCAG AAA visible.
- **Disabled:** Steel Fog text, Structural Line background, no glow, cursor not-allowed.
- **Transition:** 150ms ease-out-quint on background and color. Never animate padding or layout properties.

### Cards / Containers
- **Corner Style:** Gently defined (8px radius) — present but not rounded. Cards are structural, not friendly.
- **Background:** Lifted Slate (`#141820`) on Deep Slate sections; Deep Slate (`#0E1118`) on Near Void backgrounds.
- **Shadow Strategy:** Flat at rest. Cyan ambient hover glow on interactive cards only (`0 0 20px rgba(0,229,255,0.15)`).
- **Border:** 1px Structural Line (`#1E2533`) at rest. Fades or shifts to Cyan on hover where the card is a navigation target.
- **Internal Padding:** 24px default; 32px for featured/hero cards.
- **Nested cards are prohibited.** A card inside a card is always a layout failure. Restructure with sections or lists.

### Chips / Tags
- **Default:** Structural Line background, Steel Fog text, full-radius pill. Used for tech stack labels and filter tags.
- **Active:** Charged Cyan background, Near Void text. The only state where Cyan fills a non-button element.
- **Font:** Always JetBrains Mono, 0.75rem, 0.08em tracking, uppercase. A chip is a Label — it follows The Territory Rule.

### Inputs / Fields
- **Style:** 1px Structural Line border, Deep Slate background, Cold White text, 8px radius, 14px/16px padding.
- **Focus:** Border shifts to Charged Cyan (1px → 1px, no width change), Cyan pulse ring offset 2px.
- **Error:** Alert Coral border, error message in Alert Coral below the field in DM Sans body size. Color is never the only signal — an error icon precedes the message.
- **Disabled:** Structural Line border, Steel Fog text, Near Void background, no interaction.
- **Placeholder:** Steel Fog color. Never use placeholder text as a label.

### Navigation
- **Style:** Fixed top bar, Near Void background, 1px Structural Line bottom border.
- **Logo:** "CW" in JetBrains Mono bold, Charged Cyan; "Devs" in Space Grotesk bold, Cold White. The logo is the one place Mono and Display coexist.
- **Nav Links:** DM Sans, 0.875rem, Cold White at rest, Charged Cyan on hover/active.
- **CTA Button:** Primary button, right-aligned. The only Charged Cyan fill in the nav.
- **Mobile:** Full-screen overlay, Near Void background. Links stack vertically at Headline scale.

### Floating System Cards (Signature Component)
The hero's floating cards represent deliverables: POS System, ERP Module, Marketing Site, etc. They are the first proof point of the "show the work" principle.

- **Background:** Lifted Slate, 8px radius, 1px Structural Line border.
- **Label:** JetBrains Mono, uppercase, Steel Fog — the system type identifier.
- **Title:** Space Grotesk Title weight — the deliverable name.
- **Behavior:** Mouse parallax with depth multipliers. Scroll parallax. Enter on load with staggered Y-translate. They follow the mouse because they want to be seen.
- **Hover:** Cyan ambient glow. The card that the cursor approaches illuminates.

## 6. Do's and Don'ts

### Do:
- **Do** use Charged Cyan for one primary CTA per viewport. Its scarcity is its power — dilute it and it becomes noise.
- **Do** use JetBrains Mono for every technical label, system name, stack identifier, and process code. The mono register signals precision.
- **Do** track display and headline type negatively. -0.02em on Display, -0.015em on Headline — never looser at those sizes.
- **Do** respect `prefers-reduced-motion`. Every GSAP and Framer Motion animation must check the media query and reduce or disable accordingly.
- **Do** maintain 7:1 contrast for body text and 4.5:1 for large text (WCAG AAA). Test every new surface against actual computed contrast, not estimated values.
- **Do** use tonal steps (Near Void → Deep Slate → Lifted Slate) to create depth. The steps are the elevation system — use them consistently.
- **Do** cap body text at 65ch. Past that, reading becomes work.
- **Do** use focus rings on every interactive element: 4px Cyan pulse ring, offset 2px. Keyboard users are real users.
- **Do** keep motion purposeful. An animation must direct attention, reveal structure, or build confidence. If it does none of these, cut it.

### Don't:
- **Don't** use `background-clip: text` with gradients. Gradient text is decorative and prohibited by this system's design principles.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored stripe accent on cards, list items, or callouts. This is always a side-stripe pattern. Rewrite with background tints, full borders, or leading icons.
- **Don't** be sloppy. Misaligned elements, inconsistent padding, and lazy typography are credibility failures on a site that is selling precision engineering.
- **Don't** be weak. Soft palettes, passive copy, excessive negative space without tension — these read as uncertainty. CW Devs is not uncertain.
- **Don't** use generic dev agency clichés: rocket emojis, "let's build something amazing together," identical icon-grid service cards, or hero sections indistinguishable from any other agency.
- **Don't** animate for its own sake. Motion that demonstrates technical capability without serving the visitor's decision-making process is decorative. Cut it.
- **Don't** use enterprise gray: cold corporate neutrals with no edge, no conviction, no visual commitment.
- **Don't** use Alert Coral for anything except errors, destructive actions, and high-urgency states. It is a warning system, not an accent.
- **Don't** use Deep Signal Violet as a standalone fill. It exists only in gradient constructs alongside Charged Cyan.
- **Don't** nest cards. A card inside a card is always a layout failure. Restructure.
- **Don't** use placeholder text as a field label. Placeholders disappear on input — they are examples, not labels.
- **Don't** introduce a new typeface. The three-font system (Space Grotesk, DM Sans, JetBrains Mono) covers every territory. A fourth font is always a mistake.

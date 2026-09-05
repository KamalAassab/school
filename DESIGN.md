# School Academy - Design System

Single source of truth for visual and interaction patterns. Any new section, page,
or component must follow these rules. If a rule needs to change, update this file
first, then propagate the change across the codebase - never drift silently.

## 1. Colors (see `src/app/globals.css`)

| Token | Hex | Use |
|---|---|---|
| `primary` | `#b84300` | CTAs, links, icons on light bg, active states |
| `brand` | `#e85e10` | Large text/icons/accents on **dark** bg only (not AA-safe for small text on white) |
| `secondary` | `#f5ead2` | Cream tinted surfaces (pills, badges-free tags) |
| `muted` | `#f1ede5` | Section background alternation |
| `ink` | `#201a15` | Dark section background, body text |
| `background` | `#fbfaf7` | Page canvas |

Rules:
- Icons on light/white surfaces → `text-primary`.
- Icons on dark (`bg-ink`) surfaces → `text-brand`.
- Decorative/secondary icons (numbered steps, muted meta) → `text-muted-foreground`.
- Never use `brand` for small body text (contrast).

## 1b. CtaBand color treatment

`CtaBand` (the closing band on every page) is a colored band with a light card
floating inside it - the inverse of most sections:
- Outer `<section>`: solid `bg-[#bf4802]` (deep brand orange).
- Inner card: `bg-[#fdf8f0]` (creamy white), dark text (`text-foreground` /
  `text-muted-foreground`), primary/outline buttons (not the old light/ghost
  pair, which assumed a dark card).

## 2. Spacing scale (vertical rhythm)

Sections must use exactly one of these - no ad hoc padding:

| Role | Classes |
|---|---|
| Hero / first section | `pt-8 pb-12 sm:pt-10 sm:pb-16` |
| Standard section | `py-14 sm:py-18` |
| Compact section (strip, stat band) | `py-6 sm:py-8` |
| Dark/CTA band | `py-14 sm:py-18` |

Gap between heading and content: `gap-8` (was `gap-12`). Gap inside a card grid: `gap-4`.

Goal: a page should read in 4–6 sections max before the CTA band, not 7–9.

## 3. Radius

- Cards / illustrations / large surfaces: `rounded-[28px]`
- Small chips / pills: `rounded-full`
- Buttons: `rounded-full` (see `button.tsx`)

## 4. Typography

- Display font (`font-display`, Bricolage Grotesque): headings only.
- Body font (`font-sans`, Plus Jakarta Sans): everything else.
- Section title: `text-3xl sm:text-4xl font-medium tracking-tight`
- No eyebrow labels / pill badges above headings - removed sitewide, keep it that way.

## 5. Icons - Lucide Animated only

**All icons come from `@lucide-animated` (installed under `src/components/ui/*`).
Never import `@phosphor-icons` or any other icon package.**

- Each icon is a `forwardRef` div-wrapped `motion.svg`. It self-animates on
  `mouseenter`/`mouseleave` - no extra wiring needed for basic hover polish.
- Size via the `size` **prop** (pixels), never a Tailwind `size-*` class (the SVG's
  width/height are set by the prop, a CSS class on the wrapper div won't resize it).
- Color via `className` (`text-primary`, `text-brand`, etc.) - the SVG uses
  `stroke="currentColor"`.
- Standard sizes: `14` (micro/footer), `16` (inline button icon), `20` (badge/list
  icon), `24` (fact strip), `32`–`36` (card/feature icon), `40` (section accent).
- To add a new icon: `npx shadcn@latest add "@lucide-animated/<slug>"` - never
  hand-roll an SVG or pull from another icon set.
- Shared prop type for `icon` props on components: `IconComponent` from
  `src/lib/icon-type.ts`.

## 6. Illustrations

- Source: `/public/assets/undraw_*.svg`, rendered via `src/components/site/illustration.tsx`.
- Always pass the SVG's native `width`/`height` (from its `viewBox`) so aspect ratio
  is locked and there's no layout shift.
- Constrain with a `max-w-[…]` wrapper matched to context (sidebar accent ≈ 180–220px,
  section banner ≈ full width up to ~500px, hero-scale ≈ 400–500px). Never let an
  illustration exceed the text column it sits beside.
- One illustration per distinct section max - they're an accent, not wallpaper.

## 7. Navigation - floating navbar

- `Header` is a floating pill bar: fixed, inset from the viewport edges, rounded,
  blurred background, shadow. It never spans full width edge-to-edge.
- Reduces to a compact state (tighter padding/shadow) after `scrollY > 12`.
- Mobile: same floating shell, hamburger opens the `Sheet` drawer.

## 8. Page-to-page transitions

- `src/app/template.tsx` wraps route content in a `Reveal`-style fade/slide using
  `motion` - every route change gets the same enter transition. Don't add
  page-specific enter animations on top of it.

## 9. Information architecture

Top-level pages (keep this list - don't add without updating this file):

1. `/` - Home
2. `/presentation` - Présentation
3. `/pedagogie` - Pédagogie
4. `/vie-scolaire` - Vie scolaire (includes Activités & loisirs as an in-page section,
   `/activites` no longer exists as a separate page - redirected)
5. `/cambridge` - Cambridge
6. `/recrutement` - Recrutement
7. `/contact` - Contact
8. `/inscription` - Inscription

## 10. Footer

- `Footer` is light (`bg-[#fdf8f0]`, dark text) - not the `bg-ink` dark treatment
  used elsewhere.
- No fabricated social links - only real channels (email, inscription CTA) are
  ever placed here. If real social profiles are added later, use the matching
  `@lucide-animated` icons (`facebook`, `instagram`, `linkedin`, `twitter` are
  all in the catalog) - never a second icon package.

## 10b. Signature hero motifs

The home `Hero` and `CambridgeHighlight` establish a small set of "editorial"
motifs - reuse these rather than inventing new ones when a section wants extra
visual energy:
- **Squiggle underline**: a hand-drawn SVG stroke (`viewBox 0 0 200 14`,
  `strokeWidth 5`, `strokeLinecap round`) under one accent word in a headline,
  colored `text-brand`.
- **Marquee ticker**: `.animate-marquee` (defined in `globals.css`) on a
  `flex w-max` row containing the item list duplicated exactly twice, wrapped in
  `overflow-hidden` with an edge fade mask
  (`[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]`).
- **Offset color panel**: a rotated (`rotate-[4deg]`), slightly larger
  `bg-secondary` rounded block placed *behind* a photo/card via absolute
  positioning, for depth.
- **Floating badges**: small stat/info chips absolutely positioned over a
  photo's corners. Structure as an outer `motion.div` (framer-motion entrance
  only) wrapping an inner plain `div.animate-float` (the CSS keyframe loop) -
  keep entrance and idle-loop animations on separate elements so they don't
  fight over the same `transform`. Stagger idle loops with inline
  `style={{ animationDelay: "…s" }}`.
- **Rotated ticket/stamp cards**: `border-dashed` cards with alternating
  `sm:-rotate-2` / `sm:rotate-2`, `hover:rotate-0`, connected by a dashed
  divider line behind them - used for the Cambridge levels collage.

## 10c. Real content & assets

- Real facility photos live in `/public/images/*` (bcd, theatre, laboratoire,
  piscine, `pedagogie/tice-*`, `cambridge/*`) - prefer these over undraw
  illustrations wherever a section describes an actual physical space or a
  real Cambridge exam book, since authentic photography beats generic vector
  art for "this is what our school actually looks like" content.
- Real downloadable documents (fourniture lists) live in
  `/public/documents/fournitures/<slug>.pdf`, referenced via
  `fournituresLevels` in `content.ts`. A normal `<a>`/`Link` with `target="_blank"`
  is fine for these - the "no download links" sandbox rule is an Artifacts-only
  constraint, not a rule for the real site.
- Never fabricate social links, testimonials, or citations. `siteConfig.social`
  holds only real verified profile URLs. `projetQuote` is a citation from
  French education law, not an in-house quote - keep its `source` line
  attributing it correctly (both here and in the home `Manifesto`, which reuses
  this exact quote).
- Long structured source content (the Charte's four actors, Cambridge's five
  exam levels, per-cycle weekly schedules) is rendered via `Tabs` or
  `Accordion` - one focus item visible at a time - never as one long unbroken
  scroll of every acteur/level at once.
- Data-driven weekly schedules (`cycleSchedules` in `content.ts`) render
  through the `ScheduleTable` helper inside `cycles-tabs.tsx`: a
  horizontally-scrollable table with a sticky first column, collapsed by
  default inside an `Accordion` ("Voir l'emploi du temps type").

## 10d. Video

- Real videos live in `/public/media/*.mp4` (mirrored from the school's own
  site, not hotlinked - same reasoning as the fournitures PDFs).
- A video that plays inline with sound (the director's message in
  `Director`) uses a plain `<video controls preload="metadata" poster="…">` -
  no autoplay, since autoplay-with-sound is blocked by browsers anyway and a
  spoken message needs sound to make sense.
- A large/long video reached from a CTA (the home `CtaBand`'s intro clip) uses
  `VideoDialog` (`src/components/site/video-dialog.tsx`): the `<video>` isn't
  rendered into the DOM - and so isn't fetched - until the dialog is actually
  opened. Never `preload`/autoplay a large background video; gate it behind a
  click.
- `CtaBand` takes optional `videoSrc`/`videoLabel` props for this. Only pass
  them from the specific page that has a real video for that slot - `CtaBand`
  is shared across every page, so an unset `videoSrc` must render nothing.

## 10e. Visuals over text

People trust visuals more than paragraphs. When adding a new section, default
to a **large, dominant image/illustration/seal** paired with **restrained**
text, not the reverse:
- Heading: `text-2xl sm:text-3xl` (not the usual `text-3xl sm:text-4xl`
  section-title scale) when the section is visual-led.
- Body copy: `text-[14px]`/`text-[15px]` (not `text-[17px]`).
- Never cut real content to hit this - shrink the type, don't shorten the
  text.
- The visual element should be the first thing that registers, sized to feel
  like the point of the section rather than a decoration next to the copy.

## 10f. Footer map, contact & newsletter

- `siteConfig.mapUrl` is a no-API-key Google Maps `output=embed` URL; render
  it in an `<iframe>` sized to match its sibling column
  (`lg:items-stretch` on the parent grid + `min-h-full` on the iframe) so the
  map reads as a real visual, not a token thumbnail.
- `siteConfig.mapLink` (the full google.com/maps place URL) is what real
  address/pin text links to - never make the address text open the embed URL
  directly.
- `siteConfig.phones` is a plain string array rendered as `tel:` links (spaces
  stripped for the `href`, kept in the visible label).
- `NewsletterForm` (`src/components/site/newsletter-form.tsx`) follows the
  same "no backend" pattern as `ContactForm`: it hands off to a `mailto:` link
  rather than pretending to POST somewhere real.

## 10g. Dropdowns & forms

- **Every select/dropdown in the project uses `src/components/ui/dropdown.tsx`**
  (`Dropdown`/`DropdownTrigger`/`DropdownContent`/`DropdownItem`, built on
  `@radix-ui/react-select`) - never a bare `<select>`, never a second dropdown
  implementation. Trigger matches `Input` exactly (`h-13 rounded-xl border
  border-input bg-white`) so form fields read as one system; the panel uses
  `rounded-2xl` + a layered shadow (concentric radius: panel radius is bigger
  than the `rounded-xl` item radius inside it) and `zoom-in-95`/`fade-in-0` on
  open, matching the site's other popovers (`Sheet`, `NavigationMenu`).
- Binary choices (Oui/Non, Garçon/Fille) use `SegmentedToggle`
  (`src/components/ui/segmented-toggle.tsx`) - a two-button pill group, not a
  dropdown with two options.
- With `react-hook-form`, wrap `Dropdown`/`SegmentedToggle` in `Controller`
  (they're not native inputs, `register()` doesn't apply).
- CSS transitions must name properties explicitly
  (`transition-[background-color,color,box-shadow]`), never `transition-all`.

## 10h. Card grids

For a page of same-shaped cards, default the **mobile** grid to
`grid-cols-2` (2×2 for four cards, etc.), not `grid-cols-1` - a stacked
single column reads as broken on a card grid. Exceptions: cards with
substantially different content length per item (bento-style spans like
`Pillars`, prose-heavy lists like `ActivitesGrid`) and true form-field grids,
where one-per-row on mobile is correct, not a bug.

## 11. Motion

- Section reveal: `Reveal`/`RevealGroup` (`src/components/site/reveal.tsx`) - keep
  using these, don't hand-roll new `motion.div` reveal variants.
- Standard ease: `[0.16, 1, 0.3, 1]`. Standard duration: `0.5–0.7s` for section
  reveals, `0.2–0.3s` for micro-interactions (hover/press).
- Respect `prefers-reduced-motion` (already handled globally + per `Reveal`).

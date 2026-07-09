// Renders a 1200×630 social card. Satori lays out a flexbox tree and emits SVG,
// resvg rasterizes it, sharp compresses. No headless browser, so CI stays fast.

import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import sharp from 'sharp'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const fontDir = join(root, 'assets', 'fonts')

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

// Crawlers silently drop large images — WhatsApp at ~300 KB is the tightest.
export const OG_MAX_BYTES = 300 * 1024

const [interRegular, interSemiBold, interBold, unbounded, portrait] = await Promise.all([
  readFile(join(fontDir, 'Inter-Regular.woff')),
  readFile(join(fontDir, 'Inter-SemiBold.woff')),
  readFile(join(fontDir, 'Inter-Bold.woff')),
  readFile(join(fontDir, 'Unbounded-ExtraBold.woff')),
  readFile(join(root, 'public', 'me.jpg')),
])

const fonts = [
  { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
  { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
  { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
  { name: 'Unbounded', data: unbounded, weight: 800, style: 'normal' },
]

const portraitUri = `data:image/jpeg;base64,${portrait.toString('base64')}`

const h = (type, props, ...children) => ({
  type,
  props: { ...props, children: children.length === 1 ? children[0] : children },
})

/** Unbounded is wide; drop the size as the title grows so it never wraps past two lines. */
function titleSize(text) {
  const n = text.length
  if (n <= 14) return 76
  if (n <= 20) return 64
  if (n <= 28) return 54
  if (n <= 40) return 44
  return 36
}

/**
 * @param {object} card
 * @param {string} card.eyebrow  small accent line above the title
 * @param {string} card.title
 * @param {string} card.subtitle
 * @param {string[]} card.chips  short badges along the bottom
 * @param {[string, string]} card.accent  gradient stops
 * @param {string} card.site
 */
function template({ eyebrow, title, subtitle, chips, accent, site }) {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: '64px',
        alignItems: 'center',
        gap: '56px',
        backgroundColor: '#0b1220',
        backgroundImage: `linear-gradient(135deg, #0b1220 0%, #140f2e 55%, #1b1038 100%)`,
        fontFamily: 'Inter',
      },
    },
    // Left column: the text.
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', flex: '1', height: '100%', justifyContent: 'center' } },
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: '24px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: accent[0],
            marginBottom: '18px',
          },
        },
        eyebrow,
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontFamily: 'Unbounded',
            fontWeight: 800,
            fontSize: `${titleSize(title)}px`,
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: '20px',
          },
        },
        title,
      ),
      // Accent rule.
      h('div', {
        style: {
          display: 'flex',
          width: '120px',
          height: '6px',
          borderRadius: '3px',
          marginBottom: '24px',
          backgroundImage: `linear-gradient(90deg, ${accent[0]}, ${accent[1]})`,
        },
      }),
      h(
        'div',
        { style: { display: 'flex', fontSize: '28px', lineHeight: 1.4, color: '#b9c2d8', marginBottom: '32px' } },
        subtitle,
      ),
      h(
        'div',
        { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' } },
        ...chips.map((chip) =>
          h(
            'div',
            {
              style: {
                display: 'flex',
                fontSize: '20px',
                fontWeight: 600,
                color: '#cbd5f5',
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(148,163,220,0.28)',
                backgroundColor: 'rgba(148,163,220,0.08)',
              },
            },
            chip,
          ),
        ),
      ),
      h(
        'div',
        { style: { display: 'flex', marginTop: '30px', fontSize: '24px', fontWeight: 700, color: accent[0] } },
        site,
      ),
    ),
    // Right column: the portrait.
    h(
      'div',
      { style: { display: 'flex', position: 'relative' } },
      h('img', {
        src: portraitUri,
        width: 380,
        height: 380,
        style: {
          borderRadius: '28px',
          border: `2px solid ${accent[0]}`,
          objectFit: 'cover',
        },
      }),
    ),
  )
}

/**
 * Render a card to a compressed PNG. Photographic cards do not fit the byte
 * budget as truecolor PNG, so quantize and step the palette down until they do.
 */
export async function renderCard(card) {
  const svg = await satori(template(card), { width: OG_WIDTH, height: OG_HEIGHT, fonts })
  const raw = new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng()

  for (const colors of [256, 192, 128, 96, 64]) {
    const png = await sharp(raw).png({ palette: true, colors, dither: 0.9, effort: 10 }).toBuffer()
    if (png.length <= OG_MAX_BYTES) return { data: png, colors }
  }
  // Fall back to the smallest palette even if it overshoots; the caller warns.
  const png = await sharp(raw).png({ palette: true, colors: 64, dither: 0.9, effort: 10 }).toBuffer()
  return { data: png, colors: 64 }
}

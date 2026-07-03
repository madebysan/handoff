import { chromium } from 'playwright'
import { createServer } from 'vite'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT_DIR = process.cwd()
const OUTPUT_DIR = path.join(ROOT_DIR, 'docs/localization/review-pack')
const SCREENSHOT_DIR = path.join(OUTPUT_DIR, 'screenshots')

const ROUTES = [
  { path: '/', name: 'landing' },
  { path: '/interview/aboutMe', name: 'interview-about-me' },
  { path: '/interview/contacts', name: 'interview-contacts' },
  { path: '/interview/financial', name: 'interview-financial' },
  { path: '/interview/insurance', name: 'interview-insurance' },
  { path: '/interview/property', name: 'interview-property' },
  { path: '/interview/digital', name: 'interview-digital' },
  { path: '/interview/legal', name: 'interview-legal' },
  { path: '/interview/debts', name: 'interview-debts' },
  { path: '/interview/business', name: 'interview-business' },
  { path: '/interview/dependents', name: 'interview-dependents' },
  { path: '/interview/wishes', name: 'interview-wishes' },
  { path: '/interview/verification', name: 'interview-verification' },
  { path: '/review', name: 'review' },
  { path: '/export', name: 'export' },
]

const VIEWPORTS = [
  { name: 'desktop', width: 1512, height: 759 },
  { name: 'mobile', width: 390, height: 844 },
]

const FUNCTION_EXAMPLES = new Map([
  ['common.savedAt', ['10:30 AM']],
  ['interview.resume.body', ['July 3, 2026']],
  ['review.fieldsFilled', [3, 12]],
  ['review.contactsAdded', [2]],
  ['review.accountsAdded', [2]],
  ['review.policiesAdded', [2]],
  ['review.propertiesAdded', [2]],
  ['review.documentsAdded', [2]],
  ['review.debtsAdded', [2]],
  ['review.sectionsHaveInfo', [3, 12]],
])

function getFunctionExample(pathKey, fn) {
  if (FUNCTION_EXAMPLES.has(pathKey)) return FUNCTION_EXAMPLES.get(pathKey)
  if (fn.length === 2) return [2, 12]
  if (fn.length === 1) return [2]
  return []
}

function renderValue(value, pathKey) {
  if (typeof value === 'function') {
    const args = getFunctionExample(pathKey, value)
    try {
      return value(...args)
    } catch (error) {
      return `[Could not render with sample args: ${error instanceof Error ? error.message : String(error)}]`
    }
  }

  return String(value ?? '')
}

function escapeTableCell(value) {
  return String(value)
    .replace(/\r?\n/g, '<br>')
    .replace(/\|/g, '\\|')
}

function isLeaf(value) {
  return typeof value === 'string' || typeof value === 'function' || value === null || value === undefined
}

function flattenTranslations(source, target, keyPath = []) {
  if (isLeaf(source) || isLeaf(target)) {
    const pathKey = keyPath.join('.')

    return [{
      key: pathKey,
      english: renderValue(source, pathKey),
      spanish: renderValue(target, pathKey),
    }]
  }

  if (Array.isArray(source) || Array.isArray(target)) {
    const sourceItems = Array.isArray(source) ? source : []
    const targetItems = Array.isArray(target) ? target : []
    const length = Math.max(sourceItems.length, targetItems.length)

    return Array.from({ length }, (_, index) =>
      flattenTranslations(sourceItems[index], targetItems[index], [...keyPath, String(index)]),
    ).flat()
  }

  const sourceObject = source && typeof source === 'object' ? source : {}
  const targetObject = target && typeof target === 'object' ? target : {}
  const keys = Array.from(new Set([
    ...Object.keys(sourceObject),
    ...Object.keys(targetObject),
  ])).sort()

  return keys.flatMap(key =>
    flattenTranslations(sourceObject[key], targetObject[key], [...keyPath, key]),
  )
}

async function loadTranslations(viteServer) {
  const module = await viteServer.ssrLoadModule('/src/i18n/translations.ts')
  return module.translations
}

async function captureScreenshots(baseUrl) {
  const browser = await chromium.launch({ headless: true })
  const captured = []

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: 'reduce',
    })

    await context.addInitScript(() => {
      window.localStorage.clear()
      window.localStorage.setItem('handoff-locale', 'es')
      window.localStorage.setItem('handoff-security-warning-shown', 'true')
    })

    const page = await context.newPage()

    for (const route of ROUTES) {
      const fileName = `${viewport.name}-${route.name}.png`
      const filePath = path.join(SCREENSHOT_DIR, fileName)

      await page.goto(new URL(route.path, baseUrl).toString(), { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(200)
      await revealFullPage(page)
      await page.screenshot({ path: filePath, fullPage: true })
      captured.push({ route: route.path, viewport: viewport.name, fileName })
    }

    await context.close()
  }

  await browser.close()
  return captured
}

async function revealFullPage(page) {
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  const viewportHeight = page.viewportSize()?.height ?? 800
  const step = Math.max(240, Math.floor(viewportHeight * 0.75))

  for (let scrollY = 0; scrollY <= scrollHeight; scrollY += step) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY)
    await page.waitForTimeout(40)
  }

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(80)
}

function buildCopyReview(rows) {
  const generatedAt = new Date().toISOString()
  const lines = [
    '# Spanish copy review pack',
    '',
    `Generated: ${generatedAt}`,
    '',
    'Use this with `docs/localization/spanish-style-guide.md`, `docs/localization/glossary.md`, and the screenshots in `docs/localization/review-pack/screenshots/`.',
    '',
    '| Key | English source | Spanish draft | Reviewer notes |',
    '|---|---|---|---|',
  ]

  for (const row of rows) {
    lines.push(`| \`${escapeTableCell(row.key)}\` | ${escapeTableCell(row.english)} | ${escapeTableCell(row.spanish)} |  |`)
  }

  return `${lines.join('\n')}\n`
}

function buildScreenshotIndex(captured) {
  const lines = [
    '# Spanish screenshot index',
    '',
    'These screenshots show the Spanish UI in context for copy review.',
    '',
    '| Route | Viewport | File |',
    '|---|---|---|',
  ]

  for (const item of captured) {
    lines.push(`| \`${item.route}\` | ${item.viewport} | [${item.fileName}](screenshots/${item.fileName}) |`)
  }

  return `${lines.join('\n')}\n`
}

async function main() {
  await rm(OUTPUT_DIR, { recursive: true, force: true })
  await mkdir(SCREENSHOT_DIR, { recursive: true })

  const viteServer = await createServer({
    root: ROOT_DIR,
    logLevel: 'error',
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: false,
    },
  })

  try {
    await viteServer.listen()
    const baseUrl = viteServer.resolvedUrls?.local?.[0] ?? 'http://127.0.0.1:5173/'
    const translations = await loadTranslations(viteServer)
    const rows = flattenTranslations(translations.en, translations.es)
    const captured = await captureScreenshots(baseUrl)

    await writeFile(path.join(OUTPUT_DIR, 'spanish-copy-review.md'), buildCopyReview(rows), 'utf8')
    await writeFile(path.join(OUTPUT_DIR, 'screenshot-index.md'), buildScreenshotIndex(captured), 'utf8')
    await writeFile(path.join(OUTPUT_DIR, 'spanish-copy-review.json'), JSON.stringify(rows, null, 2), 'utf8')

    console.log(`Wrote ${rows.length} translation rows`)
    console.log(`Captured ${captured.length} screenshots`)
    console.log(`Review pack: ${OUTPUT_DIR}`)
  } finally {
    await viteServer.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

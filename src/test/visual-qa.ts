import { chromium } from 'playwright'

const BASE_URL = 'http://localhost:5177'
const SCREENSHOT_DIR = './screenshots'

const ROUTES = [
  { path: '/', name: 'landing' },
  { path: '/interview/contacts', name: 'contacts' },
  { path: '/interview/digital', name: 'digital' },
  { path: '/interview/wishes', name: 'wishes' },
  { path: '/export', name: 'export' },
]

const VIEWPORTS = [
  { width: 1440, height: 900, suffix: 'desktop' },
  { width: 375, height: 812, suffix: 'mobile' },
]

async function main() {
  const browser = await chromium.launch({ headless: true })

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    })
    const page = await context.newPage()

    for (const route of ROUTES) {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(500) // Let animations settle
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/${route.name}-${viewport.suffix}.png`,
        fullPage: true,
      })
      console.log(`Captured: ${route.name}-${viewport.suffix}.png`)
    }

    await context.close()
  }

  await browser.close()
  console.log('\nAll screenshots captured successfully!')
}

main().catch(console.error)

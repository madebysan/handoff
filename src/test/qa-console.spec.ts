import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5177'

const ROUTES = [
  { path: '/', name: 'Landing Page' },
  { path: '/interview', name: 'Interview (default section)' },
  { path: '/interview/contacts', name: 'Contacts Section' },
  { path: '/interview/financial', name: 'Financial Section' },
  { path: '/interview/insurance', name: 'Insurance Section' },
  { path: '/interview/property', name: 'Property Section' },
  { path: '/interview/digital', name: 'Digital Life Section' },
  { path: '/interview/legal', name: 'Legal Documents Section' },
  { path: '/interview/debts', name: 'Debts Section' },
  { path: '/interview/business', name: 'Business Section' },
  { path: '/interview/dependents', name: 'Dependents Section' },
  { path: '/interview/wishes', name: 'Wishes Section' },
  { path: '/export', name: 'Export Page' },
]

test.describe('QA Console - Route Navigation', () => {
  for (const route of ROUTES) {
    test(`${route.name} (${route.path}) loads without console errors`, async ({ page }) => {
      const errors: string[] = []
      const warnings: string[] = []

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text())
        } else if (msg.type() === 'warning') {
          // Filter out known React dev warnings
          const text = msg.text()
          if (!text.includes('React DevTools') && !text.includes('Download the React DevTools')) {
            warnings.push(text)
          }
        }
      })

      page.on('pageerror', (error) => {
        errors.push(`Uncaught: ${error.message}`)
      })

      const response = await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'domcontentloaded' })

      // Check page loaded successfully
      expect(response?.status()).toBe(200)

      // Check for content on the page
      await expect(page.locator('body')).not.toBeEmpty()

      // Report errors (fail if any console errors)
      if (errors.length > 0) {
        console.log(`Console errors on ${route.path}:`, errors)
      }
      expect(errors).toEqual([])
    })
  }
})

test.describe('QA Console - Navigation Flow', () => {
  test('can navigate through the full interview flow', async ({ page }) => {
    const errors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (error) => {
      errors.push(`Uncaught: ${error.message}`)
    })

    // Start at landing page
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
    await expect(page.getByText('Get your life organized')).toBeVisible()

    // Click "Get Started" CTA
    await page.getByText('Get Started').first().click()
    await page.waitForURL('**/interview')

    // Should be on About You section
    await expect(page.getByText('About You')).toBeVisible()

    // Click Continue to go to next section
    await page.getByText('Continue').click()
    await page.waitForURL('**/interview/contacts')

    // Click Skip to go to insurance
    await page.getByText('Skip').click()
    await page.waitForURL('**/interview/insurance')

    // Go back with Previous
    await page.getByText('Previous').click()
    await page.waitForURL('**/interview/financial')

    expect(errors).toEqual([])
  })

  test('can enter data and it persists in the form', async ({ page }) => {
    const errors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto(`${BASE_URL}/interview/contacts`, { waitUntil: 'domcontentloaded' })

    // Type into the name field
    const nameField = page.getByPlaceholder('Jane Doe')
    await nameField.fill('Test Contact')
    await expect(nameField).toHaveValue('Test Contact')

    // Navigate away and back
    await page.getByText('Continue').click()
    await page.waitForURL('**/interview/financial')

    await page.getByText('Previous').click()
    await page.waitForURL('**/interview/contacts')

    // Data should persist (via React state)
    await expect(page.getByPlaceholder('Jane Doe')).toHaveValue('Test Contact')

    expect(errors).toEqual([])
  })
})

import { expect, test, type Page } from '@playwright/test'

const ROUTES = [
  { path: '/', name: 'Landing page' },
  { path: '/interview', name: 'Interview default section' },
  { path: '/interview/aboutMe', name: 'About me section' },
  { path: '/interview/contacts', name: 'Contacts section' },
  { path: '/interview/financial', name: 'Financial section' },
  { path: '/interview/insurance', name: 'Insurance section' },
  { path: '/interview/property', name: 'Property section' },
  { path: '/interview/digital', name: 'Digital life section' },
  { path: '/interview/legal', name: 'Legal documents section' },
  { path: '/interview/debts', name: 'Debts section' },
  { path: '/interview/business', name: 'Business section' },
  { path: '/interview/dependents', name: 'Dependents section' },
  { path: '/interview/wishes', name: 'Wishes section' },
  { path: '/interview/verification', name: 'Verification section' },
  { path: '/review', name: 'Review page' },
  { path: '/export', name: 'Export page' },
] as const

async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  page.on('pageerror', (error) => {
    errors.push(`Uncaught: ${error.message}`)
  })

  return errors
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear()
    window.localStorage.setItem('handoff-locale', 'en')
    window.localStorage.setItem('handoff-security-warning-shown', 'true')
  })
})

test.describe('route navigation', () => {
  for (const route of ROUTES) {
    test(`${route.name} loads without console errors`, async ({ page }) => {
      const errors = await collectConsoleErrors(page)
      const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' })

      expect(response?.status()).toBe(200)
      await expect(page.locator('body')).not.toBeEmpty()
      expect(errors).toEqual([])
    })
  }
})

test.describe('interview flow', () => {
  test('can navigate through the current interview flow', async ({ page }) => {
    const errors = await collectConsoleErrors(page)

    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.getByText('One document so your family never has to guess.')).toBeVisible()

    await page.getByRole('link', { name: 'Get Started' }).first().click()
    await page.waitForURL('**/interview')
    await expect(page.getByRole('heading', { name: 'The Basics' })).toBeVisible()

    await page.getByRole('button', { name: /Continue/ }).click()
    await page.waitForURL('**/interview/contacts')
    await expect(page.getByRole('heading', { name: 'Immediate Contacts' })).toBeVisible()

    await page.getByRole('button', { name: /Skip/ }).click()
    await page.waitForURL('**/interview/financial')
    await expect(page.getByRole('heading', { name: 'Financial Accounts', exact: true })).toBeVisible()

    await page.getByRole('button', { name: /Previous/ }).click()
    await page.waitForURL('**/interview/contacts')
    await expect(page.getByRole('heading', { name: 'Immediate Contacts' })).toBeVisible()

    expect(errors).toEqual([])
  })

  test('can enter data and keep it while navigating', async ({ page }) => {
    const errors = await collectConsoleErrors(page)

    await page.goto('/interview/contacts', { waitUntil: 'domcontentloaded' })

    const nameField = page.getByPlaceholder('Jane Doe')
    await nameField.fill('Test Contact')
    await expect(nameField).toHaveValue('Test Contact')

    await page.getByRole('button', { name: /Continue/ }).click()
    await page.waitForURL('**/interview/financial')
    await expect(page.getByRole('heading', { name: 'Financial Accounts', exact: true })).toBeVisible()

    await page.getByRole('button', { name: /Immediate Contacts/ }).click()
    await page.waitForURL('**/interview/contacts')
    await expect(page.getByPlaceholder('Jane Doe')).toHaveValue('Test Contact')

    expect(errors).toEqual([])
  })
})

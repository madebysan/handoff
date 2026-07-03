import { expect, test, type Page } from '@playwright/test'
import type { Locale } from '../i18n'

const ROUTES = [
  '/',
  '/interview/aboutMe',
  '/interview/contacts',
  '/interview/financial',
  '/interview/insurance',
  '/interview/property',
  '/interview/digital',
  '/interview/legal',
  '/interview/debts',
  '/interview/business',
  '/interview/dependents',
  '/interview/wishes',
  '/interview/verification',
  '/review',
  '/export',
] as const

const VIEWPORTS = [
  { name: 'desktop', width: 1512, height: 759 },
  { name: 'lg-edge', width: 1024, height: 768 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'narrow', width: 320, height: 720 },
] as const

const LOCALES: Locale[] = ['en', 'es', 'pseudo']

interface ElementSnapshot {
  tag: string
  text: string
  className: string
  width: number
  height: number
  left: number
  right: number
  scrollWidth: number
  clientWidth: number
  scrollHeight: number
  clientHeight: number
}

type LayoutIssue =
  | { type: 'page-horizontal-overflow'; viewportWidth: number; docWidth: number }
  | { type: 'offscreen-left' | 'offscreen-right'; element: ElementSnapshot }
  | { type: 'interactive-content-clipped'; element: ElementSnapshot; widthClipped: boolean; heightClipped: boolean }
  | { type: 'interactive-overlap'; a: ElementSnapshot; b: ElementSnapshot; overlapX: number; overlapY: number }

function formatIssues(route: string, locale: Locale, viewport: string, issues: LayoutIssue[]): string {
  return [
    `${locale} ${viewport} ${route}`,
    ...issues.map(issue => JSON.stringify(issue)),
  ].join('\n')
}

async function scanPage(page: Page): Promise<LayoutIssue[]> {
  return page.evaluate(() => {
    const issues: LayoutIssue[] = []
    const viewportWidth = window.innerWidth
    const docWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)

    function isVisible(element: Element): boolean {
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element)

      return (
        rect.width > 0 &&
        rect.height > 0 &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        Number(style.opacity) !== 0
      )
    }

    function hasScrollableXAncestor(element: Element): boolean {
      let current = element.parentElement

      while (current && current !== document.body) {
        const style = getComputedStyle(current)
        const canScroll = /(auto|scroll)/.test(style.overflowX)
        if (canScroll && current.scrollWidth > current.clientWidth + 2) return true
        current = current.parentElement
      }

      return false
    }

    function isAncestor(first: Element, second: Element): boolean {
      return first !== second && first.contains(second)
    }

    function getElementText(element: Element): string {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        return element.placeholder || element.value || element.getAttribute('aria-label') || ''
      }

      if (element instanceof HTMLElement) {
        return element.innerText || element.getAttribute('aria-label') || ''
      }

      return element.getAttribute('aria-label') || ''
    }

    function describe(element: Element): ElementSnapshot {
      const rect = element.getBoundingClientRect()
      const className = typeof element.className === 'string'
        ? element.className.split(/\s+/).slice(0, 6).join('.')
        : ''

      return {
        tag: element.tagName.toLowerCase(),
        text: getElementText(element).replace(/\s+/g, ' ').trim().slice(0, 120),
        className,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight,
      }
    }

    function isInteractive(element: Element): boolean {
      const tag = element.tagName.toLowerCase()
      return ['button', 'a', 'input', 'select', 'textarea'].includes(tag) || element.getAttribute('role') === 'button'
    }

    if (docWidth > viewportWidth + 2) {
      issues.push({ type: 'page-horizontal-overflow', viewportWidth, docWidth })
    }

    const elements = Array.from(document.body.querySelectorAll('*')).filter(isVisible)

    for (const element of elements) {
      const rect = element.getBoundingClientRect()
      const className = typeof element.className === 'string' ? element.className : ''
      const style = getComputedStyle(element)
      const ignoreClipping = className.includes('truncate') || style.textOverflow === 'ellipsis' || hasScrollableXAncestor(element)

      if (!hasScrollableXAncestor(element) && rect.left < -2) {
        issues.push({ type: 'offscreen-left', element: describe(element) })
      }

      if (!hasScrollableXAncestor(element) && rect.right > viewportWidth + 2) {
        issues.push({ type: 'offscreen-right', element: describe(element) })
      }

      if (isInteractive(element) && !ignoreClipping) {
        const widthClipped = element.scrollWidth > element.clientWidth + 2
        const heightClipped = element.scrollHeight > element.clientHeight + 2

        if (widthClipped || heightClipped) {
          issues.push({
            type: 'interactive-content-clipped',
            element: describe(element),
            widthClipped,
            heightClipped,
          })
        }
      }
    }

    const interactiveElements = elements.filter(isInteractive)

    for (let firstIndex = 0; firstIndex < interactiveElements.length; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < interactiveElements.length; secondIndex += 1) {
        const first = interactiveElements[firstIndex]
        const second = interactiveElements[secondIndex]

        if (
          isAncestor(first, second) ||
          isAncestor(second, first) ||
          hasScrollableXAncestor(first) ||
          hasScrollableXAncestor(second)
        ) {
          continue
        }

        const firstRect = first.getBoundingClientRect()
        const secondRect = second.getBoundingClientRect()
        const overlapX = Math.max(0, Math.min(firstRect.right, secondRect.right) - Math.max(firstRect.left, secondRect.left))
        const overlapY = Math.max(0, Math.min(firstRect.bottom, secondRect.bottom) - Math.max(firstRect.top, secondRect.top))

        if (overlapX > 3 && overlapY > 3) {
          issues.push({
            type: 'interactive-overlap',
            a: describe(first),
            b: describe(second),
            overlapX: Math.round(overlapX),
            overlapY: Math.round(overlapY),
          })
        }
      }
    }

    return issues
  })
}

for (const viewport of VIEWPORTS) {
  for (const locale of LOCALES) {
    test(`${locale} layout has no overflow or clipped controls at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.addInitScript((selectedLocale: Locale) => {
        window.localStorage.clear()
        window.localStorage.setItem('handoff-locale', selectedLocale)
        window.localStorage.setItem('handoff-security-warning-shown', 'true')
      }, locale)

      for (const route of ROUTES) {
        await page.goto(route, { waitUntil: 'domcontentloaded' })
        await page.waitForTimeout(120)

        const issues = await scanPage(page)
        expect(issues, formatIssues(route, locale, viewport.name, issues)).toEqual([])
      }
    })
  }
}

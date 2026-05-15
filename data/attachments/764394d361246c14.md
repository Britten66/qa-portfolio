# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app-under-test/e2e/landing.spec.js >> Landing page >> a hero CTA button is visible
- Location: apps/app-under-test/e2e/landing.spec.js:16:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.hero').getByRole('button').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.hero').getByRole('button').first()

```

```yaml
- navigation:
  - button "Dark"
  - link "What's new":
    - /url: /blog
  - button "Refer a friend"
  - combobox "Select currency":
    - option "$ CAD" [selected]
    - option "$ USD"
  - button "Sign In"
  - button "Sign Up"
- main:
  - paragraph: InvoicePrepper
  - heading "The invoice generator for people who just want to get paid." [level=1]
  - paragraph: Create professional invoices, email to clients, and track what's paid; all in one place. Built for independent workers, contractors, and small businesses. No bloat, no learning curve.
  - button "Start Invoicing Free"
  - paragraph: Free forever · No credit card required
  - text: INVOICE INV-001042 FROM Maple & Co. Creative BILLED TO Summit Tech Solutions March 14, 2026 Sent
  - table:
    - rowgroup:
      - row "Description Qty Unit Total":
        - columnheader "Description"
        - columnheader "Qty"
        - columnheader "Unit"
        - columnheader "Total"
    - rowgroup:
      - row "Brand Identity Package 1 $1,200.00 $1,200.00":
        - cell "Brand Identity Package"
        - cell "1"
        - cell "$1,200.00"
        - cell "$1,200.00"
      - row "Social Media Asset Kit 3 $180.00 $540.00":
        - cell "Social Media Asset Kit"
        - cell "3"
        - cell "$180.00"
        - cell "$540.00"
      - row "Revision Round 2 $95.00 $190.00":
        - cell "Revision Round"
        - cell "2"
        - cell "$95.00"
        - cell "$190.00"
  - text: Subtotal $1,930.00 Tax (13%) $250.90 Total $2,180.90 Payment due within 14 days. Thank you for your business.
  - button "Open a sample PDF": Example
  - paragraph: How it works
  - heading "Invoice sent in under 60 seconds" [level=2]
  - text: 01 Fill in your invoice
  - paragraph: Enter your client, line items, and amounts in a clean simple form. On Pro, describe the job and AI fills it in for you.
  - text: 02 Download or send
  - paragraph: Get a professional PDF instantly. Share the link, download it, or email it directly to your client from the app.
  - text: 03 Track what is paid
  - paragraph: Every invoice shows Draft, Sent, or Paid. See your outstanding balance at a glance without touching a spreadsheet.
  - heading "Simple pricing" [level=2]
  - paragraph: Start free. Upgrade when you're ready.
  - text: Basic Free
  - paragraph: No credit card required
  - list:
    - listitem: · Unlimited invoices
    - listitem: · Clean PDF, no watermark
    - listitem: · Download and share link
    - listitem: · Pay Now button on invoices
    - listitem: · Draft, sent, paid tracking
    - listitem: · Dark mode
    - listitem: · No app to install. Works in any browser
    - listitem: · Syncs across desktop and mobile
  - button "Get Started Free"
  - button "Check out our promotion"
  - text: Pro CAD $9/mo
  - paragraph: Billed monthly · Cancel anytime
  - list:
    - listitem: · Everything in Basic
    - listitem: · Email invoices to clients with your logo
    - listitem: · Recurring invoices
    - listitem: "· Text AI parsing: describe an invoice, the form fills itself"
    - listitem: · Send payment reminders to clients
    - listitem: · CSV export
    - listitem: · Custom dashboard themes
  - button "Get Pro"
  - text: Voice AI CAD $12/mo
  - paragraph: Billed monthly · Cancel anytime
  - list:
    - listitem: · Includes Pro Plan
    - listitem: · Speak your invoice, AI fills it in
    - listitem: · Works on mobile, hands-free
    - listitem: · Detects line items, prices, and clients
    - listitem: · Remembers your regular clients and rates
    - listitem: · Create invoices on the fly, anywhere
    - listitem: · Unlimited Voice AI and Text AI parses
    - listitem: · Your invoicing companion on every job
    - listitem: · Speak or type. Smart parsing does the rest
    - listitem: · First access to new AI features
  - button "Get Voice AI"
  - paragraph: How we compare
  - heading "What other apps charge for. Plus AI they don't have." [level=2]
  - table:
    - rowgroup:
      - row "Feature Basic Pro Voice AI Other apps":
        - columnheader "Feature"
        - columnheader "Basic":
          - button "Basic"
        - columnheader "Pro":
          - button "Pro"
        - columnheader "Voice AI":
          - button "Voice AI"
        - columnheader "Other apps"
      - row "Free $9 / mo $12 / mo":
        - cell
        - cell "Free"
        - cell "$9 / mo"
        - cell "$12 / mo"
        - cell
    - rowgroup:
      - row "Free forever, unlimited invoices — —":
        - cell "Free forever, unlimited invoices"
        - cell
        - cell "—"
        - cell "—"
        - cell
      - row "Multiple currencies on free plan — —":
        - cell "Multiple currencies on free plan"
        - cell
        - cell "—"
        - cell "—"
        - cell
      - row "Works in any browser, nothing to install — —":
        - cell "Works in any browser, nothing to install"
        - cell
        - cell "—"
        - cell "—"
        - cell
      - row "Email invoices to clients —":
        - cell "Email invoices to clients"
        - cell "—"
        - cell
        - cell
        - cell
      - row "Recurring invoices —":
        - cell "Recurring invoices"
        - cell "—"
        - cell
        - cell
        - cell
      - row "CSV export —":
        - cell "CSV export"
        - cell "—"
        - cell
        - cell
        - cell
      - row "Refer a friend, both get a free month — —":
        - cell "Refer a friend, both get a free month"
        - cell "—"
        - cell
        - cell "—"
        - cell
      - row "AI text parsing —":
        - cell "AI text parsing"
        - cell "—"
        - cell
        - cell
        - cell
      - 'row "Voice AI: speak your invoice — —"':
        - 'cell "Voice AI: speak your invoice"'
        - cell "—"
        - cell "—"
        - cell
        - cell
      - row "Remembers your clients and rates — —":
        - cell "Remembers your clients and rates"
        - cell "—"
        - cell "—"
        - cell
        - cell
  - text: Common Questions
  - heading "Simple answers." [level=2]
  - paragraph: Everything you need to know before you send your first invoice.
  - heading "Is the free plan really free?" [level=3]
  - paragraph: Yes, forever. No ads, no watermark, no credit card. Built to solve the pain points other tools create. Just invoices.
  - heading "Can I download my invoices as PDFs?" [level=3]
  - paragraph: Yes, the second you hit generate. Built for convenience. And if something feels off, let us know at redacted@example.com, feedback helps us build better and smarter.
  - heading "Can I email invoices directly to clients?" [level=3]
  - paragraph: Pro users can send directly from the dashboard with their business name shown in the email. Free users can use the mobile share button to send via any app on their phone, same result, no cost.
  - heading "How do I track which invoices are paid?" [level=3]
  - paragraph: "Every invoice has a status: Draft, Sent, Paid, or Voided. Your dashboard shows outstanding balance and total revenue so you always know where you stand."
  - heading "What is the Voice AI plan?" [level=3]
  - paragraph: Say your invoice out loud and the AI fills in your client, line items, and prices automatically. It uses your invoice history to suggest your regular clients and rates. You always review before sending.
  - heading "Can I export my invoices?" [level=3]
  - paragraph: Yes, on Pro and above. Download all your invoices as a CSV directly from your account settings. Opens in Excel and Google Sheets with all line items included.
  - heading "Can I cancel anytime?" [level=3]
  - paragraph: Yes. Cancel from inside the app in one tap. You keep access until the end of your billing period. No fees, no questions.
  - heading "Need help?" [level=3]
  - paragraph:
    - text: Email
    - link "redacted@example.com":
      - /url: mailto:redacted@example.com
    - text: and we will get back to you.
  - heading "Ready to send your first invoice?" [level=2]
  - paragraph: Free forever. No credit card. Takes two minutes.
  - button "Start Invoicing Free"
- contentinfo:
  - text: InvoicePrepper
  - paragraph: Invoicing that gets out of your way.
  - heading "For" [level=3]
  - link "Freelancers":
    - /url: /invoice-for-freelancers
  - link "Contractors":
    - /url: /invoice-for-contractors
  - link "Designers":
    - /url: /invoice-for-designers
  - link "Photographers":
    - /url: /invoice-for-photographers
  - link "Tutors":
    - /url: /invoice-for-tutors
  - link "Personal trainers":
    - /url: /invoice-for-personal-trainers
  - heading "Trades" [level=3]
  - link "Cleaners":
    - /url: /invoice-for-cleaners
  - link "Electricians":
    - /url: /invoice-for-electricians
  - link "Plumbers":
    - /url: /invoice-for-plumbers
  - link "Painters":
    - /url: /invoice-for-painters
  - link "Landscapers":
    - /url: /invoice-for-landscapers
  - link "Handymen":
    - /url: /invoice-for-handymen
  - heading "Resources" [level=3]
  - link "Free invoice generator":
    - /url: /free-invoice-generator
  - link "Voice invoicing":
    - /url: /voice-invoicing
  - link "How to invoice clients":
    - /url: /how-to-invoice-clients
  - link "Blog":
    - /url: /blog
  - heading "Company" [level=3]
  - link "Terms":
    - /url: /terms
  - link "Privacy":
    - /url: /privacy
  - text: © 2026 InvoicePrepper For personal record-keeping. Not a substitute for professional accounting or tax advice.
```

# Test source

```ts
  1  | // landing page smoke
  2  | // top of the funnel, if any of these break signups die
  3  | 
  4  | import { test, expect } from "@playwright/test";
  5  | 
  6  | test.describe("Landing page", () => {
  7  |   test.beforeEach(async ({ page }) => {
  8  |     await page.goto("/");
  9  |   });
  10 | 
  11 |   test("page has a non empty title", async ({ page }) => {
  12 |     const title = await page.title();
  13 |     expect(title.trim().length).toBeGreaterThan(0);
  14 |   });
  15 | 
  16 |   test("a hero CTA button is visible", async ({ page }) => {
  17 |     // there are multiple CTAs on the page, hero + pricing, just need one visible
  18 |     const cta = page.locator(".hero").getByRole("button").first();
> 19 |     await expect(cta).toBeVisible();
     |                       ^ Error: expect(locator).toBeVisible() failed
  20 |   });
  21 | 
  22 |   test("Sign In nav button is visible", async ({ page }) => {
  23 |     await expect(page.getByRole("button", { name: /^sign in$/i })).toBeVisible();
  24 |   });
  25 | 
  26 |   test("Sign Up nav button is visible", async ({ page }) => {
  27 |     await expect(page.getByRole("button", { name: /^sign up$/i })).toBeVisible();
  28 |   });
  29 | 
  30 |   test("footer has Terms link", async ({ page }) => {
  31 |     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  32 |     await expect(page.locator("footer a[href='/terms']")).toBeVisible();
  33 |   });
  34 | 
  35 |   test("footer has Privacy link", async ({ page }) => {
  36 |     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  37 |     await expect(page.locator("footer a[href='/privacy']")).toBeVisible();
  38 |   });
  39 | });
  40 | 
```
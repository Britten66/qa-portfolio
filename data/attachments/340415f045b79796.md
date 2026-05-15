# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app-under-test/api/smoke.spec.js >> Edge function smoke tests >> checkout is alive and requires auth
- Location: apps/app-under-test/api/smoke.spec.js:52:3

# Error details

```
Error: apiRequestContext.fetch: getaddrinfo ENOTFOUND api.example.com
Call log:
  - → OPTIONS https://api.example.com/functions/v1/stripe-checkout
    - user-agent: Playwright/1.60.0 (x64; ubuntu 24.04) node/24.15 CI/1
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Origin: https://app.example.com

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | // hitting the live edge functions directly, no browser needed
  4  | // a 500 here means the function is broken, not just locked down
  5  | // 401 is the right answer for no auth, that's what we want to see
  6  | 
  7  | // urls come from env so this repo never names the backend
  8  | // set FUNCTIONS_BASE and TARGET_URL locally and in CI secrets
  9  | const BASE = process.env.FUNCTIONS_BASE || "https://api.example.com/functions/v1";
  10 | const ORIGIN = process.env.TARGET_URL || "https://app.example.com";
  11 | 
  12 | // OPTIONS has to work or the browser blocks every request before it even tries
  13 | async function expectCors(request, path) {
> 14 |   const res = await request.fetch(`${BASE}/${path}`, {
     |                             ^ Error: apiRequestContext.fetch: getaddrinfo ENOTFOUND api.example.com
  15 |     method: "OPTIONS",
  16 |     headers: { Origin: ORIGIN },
  17 |   });
  18 |   expect(res.status(), `${path} OPTIONS failed`).toBe(200);
  19 | }
  20 | 
  21 | // no token, should be rejected cleanly not crash
  22 | async function expectAuth(request, path, method = "GET") {
  23 |   const res = await request.fetch(`${BASE}/${path}`, { method });
  24 |   expect(res.status(), `${path} should reject unauthenticated`).toBe(401);
  25 | }
  26 | 
  27 | test.describe("Edge function smoke tests", () => {
  28 | 
  29 |   test("records function is alive and requires auth", async ({ request }) => {
  30 |     // primary read endpoint, the whole app depends on it
  31 |     await expectCors(request, "receipts");
  32 |     await expectAuth(request, "receipts");
  33 |   });
  34 | 
  35 |   test("voice parse is alive and requires auth", async ({ request }) => {
  36 |     // paid feature, if this goes down paid users notice fast
  37 |     await expectCors(request, "voice-parse");
  38 |     await expectAuth(request, "voice-parse", "POST");
  39 |   });
  40 | 
  41 |   test("text parse is alive and requires auth", async ({ request }) => {
  42 |     await expectCors(request, "text-parse");
  43 |     await expectAuth(request, "text-parse", "POST");
  44 |   });
  45 | 
  46 |   test("send is alive and requires auth", async ({ request }) => {
  47 |     // email delivery, users are waiting on this
  48 |     await expectCors(request, "send-invoice");
  49 |     await expectAuth(request, "send-invoice", "POST");
  50 |   });
  51 | 
  52 |   test("checkout is alive and requires auth", async ({ request }) => {
  53 |     // no auth here means anyone could try to create a billing session
  54 |     await expectCors(request, "stripe-checkout");
  55 |     await expectAuth(request, "stripe-checkout", "POST");
  56 |   });
  57 | 
  58 |   test("subscription status is alive and requires auth", async ({ request }) => {
  59 |     await expectCors(request, "subscription-status");
  60 |     await expectAuth(request, "subscription-status");
  61 |   });
  62 | 
  63 |   test("profile is alive and requires auth", async ({ request }) => {
  64 |     await expectCors(request, "profile");
  65 |     await expectAuth(request, "profile");
  66 |   });
  67 | 
  68 | });
  69 | 
```
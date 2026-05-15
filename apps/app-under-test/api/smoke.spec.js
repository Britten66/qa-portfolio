import { test, expect } from "@playwright/test";

// hitting the live edge functions directly, no browser needed
// a 500 here means the function is broken, not just locked down
// 401 is the right answer for no auth, that's what we want to see

// urls come from env so this repo never names the backend
// set FUNCTIONS_BASE and TARGET_URL locally and in CI secrets
const BASE = process.env.FUNCTIONS_BASE || "https://qajcynqmjtlzofoyklyp.supabase.co/functions/v1";
const ORIGIN = process.env.TARGET_URL || "https://app.example.com";

// OPTIONS has to work or the browser blocks every request before it even tries
async function expectCors(request, path) {
  const res = await request.fetch(`${BASE}/${path}`, {
    method: "OPTIONS",
    headers: { Origin: ORIGIN },
  });
  expect(res.status(), `${path} OPTIONS failed`).toBe(200);
}

// no token, should be rejected cleanly not crash
async function expectAuth(request, path, method = "GET") {
  const res = await request.fetch(`${BASE}/${path}`, { method });
  expect(res.status(), `${path} should reject unauthenticated`).toBe(401);
}

test.describe("Edge function smoke tests", () => {

  test("records function is alive and requires auth", async ({ request }) => {
    // primary read endpoint, the whole app depends on it
    await expectCors(request, "receipts");
    await expectAuth(request, "receipts");
  });

  test("voice parse is alive and requires auth", async ({ request }) => {
    // paid feature, if this goes down paid users notice fast
    await expectCors(request, "voice-parse");
    await expectAuth(request, "voice-parse", "POST");
  });

  test("text parse is alive and requires auth", async ({ request }) => {
    await expectCors(request, "text-parse");
    await expectAuth(request, "text-parse", "POST");
  });

  test("send is alive and requires auth", async ({ request }) => {
    // email delivery, users are waiting on this
    await expectCors(request, "send-invoice");
    await expectAuth(request, "send-invoice", "POST");
  });

  test("checkout is alive and requires auth", async ({ request }) => {
    // no auth here means anyone could try to create a billing session
    await expectCors(request, "stripe-checkout");
    await expectAuth(request, "stripe-checkout", "POST");
  });

  test("subscription status is alive and requires auth", async ({ request }) => {
    await expectCors(request, "subscription-status");
    await expectAuth(request, "subscription-status");
  });

  test("profile is alive and requires auth", async ({ request }) => {
    await expectCors(request, "profile");
    await expectAuth(request, "profile");
  });

});

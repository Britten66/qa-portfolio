#!/usr/bin/env node
/*
  anonymize-allure-portfolio.cjs
  Post-processes ./allure-results before `allure generate` for public portfolio publication.
    1. Groups every test under one of N epics in the Behaviors view.
    2. Strips product identifiers, hostnames, emails, and source paths from result JSON.
  Tests are not modified.
*/
const fs = require("fs");
const path = require("path");

const RESULTS_DIR = path.resolve(__dirname, "..", "allure-results");

const EPICS = {
  AUTH:    "EP-01 Authentication & Session",
  MARKET:  "EP-02 Marketing Funnel & Acquisition",
  SEO:     "EP-03 SEO Surfaces & Discoverability",
  DASH:    "EP-04 Dashboard & Navigation",
  RECORD:  "EP-05 Record Lifecycle (CRUD)",
  BILLING: "EP-06 Subscription Billing & Payments",
  PROFILE: "EP-07 Account Settings & Profile",
  A11Y:    "EP-08 Accessibility Compliance (WCAG 2.1 AA)",
  API:     "EP-09 API Health & Contract Smoke",
  MISC:    "EP-10 Miscellaneous",
};

const ROUTES = [
  [/auth\.spec/i,           "AUTH"],
  [/landing\.spec/i,        "MARKET"],
  [/seo[-_]?pages\.spec/i,  "SEO"],
  [/dashboard\.spec/i,      "DASH"],
  [/invoices?\.spec/i,      "RECORD"],
  [/billing\.spec/i,        "BILLING"],
  [/profile\.spec/i,        "PROFILE"],
  [/accessibility\.spec/i,  "A11Y"],
  [/smoke\.spec/i,          "API"],
];

const SEVERITY = {
  AUTH: "critical", MARKET: "normal", SEO: "minor",
  DASH: "normal",   RECORD: "critical", BILLING: "critical",
  PROFILE: "normal", A11Y: "critical", API: "blocker",
  MISC: "minor",
};

const REDACTIONS = [
  [/InvoicePrepper/g, "the application"],
  [/invoiceprepper\.com/gi, "production-app.example.com"],
  [/invoiceprepper/gi, "app-under-test"],
  [/MacBookPro[A-Za-z0-9.-]*/g, "ci-runner-linux"],
  [/britten63@hotmail\.com/gi, "tester@example.com"],
  [/firstsipsolutions@gmail\.com/gi, "admin@example.com"],
  [/Britten66/g, "qa-engineer"],
  [/chrissmacpro/gi, "ci-user"],
];

function redact(s) {
  if (typeof s !== "string") return s;
  let out = s;
  for (const [re, rep] of REDACTIONS) out = out.replace(re, rep);
  return out;
}

function deepRedact(obj) {
  if (Array.isArray(obj)) return obj.map(deepRedact);
  if (obj && typeof obj === "object") {
    const o = {};
    for (const k of Object.keys(obj)) o[k] = deepRedact(obj[k]);
    return o;
  }
  return redact(obj);
}

function classify(haystack) {
  for (const [re, key] of ROUTES) if (re.test(haystack)) return key;
  return "MISC";
}

function titleCase(s) {
  return String(s).replace(/[-_.]/g, " ").replace(/\b\w/g, c => c.toUpperCase()).trim();
}

if (!fs.existsSync(RESULTS_DIR)) {
  console.error(`anonymize-allure-portfolio: ${RESULTS_DIR} not found, nothing to do`);
  process.exit(0);
}

let processed = 0, classified = 0, misc = 0;

for (const f of fs.readdirSync(RESULTS_DIR)) {
  const p = path.join(RESULTS_DIR, f);
  if (!f.endsWith(".json")) {
    if (/\.(txt|log|html|md)$/i.test(f)) {
      try {
        const txt = fs.readFileSync(p, "utf8");
        fs.writeFileSync(p, redact(txt));
      } catch (_) {}
    }
    continue;
  }

  let data;
  try { data = JSON.parse(fs.readFileSync(p, "utf8")); }
  catch (_) { continue; }

  if (f.endsWith("-result.json")) {
    const origLabels = data.labels || [];
    const origParent = origLabels.find(l => l.name === "parentSuite")?.value || "";
    const origSuite  = origLabels.find(l => l.name === "suite")?.value || "";
    const origStory  = origLabels.find(l => l.name === "subSuite")?.value || "";
    const pkg        = origLabels.find(l => l.name === "package")?.value || "";

    const haystack = `${pkg}|${data.fullName || ""}|${(data.titlePath || []).join("/")}|${origParent}|${origSuite}`;
    const epicKey = classify(haystack);
    if (epicKey === "MISC") misc++; else classified++;

    data.labels = origLabels.filter(l =>
      !["epic","feature","story","suite","parentSuite","subSuite","host","severity","package","testClass","testMethod"].includes(l.name)
    );

    const featureName = origSuite || titleCase((pkg.split(/[./]/).filter(Boolean).slice(-2)[0]) || "tests");
    const storyName   = origStory && origStory !== origSuite ? origStory : (origParent && origParent !== origSuite ? origParent : "");

    data.labels.push({ name: "epic",        value: EPICS[epicKey] });
    data.labels.push({ name: "parentSuite", value: EPICS[epicKey] });
    data.labels.push({ name: "feature",     value: featureName });
    data.labels.push({ name: "suite",       value: featureName });
    if (storyName) data.labels.push({ name: "story", value: storyName });
    data.labels.push({ name: "severity", value: SEVERITY[epicKey] || "normal" });
    data.labels.push({ name: "host", value: "ci-runner-linux" });
  }

  fs.writeFileSync(p, JSON.stringify(deepRedact(data)));
  processed++;
}

console.log(
  `anonymize-allure-portfolio: ${processed} files processed ` +
  `(${classified} mapped to epic, ${misc} -> MISC)`
);

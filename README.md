# 🎭 Playwright SauceDemo Tests

[![CI](https://github.com/Nikolay-Chillev/playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/Nikolay-Chillev/playwright-saucedemo/actions)
![Playwright](https://img.shields.io/badge/Playwright-Test-green?logo=microsoft)
![TypeScript](https://img.shields.io/badge/TypeScript-Automation-blue?logo=typescript)

Automated **UI & E2E testing framework** for [SauceDemo](https://www.saucedemo.com),
built with **Playwright + TypeScript**, following the **Page Object Model (POM)** pattern and integrated with **GitHub Actions CI/CD**.

---

## Test cases

| ID | Spec | Scenario |
|---|---|---|
| TC01 | `login.spec.ts` | Valid login with `standard_user` |
| TC02 | `login.spec.ts` | Invalid credentials show an error |
| TC03 | `login.spec.ts` | `locked_out_user` gets the locked-out message |
| TC04 | `cart.spec.ts` | Add a product to the cart and open the cart |
| TC05 | `cart.spec.ts` | Remove a product from the cart |
| TC06 | `checkout.spec.ts` | Complete a checkout |
| TC07 | `checkout.spec.ts` | Cancel the checkout and return to the products |
| TC08 | `logout.spec.ts` | Log out from the menu |

Every test runs in Chromium, Firefox and WebKit.

## Setup

Requirements: Node.js 20 or newer.

```bash
npm ci
npx playwright install --with-deps
```

## Running the tests

```bash
npm test                                  # all browsers
npx playwright test --project=chromium    # one browser
npx playwright test tests/login.spec.ts   # one spec file
npx playwright test --headed              # watch the browser
npm run report                            # open the last HTML report
```

A failed test is retried once. The retry records a trace, and failures keep a screenshot and a video in `test-results/`. Open a trace with `npx playwright show-trace <path to trace.zip>`.

## Project structure

```
├── src/pages/            # Page objects: login, inventory, cart, checkout
├── tests/                # Specs, one file per feature
├── playwright.config.ts  # Base URL, browsers, retries, reporters
└── .github/workflows/    # CI pipeline
```

## CI

GitHub Actions runs the suite on every pull request and every push to `main`, with a separate job for each browser. Each job uploads its HTML report and the raw results (traces, screenshots, videos) as artifacts, kept for 7 days.

## License

[MIT](LICENSE)

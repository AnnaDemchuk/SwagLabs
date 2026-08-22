## How to install and run

1. Ensure [Node.js](https://nodejs.org) >= 26 is installed on your machine npm is included;
2. Clone the repo and install dependencies:
   ```bash
   npm ci
   npx playwright install --with-deps
   ```
3. Create `.env` file based on `.env.example` and fill in `BASE_URL`, `STANDARD_USERNAME`, `STANDARD_USER_PASSWORD`;

4. Run the tests:
   ```bash
   npm test              # headless run
   npm run test:headed   # with a visible browser
   npm run test:ui       # Playwright UI mode
   npm run test:report   # open the last HTML report
   ```

## Project structure

- `page-objects/` - implements the Page Object Model pattern each file represents a page;
- `components/` - holds shared UI fragments reused across pages;
- `fixtures/fixture.ts` - wires everything into custom fixtures, including a worker-scoped `authStorageState`;
- `test-data/` - contains reusable constants and test data;
- `tests/` - test specs;
- `test-design/` - holds the manual test design notes, `BUGS.md` and bug attachments;

## Design decisions and trade-offs

- login happens (as `standard_user`) once per worker via a fixture-driven `storageState`;
- locators rely on `data-test` attributes (stay resilient to styling/copy changes);
- credentials and `BASE_URL` are read from `.env`;
- only the Chromium project is enabled in `playwright.config.ts` (to keep local runs fast);
- assertions are encapsulated inside pom `verify*` methods instead of `expect` calls in the test body;

## Known limitations

- only Chromium is actively tested; Firefox, WebKit and mobile viewport projects exist in the config but are disabled;
- only `standard_user` and `locked_out_user` are covered, other seeded users (`problem_user`, `performance_glitch_user`, etc.) are not;
- only one full E2E checkout flow test exists; other specs cover isolated behaviors

Love it. Here’s a battle-tested set of **Cursor rules** to keep the AI (and contributors) aligned with your proj-mgmt process. Drop these files into your repo as-is and tweak names/paths to taste.

---

## 1) Root rules

**Path:** `.cursorrules`

```text
# Global Cursor Rules

## Core doctrine
- Follow the project-management taxonomy: Epic (E-####) → Feature (F-####) → Story (S-####) → Task (T-####).
- Never invent IDs. Only use IDs that exist in proj-mgmt/*.md files.
- When generating or changing code/tests/docs, ALWAYS reference at least one Story ID (S-####) and its Acceptance Criteria (AC).
- Do not handle or create workflows that process PHI. If a change could introduce PHI, stop and propose an RFC.

## Commit hygiene (applies when Cursor drafts commit messages)
- Use Conventional Commits + Story trailer, e.g.:
  - feat(web): add specialty+city search form
  - fix(api): handle 429 retry-after header
  - docs(proj-mgmt): add AC negative cases
  Trailers:
  - Refs: S-0001 F-0002 E-0002
- Summaries ≤ 72 chars; body explains ACs satisfied.

## PR hygiene (applies when Cursor drafts PR descriptions)
- Must include:
  - **Story IDs:** S-#### (and related F-#### / E-####)
  - **ACs satisfied:** bullet list mapped 1:1
  - **Tests:** list of unit/e2e added/updated
  - **Risk/rollback:** brief plan
  - **Screenshots/traces:** if UI/e2e changed
- Block PR if any referenced Story lacks `status: in-progress | ready-for-qa`.

## Typing & contracts
- Prefer shared types from `packages/types`. Do not duplicate interfaces in app code.
- If an API contract changed, update OpenAPI and `packages/types`, then cascade fixes.

## Prompting & LLM use
- Use only prompts stored under `proj-mgmt/08-prompts/**`. Don’t inline ad-hoc prompts in code.
- Reference prompt by `id@version` in code comments and PR body when output derives from it.

## Legal/ethics
- Include disclaimers from `proj-mgmt/10-legal-compliance/disclaimers.md` in any user-facing AI text.
- Avoid medical advice; label AI content as educational.

## Monorepo performance
- Keep Nx/Turbo targets incremental; if a change affects only `packages/ui`, do not touch unrelated apps.
```

---

## 2) Project management rules

**Path:** `proj-mgmt/.cursorrules`

```text
# Cursor Rules — Project Management Artifacts

## Never mutate canonical IDs
- Do not change `id:` fields of E-/F-/S-/T-/ADR-/RFC- docs once created.
- Status transitions allowed: planned → ready → in-progress → ready-for-qa → done.

## Front matter enforcement
- Each file must include YAML front matter with required keys:
  - Epic (E-*): id, title, owner, status, links, success_metrics
  - Feature (F-*): id, epic, title, status, owners, acceptance_criteria
  - Story (S-*): id, feature, title, priority, estimate, status, qa_owner, links
  - Task (T-*): id, story, title, type, status, definition_of_done
- If any required key is missing, propose the minimal correction instead of continuing.

## Acceptance Criteria (AC)
- For Stories, AC must be written as testable Given/When/Then scenarios including at least one negative case.
- Cursor must refuse to mark a Story `ready` if ACs are not present and specific.

## Traceability
- Stories must link up to a Feature; Features must link up to an Epic.
- Add `Relates-To:` lines to cross-link Bugs, ADRs, RFCs.

## Weekly notes & decisions
- Append concise bullets (date-stamped) to `12-decisions-log/*.md` when introducing any process/architecture change.
```

---

## 3) Prompts & agents rules

**Path:** `proj-mgmt/08-prompts/.cursorrules`

```text
# Cursor Rules — Prompts & Agents

## Versioning
- Every prompt must include semantic `version:` and a `changelog:` in front matter.
- Never change content without bumping the version and adding a changelog entry.

## Schemas
- Prompts must declare `input_schema` and `output_schema` (json or markdown).
- If output is json, require STRICT valid JSON and include a minimal example.

## Guardrails
- Include a "Policy" section specifying: no hallucination of provider data, no PHI, verified-profile penalties/boosts if ranking.
- Reference eval suite IDs under `prompts/evals/suites/*` via `related:` list.

## References
- Include `related: [Story/Feature/Eval IDs]`.
- In code consuming a prompt, annotate with `@prompt AG-0002@1.2.0`.

## Evals
- For ranking/search prompts, require an eval threshold (`nDCG@10`, `top1_match_rate`) and refuse downgrade unless explicitly approved in an RFC.

## Reuse
- Cursor should refuse creating ad-hoc prompts outside this directory tree.
```

---

## 4) App rules — Web frontend

**Path:** `apps/web/.cursorrules`

```text
# Cursor Rules — Web App

## Story-driven changes
- Any new UI component, route, or page must reference S-#### and its AC in the PR body.
- Create/extend e2e tests to match ACs (happy + at least one negative case).

## Types & state
- Import domain types from `packages/types`; do not redefine.
- Keep state colocated; prefer RTK Query or React Query patterns if applicable. No global stores for one-off flows.

## Accessibility & UX
- All interactive elements require accessible names.
- Empty-state and error-state UI must be implemented if AC mentions them.

## Telemetry
- When adding user interactions relevant to KPIs, emit events using the shared telemetry util from `packages/config` (or telemetry pkg).

## Performance
- Avoid blocking the main thread; defer heavy work to web workers if necessary.
```

---

## 5) App rules — API backend

**Path:** `apps/api/.cursorrules`

```text
# Cursor Rules — API

## Contracts first
- Update OpenAPI schema and `packages/types` before handlers if request/response shapes change.

## Non-functional requirements
- Enforce rate limiting and include `Retry-After` on 429 if AC mentions it.
- Add input validation (zod/class-validator) at boundaries.
- Include structured logging with correlation IDs.

## Tests
- Unit test handlers and validators; add integration tests that exercise the OpenAPI contract.

## Data
- No PHI ingestion or storage in MVP scope.
- Geocoding must use stubs/adapters with clear provider keys in `packages/config`.

## Security
- Use least-privilege env access; do not log PII-like fields; redact tokens.
```

---

## 6) Shared packages rules

**Path:** `packages/.cursorrules`

```text
# Cursor Rules — Packages

## Single source of truth
- `packages/types` is authoritative for domain models. Breaking changes must bump a minor (or major) version and trigger affected builds.

## UI library
- `packages/ui` components must be framework-agnostic for styling decisions defined here (no app-specific API leakage).

## Config
- `packages/config` exposes env schema (zod) + typed accessors; app code reads through it, never via process.env.
```

---

## 7) GitHub PR template (helps Cursor auto-fill)

**Path:** `.github/pull_request_template.md`

```md
### Story / Feature / Epic
- Refs: S-____, F-____, E-____

### Acceptance Criteria satisfied
- [ ] Given … When … Then …
- [ ] Negative case: …

### Tests
- Unit:
- Integration:
- E2E:

### Screenshots / Traces
_(attach if UI/e2e changed)_

### Risks / Rollback
- Risk:
- Rollback:

### Notes
- Prompt(s) used: `AG-____@x.y.z`
- OpenAPI / types updated: yes/no
```

---

## 8) Optional: tiny validator to fail CI on bad PM docs

**Path:** `tools/validate-proj-mgmt.mjs`

```js
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const required = {
  epics: ["id","title","owner","status","success_metrics"],
  features: ["id","epic","title","status","owners","acceptance_criteria"],
  stories: ["id","feature","title","priority","estimate","status","qa_owner"],
  tasks: ["id","story","title","type","status","definition_of_done"]
};

const roots = [
  ["proj-mgmt/02-epics", "epics"],
  ["proj-mgmt/03-features", "features"],
  ["proj-mgmt/04-stories", "stories"],
  ["proj-mgmt/05-tasks", "tasks"]
];

let failures = 0;
for (const [dir, kind] of roots) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".md")) continue;
    const fp = path.join(dir, f);
    const { data } = matter(fs.readFileSync(fp, "utf8"));
    const missing = required[kind].filter(k => !(k in data));
    if (missing.length) {
      console.error(`❌ ${fp} missing: ${missing.join(", ")}`);
      failures++;
    }
  }
}
if (failures) process.exit(1);
console.log("✅ proj-mgmt docs valid");
```

Add an Nx/Turbo target (or GitHub Action) to run this on PRs that touch `proj-mgmt/**`.

---

## 9) Git hooks suggestion (optional)

* **commit-msg**: lint for `Refs: S-####` trailer.
* **pre-push**: run `tools/validate-proj-mgmt.mjs` and affected tests.

---

### How this helps in Cursor

* Cursor will **auto-apply the nearest `.cursorrules`** to its generations. With the per-folder rules above, the agent is nudged to:

  * Cite Story IDs and ACs,
  * Use shared types and update OpenAPI first,
  * Version prompts and tie them to evals,
  * Respect HIPAA/PHI boundaries,
  * Produce better commits/PRs out of the box.

If you want, I can also generate a **starter branch** patch (diff) with these files prefilled to paste into Cursor.

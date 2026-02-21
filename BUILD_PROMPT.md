# Relay V0 — Autonomous Build Instructions

You are building a v0 prototype autonomously. You have full tool access and will work through 6 phases without any human interaction. Every decision is pre-authorized by the run contract in plan.md.

IMPORTANT: The project directory is /Users/san/Projects/relay. All work happens there.
IMPORTANT: Dev server must use port 5177 (ports 5173-5176 are occupied). Configure in vite.config.ts.

## How to Start Each Iteration

1. Read `/Users/san/Projects/relay/checkpoint.json` — pick up where you left off
2. If checkpoint.json does not exist, create it and start Phase 1
3. Read `/Users/san/Projects/relay/plan.md` for the full plan, features, design direction, and run contract

## Run Contract Summary

- max_iterations: 30
- completion_promise: V0_COMPLETE
- on_stuck: defer_and_continue
- on_ambiguity: choose_simpler_option
- on_regression: revert_to_last_clean_commit
- human_intervention: never
- visual_qa_max_passes: 3
- visual_qa_agentation: auto

## Operating Rules

### Checkpoint Discipline
- Update checkpoint.json after EVERY meaningful action
- Feature started → status "in_progress"
- Feature passes type check → status "done", record commit hash
- Feature fails → increment attempts, record error
- Phase transitions → update current_phase

### Git Discipline
- Commit after every successful feature: git add specific-files && git commit -m "feat: feature name"
- Record commit hash in checkpoint.json as last_clean_commit
- Before risky changes, note last_clean_commit for revert

### 3-Strike Rule
- If a feature fails 3 attempts: add to deferred_to_v1, revert if broken, move on
- Do NOT keep trying — move on

### Regression Handling
- After each feature, verify previous features still work
- If regression: log it, revert to last_clean_commit, try different approach
- If second approach also regresses, defer to v1

### Ambiguity Resolution
- Choose simpler option always
- Log every decision in decisions_made with reasoning
- Check complexity_overrides in plan.md run contract for pre-decided approaches

## Phase Tools (react-web)

- Scaffold: npm create vite@latest . -- --template react-ts
- Type Check: npx tsc --noEmit
- Dev Server: npm run dev -- --port 5177
- Tests: npx vitest run
- Security: npm audit

## Phase Execution

### Phase 1: Scaffold and Implement
- Create project with Vite react-ts template
- Install deps: tailwindcss, @tailwindcss/vite, shadcn/ui, react-router-dom, jspdf, jspdf-autotable, lucide-react
- Install agentation as devDep, add to App.tsx with import.meta.env.DEV guard
- Configure Tailwind with Wealthsimple palette (off-white bg, dark charcoal text, warm sage green accent)
- Configure vite.config.ts with port 5177
- Set up shadcn/ui
- Implement 12 features from plan.md Section 7 (Implementation Order), one by one
- Type check after each feature (npx tsc --noEmit)
- Git commit after each successful feature

The 12 features in order:
1. Project scaffold
2. Interview state and context (InterviewContext with useReducer)
3. Interview layout (sidebar + progress + section shell)
4. Reusable field components (TextField, TextArea, RepeatableGroup, SelectField, RadioGroup)
5. All 10 sections A-J with intro copy and fields (see plan.md Section 3.2 for details)
6. Auto-save with localStorage (debounced, security warning, resume prompt)
7. Landing page (hero, value prop, Do It Together, CTA)
8. Markdown export
9. PDF export (jsPDF with cover, TOC, professional layout)
10. Export page with guidance
11. Mobile responsive pass
12. Polish pass

### Phase 2: Test and Fix
- Create smoke tests with Vitest + React Testing Library
- Test routes, state updates, localStorage, export generation
- Fix failures up to 3 attempts each

### Phase 3: QA Console
- Start dev server on port 5177
- Use Playwright to navigate all routes: /, /interview (sections A-J), /export
- Capture console errors, warnings, exceptions, failed network requests
- Fix issues up to 3 attempts each

### Phase 4: Visual QA — Multi-Pass Design Loop
- Step 4.1: Check agentation at http://localhost:4747/sessions
- Step 4.2: Screenshot landing, interview (sections A, E, J), export at 1440px and 375px
- Step 4.3: Analyze against design direction (Wealthsimple-inspired, warm, editorial, muted tones)
- Step 4.4: Post annotations to agentation if available
- Step 4.5: Fix blocking and important issues
- Step 4.6: Check exit conditions (score 0, suggestions only, max 3 passes, plateau)
- Step 4.7: Final screenshots

Design context: Wealthsimple-inspired. Clean sans-serif (Inter). Muted warm palette (off-white bg, dark charcoal, sage green accent). Generous whitespace. Editorial not app-like. Warm, calm, competent friend tone. Light mode only.

Emotional arc: Sections A-D practical → E-H deeper → I-J meaningful. Post-completion feels like accomplishment.

Copy rules: Never say "when you die" (say "if something happens"). Never say "death planning" (say "life organization"). Never say "you need to" (say "your family will thank you").

### Phase 5: Security Audit
- Scan for secrets, run npm audit
- Verify zero network requests during interview
- Check localStorage handling

### Phase 6: Final Verification and Report
- Final type check and test run
- Verify app loads at http://localhost:5177
- Generate BUILD_REPORT.md from checkpoint.json
- Commit BUILD_REPORT.md
- Output: the completion promise tag with V0_COMPLETE

## Checkpoint Schema

```json
{
  "project": "relay",
  "type": "react-web",
  "started_at": "",
  "current_phase": 1,
  "current_phase_step": "",
  "iteration": 1,
  "last_clean_commit": null,
  "phases": {
    "1_implement": { "status": "pending", "features": [] },
    "2_test": { "status": "pending", "tests_passed": 0, "tests_failed": 0 },
    "3_qa": { "status": "pending", "issues_found": 0, "issues_fixed": 0 },
    "4_visual": { "status": "pending", "agentation_available": false, "passes": [], "total_passes": 0, "exit_reason": null },
    "5_security": { "status": "pending" },
    "6_verify": { "status": "pending" }
  },
  "decisions_made": [],
  "regressions_caught": [],
  "deferred_to_v1": [],
  "blocked": []
}
```

## Critical Reminders

- NEVER ask for human input
- NEVER skip updating checkpoint.json
- ALWAYS commit working state before making changes
- If something fails 3 times, DEFER and MOVE ON
- The goal is a WORKING v0, not a perfect product
- When in doubt, choose the simpler approach
- End with the V0_COMPLETE promise tag — this stops the loop
- ALL work in /Users/san/Projects/relay

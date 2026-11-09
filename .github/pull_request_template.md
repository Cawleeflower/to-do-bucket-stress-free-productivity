## What and why

## Checklist

- [ ] All CI checks green
- [ ] Tests at the right level (unit for rules, integration for SQL, E2E for journeys)
- [ ] Bug fix: starts with a failing test that now passes
- [ ] Works offline where it touches user data
- [ ] Inputs validated with Zod; access covered by the authorisation matrix
- [ ] No secrets or task text in logs
- [ ] Keyboard path, labels, contrast checked; axe clean
- [ ] New screen: all five screen states
- [ ] Names follow the glossary in docs/standards.md
- [ ] ADR added for any new pattern or dependency
- [ ] README/runbook updated if setup or operations changed

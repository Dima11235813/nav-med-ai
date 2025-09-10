# Project Management Documentation

This directory contains all project management artifacts, acceptance criteria, prompts, and decisions under version control - just like code.

## Structure

- `00-vision/` - Business case and product principles
- `01-roadmap/` - Quarterly and strategic roadmaps
- `02-epics/` - High-level business epics (E-####)
- `03-features/` - Feature definitions (F-####)
- `04-stories/` - User stories with acceptance criteria (S-####)
- `05-tasks/` - Technical tasks (T-####)
- `06-adrs/` - Architecture Decision Records (ADR-####)
- `07-rfcs/` - Request for Comments (RFC-####)
- `08-prompts/` - All AI-related prompts and evaluations
- `09-quality/` - Quality standards and checklists
- `10-legal-compliance/` - Legal and compliance documentation
- `11-bugs/` - Bug tracking (BUG-YYYYMMDD-####)
- `12-decisions-log/` - Weekly meeting notes and decisions
- `13-metrics/` - KPIs and success metrics

## Naming Convention

All files use the format: `{PREFIX}-{ID}-{slug}.md`

- **E-####** - Epics
- **F-####** - Features
- **S-####** - Stories
- **T-####** - Tasks
- **ADR-####** - Architecture Decisions
- **RFC-####** - Request for Comments
- **SYS-####** - System prompts
- **AG-####** - Agent prompts
- **TOOL-####** - Tool prompts
- **TASK-####** - Task prompts
- **EVAL-####** - Evaluation suites
- **BUG-YYYYMMDD-####** - Bug reports

## Templates

Each subdirectory contains templates and examples. When creating new files, copy the template and fill in the required front matter fields.

## Git Integration

- Branch naming: `story/S-0001-search-by-specialty` or `task/T-0002-api-search-endpoint`
- Commit trailers: `Refs: S-0001, F-0002`
- PR template requires Story IDs and acceptance criteria

## Validation

Run `tools/validate-proj-mgmt.mjs` to ensure all documents have required front matter fields.

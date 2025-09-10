---
id: ADR-0001
title: Monorepo Structure with TypeScript
status: accepted
decided: 2025-09-10
---

## Context

We need to structure our codebase to support multiple applications (web frontend, API backend) while maintaining shared types, utilities, and tooling. The project involves healthcare data with strict compliance requirements.

## Decision

Adopt a TypeScript-based monorepo structure using:
- Nx as the build system for task orchestration
- Shared packages for types, UI components, and utilities
- Separate apps for web and API with clear boundaries
- Strict type checking and shared interfaces

## Considered Options

### Option 1: Separate Repositories
- **Pros**: Clear ownership, independent deployments
- **Cons**: Code duplication, harder to maintain shared types, complex release coordination

### Option 2: Single Repository with Subfolders
- **Pros**: Simple structure, easy navigation
- **Cons**: No build optimization, tooling complexity

### Option 3: Nx Monorepo (Chosen)
- **Pros**: Optimized builds, shared tooling, clear boundaries
- **Cons**: Learning curve, Nx-specific conventions

## Consequences

- **Positive**: Faster builds, better developer experience, type safety across apps
- **Negative**: Nx learning curve, potential for tight coupling
- **Risk**: Monorepo complexity if not managed carefully

## Implementation

```
/
├── apps/
│   ├── web/          # React frontend
│   └── api/          # Express.js backend
├── packages/
│   ├── types/        # Shared TypeScript interfaces
│   ├── ui/           # Reusable UI components
│   └── config/       # Shared configuration
└── tools/            # Build and validation scripts
```

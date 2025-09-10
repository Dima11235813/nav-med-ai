# Definition of Done

## Overview

A task, story, or feature is considered "done" when it meets all acceptance criteria and quality standards. This ensures consistent quality across all deliverables.

## Code Quality

### Frontend (React/TypeScript)
- [ ] TypeScript strict mode enabled with no `any` types
- [ ] Unit test coverage > 80% for new code
- [ ] E2E tests pass for user-facing features
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Mobile responsive design verified
- [ ] Cross-browser testing completed (Chrome, Firefox, Safari, Edge)

### Backend (Node.js/TypeScript)
- [ ] Input validation implemented with proper error messages
- [ ] Unit tests cover all business logic
- [ ] Integration tests verify API contracts
- [ ] Structured logging with correlation IDs
- [ ] Rate limiting implemented where applicable
- [ ] OpenAPI specification updated and validated

## Documentation

### Code Documentation
- [ ] Complex functions have JSDoc comments
- [ ] Public APIs documented in OpenAPI/Swagger
- [ ] Breaking changes documented in changelog
- [ ] README updated for new features

### Project Documentation
- [ ] Acceptance criteria satisfied and documented
- [ ] Story updated with completion notes
- [ ] Relevant ADR created for architectural decisions
- [ ] Test cases documented

## Security & Compliance

### HIPAA Compliance
- [ ] No PHI collection or processing without approval
- [ ] Data encryption in transit and at rest
- [ ] Audit logging for sensitive operations
- [ ] Privacy policy updated if needed

### Security Standards
- [ ] Input sanitization and validation
- [ ] Authentication/authorization implemented
- [ ] Security headers configured
- [ ] Dependency vulnerabilities resolved

## Performance

### Frontend Performance
- [ ] Lighthouse performance score > 90
- [ ] Bundle size within acceptable limits
- [ ] Core Web Vitals metrics met
- [ ] No memory leaks detected

### Backend Performance
- [ ] P95 response time < 500ms for APIs
- [ ] Database queries optimized
- [ ] Caching strategy implemented where appropriate
- [ ] Load testing completed

## Testing

### Automated Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Accessibility tests pass
- [ ] Visual regression tests pass (if applicable)

### Manual Testing
- [ ] QA checklist completed
- [ ] Cross-browser testing completed
- [ ] Mobile device testing completed
- [ ] User acceptance testing completed

## Deployment Readiness

- [ ] Feature flags implemented for gradual rollout
- [ ] Rollback plan documented
- [ ] Monitoring and alerting configured
- [ ] Database migrations tested
- [ ] CDN/cache invalidation planned

## Sign-off

- [ ] Code review completed by peer
- [ ] QA sign-off obtained
- [ ] Product owner acceptance
- [ ] Security review completed (if applicable)

## Exceptions

Any deviations from this definition must be:
1. Documented in the task/story
2. Approved by the product owner
3. Added to technical debt backlog for future remediation

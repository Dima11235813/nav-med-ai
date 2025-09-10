# Story QA Checklist

## Pre-Development Checklist

### Requirements & Acceptance Criteria
- [ ] Story has clear, testable acceptance criteria
- [ ] ACs include at least one negative test case
- [ ] ACs are specific and measurable
- [ ] Story links to parent feature and epic
- [ ] Dependencies identified and documented

### Technical Readiness
- [ ] API contracts defined (if backend work)
- [ ] UI mockups/ wireframes available (if frontend work)
- [ ] Database schema changes identified
- [ ] Third-party integrations specified
- [ ] Security/compliance requirements reviewed

## Development Checklist

### Code Quality
- [ ] Unit tests written and passing
- [ ] Code follows TypeScript best practices
- [ ] No console.log statements in production code
- [ ] Proper error handling implemented
- [ ] Code reviewed by peer

### Frontend Specific
- [ ] Responsive design tested on multiple devices
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Cross-browser compatibility verified
- [ ] Loading states and error states handled
- [ ] Keyboard navigation works

### Backend Specific
- [ ] Input validation implemented
- [ ] API documentation updated (OpenAPI)
- [ ] Rate limiting configured
- [ ] Structured logging with correlation IDs
- [ ] Database queries optimized

## Testing Checklist

### Automated Testing
- [ ] Unit test coverage > 80%
- [ ] Integration tests passing
- [ ] E2E tests covering happy path and negative cases
- [ ] API contract tests passing
- [ ] Performance tests within acceptable limits

### Manual Testing
- [ ] Happy path scenarios tested
- [ ] Negative test cases verified
- [ ] Edge cases considered and tested
- [ ] Error scenarios handled gracefully
- [ ] Mobile/tablet experience verified

## Compliance & Security

### HIPAA Compliance
- [ ] No PHI collection or processing
- [ ] Data encryption verified
- [ ] Audit logging configured
- [ ] Privacy disclaimers included

### Security
- [ ] Input sanitization implemented
- [ ] Authentication/authorization working
- [ ] Security headers configured
- [ ] No sensitive data in logs

## Deployment Readiness

- [ ] Feature flags configured for gradual rollout
- [ ] Rollback plan documented
- [ ] Monitoring and alerting set up
- [ ] Database migrations tested
- [ ] CDN/cache invalidation planned

## Documentation

- [ ] Code documented with JSDoc where needed
- [ ] Story updated with implementation notes
- [ ] API documentation updated
- [ ] User-facing changes documented
- [ ] Breaking changes communicated

## Sign-off

- [ ] Developer sign-off: Code complete and tested
- [ ] QA sign-off: Acceptance criteria verified
- [ ] Product owner sign-off: Meets requirements
- [ ] Security/compliance review completed (if applicable)

## Notes

*Date:* ________
*Tester:* ________
*Issues Found:* ________
*Resolution:* ________

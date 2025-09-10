---
id: S-0001
feature: F-0002
title: Search by specialty and city
priority: P1
estimate: 5
status: ready
qa_owner: QA-Team
links: [T-0001, T-0002]
---

### User Story
As a patient, I want to search by specialty and city so I can find local providers.

### Acceptance Criteria
- Given homepage, when user searches "Cardiologist" + "Denver, CO" → list of verified cardiologists with {name, specialty, address, avgRating}
- Unverified profiles show "Unverified Profile" badge
- Results sorted by relevance (distance, verification status, rating)

### Negative Cases
- Empty results → show helpful empty state with alternative suggestions
- Rate limit exceeded → show friendly error with retry guidance
- Invalid location → show location suggestions

### Test Cases
- e2e/smoke: happy path search and display
- e2e/negatives: unverified label, empty results, invalid input
- unit: search logic and result formatting

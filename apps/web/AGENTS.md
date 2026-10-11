# AKORD — Agent Instructions

## Purpose
This repository contains the AKORD website and its immersive Experience Engine. Treat the existing implementation as an evolving production system, not a prototype that can be freely rewritten.

Before changing code:
1. Inspect the existing implementation.
2. Understand the current architecture.
3. Search for existing types, resolvers, hooks, configs, and components.
4. Reuse existing systems whenever possible.
5. Do not create duplicate architecture.
6. Do not create new files unless architecturally necessary.

The repository is the source of truth for implementation. Project documentation is the source of truth for design intent.

## Required Reading
Before modifying the Experience Engine, read:
- `docs/AKORD-PROJECT-VISION.md`
- `docs/AKORD-EXPERIENCE-HANDOFF.md`

Then inspect the actual repository. If documentation and implementation differ, identify the discrepancy and preserve intentional working behavior rather than blindly overwriting code.

## Development Philosophy
AKORD is not a conventional scrolling corporate website. It is an immersive narrative experience. Motion is part of the information architecture and must have intention, rhythm, hierarchy, continuity, and spatial meaning.

## Experience Engine Rule
Always distinguish Navigation from Choreography. The user determines where the experience goes; the Experience Engine determines how the transition happens.

> User input triggers cinematic movement, but the user should not be required to manually scrub every frame.

## Services Experience
There are exactly five primary Service groups:
1. Core
2. Identity
3. Digital
4. Promotion
5. Edge

Sequence: Core → Identity → Digital → Promotion → Edge.

The Services Experience intentionally uses a different internal motion language from the main Hero/About/Services navigation. Do not repeat the same node-to-node pattern inside every Service.

## Scroll Architecture
Service content may remain scroll-driven for content reveal, composition, reading progression, and local scene development.

Service-to-Service transitions must be scroll-triggered, time-driven once triggered, and autonomous until completion.

Expected behavior:
Service → user scrolls → transition triggers → transition completes automatically → destination settles → user regains navigation control.

Never intentionally require repeated wheel input to finish a transition.

## Browser Scroll
Do not hard-lock browser scrolling unless explicitly approved. Previous experimentation showed that scroll locking can cause the Experience Engine and debug state to become stuck. Prefer state/navigation ownership over browser-level locking.

## Transition Architecture
The current Services architecture includes concepts such as Services Timeline, Service Transition Stage, Transition Rhythm, transition profiles, source/destination overlap, destination preload, service continuity, and autonomous transition progress.

Inspect the actual implementation before changing these systems. Do not introduce parallel replacements unless necessary.

## Transition Composition
Prefer:
FROM SERVICE → departure hold → departure → transition motion → destination arrival → settle → arrival hold → destination service.

Avoid:
FROM → isolated transition screen → TO.

The destination should feel inherited from the transition rather than abruptly mounted afterward.

## Motion Rhythm
- Core → Identity: deliberate, organic, composed.
- Identity → Digital: deep, cinematic, resonance/transmission oriented.
- Digital → Promotion: more energetic and outward-moving.
- Promotion → Edge: heavier, concentrated, threshold-like, strong arrival.

## Timing
Prefer centralized configuration/profile systems. Timing concepts include duration, departure hold, motion start/end, arrival start/end, arrival hold, destination preload, and visual exit. Do not solve rhythm problems solely by increasing scroll distance.

## Continuity
If a destination reaches partial local progress during a transition, its normal Service segment must continue from a compatible state. Avoid visible rewind such as transition destination progress 0.24 followed by service restart at 0.

## React and TypeScript
Do not conditionally call hooks. Perform conditional rendering only after hooks execute.

Prefer runtime guards and type narrowing over unnecessary assertions. If `transition.definition` can be null, guard it before use.

## Existing Code First
Before creating a Resolver, Config, Hook, Runtime type, Controller, Renderer, or Transition component, search the repository for an existing implementation. Avoid duplicate systems.

## Debugging
Distinguish:
1. physical browser scroll
2. raw choreography progress
3. smoothed progress
4. timeline progress
5. segment local progress
6. transition runtime progress
7. rendered visual progress

Do not assume these values are equivalent.

## Validation
After modifying the Experience Engine:
1. Run TypeScript checks.
2. Run the development server.
3. Test slow wheel input.
4. Test fast wheel input.
5. Stop wheel input during a transition and confirm it finishes autonomously.
6. Test reverse scrolling.
7. Test repeated direction changes.
8. Confirm no Experience/debug state freezes.
9. Check transition-to-service continuity.
10. Check for blank frames, visual rewind, and abrupt mounting/unmounting.

Compilation success is not sufficient for motion work; inspect the result visually.

## File Creation and Refactoring
Do not create new files merely to isolate a few lines of logic. Do not perform broad refactors while solving localized motion issues. Stabilize behavior first.

## Design Preservation
Once a visual composition has been approved, do not redesign it while fixing timing or architecture.

## Brand
- Titles: Kento
- Subtitle / Body: Ubuntu
- Primary: `#01362E`
- Accent: `#BB987D`
- Preferred icons: Vusax — Bulk

## Final Principle
The goal is controlled composition, not maximum animation. AKORD should feel deliberate, sophisticated, spatial, musical, cinematic, calm, and precise—not like a collection of unrelated scroll effects.

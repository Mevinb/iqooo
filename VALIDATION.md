# PATHWISE validation

Validated on 5 September 2026 using Node.js 22.23.2, Expo SDK 57, React Native 0.86.3, and Chrome through Playwright.

| Check                                                      | Result                                                                                        |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| TypeScript (`npm run typecheck`)                           | Passed with TypeScript 6.0.3                                                                  |
| State and scenario tests (`npm test`)                      | 12 passed                                                                                     |
| Browser journeys (`npm run test:ui`)                       | 6 passed; no console errors or uncaught runtime errors                                        |
| Expo dependency compatibility (`npx expo install --check`) | Dependencies are up to date                                                                   |
| Web production export                                      | Passed; output in `dist/`                                                                     |
| Android production JavaScript/Hermes export                | Passed; output in `dist-native/`                                                              |
| iOS production JavaScript/Hermes export                    | Passed; output in `dist-native/`                                                              |
| Exported web app smoke test                                | Welcome → Home → what-if → earlier earning → Plan C → Home passed                             |
| Production network observation                             | All requests stayed on the local preview server during the smoke test                         |
| Narrow and desktop browser layout                          | No document horizontal overflow at 320, 390, 768, 1024, and 1440 pixels                       |
| Enlarged text                                              | Home inspected with 150% text sizes at 390 px; no text bounds outside the horizontal viewport |
| Keyboard                                                   | Visible focus and Enter activation verified                                                   |
| Reduced motion                                             | Browser tests ran with reduced motion enabled                                                 |

## Journey coverage

The tests cover adaptive advisor ordering for family responsibilities, selectable and typed answers, unsupported-answer guidance, optional support skipping, simulated voice and camera, comparing routes, reading route details, previewing/discarding/applying constraints, shared-state updates, checking/unchecking a task, opportunity filtering and search, bookmark save/remove and empty states, invalid profile values, editing career goals and constraints, canceling reset, and restoring the initial profile.

State tests also cover a budget too small for any paid sample route, scaling timelines for fewer study hours, income uncertainty, user-selected routes, and preservation of bookmarks and completed steps when a scenario is applied.

## Visual evidence

`artifacts/screenshots/` contains 16 actual browser captures, including welcome, advisor, Home, comparison, pathway detail, what-if and its result, next steps, opportunity browsing and detail, profile, desktop framing, a 320-pixel phone, and enlarged text. Representative screens were visually inspected after fixes; screenshots are not generated design mockups.

## Remaining manual checks

Native exports validate bundling, not installation or device behavior. A physical Android/iPhone and emulator were not available for an app launch in this session; ADB initialization was blocked by the sandbox's read-only Android user directory. Before a device presentation, open the prototype in an SDK 57-compatible Expo Go and check native keyboard placement, system font scaling, screen-reader announcements, safe areas, and Android back navigation. No APK, IPA, or store release was produced.

The 150% browser text check is a useful layout check, not a substitute for native Dynamic Type/TalkBack/VoiceOver testing. This prototype has not undergone a full accessibility certification.

## Dependency audit

The installed dependency tree reports 14 moderate npm audit entries, propagated from `uuid` in Expo's Xcode tooling and `decode-uri-component` in Router's query-string dependency. No high or critical entries were reported. npm's suggested automatic fixes included incompatible Expo/Router downgrades, so those were not applied. The project stays on Expo's compatible dependency versions. Review upstream fixes before any production deployment; this deliverable is a local UI prototype.

# Frontend Framework - Vue.js

## Status

Accepted

## Context

As of this milestone, rendering in a conditional way is needed. While this would be possible with Vanilla JS, a Frontend Framework can help keeping development time small and maintainability up. Therefore a lot of well established SPA Frameworks exists:

- Angular
- React
- vue.js

## Decision

Functionality wise all of the frameworks are well suited. They are all well established and supported. So performance, size and development time is crucial here.
Performance wise, [Angular needs much longer for page loads](https://perf-track.web.app), while React and Vue are same level in that matter, [even vue js itself states that](https://v2.vuejs.org/v2/guide/comparison.html?redirect=true#Runtime-Performance). Sizewise vue js seems to be a [bit smaller](https://perf-track.web.app) in the mean.
For development time there seem to be no usuable metrics, but existing knowledge for vue and react as well.
As one seem to be a bit more lightweight, vue.js is choosen.

## Consequences

### Pros
- conditional rendering becomes easier
- development can probably speed up
- Switching between JS and TS is still possible later on
### Cons
- changing SPA Framework later on is difficult
- Vue js needs to be expanded if functionality is needed (router, vuex etc.)


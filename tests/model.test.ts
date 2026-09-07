import test from "node:test";
import assert from "node:assert/strict";
import {
  duration,
  fitMessage,
  initialProfile,
  pathways,
  recommend,
  recommendationReason,
} from "../src/data/model";
import { demoReducer, freshState } from "../src/state/DemoContext";
test("default profile can afford the preferred data analyst route", () => {
  assert.equal(recommend(initialProfile), "a");
  assert.equal(duration(pathways[0], initialProfile), 9);
});
test("lowering the budget selects the adjacent route", () => {
  const p = { ...initialProfile, budget: 20000 };
  assert.equal(recommend(p), "b");
  assert.match(fitMessage(pathways[0], p), /above your budget/);
});
test("a very small budget is explicitly identified as a funding gap", () => {
  const p = { ...initialProfile, budget: 0 };
  assert.equal(recommend(p), "c");
  assert.match(recommendationReason(p), /exceeds this budget/);
});
test("fewer available hours extends the route and changes the suggestion", () => {
  const p = { ...initialProfile, hours: 4 };
  assert.equal(duration(pathways[0], p), 18);
  assert.equal(duration(pathways[1], p), 12);
  assert.equal(recommend(p), "b");
});
test("earlier earning points to projects without guaranteeing income", () => {
  const p = { ...initialProfile, earnSoon: true };
  assert.equal(recommend(p), "c");
  assert.match(recommendationReason(p), /not guaranteed/);
});
test("changing a career goal changes the preferred route", () => {
  assert.equal(recommend({ ...initialProfile, goal: "Business analyst" }), "b");
  assert.equal(
    recommend({ ...initialProfile, goal: "Reporting specialist" }),
    "c",
  );
});
test("remote-compatible sample routes do not invent relocation opportunities", () => {
  assert.equal(
    recommend({ ...initialProfile, relocate: true }),
    recommend(initialProfile),
  );
});
test("an unapplied scenario cannot mutate the current state", () => {
  const state = freshState();
  const draft = { ...state.profile, budget: 20000 };
  recommend(draft);
  assert.equal(state.profile.budget, 60000);
  assert.equal(state.activePath, "a");
});
test("applying a scenario updates profile and active route together, keeping user progress", () => {
  let state = freshState();
  state = demoReducer(state, { type: "save", id: "excel" });
  state = demoReducer(state, { type: "task", id: "skills" });
  const next = demoReducer(state, {
    type: "scenario",
    profile: { ...state.profile, budget: 20000 },
  });
  assert.equal(next.profile.budget, 20000);
  assert.equal(next.activePath, "b");
  assert.deepEqual(next.saved, ["excel"]);
  assert.deepEqual(next.completed, ["skills"]);
  assert.equal(state.profile.budget, 60000);
});
test("bookmarks and task completion are reversible and never duplicate", () => {
  for (const type of ["save", "task"] as const) {
    let s = freshState();
    s = demoReducer(s, { type, id: "one" });
    s = demoReducer(s, { type, id: "one" });
    assert.deepEqual(type === "save" ? s.saved : s.completed, []);
  }
});
test("choosing a route is respected until priorities change", () => {
  let s = demoReducer(freshState(), { type: "path", id: "b" });
  assert.equal(s.activePath, "b");
  s = demoReducer(s, {
    type: "profile",
    profile: { ...s.profile, earnSoon: true },
  });
  assert.equal(s.activePath, "c");
});
test("reset clears all session changes and restores the initial journey", () => {
  let s = freshState();
  s = demoReducer(s, { type: "start" });
  s = demoReducer(s, { type: "save", id: "sql" });
  s = demoReducer(s, {
    type: "profile",
    profile: { ...s.profile, budget: 8000, support: [] },
  });
  assert.deepEqual(demoReducer(s, { type: "reset" }), freshState());
});

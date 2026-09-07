import React, { createContext, useContext, useReducer } from "react";
import { initialProfile, PathId, Profile, recommend } from "../data/model";
export type DemoState = {
  profile: Profile;
  activePath: PathId;
  saved: string[];
  completed: string[];
  started: boolean;
  revision: number;
};
export const freshState = (): DemoState => ({
  profile: {
    ...initialProfile,
    support: [...initialProfile.support],
    strengths: [...initialProfile.strengths],
  },
  activePath: "a",
  saved: [],
  completed: [],
  started: false,
  revision: 0,
});
export type DemoAction =
  | { type: "profile"; profile: Profile }
  | { type: "scenario"; profile: Profile }
  | { type: "path"; id: PathId }
  | { type: "save" | "task"; id: string }
  | { type: "start" | "reset" };
export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "profile":
      return {
        ...state,
        profile: action.profile,
        activePath: recommend(action.profile),
        revision: state.revision + 1,
      };
    case "scenario":
      return {
        ...state,
        profile: action.profile,
        activePath: recommend(action.profile),
        revision: state.revision + 1,
      };
    case "path":
      return { ...state, activePath: action.id };
    case "save":
      return {
        ...state,
        saved: state.saved.includes(action.id)
          ? state.saved.filter((id) => id !== action.id)
          : [...state.saved, action.id],
      };
    case "task":
      return {
        ...state,
        completed: state.completed.includes(action.id)
          ? state.completed.filter((id) => id !== action.id)
          : [...state.completed, action.id],
      };
    case "start":
      return { ...state, started: true };
    case "reset":
      return freshState();
  }
}
const DemoContext = createContext<{
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
} | null>(null);
export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, undefined, freshState);
  return (
    <DemoContext.Provider value={{ state, dispatch }}>
      {children}
    </DemoContext.Provider>
  );
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("DemoProvider is required");
  return value;
}

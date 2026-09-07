import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Choice,
  Header,
  Notice,
  Screen,
  T,
  s,
} from "../src/components/ui";
import { C } from "../src/theme";
import { Goal } from "../src/data/model";
import { useDemo } from "../src/state/DemoContext";
export const supportOptions = [
  "Flexible learning",
  "Written instructions",
  "Captions & transcripts",
  "Step-by-step guidance",
  "Screen-reader support",
];
export default function EditProfile() {
  const { state, dispatch } = useDemo();
  const [draft, setDraft] = useState(() => ({ ...state.profile }));
  const [budget, setBudget] = useState(String(draft.budget));
  const [hours, setHours] = useState(String(draft.hours));
  const [error, setError] = useState("");
  const save = () => {
    if (!/^\d+$/.test(budget) || Number(budget) > 500000) {
      setError("Enter a learning budget from ₹0 to ₹5,00,000.");
      return;
    }
    if (!/^\d+$/.test(hours) || Number(hours) < 1 || Number(hours) > 30) {
      setError("Enter between 1 and 30 study hours per week.");
      return;
    }
    dispatch({
      type: "profile",
      profile: { ...draft, budget: Number(budget), hours: Number(hours) },
    });
    router.dismissTo("/profile");
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Screen
        footer={
          <View style={{ gap: 12 }}>
            {!!error && (
              <View accessibilityLiveRegion="polite">
                <Notice warning>{error}</Notice>
              </View>
            )}
            <Button title="Save my profile" icon="check" onPress={save} />
          </View>
        }
      >
        <Header back title="Make it yours" />
        <T variant="heading">You know yourself best.</T>
        <T style={{ color: C.muted, marginTop: 10 }}>
          Adjust this sample profile. Your pathways will reflect the priorities
          you choose.
        </T>
        <T style={s.fieldLabel}>Your next career goal</T>
        <View style={{ gap: 8 }}>
          {(
            [
              "Data analyst",
              "Business analyst",
              "Reporting specialist",
            ] as Goal[]
          ).map((goal) => (
            <Choice
              key={goal}
              title={goal}
              selected={draft.goal === goal}
              onPress={() => setDraft({ ...draft, goal })}
            />
          ))}
        </View>
        <T style={s.fieldLabel}>Total learning budget (₹)</T>
        <TextInput
          accessibilityLabel="Total learning budget in rupees"
          keyboardType="number-pad"
          value={budget}
          onChangeText={setBudget}
          style={s.input}
          maxLength={6}
        />
        <T style={s.fieldLabel}>Study hours per week</T>
        <TextInput
          accessibilityLabel="Study hours per week"
          keyboardType="number-pad"
          value={hours}
          onChangeText={setHours}
          style={s.input}
          maxLength={2}
        />
        <T style={s.fieldLabel}>Location flexibility</T>
        <View style={{ gap: 8 }}>
          <Choice
            title="Stay near home"
            selected={!draft.relocate}
            onPress={() => setDraft({ ...draft, relocate: false })}
          />
          <Choice
            title="Open to relocating"
            selected={draft.relocate}
            onPress={() => setDraft({ ...draft, relocate: true })}
          />
        </View>
        <T style={s.fieldLabel}>Income priority</T>
        <View style={{ gap: 8 }}>
          <Choice
            title="Keep earning while I learn"
            selected={!draft.earnSoon}
            onPress={() => setDraft({ ...draft, earnSoon: false })}
          />
          <Choice
            title="Explore earlier earning"
            selected={draft.earnSoon}
            onPress={() => setDraft({ ...draft, earnSoon: true })}
          />
        </View>
        <T style={s.fieldLabel}>Strengths to build on</T>
        <View style={{ gap: 8 }}>
          {[
            "Problem solving",
            "Working with numbers",
            "Customer insight",
            "Communication",
            "Organising people",
          ].map((value) => (
            <Choice
              key={value}
              title={value}
              selected={draft.strengths.includes(value)}
              onPress={() =>
                setDraft({
                  ...draft,
                  strengths: draft.strengths.includes(value)
                    ? draft.strengths.filter((s) => s !== value)
                    : [...draft.strengths, value],
                })
              }
            />
          ))}
        </View>
        <T style={s.fieldLabel}>Support that helps you (optional)</T>
        <T variant="small" style={{ color: C.muted, marginBottom: 12 }}>
          Choose what makes learning work for you. You don’t need to share a
          diagnosis.
        </T>
        <View style={{ gap: 8 }}>
          {supportOptions.map((value) => (
            <Choice
              key={value}
              title={value}
              selected={draft.support.includes(value)}
              onPress={() =>
                setDraft({
                  ...draft,
                  support: draft.support.includes(value)
                    ? draft.support.filter((s) => s !== value)
                    : [...draft.support, value],
                })
              }
            />
          ))}
        </View>
        <Button
          title="Prefer not to share support needs"
          variant="ghost"
          onPress={() => setDraft({ ...draft, support: [] })}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
}

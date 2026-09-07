import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Choice,
  FadeIn,
  Header,
  Icon,
  IconButton,
  Notice,
  Pill,
  Row,
  Screen,
  SectionTitle,
  T,
} from "../src/components/ui";
import { C, F } from "../src/theme";
import {
  duration,
  money,
  pathways,
  recommend,
  recommendationReason,
} from "../src/data/model";
import { useDemo } from "../src/state/DemoContext";
export default function WhatIf() {
  const { state, dispatch } = useDemo();
  const [draft, setDraft] = useState(() => ({ ...state.profile }));
  const [preview, setPreview] = useState(false);
  const original = pathways.find((p) => p.id === state.activePath)!;
  const suggested = pathways.find((p) => p.id === recommend(draft))!;
  const changed = JSON.stringify(draft) !== JSON.stringify(state.profile);
  function discard() {
    router.canGoBack() ? router.back() : router.replace("/home");
  }
  return (
    <Screen
      scrollKey={preview ? "preview" : "edit"}
      footer={
        <View style={{ gap: 4 }}>
          <Button
            title={preview ? "Apply these changes" : "Preview my new plan"}
            icon={preview ? "check" : "sparkle"}
            disabled={!changed}
            onPress={() => {
              if (preview) {
                dispatch({ type: "scenario", profile: draft });
                router.dismissTo("/paths");
              } else setPreview(true);
            }}
          />
          <Button
            title={preview ? "Keep my current plan" : "Discard changes"}
            variant="ghost"
            onPress={discard}
          />
        </View>
      }
    >
      <Header back title="Room for a change" onBack={discard} />
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: 17,
          backgroundColor: C.mint,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Icon name="sliders" color={C.teal} size={27} />
      </View>
      <T variant="heading">Life changes.{"\n"}Your plan can, too.</T>
      <T style={{ color: C.muted, marginTop: 10 }}>
        Try a different situation. Nothing changes until you choose to apply it.
      </T>
      {!preview ? (
        <>
          <SectionTitle title="What’s on your mind?" />
          <View style={{ gap: 9 }}>
            <Choice
              title="My learning budget decreased"
              icon="rupee"
              selected={draft.budget === 20000}
              onPress={() => setDraft({ ...draft, budget: 20000 })}
            />
            <Choice
              title="I have less time to study"
              icon="clock"
              selected={draft.hours === 4}
              onPress={() => setDraft({ ...draft, hours: 4 })}
            />
            <Choice
              title="I need to start earning sooner"
              icon="briefcase"
              selected={draft.earnSoon}
              onPress={() => setDraft({ ...draft, earnSoon: !draft.earnSoon })}
            />
            <Choice
              title="I need to stay close to home"
              icon="pin"
              selected={!draft.relocate}
              onPress={() => setDraft({ ...draft, relocate: false })}
            />
          </View>
          <SectionTitle title="Make it fit your situation" />
          <View
            style={{
              backgroundColor: C.white,
              borderRadius: 20,
              padding: 18,
              gap: 20,
              borderWidth: 1,
              borderColor: C.line,
            }}
          >
            <View>
              <T variant="small" style={{ color: C.muted, marginBottom: 10 }}>
                Total learning budget
              </T>
              <Row style={{ justifyContent: "space-between" }}>
                <IconButton
                  name="minus"
                  label="Decrease budget by 5,000 rupees"
                  bg={C.faded}
                  onPress={() =>
                    setDraft({
                      ...draft,
                      budget: Math.max(0, draft.budget - 5000),
                    })
                  }
                />
                <T variant="title" accessibilityLiveRegion="polite">
                  {money(draft.budget)}
                </T>
                <IconButton
                  name="plus"
                  label="Increase budget by 5,000 rupees"
                  bg={C.faded}
                  onPress={() =>
                    setDraft({
                      ...draft,
                      budget: Math.min(500000, draft.budget + 5000),
                    })
                  }
                />
              </Row>
            </View>
            <View style={{ height: 1, backgroundColor: C.line }} />
            <View>
              <T variant="small" style={{ color: C.muted, marginBottom: 10 }}>
                Time for learning each week
              </T>
              <Row style={{ justifyContent: "space-between" }}>
                <IconButton
                  name="minus"
                  label="Decrease weekly study hours"
                  bg={C.faded}
                  onPress={() =>
                    setDraft({ ...draft, hours: Math.max(1, draft.hours - 1) })
                  }
                />
                <T variant="title">{draft.hours} hours</T>
                <IconButton
                  name="plus"
                  label="Increase weekly study hours"
                  bg={C.faded}
                  onPress={() =>
                    setDraft({ ...draft, hours: Math.min(30, draft.hours + 1) })
                  }
                />
              </Row>
            </View>
          </View>
          <SectionTitle title="Location flexibility" />
          <View style={{ gap: 9 }}>
            <Choice
              title="Stay near home"
              selected={!draft.relocate}
              onPress={() => setDraft({ ...draft, relocate: false })}
            />
            <Choice
              title="I’m open to relocating"
              selected={draft.relocate}
              onPress={() => setDraft({ ...draft, relocate: true })}
            />
          </View>
          <View style={{ marginTop: 18 }}>
            <Notice>
              These sample routes already support remote learning. Location
              changes update your preferences without inventing new
              opportunities.
            </Notice>
          </View>
        </>
      ) : (
        <FadeIn>
          <SectionTitle title="A little adjustment. A way forward." />
          <Notice warning={suggested.cost > draft.budget}>
            {recommendationReason(draft)}
          </Notice>
          <View
            style={{
              marginTop: 20,
              backgroundColor: C.white,
              borderRadius: 20,
              padding: 20,
              borderWidth: 1,
              borderColor: C.line,
            }}
          >
            <T variant="small" style={{ color: C.muted }}>
              Your current route
            </T>
            <T variant="label" style={{ marginTop: 7 }}>
              {original.label} · {original.title}
            </T>
            <Row style={{ gap: 16, marginTop: 10 }}>
              <T variant="small" style={{ color: C.muted }}>
                {money(original.cost)}
              </T>
              <T variant="small" style={{ color: C.muted }}>
                {duration(original, state.profile)} months
              </T>
            </Row>
            <View style={{ marginVertical: 19, alignItems: "center" }}>
              <Icon name="down" color={C.teal} />
            </View>
            <Pill icon="sparkle">
              {original.id === suggested.id
                ? "Same route, updated situation"
                : "Your revised route"}
            </Pill>
            <T variant="title" style={{ marginTop: 12 }}>
              {suggested.title}
            </T>
            <Row style={{ gap: 16, marginTop: 10 }}>
              <T variant="label" style={{ color: C.teal }}>
                {money(suggested.cost)}
              </T>
              <T variant="small">{duration(suggested, draft)} months</T>
            </Row>
          </View>
          <SectionTitle title="What changes for you" />
          {[
            {
              label: "Learning budget",
              before: money(state.profile.budget),
              after: money(draft.budget),
            },
            {
              label: "Weekly study time",
              before: `${state.profile.hours} hours`,
              after: `${draft.hours} hours`,
            },
            {
              label: "Location",
              before: state.profile.relocate ? "Open to moving" : "Near home",
              after: draft.relocate ? "Open to moving" : "Near home",
            },
            {
              label: "Income priority",
              before: state.profile.earnSoon
                ? "Earlier earning"
                : "Gradual transition",
              after: draft.earnSoon ? "Earlier earning" : "Gradual transition",
            },
          ]
            .filter((r) => r.before !== r.after)
            .map((r) => (
              <View
                key={r.label}
                style={{
                  paddingVertical: 13,
                  borderBottomWidth: 1,
                  borderBottomColor: C.line,
                }}
              >
                <T variant="small" style={{ color: C.muted, marginBottom: 6 }}>
                  {r.label}
                </T>
                <Row style={{ gap: 10, flexWrap: "wrap" }}>
                  <T variant="small">{r.before}</T>
                  <Icon name="arrow" size={16} color={C.muted} />
                  <T variant="label" style={{ color: C.teal, fontSize: 13 }}>
                    {r.after}
                  </T>
                </Row>
              </View>
            ))}
          <Button
            title="Adjust this scenario"
            variant="secondary"
            style={{ marginTop: 23 }}
            onPress={() => setPreview(false)}
          />
          <T variant="small" style={{ color: C.muted, marginTop: 18 }}>
            This is a simulated recalculation using sample routes, not a
            prediction of career outcomes.
          </T>
        </FadeIn>
      )}
    </Screen>
  );
}

import React from "react";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Empty,
  Header,
  Icon,
  Notice,
  Pill,
  Row,
  Screen,
  SectionTitle,
  T,
} from "../../src/components/ui";
import { C, F } from "../../src/theme";
import { duration, money, pathways } from "../../src/data/model";
import { useDemo } from "../../src/state/DemoContext";
export default function PathDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, dispatch } = useDemo();
  const path = pathways.find((p) => p.id === id);
  if (!path)
    return (
      <Screen>
        <Header back title="Pathway" />
        <Empty
          title="This route isn’t in the demo"
          detail="Explore one of the three sample pathways."
          action={
            <Button
              title="View pathways"
              onPress={() => router.replace("/paths")}
            />
          }
        />
      </Screen>
    );
  return (
    <Screen
      footer={
        <Button
          title={
            state.activePath === path.id
              ? "See my next steps"
              : "Make this my active path"
          }
          icon="arrow"
          onPress={() => {
            dispatch({ type: "path", id: path.id });
            router.push("/next-steps");
          }}
        />
      }
    >
      <Header back title="Your pathway" right={<Pill>{path.label}</Pill>} />
      <View
        style={{
          width: 54,
          height: 54,
          borderRadius: 18,
          backgroundColor: C.mint,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
        }}
      >
        <Icon name="path" color={C.teal} size={28} />
      </View>
      <T variant="heading">{path.title}</T>
      <T style={{ color: C.muted, marginTop: 10 }}>{path.description}</T>
      <Row style={{ gap: 10, marginTop: 20, marginBottom: 22 }}>
        <Pill icon="clock">{duration(path, state.profile)} months</Pill>
        <Pill icon="rupee">{money(path.cost)} estimate</Pill>
      </Row>
      {path.cost > state.profile.budget && (
        <Notice warning>
          This route is {money(path.cost - state.profile.budget)} above your
          current budget. Review the alternatives before committing.
        </Notice>
      )}
      <SectionTitle title="Why this could work for you" />
      <T style={{ color: C.muted }}>{path.why}</T>
      <Row style={{ gap: 7, flexWrap: "wrap", marginTop: 15 }}>
        {path.skills.map((skill) => (
          <Pill key={skill} bg={C.white} color={C.ink}>
            {skill}
          </Pill>
        ))}
      </Row>
      <SectionTitle title="From here to your next chapter" />
      <View style={{ marginTop: 4 }}>
        {path.milestones.map((m, i) => (
          <Row key={m.title} style={{ alignItems: "stretch", gap: 16 }}>
            <View style={{ width: 30, alignItems: "center" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: i === 0 ? C.teal : C.mint,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <T
                  variant="small"
                  style={{
                    color: i === 0 ? C.white : C.teal,
                    fontFamily: F.bold,
                  }}
                >
                  {i + 1}
                </T>
              </View>
              {i < 3 && (
                <View
                  style={{
                    width: 1,
                    flex: 1,
                    backgroundColor: "#B8CFC1",
                    marginVertical: 5,
                  }}
                />
              )}
            </View>
            <View style={{ flex: 1, paddingBottom: 28 }}>
              <T
                variant="small"
                style={{ color: C.teal, fontFamily: F.semi, marginBottom: 5 }}
              >
                {state.profile.hours === 8 ? m.duration : `Stage ${i + 1} of 4`}
              </T>
              <T variant="label">{m.title}</T>
              <T variant="small" style={{ color: C.muted, marginTop: 7 }}>
                {m.detail}
              </T>
            </View>
          </Row>
        ))}
      </View>
      {state.profile.hours !== 8 && (
        <Notice>
          The overall estimate is {duration(path, state.profile)} months at{" "}
          {state.profile.hours} hours a week. Individual stage dates would need
          a more detailed plan.
        </Notice>
      )}
      <SectionTitle title="A realistic look" />
      <View
        style={{
          backgroundColor: C.sand,
          padding: 18,
          borderRadius: 18,
          gap: 8,
        }}
      >
        <Row style={{ gap: 8 }}>
          <Icon name="info" color={C.amber} size={19} />
          <T variant="label" style={{ color: C.amber }}>
            The tradeoff
          </T>
        </Row>
        <T variant="small" style={{ color: C.amber }}>
          {path.tradeoff}
        </T>
      </View>
      <SectionTitle title="What you’ll need" />
      <T style={{ color: C.muted }}>{path.eligibility}</T>
      <Button
        title="Find learning opportunities"
        variant="secondary"
        icon="compass"
        style={{ marginTop: 24 }}
        onPress={() => router.push("/explore")}
      />
      <T
        variant="small"
        style={{ color: C.muted, fontSize: 10, marginTop: 18 }}
      >
        Sample pathway. Costs and timelines are planning examples, not verified
        quotes.
      </T>
    </Screen>
  );
}

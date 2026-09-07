import React from "react";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Empty,
  Header,
  Icon,
  IconButton,
  Notice,
  Pill,
  Row,
  Screen,
  SectionTitle,
  T,
} from "../../src/components/ui";
import { C } from "../../src/theme";
import { opportunities } from "../../src/data/model";
import { useDemo } from "../../src/state/DemoContext";
export default function OpportunityDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, dispatch } = useDemo();
  const o = opportunities.find((o) => o.id === id);
  if (!o)
    return (
      <Screen>
        <Header back title="Opportunity" />
        <Empty
          title="This example isn’t available"
          detail="Explore the other sample opportunities."
          action={
            <Button
              title="Explore opportunities"
              onPress={() => router.replace("/explore")}
            />
          }
        />
      </Screen>
    );
  const saved = state.saved.includes(o.id);
  return (
    <Screen
      footer={
        <Button
          title={saved ? "Saved · remove from saved" : "Save for later"}
          icon="bookmark"
          variant={saved ? "secondary" : "primary"}
          onPress={() => dispatch({ type: "save", id: o.id })}
        />
      }
    >
      <Header back title="A possible next step" />
      <Row style={{ justifyContent: "space-between", marginBottom: 21 }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 19,
            backgroundColor:
              o.kind === "Course"
                ? C.blue
                : o.kind === "Job"
                  ? C.sand
                  : C.violet,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name={
              o.kind === "Course"
                ? "book"
                : o.kind === "Job"
                  ? "briefcase"
                  : "graduation"
            }
            size={31}
            color={C.teal}
          />
        </View>
        <Pill bg={C.white} color={C.muted}>
          {o.kind} example
        </Pill>
      </Row>
      <T variant="heading">{o.title}</T>
      <T style={{ color: C.muted, marginTop: 10 }}>{o.provider}</T>
      <Row style={{ gap: 5, marginTop: 12 }}>
        <Icon name="pin" size={16} color={C.muted} />
        <T variant="small" style={{ color: C.muted }}>
          {o.location}
        </T>
      </Row>
      <Row style={{ gap: 10, marginTop: 22, marginBottom: 22 }}>
        <Pill icon="rupee">{o.cost}</Pill>
        <Pill icon="clock">{o.time}</Pill>
      </Row>
      <Notice>
        This is an illustrative listing. There’s no live opening, application,
        or enrollment connected to this prototype.
      </Notice>
      <SectionTitle title="A closer look" />
      <T style={{ color: C.muted }}>{o.description}</T>
      <SectionTitle title="Why explore this?" />
      <T style={{ color: C.muted }}>
        {o.kind === "Course"
          ? "Build a practical skill before committing to a bigger career change. Self-paced study can fit around your current job."
          : o.kind === "Job"
            ? "Your retail operations experience is relevant to this kind of work. Use this example to understand skills to develop and questions to ask."
            : "Support and mentoring could make a transition more manageable. Explore programmes that fit your learning preferences and schedule."}
      </T>
      <Row style={{ gap: 8, flexWrap: "wrap", marginTop: 17 }}>
        {o.skills.map((skill) => (
          <Pill key={skill} bg={C.white} color={C.ink}>
            {skill}
          </Pill>
        ))}
      </Row>
      <SectionTitle title="Readiness & support" />
      <T style={{ color: C.muted }}>{o.requirements}</T>
      <SectionTitle title="Before you take the next step" />
      <View style={{ gap: 15 }}>
        {[
          "Confirm details with the official provider.",
          "Check eligibility, costs, and any deadlines.",
          "Ask about the support and flexibility you need.",
        ].map((text) => (
          <Row key={text} style={{ gap: 10, alignItems: "flex-start" }}>
            <Icon name="check" size={17} color={C.teal} />
            <T style={{ flex: 1, color: C.muted, fontSize: 13 }}>{text}</T>
          </Row>
        ))}
      </View>
      <T
        variant="small"
        style={{ color: C.muted, marginTop: 24, fontSize: 10 }}
      >
        Source status: not verified · sample data
      </T>
    </Screen>
  );
}

import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Header,
  Icon,
  Notice,
  Pill,
  Row,
  Screen,
  T,
} from "../../src/components/ui";
import { C, F } from "../../src/theme";
import {
  duration,
  fitMessage,
  money,
  pathways,
  recommend,
  recommendationReason,
} from "../../src/data/model";
import { useDemo } from "../../src/state/DemoContext";
export default function Paths() {
  const { state } = useDemo();
  const [compare, setCompare] = useState(false);
  const recommended = recommend(state.profile);
  return (
    <Screen>
      <Header
        title="Your possible paths"
        subtitle="A good plan leaves room for life."
        right={
          <View
            style={{ backgroundColor: C.mint, padding: 12, borderRadius: 16 }}
          >
            <Icon name="path" color={C.teal} />
          </View>
        }
      />
      <Row style={{ gap: 7, flexWrap: "wrap", marginBottom: 20 }}>
        <Pill icon="rupee" bg={C.white}>
          {money(state.profile.budget)} budget
        </Pill>
        <Pill icon="clock" bg={C.white}>
          {state.profile.hours} hrs / week
        </Pill>
        <Pill icon="pin" bg={C.white}>
          {state.profile.relocate ? "Open to moving" : "Stay near home"}
        </Pill>
      </Row>
      <Notice>{recommendationReason(state.profile)}</Notice>
      <Row
        style={{
          backgroundColor: "#E5ECE6",
          borderRadius: 13,
          padding: 4,
          marginVertical: 22,
        }}
      >
        {["Your routes", "Compare"].map((label, i) => (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: compare === !!i }}
            onPress={() => setCompare(!!i)}
            key={label}
            style={{
              flex: 1,
              padding: 12,
              minHeight: 48,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: compare === !!i ? C.white : "transparent",
            }}
          >
            <T
              variant="small"
              style={{
                fontFamily: F.semi,
                color: compare === !!i ? C.teal : C.muted,
              }}
            >
              {label}
            </T>
          </Pressable>
        ))}
      </Row>
      {compare ? (
        <View
          style={{
            backgroundColor: C.white,
            borderRadius: 20,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: C.line,
          }}
        >
          <Row style={{ padding: 14, backgroundColor: C.mint }}>
            <T variant="small" style={{ width: 70 }}>
              At a glance
            </T>
            {pathways.map((p) => (
              <T
                key={p.id}
                variant="label"
                style={{ flex: 1, textAlign: "center", fontSize: 12 }}
              >
                {p.label}
              </T>
            ))}
          </Row>
          {[
            { label: "Estimate", values: pathways.map((p) => money(p.cost)) },
            {
              label: "Timeline",
              values: pathways.map((p) => `${duration(p, state.profile)} mo`),
            },
            {
              label: "Learning",
              values: ["Technical", "Adjacent skills", "Practical"],
            },
            {
              label: "Tradeoff",
              values: ["Study load", "Role availability", "Variable income"],
            },
            {
              label: "Budget fit",
              values: pathways.map((p) =>
                p.cost <= state.profile.budget ? "Within" : "Above",
              ),
            },
          ].map((row, i) => (
            <Row
              key={row.label}
              style={{
                paddingVertical: 18,
                paddingHorizontal: 14,
                backgroundColor: i % 2 ? "#F8FAF8" : C.white,
                alignItems: "flex-start",
              }}
            >
              <T
                variant="small"
                style={{ width: 70, color: C.muted, fontSize: 10 }}
              >
                {row.label}
              </T>
              {row.values.map((v, j) => (
                <T
                  variant="small"
                  key={j}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: 10,
                    fontFamily: F.medium,
                  }}
                >
                  {v}
                </T>
              ))}
            </Row>
          ))}
          <View style={{ padding: 14, gap: 8 }}>
            {pathways.map((p) => (
              <Button
                key={p.id}
                title={`Explore ${p.label}`}
                variant="secondary"
                icon="arrow"
                onPress={() => router.push(`/pathway/${p.id}`)}
              />
            ))}
          </View>
        </View>
      ) : (
        <View style={{ gap: 16 }}>
          {pathways.map((p, i) => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Explore ${p.label}: ${p.title}`}
              key={p.id}
              onPress={() => router.push(`/pathway/${p.id}`)}
              style={{
                backgroundColor: C.white,
                borderRadius: 22,
                padding: 20,
                borderWidth: recommended === p.id ? 1.5 : 1,
                borderColor: recommended === p.id ? C.teal : C.line,
              }}
            >
              <Row
                style={{ justifyContent: "space-between", marginBottom: 15 }}
              >
                <Row style={{ gap: 9 }}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 11,
                      backgroundColor: [C.mint, C.blue, C.sand][i],
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <T variant="label">{p.id.toUpperCase()}</T>
                  </View>
                  <T variant="small" style={{ color: C.muted }}>
                    {p.tag}
                  </T>
                </Row>
                {state.activePath === p.id && (
                  <Icon
                    name="complete"
                    color={C.teal}
                    size={20}
                    weight="fill"
                  />
                )}
              </Row>
              <T variant="title" style={{ fontSize: 20 }}>
                {p.title}
              </T>
              <T variant="small" style={{ color: C.muted, marginTop: 5 }}>
                {p.subtitle}
              </T>
              <Row style={{ marginTop: 19, gap: 22 }}>
                <Row style={{ gap: 5 }}>
                  <Icon name="rupee" size={16} color={C.muted} />
                  <T variant="small" style={{ fontFamily: F.semi }}>
                    {money(p.cost)}
                  </T>
                </Row>
                <Row style={{ gap: 5 }}>
                  <Icon name="clock" size={16} color={C.muted} />
                  <T variant="small">{duration(p, state.profile)} months</T>
                </Row>
                <View style={{ flex: 1 }} />
                <Icon name="arrow" color={C.teal} size={18} />
              </Row>
              <T
                variant="small"
                style={{
                  color: p.cost > state.profile.budget ? C.amber : C.teal,
                  marginTop: 12,
                  fontSize: 11,
                }}
              >
                {fitMessage(p, state.profile)}
              </T>
              {recommended === p.id && (
                <View
                  style={{
                    marginTop: 14,
                    borderTopWidth: 1,
                    borderTopColor: C.line,
                    paddingTop: 12,
                  }}
                >
                  <Row style={{ gap: 6 }}>
                    <Icon name="sparkle" color={C.teal} size={14} />
                    <T
                      variant="small"
                      style={{ fontFamily: F.semi, color: C.teal }}
                    >
                      {p.cost > state.profile.budget
                        ? "Lowest-cost sample · funding gap remains"
                        : "Suggested for your current situation"}
                    </T>
                  </Row>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      )}
      <Button
        title="What if my situation changes?"
        icon="sliders"
        variant="secondary"
        style={{ marginTop: 24 }}
        onPress={() => router.push("/what-if")}
      />
      <T
        variant="small"
        style={{
          color: C.muted,
          fontSize: 10,
          marginTop: 15,
          textAlign: "center",
        }}
      >
        Illustrative costs and timelines. Outcomes are not guaranteed.
      </T>
    </Screen>
  );
}

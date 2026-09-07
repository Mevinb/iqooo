import React, { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { router } from "expo-router";
import {
  Empty,
  Header,
  Icon,
  IconButton,
  Notice,
  Pill,
  Row,
  Screen,
  T,
  s,
} from "../../src/components/ui";
import { C, F } from "../../src/theme";
import { opportunities } from "../../src/data/model";
import { useDemo } from "../../src/state/DemoContext";
export default function Explore() {
  const { state, dispatch } = useDemo();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(false);
  const filtered = opportunities.filter(
    (o) =>
      (filter === "All" || o.kind === filter) &&
      (!saved || state.saved.includes(o.id)) &&
      `${o.title} ${o.provider} ${o.skills.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <Screen>
      <Header
        title="Open a new door"
        subtitle="Small opportunities. Real possibilities."
        right={
          <IconButton
            name="bookmark"
            label={
              saved ? "Show all opportunities" : "Show saved opportunities"
            }
            selected={saved}
            bg={saved ? C.mint : C.white}
            color={C.teal}
            onPress={() => setSaved(!saved)}
          />
        }
      />
      <View
        style={{
          backgroundColor: "#E2EADF",
          borderRadius: 22,
          padding: 21,
          marginBottom: 23,
        }}
      >
        <Row style={{ gap: 15, alignItems: "flex-start" }}>
          <View style={{ flex: 1 }}>
            <T variant="title" style={{ fontSize: 23, lineHeight: 31 }}>
              Your experience{"\n"}opens doors.
            </T>
            <T variant="small" style={{ color: C.muted, marginTop: 9 }}>
              Find a starting point that meets you where you are.
            </T>
          </View>
          <View style={{ marginTop: 13 }}>
            <Icon name="compass" color={C.teal} size={54} weight="regular" />
          </View>
        </Row>
      </View>
      <Row
        style={{
          backgroundColor: C.white,
          borderColor: C.line,
          borderWidth: 1,
          borderRadius: 15,
          paddingHorizontal: 14,
          gap: 9,
        }}
      >
        <Icon name="compass" color={C.muted} size={19} />
        <TextInput
          accessibilityLabel="Search opportunities"
          placeholder="Skills, courses, new possibilities…"
          placeholderTextColor={C.muted}
          value={query}
          onChangeText={setQuery}
          style={{
            flex: 1,
            minHeight: 51,
            fontFamily: F.regular,
            fontSize: 12,
            color: C.ink,
          }}
        />
        {query.length > 0 && (
          <IconButton
            name="close"
            label="Clear search"
            onPress={() => setQuery("")}
          />
        )}
      </Row>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 18 }}
      >
        {["All", "Course", "Job", "Programme"].map((f) => (
          <Pressable
            key={f}
            accessibilityRole="button"
            accessibilityState={{ selected: filter === f }}
            onPress={() => setFilter(f)}
            style={{
              paddingHorizontal: 17,
              minHeight: 48,
              justifyContent: "center",
              borderRadius: 24,
              backgroundColor: filter === f ? C.teal : C.white,
              borderWidth: 1,
              borderColor: filter === f ? C.teal : C.line,
            }}
          >
            <T
              variant="small"
              style={{
                fontFamily: F.semi,
                color: filter === f ? C.white : C.muted,
              }}
            >
              {f === "All"
                ? "For you"
                : f === "Course"
                  ? "Courses"
                  : f === "Job"
                    ? "Jobs"
                    : "Programmes"}
            </T>
          </Pressable>
        ))}
      </ScrollView>
      <Row style={{ justifyContent: "space-between", marginBottom: 16 }}>
        <T variant="label">{saved ? "Saved for later" : "A place to begin"}</T>
        <T variant="small" style={{ color: C.muted }}>
          {filtered.length} {filtered.length === 1 ? "example" : "examples"}
        </T>
      </Row>
      {!filtered.length ? (
        <Empty
          title={
            saved ? "A little space for possibilities" : "No examples found"
          }
          detail={
            saved
              ? "Save an opportunity using its bookmark to find it here."
              : "Try “Excel”, “SQL”, or a different category."
          }
        />
      ) : (
        <View style={{ gap: 14 }}>
          {filtered.map((o) => (
            <View
              key={o.id}
              style={{
                backgroundColor: C.white,
                borderRadius: 21,
                padding: 19,
                borderWidth: 1,
                borderColor: C.line,
              }}
            >
              <Row
                style={{ justifyContent: "space-between", marginBottom: 10 }}
              >
                <View
                  style={{
                    width: 43,
                    height: 43,
                    backgroundColor:
                      o.kind === "Course"
                        ? C.blue
                        : o.kind === "Job"
                          ? C.sand
                          : C.violet,
                    borderRadius: 13,
                    alignItems: "center",
                    justifyContent: "center",
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
                    color={
                      o.kind === "Course"
                        ? "#456777"
                        : o.kind === "Job"
                          ? C.amber
                          : "#6C5A87"
                    }
                    size={23}
                  />
                </View>
                <Pill bg={C.faded} color={C.muted}>
                  {o.kind}
                </Pill>
                <View style={{ flex: 1 }} />
                <IconButton
                  name="bookmark"
                  label={`${state.saved.includes(o.id) ? "Unsave" : "Save"} ${o.title}`}
                  selected={state.saved.includes(o.id)}
                  color={C.teal}
                  onPress={() => dispatch({ type: "save", id: o.id })}
                />
              </Row>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`View ${o.title}`}
                onPress={() => router.push(`/opportunity/${o.id}`)}
              >
                <T variant="title" style={{ fontSize: 18, lineHeight: 26 }}>
                  {o.title}
                </T>
                <T variant="small" style={{ color: C.muted, marginTop: 5 }}>
                  {o.provider}
                </T>
                <Row style={{ gap: 5, marginTop: 13 }}>
                  <Icon name="pin" color={C.muted} size={14} />
                  <T variant="small" style={{ color: C.muted }}>
                    {o.location}
                  </T>
                </Row>
                <Row
                  style={{
                    justifyContent: "space-between",
                    marginTop: 17,
                    paddingTop: 13,
                    borderTopWidth: 1,
                    borderTopColor: C.line,
                  }}
                >
                  <T
                    variant="small"
                    style={{ fontFamily: F.semi, color: C.teal }}
                  >
                    {o.cost}
                  </T>
                  <T variant="small" style={{ color: C.muted }}>
                    {o.time}
                  </T>
                  <Icon name="external" color={C.teal} size={17} />
                </Row>
              </Pressable>
            </View>
          ))}
        </View>
      )}
      <View style={{ marginTop: 22 }}>
        <Notice>
          Illustrative opportunities only. Organisations, fees, and openings are
          sample content, not verified listings.
        </Notice>
      </View>
    </Screen>
  );
}

import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Header,
  Icon,
  Notice,
  Pill,
  Row,
  Screen,
  SectionTitle,
  T,
  s,
} from "../src/components/ui";
import { C, F } from "../src/theme";
import { pathways, tasks } from "../src/data/model";
import { useDemo } from "../src/state/DemoContext";
export default function NextSteps() {
  const { state, dispatch } = useDemo();
  const [expanded, setExpanded] = useState<string | null>(
    tasks.find((t) => !state.completed.includes(t.id))?.id ?? null,
  );
  const path = pathways.find((p) => p.id === state.activePath)!;
  return (
    <Screen>
      <Header back title="One step at a time" />
      <T variant="heading">Small steps.{"\n"}A different tomorrow.</T>
      <T style={{ color: C.muted, marginTop: 12 }}>
        You don’t need the whole journey figured out. Start with what’s in front
        of you.
      </T>
      <View
        style={{
          backgroundColor: C.mint,
          borderRadius: 20,
          padding: 20,
          marginTop: 23,
          marginBottom: 22,
        }}
      >
        <Row style={{ justifyContent: "space-between" }}>
          <T variant="label" style={{ color: C.teal }}>
            Your first four steps
          </T>
          <Pill bg={C.white}>{state.completed.length} of 4</Pill>
        </Row>
        <Row style={{ gap: 7, marginTop: 16 }}>
          {tasks.map((t) => (
            <View
              key={t.id}
              style={{
                flex: 1,
                height: 6,
                borderRadius: 4,
                backgroundColor: state.completed.includes(t.id)
                  ? C.teal
                  : "#BCD5C6",
              }}
            />
          ))}
        </Row>
        <T variant="small" style={{ color: C.teal, marginTop: 12 }}>
          {state.completed.length === 4
            ? "A strong start. Take a moment to recognise it."
            : "A little progress is still progress."}
        </T>
      </View>
      <Pill icon="path" bg={C.white}>
        {path.label} · {path.title}
      </Pill>
      <SectionTitle title="Make a little room this week" />
      <View style={{ gap: 12 }}>
        {tasks.map((task, i) => {
          const done = state.completed.includes(task.id);
          const open = expanded === task.id;
          return (
            <View
              key={task.id}
              style={{
                backgroundColor: C.white,
                borderRadius: 20,
                padding: 17,
                borderWidth: 1,
                borderColor: open ? C.teal : C.line,
              }}
            >
              <Row style={{ gap: 10, alignItems: "flex-start" }}>
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityLabel={`Mark ${task.title} ${done ? "incomplete" : "complete"}`}
                  accessibilityState={{ checked: done }}
                  onPress={() => dispatch({ type: "task", id: task.id })}
                  style={{
                    width: 48,
                    height: 48,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: -8,
                    marginTop: -6,
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      borderWidth: done ? 0 : 1.5,
                      borderColor: "#A9BEB0",
                      backgroundColor: done ? C.teal : "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {done && <Icon name="check" color={C.white} size={16} />}
                  </View>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${open ? "Collapse" : "Expand"} ${task.title}`}
                  accessibilityState={{ expanded: open }}
                  onPress={() => setExpanded(open ? null : task.id)}
                  style={{ flex: 1, minHeight: 48 }}
                >
                  <T
                    variant="label"
                    style={{
                      color: done ? C.muted : C.ink,
                      textDecorationLine: done ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </T>
                  <Row style={{ gap: 5, marginTop: 6 }}>
                    <Icon name="clock" size={12} color={C.muted} />
                    <T variant="small" style={{ color: C.muted }}>
                      {task.time}
                    </T>
                  </Row>
                </Pressable>
                <Icon
                  name={open ? "down" : "chevron"}
                  color={C.muted}
                  size={17}
                />
              </Row>
              {open && (
                <View
                  style={{
                    paddingTop: 17,
                    borderTopWidth: 1,
                    borderTopColor: C.line,
                    marginTop: 13,
                    gap: 15,
                  }}
                >
                  <T style={{ color: C.muted, fontSize: 13 }}>{task.detail}</T>
                  <T variant="small" style={{ color: C.muted }}>
                    {i === 0
                      ? "Think about stock counts, weekly targets, customer feedback, or reports you already create. Note your examples in your own notebook."
                      : i === 1
                        ? "Browse a sample course and decide whether its subject interests you. You can mark this step complete once you have explored."
                        : i === 2
                          ? `Find two slots that work around your existing responsibilities. Your current plan allows ${state.profile.hours} study hours each week.`
                          : "For example: which products sell best on weekends? One specific question can become your first portfolio project."}
                  </T>
                  {i === 1 && (
                    <Button
                      title="Explore sample courses"
                      variant="secondary"
                      icon="book"
                      onPress={() => router.push("/explore")}
                    />
                  )}
                  <Button
                    title={
                      done ? "Mark as incomplete" : "Mark this step complete"
                    }
                    icon={done ? "reset" : "check"}
                    variant={done ? "secondary" : "primary"}
                    onPress={() => dispatch({ type: "task", id: task.id })}
                  />
                </View>
              )}
            </View>
          );
        })}
      </View>
      {state.completed.length === 4 && (
        <View style={{ marginTop: 24 }}>
          <Notice>
            Your foundation is taking shape. Explore the sample opportunities or
            revisit your pathway when you’re ready.
          </Notice>
          <Button
            title="Explore what’s next"
            icon="arrow"
            style={{ marginTop: 16 }}
            onPress={() => router.push("/explore")}
          />
        </View>
      )}
    </Screen>
  );
}

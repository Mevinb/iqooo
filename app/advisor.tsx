import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
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
  T,
  s,
} from "../src/components/ui";
import { C, F } from "../src/theme";
import { Goal, money, Profile } from "../src/data/model";
import { useDemo } from "../src/state/DemoContext";
type Stage = "goal" | "priority" | "budget" | "time" | "support" | "review";
const questions: Record<
  Exclude<Stage, "review">,
  { title: string; detail: string; options: string[] }
> = {
  goal: {
    title: "What would you like your next chapter to look like?",
    detail:
      "We’ll build on what you already know. Which direction feels interesting?",
    options: ["Data analyst", "Business analyst", "Reporting specialist"],
  },
  priority: {
    title: "What matters most as you make this change?",
    detail: "A plan should make room for the life you already have.",
    options: [
      "Keep my current income",
      "Keep learning affordable",
      "Make time for family",
    ],
  },
  budget: {
    title: "What feels comfortable to invest in learning?",
    detail: "Let’s work with a total budget you can actually live with.",
    options: ["₹60,000 over time", "Up to ₹20,000", "Start small · ₹8,000"],
  },
  time: {
    title: "How much room is there in your week?",
    detail: "Small, consistent steps count. There’s no perfect answer.",
    options: ["8 hours a week", "4 hours a week", "12 hours a week"],
  },
  support: {
    title: "What would make learning easier for you?",
    detail: "Share a preference if you’d like. You don’t need to explain why.",
    options: [
      "Flexible learning hours",
      "Captions and written notes",
      "Step-by-step guidance",
    ],
  },
};
export default function Advisor() {
  const { state, dispatch } = useDemo();
  const [draft, setDraft] = useState<Profile>(() => ({ ...state.profile }));
  const [stage, setStage] = useState<Stage>("goal");
  const [order, setOrder] = useState<Stage[]>([
    "goal",
    "priority",
    "budget",
    "time",
    "support",
    "review",
  ]);
  const [reply, setReply] = useState("");
  const [text, setText] = useState("");
  const [hint, setHint] = useState("");
  const [voice, setVoice] = useState(false);
  const [camera, setCamera] = useState(false);
  const next = (answer: string, skip = false) => {
    let updated = { ...draft };
    let sequence = order;
    if (!skip) {
      if (stage === "goal") updated.goal = answer as Goal;
      if (stage === "priority") {
        updated.earnSoon = false;
        if (answer === "Make time for family") {
          sequence = [
            "goal",
            "priority",
            "time",
            "budget",
            "support",
            "review",
          ];
          setOrder(sequence);
          updated.relocate = false;
        }
      }
      if (stage === "budget")
        updated.budget = answer.includes("60,000")
          ? 60000
          : answer.includes("20,000")
            ? 20000
            : 8000;
      if (stage === "time") updated.hours = parseInt(answer, 10);
      if (stage === "support")
        updated.support = answer.includes("Flexible")
          ? ["Flexible learning"]
          : answer.includes("Captions")
            ? ["Captions & transcripts", "Written instructions"]
            : ["Step-by-step guidance"];
    } else if (stage === "support") updated.support = [];
    setDraft(updated);
    setReply(skip ? "I’d like to skip this for now." : answer);
    setHint("");
    setText("");
    setVoice(false);
    setStage(sequence[sequence.indexOf(stage) + 1] ?? "review");
  };
  const send = () => {
    const input = text.trim().toLowerCase();
    if (!input || stage === "review") return;
    let answer: string | undefined;
    if (stage === "goal")
      answer = input.includes("business")
        ? "Business analyst"
        : input.includes("report")
          ? "Reporting specialist"
          : input.includes("data")
            ? "Data analyst"
            : undefined;
    if (stage === "priority")
      answer = /famil|time|care/.test(input)
        ? "Make time for family"
        : /cost|budget|afford/.test(input)
          ? "Keep learning affordable"
          : /income|earn|job/.test(input)
            ? "Keep my current income"
            : undefined;
    if (stage === "budget")
      answer = /\b(?:60,?000|60k)\b/.test(input)
        ? "₹60,000 over time"
        : /\b(?:20,?000|20k)\b/.test(input)
          ? "Up to ₹20,000"
          : /\b(?:8,?000|8k|small)\b/.test(input)
            ? "Start small · ₹8,000"
            : undefined;
    if (stage === "time")
      answer = /\b12\b/.test(input)
        ? "12 hours a week"
        : /\b8\b/.test(input)
          ? "8 hours a week"
          : /\b4\b/.test(input)
            ? "4 hours a week"
            : undefined;
    if (stage === "support")
      answer = /flex|hour/.test(input)
        ? "Flexible learning hours"
        : /caption|note|written/.test(input)
          ? "Captions and written notes"
          : /step|guid/.test(input)
            ? "Step-by-step guidance"
            : undefined;
    if (answer) next(answer);
    else
      setHint(
        "This demo can explore the choices below. Pick the closest one, or skip this question.",
      );
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Screen
        scrollKey={stage}
        footer={
          stage === "review" ? (
            <Button
              title="See my possible paths"
              icon="arrow"
              onPress={() => {
                dispatch({ type: "profile", profile: draft });
                dispatch({ type: "start" });
                router.replace("/paths");
              }}
            />
          ) : (
            <View>
              <Row style={{ gap: 8 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: C.white,
                    borderWidth: 1,
                    borderColor: C.line,
                    borderRadius: 17,
                    paddingLeft: 15,
                  }}
                >
                  <TextInput
                    accessibilityLabel="Your answer"
                    placeholder="Or tell me in your words…"
                    placeholderTextColor={C.muted}
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={send}
                    returnKeyType="send"
                    style={{
                      flex: 1,
                      minHeight: 51,
                      fontFamily: F.regular,
                      fontSize: 12,
                      color: C.ink,
                      paddingVertical: 12,
                    }}
                  />
                  <IconButton
                    name="send"
                    label="Send answer"
                    color={C.teal}
                    onPress={send}
                  />
                </View>
                <IconButton
                  name={voice ? "pause" : "mic"}
                  label={voice ? "Pause sample voice" : "Try sample voice"}
                  bg={C.teal}
                  color={C.white}
                  onPress={() => setVoice(!voice)}
                />
              </Row>
              <T
                variant="small"
                style={{
                  fontSize: 10,
                  color: C.muted,
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                Simulated advisor · no recording or AI connection
              </T>
            </View>
          )
        }
      >
        <Header
          back
          title="A little space for you"
          right={
            <IconButton
              name="camera"
              label="Preview camera interaction"
              bg={C.faded}
              onPress={() => setCamera(true)}
            />
          }
        />
        <View style={{ alignItems: "center", marginTop: 3, marginBottom: 24 }}>
          <View
            style={{
              width: 116,
              height: 116,
              borderRadius: 60,
              backgroundColor: "#EBF0E5",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#E0E9D9",
            }}
          >
            <View
              style={{
                width: 88,
                height: 88,
                borderRadius: 44,
                backgroundColor: "#D9E6CC",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#CCDBBA",
              }}
            >
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 30,
                  backgroundColor: C.teal,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="sparkle" size={30} color="#EAF2DE" />
              </View>
            </View>
          </View>
          <Row style={{ gap: 6, marginTop: 13 }}>
            <T variant="small" style={{ color: C.teal, fontFamily: F.semi }}>
              Your Pathwise advisor
            </T>
            <Pill bg={C.faded} color={C.muted}>
              Demo
            </Pill>
          </Row>
        </View>
        {!!reply && (
          <View
            style={{
              alignSelf: "flex-end",
              backgroundColor: C.mint,
              paddingHorizontal: 16,
              paddingVertical: 11,
              borderRadius: 16,
              borderBottomRightRadius: 4,
              marginBottom: 22,
              maxWidth: "90%",
            }}
          >
            <T variant="small" style={{ color: C.teal }}>
              {reply}
            </T>
          </View>
        )}
        {stage === "review" ? (
          <FadeIn>
            <T variant="heading">
              There’s a way forward.{"\n"}Let’s find yours.
            </T>
            <T style={{ color: C.muted, marginTop: 12 }}>
              Here’s what we’ll build around. You can change any of this later.
            </T>
            <View
              style={{
                backgroundColor: C.white,
                borderRadius: 20,
                padding: 20,
                gap: 17,
                marginTop: 23,
              }}
            >
              {[
                { icon: "flag", label: "Your next chapter", value: draft.goal },
                {
                  icon: "rupee",
                  label: "Learning budget",
                  value: money(draft.budget),
                },
                {
                  icon: "clock",
                  label: "Your own pace",
                  value: `${draft.hours} hours a week`,
                },
                {
                  icon: "heart",
                  label: "Support that fits",
                  value: draft.support.join(", ") || "Not shared",
                },
              ].map((r) => (
                <Row key={r.label} style={{ gap: 13 }}>
                  <Icon name={r.icon as any} color={C.teal} />
                  <View style={{ flex: 1 }}>
                    <T variant="small" style={{ color: C.muted }}>
                      {r.label}
                    </T>
                    <T variant="label" style={{ marginTop: 3 }}>
                      {r.value}
                    </T>
                  </View>
                </Row>
              ))}
            </View>
            <Button
              title="Revisit my answers"
              variant="ghost"
              onPress={() => {
                setStage("goal");
                setReply("");
              }}
            />
            <Notice>
              We’ll compare three sample routes. There’s no single “right” path,
              and you’re in control of the choice.
            </Notice>
          </FadeIn>
        ) : (
          <FadeIn key={stage}>
            <T variant="heading" style={{ fontSize: 25, lineHeight: 34 }}>
              {questions[stage].title}
            </T>
            <T style={{ color: C.muted, marginTop: 11, marginBottom: 23 }}>
              {questions[stage].detail}
            </T>
            {voice && (
              <View
                style={{
                  backgroundColor: C.deep,
                  padding: 17,
                  borderRadius: 17,
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                <Row style={{ justifyContent: "center", gap: 4, height: 33 }}>
                  {[10, 17, 29, 19, 31, 14, 25, 33, 18, 27, 12, 20, 8].map(
                    (h, i) => (
                      <View
                        key={i}
                        style={{
                          width: 4,
                          height: h,
                          borderRadius: 4,
                          backgroundColor: "#CBE6BB",
                        }}
                      />
                    ),
                  )}
                </Row>
                <T
                  variant="small"
                  style={{ color: "#DCEBDD", textAlign: "center" }}
                >
                  Sample voice: “{questions[stage].options[0]}”
                </T>
                <Button
                  title="Use this sample answer"
                  variant="secondary"
                  onPress={() => next(questions[stage].options[0])}
                />
              </View>
            )}
            <View style={{ gap: 9 }}>
              {questions[stage].options.map((option) => (
                <Choice
                  key={option}
                  title={option}
                  selected={false}
                  onPress={() => next(option)}
                />
              ))}
            </View>
            <Button
              title="Skip this question"
              variant="ghost"
              style={{ marginTop: 6 }}
              onPress={() => next("", true)}
            />
            {!!hint && <Notice>{hint}</Notice>}
            {stage === "goal" && (
              <T
                variant="small"
                style={{
                  color: C.muted,
                  fontSize: 10,
                  textAlign: "center",
                  marginTop: 6,
                }}
              >
                A sample conversation for Priya, a career changer.
              </T>
            )}
          </FadeIn>
        )}
        <Modal
          visible={camera}
          transparent
          animationType="none"
          onRequestClose={() => setCamera(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(12,34,27,.45)",
              justifyContent: "center",
              alignItems: "center",
              padding: 24,
            }}
          >
            <View
              accessibilityViewIsModal
              style={{
                width: "100%",
                maxWidth: 360,
                padding: 24,
                borderRadius: 25,
                backgroundColor: C.white,
                gap: 17,
              }}
            >
              <Row style={{ justifyContent: "space-between" }}>
                <T variant="title">A more personal conversation</T>
              </Row>
              <View
                style={{
                  height: 160,
                  borderRadius: 20,
                  backgroundColor: C.mint,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <Icon name="camera" color={C.teal} size={42} />
                <Pill bg={C.white}>Camera preview placeholder</Pill>
              </View>
              <T style={{ color: C.muted }}>
                In a full app, you could choose to add a camera view. This
                prototype does not use your camera or interpret expressions.
              </T>
              <Button
                title="Continue without camera"
                onPress={() => setCamera(false)}
              />
            </View>
          </View>
        </Modal>
      </Screen>
    </KeyboardAvoidingView>
  );
}

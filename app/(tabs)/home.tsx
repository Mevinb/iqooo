import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Icon,
  IconButton,
  Pill,
  Row,
  Screen,
  SectionTitle,
  T,
} from "../../src/components/ui";
import { useDemo } from "../../src/state/DemoContext";
import { C, F } from "../../src/theme";
import { duration, money, pathways, tasks } from "../../src/data/model";
export default function Home() {
  const { state, dispatch } = useDemo();
  const path = pathways.find((p) => p.id === state.activePath)!;
  const next = tasks.find((t) => !state.completed.includes(t.id));
  return (
    <Screen>
      <Row style={{ justifyContent: "space-between", marginBottom: 25 }}>
        <Row style={{ gap: 11, flex: 1, marginRight: 10 }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open your profile"
            onPress={() => router.push("/profile")}
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              backgroundColor: "#E9DFCE",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <T style={{ fontFamily: F.bold, color: "#756044", fontSize: 15 }}>
              P
            </T>
          </Pressable>
          <View style={{ flex: 1 }}>
            <T variant="small" style={{ color: C.muted }}>
              A little progress, every day.
            </T>
            <T variant="label" style={{ fontSize: 16, marginTop: 2 }}>
              Hello, {state.profile.name}
            </T>
          </View>
        </Row>
        <IconButton
          name="sliders"
          label="Explore what-if changes"
          bg={C.white}
          onPress={() => router.push("/what-if")}
        />
      </Row>
      <T variant="heading" style={{ fontSize: 30, lineHeight: 39 }}>
        A future that{"\n"}fits your life.
      </T>
      <T
        style={{ color: C.muted, marginTop: 8, marginBottom: 22, fontSize: 13 }}
      >
        You don’t have to start from zero.
      </T>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View your active pathway: ${path.title}`}
        onPress={() => router.push(`/pathway/${path.id}`)}
        style={{
          backgroundColor: C.deep,
          borderRadius: 25,
          padding: 22,
          overflow: "hidden",
        }}
      >
        <Row style={{ justifyContent: "space-between", marginBottom: 19 }}>
          <Pill color="#DBF0D7" bg="#315B47" icon="path">
            Your next chapter
          </Pill>
          <Icon name="external" color="#D9E8D9" size={20} />
        </Row>
        <T
          style={{
            fontFamily: F.bold,
            fontSize: 25,
            lineHeight: 33,
            letterSpacing: -0.8,
            color: C.white,
            maxWidth: 270,
          }}
        >
          {path.title}
        </T>
        <T variant="small" style={{ color: "#BCD0C6", marginTop: 8 }}>
          {path.subtitle}
        </T>
        <View
          style={{
            marginTop: 25,
            marginBottom: 19,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {["Your strengths", "New skills", "New chapter"].map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 && (
                <View
                  style={{
                    height: 1,
                    flex: 1,
                    backgroundColor: "#638773",
                    alignSelf: "flex-start",
                    marginTop: 12,
                  }}
                />
              )}
              <View style={{ alignItems: "center", gap: 7, flex: 2 }}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                    borderWidth: i === 0 ? 0 : 1,
                    borderColor: "#729584",
                    backgroundColor: i === 0 ? "#CCE8B5" : "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name={i === 0 ? "check" : i === 1 ? "book" : "flag"}
                    size={12}
                    color={i === 0 ? C.deep : "#C2D5C9"}
                  />
                </View>
                <T
                  style={{ fontSize: 9, color: "#C2D5C9", textAlign: "center" }}
                >
                  {label}
                </T>
              </View>
            </React.Fragment>
          ))}
        </View>
        <Row
          style={{
            borderTopWidth: 1,
            borderTopColor: "#3B5E4E",
            paddingTop: 16,
            justifyContent: "space-between",
          }}
        >
          <Row style={{ gap: 6 }}>
            <Icon name="clock" size={15} color="#C2D5C9" />
            <T variant="small" style={{ color: "#E2ECE5" }}>
              {duration(path, state.profile)} months
            </T>
          </Row>
          <T variant="small" style={{ color: "#E2ECE5" }}>
            {money(path.cost)} est.
          </T>
          <T variant="small" style={{ color: "#CCE8B5", fontFamily: F.semi }}>
            {path.label}
          </T>
        </Row>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Compare Plan A, Plan B and Plan C"
        onPress={() => router.push("/paths")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 17,
        }}
      >
        <Row style={{ gap: 8, flex: 1, marginRight: 8 }}>
          <Icon name="path" size={18} color={C.teal} />
          <T
            variant="small"
            style={{ color: C.teal, fontFamily: F.semi, flexShrink: 1 }}
          >
            One goal. Three possible routes.
          </T>
        </Row>
        <Icon name="arrow" color={C.teal} size={18} />
      </Pressable>
      <SectionTitle
        title="Your next small step"
        link="View all"
        onPress={() => router.push("/next-steps")}
      />
      {next ? (
        <View
          style={{
            backgroundColor: C.white,
            borderRadius: 20,
            padding: 18,
            borderWidth: 1,
            borderColor: C.line,
          }}
        >
          <Row style={{ alignItems: "flex-start", gap: 12 }}>
            <View
              style={{ backgroundColor: C.sand, padding: 11, borderRadius: 13 }}
            >
              <Icon name={next.icon as any} color={C.amber} size={21} />
            </View>
            <View style={{ flex: 1 }}>
              <T variant="label">{next.title}</T>
              <Row style={{ gap: 5, marginTop: 5, flexWrap: "wrap" }}>
                <Icon name="clock" color={C.muted} size={12} />
                <T variant="small" style={{ color: C.muted }}>
                  {next.time} · At your own pace
                </T>
              </Row>
            </View>
          </Row>
          <Button
            title="Take this step"
            variant="secondary"
            icon="arrow"
            style={{ minHeight: 45, marginTop: 17, paddingVertical: 10 }}
            onPress={() => router.push("/next-steps")}
          />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: C.mint,
            padding: 20,
            borderRadius: 20,
            gap: 8,
          }}
        >
          <Icon name="complete" color={C.teal} />
          <T variant="label">Look at the progress you’ve made.</T>
          <T variant="small">
            Your first four steps are complete. Explore opportunities when
            you’re ready.
          </T>
          <Button
            title="Explore opportunities"
            onPress={() => router.push("/explore")}
          />
        </View>
      )}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Talk to your advisor"
        onPress={() => router.push("/advisor")}
        style={{
          backgroundColor: "#E8EDE4",
          borderRadius: 20,
          marginTop: 20,
          padding: 19,
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
        }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 23,
            backgroundColor: "#D2E0C8",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="sparkle" color={C.teal} size={25} />
        </View>
        <View style={{ flex: 1 }}>
          <T variant="label">Let’s think it through.</T>
          <T variant="small" style={{ color: C.muted, marginTop: 3 }}>
            Your advisor is a tap away.
          </T>
        </View>
        <Icon name="arrow" color={C.teal} size={19} />
      </Pressable>
      {state.revision > 0 && (
        <T
          variant="small"
          accessibilityLiveRegion="polite"
          style={{ color: C.teal, marginTop: 16 }}
        >
          Your pathway reflects your latest changes.
        </T>
      )}
      <T
        variant="small"
        style={{
          color: C.muted,
          textAlign: "center",
          fontSize: 10,
          marginTop: 24,
        }}
      >
        Your story, your pace. Sample journey for this prototype.
      </T>
    </Screen>
  );
}

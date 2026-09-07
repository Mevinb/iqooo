import React, { useState } from "react";
import { Modal, Pressable, View } from "react-native";
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
} from "../../src/components/ui";
import { C, F } from "../../src/theme";
import { money } from "../../src/data/model";
import { useDemo } from "../../src/state/DemoContext";
export default function ProfileScreen() {
  const { state, dispatch } = useDemo();
  const [confirm, setConfirm] = useState(false);
  const p = state.profile;
  return (
    <Screen>
      <Header
        title="The person behind the plan"
        subtitle="Your story matters. Every part of it."
      />
      <Row style={{ gap: 17, marginTop: 4, marginBottom: 24 }}>
        <View
          style={{
            width: 68,
            height: 68,
            borderRadius: 23,
            backgroundColor: "#E9DFCE",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <T style={{ fontFamily: F.bold, fontSize: 27, color: "#756044" }}>
            P
          </T>
        </View>
        <View style={{ flex: 1 }}>
          <T variant="heading">{p.name}</T>
          <T variant="small" style={{ color: C.muted, marginTop: 3 }}>
            {p.role}
          </T>
          <Row style={{ gap: 4, marginTop: 5 }}>
            <Icon name="pin" size={13} color={C.muted} />
            <T variant="small" style={{ color: C.muted }}>
              {p.location}
            </T>
          </Row>
        </View>
      </Row>
      <Pill icon="sparkle">A new chapter, on your terms</Pill>
      <SectionTitle title="Where you want to go" />
      <View
        style={{
          padding: 20,
          backgroundColor: C.deep,
          borderRadius: 20,
          gap: 8,
        }}
      >
        <T variant="small" style={{ color: "#C1D3C9" }}>
          Your career goal
        </T>
        <T variant="title" style={{ color: C.white }}>
          {p.goal}
        </T>
        <T variant="small" style={{ color: "#C1D3C9" }}>
          Build on your experience. Keep moving forward.
        </T>
      </View>
      <SectionTitle title="What you bring" />
      <Row style={{ gap: 8, flexWrap: "wrap" }}>
        {p.strengths.length ? (
          p.strengths.map((v) => (
            <Pill key={v} bg={C.white} color={C.ink}>
              {v}
            </Pill>
          ))
        ) : (
          <T style={{ color: C.muted }}>Add strengths whenever you’re ready.</T>
        )}
      </Row>
      <SectionTitle title="Your real-life priorities" />
      <View style={{ gap: 18 }}>
        {[
          {
            icon: "rupee",
            label: "Learning budget",
            value: `${money(p.budget)} total`,
          },
          {
            icon: "clock",
            label: "Time to learn",
            value: `${p.hours} hours a week`,
          },
          {
            icon: "pin",
            label: "Location",
            value: p.relocate ? "Open to relocating" : "Stay near home",
          },
          {
            icon: "briefcase",
            label: "Income",
            value: p.earnSoon
              ? "Explore earlier earning"
              : "Keep earning while learning",
          },
        ].map((item) => (
          <Row key={item.label} style={{ gap: 12 }}>
            <View
              style={{
                padding: 11,
                backgroundColor: C.white,
                borderRadius: 13,
              }}
            >
              <Icon name={item.icon as any} size={19} color={C.teal} />
            </View>
            <View style={{ flex: 1 }}>
              <T variant="small" style={{ color: C.muted }}>
                {item.label}
              </T>
              <T variant="label" style={{ fontSize: 13, marginTop: 2 }}>
                {item.value}
              </T>
            </View>
          </Row>
        ))}
      </View>
      <SectionTitle title="How you learn best" />
      <T variant="small" style={{ color: C.muted, marginBottom: 12 }}>
        Support that helps you thrive. Always your choice to share.
      </T>
      <Row style={{ gap: 8, flexWrap: "wrap" }}>
        {p.support.length ? (
          p.support.map((v) => (
            <Pill key={v} icon="heart">
              {v}
            </Pill>
          ))
        ) : (
          <T variant="small" style={{ color: C.muted }}>
            No support preferences shared.
          </T>
        )}
      </Row>
      <Button
        title="Edit my profile"
        icon="note"
        variant="secondary"
        style={{ marginTop: 28 }}
        onPress={() => router.push("/edit-profile")}
      />
      <View style={{ marginTop: 20 }}>
        <Notice>
          This is Priya’s sample profile. Changes stay in this demo session and
          reset when the app restarts.
        </Notice>
      </View>
      <Button
        title="Reset demo"
        icon="reset"
        variant="ghost"
        style={{ marginTop: 14 }}
        onPress={() => setConfirm(true)}
      />
      <Modal
        visible={confirm}
        transparent
        animationType="none"
        onRequestClose={() => setConfirm(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(12,34,27,.4)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <View
            accessibilityViewIsModal
            style={{
              padding: 25,
              backgroundColor: C.white,
              borderRadius: 24,
              width: "100%",
              maxWidth: 360,
              gap: 15,
            }}
          >
            <T variant="title">Start a fresh chapter?</T>
            <T style={{ color: C.muted }}>
              This resets your demo profile, selected pathway, saved
              opportunities, and completed steps.
            </T>
            <Button
              title="Reset and start over"
              onPress={() => {
                setConfirm(false);
                dispatch({ type: "reset" });
                router.replace("/");
              }}
            />
            <Button
              title="Keep exploring"
              variant="ghost"
              onPress={() => setConfirm(false)}
            />
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

import React from "react";
import { View } from "react-native";
import { router, Redirect } from "expo-router";
import { Button, Icon, Pill, Row, Screen, T } from "../src/components/ui";
import { JourneyArt } from "../src/components/JourneyArt";
import { C, F } from "../src/theme";
import { useDemo } from "../src/state/DemoContext";
export default function Welcome() {
  const { state, dispatch } = useDemo();
  if (state.started) return <Redirect href="/home" />;
  return (
    <Screen
      style={{ paddingTop: 18, paddingBottom: 0 }}
      footer={
        <View style={{ gap: 3 }}>
          <Button
            title="Explore my options"
            icon="arrow"
            onPress={() => router.push("/advisor")}
          />
          <Button
            title="Try the demo"
            variant="ghost"
            onPress={() => {
              dispatch({ type: "start" });
              router.replace("/home");
            }}
          />
          <T
            variant="small"
            style={{ textAlign: "center", color: C.muted, fontSize: 10 }}
          >
            A safe space to explore. No account needed.
          </T>
        </View>
      }
    >
      <Row style={{ gap: 9, marginBottom: 26 }}>
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 11,
            backgroundColor: C.teal,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="path" color={C.white} size={24} />
        </View>
        <T style={{ fontFamily: F.bold, fontSize: 21, letterSpacing: -0.7 }}>
          pathwise
        </T>
        <View style={{ flex: 1 }} />
        <Pill bg={C.faded} color={C.muted}>
          Made for your next
        </Pill>
      </Row>
      <JourneyArt />
      <View style={{ marginTop: 8 }}>
        <T variant="display">Your next chapter{"\n"}starts with you.</T>
        <T
          style={{
            color: C.muted,
            marginTop: 16,
            maxWidth: 310,
            lineHeight: 24,
          }}
        >
          Big ambitions. Real-life responsibilities.{"\n"}Let’s find a way
          forward that fits.
        </T>
      </View>
      <Row style={{ gap: 8, marginTop: 25, marginBottom: 12 }}>
        <Icon name="path" size={17} color={C.teal} />
        <T variant="small" style={{ color: C.teal }}>
          One goal. A plan. And a backup plan.
        </T>
      </Row>
    </Screen>
  );
}

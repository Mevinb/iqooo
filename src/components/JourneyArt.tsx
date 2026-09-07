import React from "react";
import { View } from "react-native";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { C } from "../theme";
import { Icon, Pill, T } from "./ui";
export function JourneyArt({ compact = false }: { compact?: boolean }) {
  return (
    <View
      accessible
      accessibilityLabel="Three possible routes branch from your experience toward a new career"
      style={{
        height: compact ? 168 : 270,
        width: "100%",
        position: "relative",
      }}
    >
      <Svg width="100%" height="100%" viewBox="0 0 350 270">
        <Defs>
          <LinearGradient id="trail" x1="0" y1="1" x2="1" y2="0">
            <Stop offset="0" stopColor="#ABD1BC" />
            <Stop offset="1" stopColor="#116B5A" />
          </LinearGradient>
        </Defs>
        <Circle
          cx="178"
          cy="141"
          r="108"
          fill="none"
          stroke="#DCE8DF"
          strokeWidth="1"
          strokeDasharray="3 8"
        />
        <Circle
          cx="178"
          cy="141"
          r="73"
          fill="none"
          stroke="#E3EDE6"
          strokeWidth="1"
        />
        <Path
          d="M65 235 C65 182 70 170 128 170 C196 170 132 87 208 87 C259 87 274 71 274 35"
          fill="none"
          stroke="#E1EEE5"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <Path
          d="M65 235 C65 182 70 170 128 170 C196 170 132 87 208 87 C259 87 274 71 274 35"
          fill="none"
          stroke="url(#trail)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <Path
          d="M127 170 C200 170 237 182 274 151"
          fill="none"
          stroke="#98B5AA"
          strokeWidth="2"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />
        <Path
          d="M168 120 C110 114 96 85 90 60"
          fill="none"
          stroke="#B7C4C9"
          strokeWidth="2"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />
        <Circle
          cx="65"
          cy="235"
          r="7"
          fill={C.teal}
          stroke="white"
          strokeWidth="3"
        />
        <Circle
          cx="128"
          cy="170"
          r="7"
          fill={C.white}
          stroke={C.teal}
          strokeWidth="3"
        />
        <Circle
          cx="208"
          cy="87"
          r="7"
          fill={C.white}
          stroke={C.teal}
          strokeWidth="3"
        />
        <Circle cx="274" cy="35" r="19" fill={C.teal} />
        <Path
          d="M266 35 L272 41 L282 29"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx="274" cy="151" r="5" fill="#B1C5BA" />
        <Circle cx="90" cy="60" r="5" fill="#C1CDD2" />
      </Svg>
      {!compact && (
        <>
          <View
            style={{
              position: "absolute",
              top: 23,
              left: 5,
              backgroundColor: C.white,
              padding: 12,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: C.line,
            }}
          >
            <Icon name="briefcase" size={20} color={C.teal} />
            <T variant="small" style={{ marginTop: 5 }}>
              Your experience
            </T>
          </View>
          <View style={{ position: "absolute", top: 105, right: 0 }}>
            <Pill bg={C.white} icon="sparkle">
              More than one way
            </Pill>
          </View>
          <View style={{ position: "absolute", bottom: 9, left: 83 }}>
            <T variant="small" style={{ color: C.muted }}>
              You are here. And that’s a start.
            </T>
          </View>
        </>
      )}
    </View>
  );
}

import React from "react";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import { C, F } from "../theme";
import { Icon, Row, T } from "./ui";
export function PreviewShell({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();
  if (Platform.OS !== "web" || width < 800)
    return <View style={{ flex: 1, backgroundColor: C.bg }}>{children}</View>;
  return (
    <View style={styles.stage}>
      <View
        style={[
          styles.intro,
          {
            left: width > 1250 ? "9%" : "5%",
            maxWidth: width > 1400 ? 325 : width > 1250 ? 275 : 230,
          },
        ]}
      >
        <Row style={{ gap: 10, marginBottom: 66 }}>
          <View style={styles.logo}>
            <Icon name="path" color={C.white} size={25} />
          </View>
          <T style={{ fontFamily: F.bold, fontSize: 21, letterSpacing: -0.7 }}>
            pathwise
          </T>
        </Row>
        <T
          style={{
            fontFamily: F.bold,
            fontSize: width > 1400 ? 40 : 34,
            lineHeight: width > 1400 ? 50 : 44,
            letterSpacing: -1.6,
          }}
        >
          A new chapter.{"\n"}A clearer path.
        </T>
        <T
          style={{
            color: C.muted,
            marginTop: 20,
            lineHeight: 25,
            maxWidth: 260,
          }}
        >
          Your ambitions. Your real life.{"\n"}A way forward that fits both.
        </T>
        <View style={{ marginTop: 42, gap: 16 }}>
          <Row style={{ gap: 10 }}>
            <Icon name="path" size={18} color={C.teal} />
            <T variant="small" style={{ color: C.muted }}>
              One goal. More than one way.
            </T>
          </Row>
          <Row style={{ gap: 10 }}>
            <Icon name="heart" size={18} color={C.teal} />
            <T variant="small" style={{ color: C.muted }}>
              Built around you.
            </T>
          </Row>
        </View>
        <T variant="small" style={{ marginTop: 78, color: C.muted }}>
          Interactive mobile prototype
        </T>
      </View>
      <View
        style={[
          styles.device,
          {
            height: Math.min(884, height - 48),
            marginLeft: width < 1150 ? 245 : 0,
          },
        ]}
      >
        <View style={styles.status}>
          <T style={{ fontFamily: F.bold, fontSize: 12 }}>9:41</T>
          <View style={styles.island} />
          <Row style={{ gap: 5 }}>
            <View
              style={{ flexDirection: "row", alignItems: "flex-end", gap: 2 }}
            >
              {[5, 8, 11, 14].map((h) => (
                <View
                  key={h}
                  style={{
                    width: 3,
                    height: h,
                    borderRadius: 1,
                    backgroundColor: C.ink,
                  }}
                />
              ))}
            </View>
            <View
              style={{
                width: 22,
                height: 11,
                borderRadius: 3,
                borderWidth: 1,
                borderColor: C.ink,
                padding: 1,
              }}
            >
              <View
                style={{ backgroundColor: C.ink, flex: 1, borderRadius: 1 }}
              />
            </View>
          </Row>
        </View>
        <View style={{ flex: 1, overflow: "hidden" }}>{children}</View>
        <View
          style={{
            height: 17,
            backgroundColor: C.bg,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 108,
              height: 4,
              borderRadius: 3,
              backgroundColor: C.ink,
            }}
          />
        </View>
      </View>
      {width > 1250 && (
        <View style={styles.aside}>
          <T variant="small" style={{ color: C.teal, fontFamily: F.semi }}>
            A little room to reimagine.
          </T>
          <View
            style={{
              width: 32,
              height: 1,
              backgroundColor: "#BCCFC3",
              marginVertical: 22,
            }}
          />
          <T style={{ color: C.muted, fontSize: 13, lineHeight: 23 }}>
            Meet your advisor.{"\n"}Explore your possibilities.{"\n"}Make your
            next move.
          </T>
          <Row style={{ gap: 7, marginTop: 30 }}>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: C.teal,
              }}
            />
            <T variant="small" style={{ color: C.muted }}>
              Sample data · real interactions
            </T>
          </Row>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  stage: {
    flex: 1,
    backgroundColor: "#E9F0E9",
    justifyContent: "center",
    alignItems: "center",
  },
  intro: { position: "absolute", top: "15%" },
  logo: {
    width: 38,
    height: 38,
    backgroundColor: C.teal,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  device: {
    width: 414,
    backgroundColor: C.bg,
    borderRadius: 43,
    borderWidth: 7,
    borderColor: "#FCFDFC",
    overflow: "hidden",
    boxShadow: "0 30px 80px rgba(23,52,47,0.14), 0 0 0 1px rgba(23,52,47,0.08)",
  },
  status: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    backgroundColor: C.bg,
  },
  island: {
    position: "absolute",
    width: 91,
    height: 23,
    borderRadius: 18,
    backgroundColor: C.ink,
    left: "50%",
    marginLeft: -45,
    top: 3,
  },
  aside: {
    position: "absolute",
    left: "70%",
    width: 215,
    top: "44%",
  },
});

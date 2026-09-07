import React from "react";
import { Platform, Pressable, View } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { C, F } from "../../src/theme";
import { Icon, IconName, T } from "../../src/components/ui";
const labels: Record<string, { label: string; icon: IconName }> = {
  home: { label: "Home", icon: "home" },
  paths: { label: "Paths", icon: "path" },
  explore: { label: "Explore", icon: "compass" },
  profile: { label: "Profile", icon: "user" },
};
export default function TabLayout() {
  const inset = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: C.bg },
      }}
      tabBar={({ state, navigation }) => (
        <View
          style={{
            flexDirection: "row",
            backgroundColor: C.white,
            borderTopColor: C.line,
            borderTopWidth: 1,
            paddingTop: 8,
            paddingBottom:
              Platform.OS === "web" ? 8 : Math.max(inset.bottom, 10),
          }}
        >
          {state.routes.map((route, i) => {
            const item = labels[route.name];
            if (!item) return null;
            const selected = state.index === i;
            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityLabel={item.label}
                accessibilityState={{ selected }}
                onPress={() => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!selected && !event.defaultPrevented)
                    navigation.navigate(route.name);
                }}
                style={{ flex: 1, minHeight: 54, alignItems: "center", gap: 4 }}
              >
                <View
                  style={{
                    width: 54,
                    height: 29,
                    borderRadius: 20,
                    backgroundColor: selected ? C.mint : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name={item.icon}
                    size={22}
                    color={selected ? C.teal : C.muted}
                    weight={selected ? "fill" : "regular"}
                  />
                </View>
                <T
                  variant="small"
                  style={{
                    fontSize: 10,
                    fontFamily: selected ? F.bold : F.medium,
                    color: selected ? C.teal : C.muted,
                  }}
                >
                  {item.label}
                </T>
              </Pressable>
            );
          })}
        </View>
      )}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="paths" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

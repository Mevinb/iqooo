import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { PlusJakartaSans_400Regular } from "@expo-google-fonts/plus-jakarta-sans/400Regular";
import { PlusJakartaSans_500Medium } from "@expo-google-fonts/plus-jakarta-sans/500Medium";
import { PlusJakartaSans_600SemiBold } from "@expo-google-fonts/plus-jakarta-sans/600SemiBold";
import { PlusJakartaSans_700Bold } from "@expo-google-fonts/plus-jakarta-sans/700Bold";
import { DemoProvider } from "../src/state/DemoContext";
import { PreviewShell } from "../src/components/PreviewShell";
import { C } from "../src/theme";
import { WebStyles } from "../src/components/WebStyles";
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Jakarta: PlusJakartaSans_400Regular,
    JakartaMedium: PlusJakartaSans_500Medium,
    JakartaSemi: PlusJakartaSans_600SemiBold,
    JakartaBold: PlusJakartaSans_700Bold,
  });
  if (!loaded && !error)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: C.bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          color={C.teal}
          accessibilityLabel="Loading PATHWISE"
        />
      </View>
    );
  return (
    <SafeAreaProvider>
      <DemoProvider>
        <StatusBar style="dark" />
        <WebStyles />
        <PreviewShell>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: C.bg },
              animation: "none",
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
        </PreviewShell>
      </DemoProvider>
    </SafeAreaProvider>
  );
}

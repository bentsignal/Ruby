import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";

import { Provider } from "~/context/convex-context";
import { useVar } from "~/hooks/use-color";
import { drawerHeightPercentage as loginDrawerHeightPercentage } from "./login";

import "../styles.css";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const backgroundColor = useVar("background");
  const colorScheme = useColorScheme();

  const liquidGlassIsAvailable = isLiquidGlassAvailable();

  useEffect(() => {
    const init = async () => {
      await SystemUI.setBackgroundColorAsync(backgroundColor);
      await SplashScreen.hideAsync();
    };
    void init();
  }, [backgroundColor]);

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(backgroundColor);
  }, [backgroundColor, colorScheme]);

  return (
    <Provider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="login"
            options={{
              presentation:
                Platform.OS === "ios" && liquidGlassIsAvailable
                  ? "formSheet"
                  : "modal",
              sheetAllowedDetents: [loginDrawerHeightPercentage],
              sheetGrabberVisible: true,
              contentStyle: {
                backgroundColor: liquidGlassIsAvailable
                  ? "transparent"
                  : backgroundColor,
              },
            }}
          />
        </Stack>
      </SafeAreaProvider>
      <StatusBar />
    </Provider>
  );
}

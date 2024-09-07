import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

import { initDb } from "@/db/db";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AppProvider } from "@/providers/app";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  React.useEffect(() => {
    const initializeDb = async () => {
      try {
        await initDb();
      } catch (e) {
        console.log("Error initializing database", e);
      }
    };

    initializeDb();
  }, []);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <PaperProvider>
          {/* <RXPThemeProvider> */}
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="productDetails"
              options={{ title: "Product details" }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          {/* </RXPThemeProvider> */}
        </PaperProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

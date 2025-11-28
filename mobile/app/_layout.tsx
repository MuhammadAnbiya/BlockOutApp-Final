import { Colors } from "@/constants/theme";
import { AuthProvider } from "@/lib/useAuth";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    jersey10: require("../assets/fonts/Jersey10-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      <StatusBar translucent={true} backgroundColor={Colors.primary} />
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: Colors.primary,
            },
            animation: "slide_from_right",
            animationDuration: 200,
            freezeOnBlur: true,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen
            name="(auth)"
            options={{ animation: "fade", animationDuration: 300 }}
          />
          <Stack.Screen
            name="(dashboard)"
            options={{ animation: "fade", animationDuration: 50 }}
          />
          <Stack.Screen
            name="(account)"
            options={{
              animation: "slide_from_right",
              animationDuration: 50,
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="(notification)"
            options={{ animation: "fade", animationDuration: 50 }}
          />
          <Stack.Screen
            name="(workout)"
            options={{
              animation: "fade",
              animationDuration: 50,
            }}
          />
          <Stack.Screen
            name="(personalize)"
            options={{
              animation: "fade",
              animationDuration: 50,
            }}
          />
        </Stack>
      </AuthProvider>
    </View>
  );
}

import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Memoize icon component untuk mencegah re-render
const TabBarIcon = React.memo(
  ({
    routeName,
    color,
    focused,
  }: {
    routeName: string;
    color: string;
    focused: boolean;
  }) => {
    if (routeName === "blockout") {
      return (
        <MaterialIcons
          name="block"
          size={24}
          color={color}
          style={{ marginBottom: -2 }}
        />
      );
    }

    let iconName: string = "ellipse-outline";

    switch (routeName) {
      case "avatar":
        iconName = focused ? "person" : "person-outline";
        break;
      case "shop":
        iconName = focused ? "cart" : "cart-outline";
        break;
      case "settings":
        iconName = focused ? "settings" : "settings-outline";
        break;
    }

    return (
      <Ionicons
        name={iconName as any}
        size={24}
        color={color}
        style={{ marginBottom: -2 }}
      />
    );
  }
);

const DashboardLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        lazy: true, // Lazy load tabs
        animation: "shift",
        navigationBarColor: Colors.primary,
        freezeOnBlur: true,
        contentStyle: { backgroundColor: Colors.primary },
        tabBarStyle: {
          backgroundColor: Colors.primary,
          paddingBottom: Platform.OS === "android" ? insets.bottom + 6 : 6,
          paddingTop: 4,
          height: Platform.OS === "android" ? 65 + insets.bottom : 65,
          borderTopWidth: 0,
          elevation: 0,
          position: "absolute",
        },

        tabBarItemStyle: {
          paddingVertical: 0,
        },

        tabBarLabelStyle: {
          marginTop: 4,
          fontSize: 12,
        },

        tabBarActiveTintColor: Colors.tertiary,
        tabBarInactiveTintColor: Colors.quarternary,

        sceneStyle: {
          backgroundColor: Colors.primary,
        },

        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon routeName={route.name} color={color} focused={focused} />
        ),
      })}
    >
      <Tabs.Screen name="blockout" options={{ title: "Blockout" }} />
      <Tabs.Screen name="avatar" options={{ title: "Avatar" }} />
      <Tabs.Screen name="shop" options={{ title: "Shop" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
};

export default React.memo(DashboardLayout);

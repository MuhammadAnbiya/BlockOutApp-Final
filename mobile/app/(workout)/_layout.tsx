import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    if (routeName === "camera") {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: Colors.tertiary,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            shadowColor: Colors.tertiary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Ionicons name="camera" size={28} color="black" />
        </View>
      );
    }

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
  const router = useRouter();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: route.name !== "camera",
        lazy: true,
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
        tabBarItemStyle: { paddingVertical: 0 },
        tabBarLabelStyle: { marginTop: 4, fontSize: 12 },
        tabBarActiveTintColor: Colors.tertiary,
        tabBarInactiveTintColor: Colors.quarternary,
        sceneStyle: { backgroundColor: Colors.primary },
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon routeName={route.name} color={color} focused={focused} />
        ),
      })}
    >
      <Tabs.Screen name="blockout" options={{ title: "Blockout" }} />
      <Tabs.Screen name="avatar" options={{ title: "Avatar" }} />

      <Tabs.Screen
        name="camera"
        options={{
          title: "Camera",
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/(workout)/cv-camera" as any);
          },
        })}
      />

      <Tabs.Screen name="shop" options={{ title: "Shop" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
};

export default React.memo(DashboardLayout);
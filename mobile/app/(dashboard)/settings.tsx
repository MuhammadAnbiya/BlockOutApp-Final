import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Memoize SettingItem component
const SettingItem = React.memo(
  ({
    icon,
    iconLibrary = "ionicons",
    title,
    onPress,
  }: {
    icon: string;
    iconLibrary?: "ionicons" | "simpleline";
    title: string;
    onPress: () => void;
  }) => (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          {iconLibrary === "simpleline" ? (
            <SimpleLineIcons
              name={icon as any}
              size={30}
              color={Colors.quarternary}
            />
          ) : (
            <Ionicons name={icon as any} size={30} color={Colors.quarternary} />
          )}
          <TextStyle variant="h3" color="quarternary">
            {title}
          </TextStyle>
        </View>
        <Ionicons
          name="chevron-forward-sharp"
          size={30}
          color={Colors.quarternary}
        />
      </View>
    </Pressable>
  )
);

const Settings = () => {
  const handleAccountPress = React.useCallback(() => {
    router.push({
      pathname: "/(account)/accountIndex",
    });
  }, []);

  const handleNotificationsPress = React.useCallback(() => {
    router.push({
      pathname: "/(notification)/notification",
    });
  }, []);

  const handleWorkoutPress = React.useCallback(() => {
    router.push({
      pathname: "/(workout)/workoutPreferences",
    });
  }, []);

  const handleWalletPress = React.useCallback(() => {
    router.push({
      pathname: "/(wallet)/walletIndex",
    });
  }, []);

  const handleLogoutPress = React.useCallback(() => {
    // Handle logout press
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary }}
      edges={["top"]}
    >
      <ViewStyle>
        <View
          style={{
            width: "85%",
            height: "100%",
            justifyContent: "flex-start",
            paddingTop: 60,
            paddingBottom: 60,
          }}
        >
          <TextStyle variant="h1" color="tertiary">
            Settings
          </TextStyle>

          <Spacer height={30} />

          <View style={{ width: "100%", rowGap: 20 }}>
            <SettingItem
              icon="person-outline"
              title="Account"
              onPress={handleAccountPress}
            />
            <SettingItem
              icon="notifications-outline"
              title="Notifications"
              onPress={handleNotificationsPress}
            />
            <SettingItem
              icon="barbell-outline"
              title="Workout Preferences"
              onPress={handleWorkoutPress}
            />
            <SettingItem
              icon="wallet-outline"
              title="Wallet Settings"
              onPress={handleWalletPress}
            />
            <SettingItem
              icon="logout"
              iconLibrary="simpleline"
              title="Logout"
              onPress={handleLogoutPress}
            />
          </View>
        </View>
      </ViewStyle>
    </SafeAreaView>
  );
};

export default React.memo(Settings);

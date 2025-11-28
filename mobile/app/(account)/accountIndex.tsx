import Header from "@/components/Header";
import TextStyle from "@/components/TextStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountIndex = () => {
  const handleEditProfilePress = () => {
    // navigate to editProfile inside account group
    router.push("/(account)/editProfile");
  };

  const handleChangePasswordPress = () => {
    // navigate to changePassword inside account group
    router.push("/(account)/changePassword");
  };

  const handleDeleteAccountPress = () => {
    // navigate to deleteAccount inside account group
    router.push("/(account)/deleteAccount");
  };

  const handleBack = React.useCallback(() => {
    // Navigate back to settings tab in dashboard immediately
    router.push("/(dashboard)/settings");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "85%",
            paddingTop: 20,
            height: "100%",
            justifyContent: "flex-start",
          }}
        >
          <Header title="Account" showBack={true} onBack={handleBack} />
          <View style={{ width: "100%", rowGap: 10 }}>
            <Pressable onPress={handleEditProfilePress}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <TextStyle variant="h3" color="quarternary">
                    Edit Profile
                  </TextStyle>
                </View>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={30}
                  color={Colors.quarternary}
                />
              </View>
            </Pressable>

            <Pressable onPress={handleChangePasswordPress}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 15,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextStyle variant="h3" color="quarternary">
                    Change Password
                  </TextStyle>
                </View>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={30}
                  color={Colors.quarternary}
                />
              </View>
            </Pressable>

            <Pressable onPress={handleDeleteAccountPress}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 15,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextStyle variant="h3" color="quarternary">
                    Delete Account
                  </TextStyle>
                </View>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={30}
                  color={Colors.quarternary}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountIndex;

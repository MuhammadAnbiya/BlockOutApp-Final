import Header from "@/components/Header";
import InputStyle from "@/components/InputStyle";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = () => {
  const [oldVisible, setOldVisible] = useState(false);

  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const toggleOldVisible = useCallback(() => setOldVisible((v) => !v), []);
  const toggleNewVisible = useCallback(() => setNewVisible((v) => !v), []);
  const toggleConfirmVisible = useCallback(
    () => setConfirmVisible((v) => !v),
    []
  );

  const handleReset = () => {
    // handle password reset logic here
    router.push("/(auth)/signin");
  };
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
            height: "100%",
            paddingTop: 20,
          }}
        >
          <Header title={"Change Password"} />
          <Spacer height={20} />
          <View>
            <TextStyle variant="h3" color="quarternary">
              Old Password
            </TextStyle>
            <Spacer height={10} />
            <View style={{ position: "relative", width: "100%" }}>
              <InputStyle
                placeholder="Enter old password"
                secureTextEntry={!oldVisible}
                style={{ paddingRight: 44 }}
              />
              <Pressable
                accessibilityLabel={
                  oldVisible ? "Hide password" : "Show password"
                }
                onPress={toggleOldVisible}
                style={{ position: "absolute", right: 8, top: 2, padding: 6 }}
              >
                <Ionicons
                  name={oldVisible ? "eye-outline" : "eye-off-outline"}
                  size={25}
                  color={Colors.quarternary}
                />
              </Pressable>
            </View>
          </View>

          <Spacer height={20} />

          <View>
            <TextStyle variant="h3" color="quarternary">
              New Password
            </TextStyle>
            <Spacer height={10} />
            <View style={{ position: "relative", width: "100%" }}>
              <InputStyle
                placeholder="Enter new password"
                secureTextEntry={!newVisible}
                style={{ paddingRight: 44 }}
              />
              <Pressable
                accessibilityLabel={
                  newVisible ? "Hide password" : "Show password"
                }
                onPress={toggleNewVisible}
                style={{ position: "absolute", right: 8, top: 2, padding: 6 }}
              >
                <Ionicons
                  name={newVisible ? "eye-outline" : "eye-off-outline"}
                  size={25}
                  color={Colors.quarternary}
                />
              </Pressable>
            </View>
          </View>

          <Spacer height={20} />

          <View>
            <TextStyle variant="h3" color="quarternary">
              Confirm New Password
            </TextStyle>
            <Spacer height={10} />
            <View style={{ position: "relative", width: "100%" }}>
              <InputStyle
                placeholder="Confirm new password"
                secureTextEntry={!confirmVisible}
                style={{ paddingRight: 44 }}
              />
              <Pressable
                accessibilityLabel={
                  confirmVisible ? "Hide password" : "Show password"
                }
                onPress={toggleConfirmVisible}
                style={{ position: "absolute", right: 8, top: 2, padding: 6 }}
              >
                <Ionicons
                  name={confirmVisible ? "eye-outline" : "eye-off-outline"}
                  size={25}
                  color={Colors.quarternary}
                />
              </Pressable>
            </View>
          </View>
          <Spacer height={30} />
          <RetroButton title="Save" onPress={handleReset} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

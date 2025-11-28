import Header from "@/components/Header";
import InputStyle from "@/components/InputStyle";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, View } from "react-native";

const ResetPassword = () => {
  const handleResetPassword = useCallback(() => {
    router.push("/signin");
  }, []);

  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const toggleNewVisible = useCallback(() => setNewVisible((v) => !v), []);
  const toggleConfirmVisible = useCallback(
    () => setConfirmVisible((v) => !v),
    []
  );
  return (
    <ViewStyle>
      <View
        style={{
          width: "85%",
          height: "100%",
          paddingTop: 30,
          paddingBottom: 60,
          justifyContent: "flex-start",
        }}
      >
        <Header title="Reset Password" />
        <TextStyle variant="h3" color="tertiary">
          Enter your registered phone number. We&apos;ll send you instructions
          to reset your password
        </TextStyle>

        <Spacer height={30} />
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
              style={{
                position: "absolute",
                right: 8,
                top: 2,
                padding: 6,
              }}
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
              style={{
                position: "absolute",
                right: 8,
                top: 2,
                padding: 6,
              }}
            >
              <Ionicons
                name={confirmVisible ? "eye-outline" : "eye-off-outline"}
                size={25}
                color={Colors.quarternary}
              />
            </Pressable>
          </View>
        </View>

        <View style={{ flex: 1 }}></View>

        <View style={{ width: "100%" }}>
          <RetroButton title="Send" onPress={handleResetPassword} />
        </View>
      </View>
    </ViewStyle>
  );
};

export default React.memo(ResetPassword);

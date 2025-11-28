import { Colors } from "@/constants/theme";
import React from "react";
import { KeyboardAvoidingView, Platform, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenWrapper = ({ style, children, ...props }: ViewProps) => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[
        {
          flex: 1,
          backgroundColor: Colors.primary,
        },
        style,
      ]}
      {...props}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(ScreenWrapper);

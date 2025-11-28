import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";
import React from "react";

const AccountLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.primary,
        },
        animation: "slide_from_right",
        animationDuration: 50,
        freezeOnBlur: true,
      }}
    />
  );
};

export default AccountLayout;

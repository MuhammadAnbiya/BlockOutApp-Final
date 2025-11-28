import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";
import React from "react";

const WalletLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.primary,
        },
        navigationBarColor: Colors.primary,
        animation: "fade",
        animationDuration: 50,
        freezeOnBlur: true,
      }}
    />
  );
};

export default WalletLayout;

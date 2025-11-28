import TextStyle from "@/components/TextStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import AvatarIcon from "../assets/images/avatar.svg";
import CoinIcon from "../assets/images/coin.svg";

const HeaderDashboard = () => {
  const handleAvatarPress = React.useCallback(() => {
    // Handle avatar press logic here
    // navigate directly to the profile screen inside the (account) group
    router.push({ pathname: "/(account)/myProfile" });
  }, []);
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Ionicons name="flame" size={30} color={Colors.tertiary} />
        </View>
        <TextStyle variant="h3" color="quarternary">
          {4} Days
        </TextStyle>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <CoinIcon width={30} height={30} />
        <TextStyle variant="h3" color="quarternary">
          999 XP
        </TextStyle>
      </View>

      <Pressable onPress={handleAvatarPress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <TextStyle variant="h3" color="quarternary">
            {"user123"}
          </TextStyle>
          <AvatarIcon width={50} height={50} />
        </View>
      </Pressable>
    </View>
  );
};

export default HeaderDashboard;

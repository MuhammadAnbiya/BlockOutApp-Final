import Header from "@/components/Header";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MetamaskIcon from "../../assets/images/metamask.svg";

const WalletIndex = () => {
  const handleMetamaskPress = () => {
    router.push({
      pathname: "/(wallet)/metamask",
    });
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
          <Header title="Wallet Settings" showBack={true} />

          <Spacer height={20} />

          <TextStyle variant="body" color="quarternary">
            Connect your wallet to manage your workout rewards and access
            exclusive features
          </TextStyle>

          <Spacer height={40} />

          <Pressable onPress={handleMetamaskPress}>
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
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
              >
                <MetamaskIcon width={40} height={40} />
                <TextStyle variant="h2" color="quarternary">
                  Metamask
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
    </SafeAreaView>
  );
};

export default WalletIndex;

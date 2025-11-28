import InputStyle from "@/components/InputStyle";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Blockout = () => {
  const handleSearch = React.useCallback(() => {
    // Implement search functionality
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary }}
      edges={["top"]}
    >
      <ViewStyle style={{ justifyContent: "flex-start", paddingTop: 60 }}>
        <View style={{ width: "85%", alignItems: "center" }}>
          <TextStyle variant="h1" color="tertiary">
            Select Apps to Block
          </TextStyle>

          <Spacer height={20} />

          <View style={{ position: "relative", width: "100%" }}>
            <InputStyle
              placeholder="Search for an app"
              style={{
                width: "100%",
                backgroundColor: "#393E46",
                borderWidth: 0,
              }}
            />

            <Pressable
              onPress={handleSearch}
              style={{
                position: "absolute",
                right: 10,
                top: 8,
              }}
            >
              <Entypo
                name="magnifying-glass"
                size={24}
                color={Colors.quarternary}
              />
            </Pressable>
          </View>
        </View>
      </ViewStyle>
    </SafeAreaView>
  );
};

export default React.memo(Blockout);

import Header from "@/components/Header";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import SwitchButton from "@/components/SwitchButton";
import TextStyle from "@/components/TextStyle";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PushupIcon from "../../assets/images/pushup.svg";
import SitupIcon from "../../assets/images/situp.svg";
import SquatsIcon from "../../assets/images/squats.svg";

const WorkoutPreferences = () => {
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
          <Header title="Workout Preferences" showBack={true} />

          <Spacer height={30} />

          <View style={{ flexDirection: "column", rowGap: 20 }}>
            <TextStyle variant="h3" color="quarternary">
              Toggle the exercises you want to include in your routine
            </TextStyle>

            <View
              style={{ width: "100%", flexDirection: "column", rowGap: 20 }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 15,
                  borderWidth: 1,
                  borderColor: "#393E46",
                }}
              >
                <View style={{ flex: 1 }} />
                {/* Middle content: name above icon, centered */}
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                  }}
                >
                  <TextStyle variant="h2" color="tertiary">
                    Push Up
                  </TextStyle>
                  <Spacer height={8} />
                  <PushupIcon width={100} height={100} />
                </View>

                {/* Switch aligned to the far right - use flex so center stays centered */}
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingRight: 8,
                  }}
                >
                  <SwitchButton width={50} height={30} />
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 15,
                  borderWidth: 1,
                  borderColor: "#393E46",
                }}
              >
                <View style={{ flex: 1 }} />
                {/* Middle content: name above icon, centered */}
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                  }}
                >
                  <TextStyle variant="h2" color="tertiary">
                    Sit Up
                  </TextStyle>
                  <Spacer height={8} />
                  <SitupIcon width={100} height={100} />
                </View>

                {/* Switch aligned to the far right - use flex so center stays centered */}
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingRight: 8,
                  }}
                >
                  <SwitchButton width={50} height={30} />
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 15,
                  borderWidth: 1,
                  borderColor: "#393E46",
                }}
              >
                <View style={{ flex: 1 }} />
                {/* Middle content: name above icon, centered */}
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                  }}
                >
                  <TextStyle variant="h2" color="tertiary">
                    Squat
                  </TextStyle>
                  <Spacer height={8} />
                  <SquatsIcon width={100} height={100} />
                </View>

                {/* Switch aligned to the far right - use flex so center stays centered */}
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingRight: 8,
                  }}
                >
                  <SwitchButton width={50} height={30} />
                </View>
              </View>
            </View>

            <RetroButton title="Save" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutPreferences;

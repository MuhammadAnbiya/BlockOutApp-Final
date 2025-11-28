import Header from "@/components/Header";
import Spacer from "@/components/Spacer";
import SwitchButton from "@/components/SwitchButton";
import TextStyle from "@/components/TextStyle";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AlertIcon from "../../assets/images/alert.svg";

const Notification = () => {
  const [on, setOn] = useState(false);

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
          <Header title="Notification" showBack={true} />

          <Spacer height={30} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 15,
            }}
          >
            <TextStyle variant="h3" color="tertiary">
              Closing Time & Day Streak
            </TextStyle>
            <SwitchButton
              width={50}
              height={30}
              value={on}
              onValueChange={setOn}
            />
          </View>

          <Spacer height={30} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              width: "100%",
              borderColor: "#393E46",
              borderWidth: 1,
              padding: 15,
              borderRadius: 10,
            }}
          >
            <AlertIcon width={40} height={40} />
            <TextStyle variant="body" color="quarternary">
              Notifications will appear when your screen time is about to end
              and when you successfully reach a day streak{" "}
            </TextStyle>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notification;

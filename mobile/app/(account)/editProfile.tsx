import Header from "@/components/Header";
import InputStyle from "@/components/InputStyle";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useCallback, useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarIcon from "../..//assets/images/avatar.svg";

const EditProfile = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (Platform.OS === "ios") {
        setShowPicker(false);
      }

      if (selectedDate) {
        setDate(selectedDate);
      }
    },
    []
  );
  const handleShowPicker = useCallback(() => {
    setShowPicker(true);
  }, []);

  const dateString = useMemo(() => date.toDateString(), [date]);

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
          <Header title="Edit Profile" showBack={true} />

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                rowGap: 20,
                marginTop: 20,
              }}
            >
              <View style={{ alignSelf: "center" }}>
                <AvatarIcon width={100} height={100} />
                <Spacer height={10} />
                <TextStyle
                  style={{ textAlign: "center" }}
                  variant="h2"
                  color="quarternary"
                >
                  user123
                </TextStyle>
              </View>
              <View style={{ width: "100%" }}>
                <TextStyle variant="h3" color="quarternary">
                  First Name
                </TextStyle>
                <Spacer height={10} />
                <InputStyle placeholder="Thomas" />
              </View>

              <View style={{ width: "100%" }}>
                <TextStyle variant="h3" color="quarternary">
                  Email
                </TextStyle>
                <Spacer height={10} />
                <InputStyle placeholder="Shelby" />
              </View>

              <View style={{ width: "100%" }}>
                <TextStyle
                  style={{
                    alignSelf: "flex-start",
                  }}
                  variant="h3"
                  color="quarternary"
                >
                  Birth of Date
                </TextStyle>
                <Spacer height={10} />
                <Pressable style={{ width: "100%" }} onPress={handleShowPicker}>
                  <InputStyle
                    style={{ width: "100%" }}
                    pointerEvents="none"
                    editable={false}
                    value={dateString}
                  />
                </Pressable>

                {showPicker && Platform.OS !== "web" && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onChange}
                  />
                )}
              </View>

              <View style={{ width: "100%" }}>
                <TextStyle
                  style={{ alignSelf: "flex-start" }}
                  variant="h3"
                  color="quarternary"
                >
                  Phone Number
                </TextStyle>
                <Spacer height={10} />
                <InputStyle
                  placeholder="08123456789"
                  keyboardType="phone-pad"
                />
              </View>

              <RetroButton title="Save" />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(EditProfile);

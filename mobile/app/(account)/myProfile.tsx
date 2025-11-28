import Header from "@/components/Header";
import LineChartComponent from "@/components/LineChartComponent";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarIcon from "../..//assets/images/avatar.svg";

const MyProfile = () => {
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
          <Header title="Profile" showBack={true} />

          <ScrollView
            style={{
              width: "100%",
            }}
            contentContainerStyle={{
              paddingBottom: 40,
            }}
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
              {/* Avatar icon, name, and email */}
              <View>
                <AvatarIcon
                  width={100}
                  height={100}
                  style={{ alignSelf: "center" }}
                />
                <Spacer height={10} />
                <TextStyle
                  style={{ textAlign: "center" }}
                  variant="h2"
                  color="quarternary"
                >
                  user123
                </TextStyle>
                <TextStyle
                  style={{ textAlign: "center" }}
                  variant="h3"
                  color="#393E46"
                >
                  blockout@gmail.com
                </TextStyle>
              </View>

              {/* Day Streak */}
              <View
                style={{
                  width: "100%",
                  padding: 20,
                  backgroundColor: "#222831",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: Colors.quarternary,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Ionicons name="flame" size={60} color={Colors.tertiary} />
                  <TextStyle variant="h1" color="tertiary">
                    15
                  </TextStyle>
                </View>
                <Spacer height={10} />
                <TextStyle variant="h2" color="quarternary">
                  Day Streak
                </TextStyle>
              </View>
              {/* End of Day Streak */}

              {/* Statisctic Chart */}
              <LineChartComponent
                data1={[5, 12, 9, 14, 20, 18, 22]}
                data2={[3, 8, 6, 10, 12, 11, 15]}
                data3={[1, 4, 2, 6, 8, 7, 10]}
              />
              {/* End of Statistic Chart */}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;

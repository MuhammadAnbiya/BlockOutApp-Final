import AvatarIndicatorIcon from "@/assets/images/avatarindicator.svg";
import FloatingPopup from "@/components/FloatingPopup";
import HeaderDashboard from "@/components/HeaderDashboard";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const accessoriesByCategory: Record<string, string[]> = {
  Top: ["Red Cap", "Blue Beanie", "Golden Crown"],
  Shirt: ["Default Tee", "Retro Jacket", "Neon Hoodie"],
  Pants: ["Joggers", "Combat Pants", "Classic Jeans"],
  Bottom: ["Sneakers", "Power Boots", "Cyber Sandals"],
};

const Avatar = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary }}
      edges={["top"]}
    >
      <ViewStyle>
        <View
          style={{
            width: "85%",
            height: "100%",
            paddingTop: 60,
            paddingBottom: 60,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <HeaderDashboard />

          <Spacer height={40} />

          <View
            style={{
              width: "100%",
              flexDirection: "column",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Avatar section */}
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TextStyle variant="h1" color="quarternary">
                user123
              </TextStyle>
              <AvatarIndicatorIcon />
              <Spacer height={10} />
              <Image source={require("@/assets/images/maleavatar.png")} />
            </View>
            {/* End of avatar section */}

            {/* Accesories section */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              {Object.keys(accessoriesByCategory).map((item) => (
                <FloatingPopup
                  key={item}
                  renderTrigger={(open) => (
                    <Pressable
                      onPress={open}
                      style={{
                        flexDirection: "column",
                        gap: 12,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TextStyle variant="body" color={Colors.quarternary}>
                        {item}
                      </TextStyle>
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          borderWidth: 1,
                          borderColor: Colors.quarternary,
                        }}
                      />
                    </Pressable>
                  )}
                  renderContent={(close) => (
                    <View
                      style={{
                        gap: 16,
                        alignItems: "center",
                      }}
                    >
                      <TextStyle variant="h3" color="quarternary">
                        {item}
                      </TextStyle>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: 16,
                        }}
                      >
                        {accessoriesByCategory[item]?.length ? (
                          accessoriesByCategory[item].map((accessory) => (
                            <View
                              key={accessory}
                              style={{
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <View
                                style={{
                                  width: 80,
                                  height: 80,
                                  borderWidth: 1,
                                  borderColor: Colors.quarternary,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <TextStyle
                                  variant="body"
                                  color="quarternary"
                                  style={{ textAlign: "center" }}
                                >
                                  {accessory.split(" ")[0]}
                                </TextStyle>
                              </View>
                              <TextStyle
                                variant="body"
                                color="quarternary"
                                style={{ textAlign: "center", width: 80 }}
                              ></TextStyle>
                            </View>
                          ))
                        ) : (
                          <TextStyle
                            variant="body"
                            color="quarternary"
                            style={{ textAlign: "center", maxWidth: 200 }}
                          >
                            Accessories coming soon.
                          </TextStyle>
                        )}
                      </View>
                      <RetroButton
                        title="Close"
                        onPress={close}
                        style={{ width: 160 }}
                      />
                    </View>
                  )}
                />
              ))}
            </View>
            {/* End of accesories section */}
          </View>
        </View>
      </ViewStyle>
    </SafeAreaView>
  );
};

export default React.memo(Avatar);

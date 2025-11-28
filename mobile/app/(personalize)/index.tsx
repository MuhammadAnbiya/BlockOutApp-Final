import FemaleGenderIcon from "@/assets/images/female.svg";
import { default as FemaleGenderPickedIcon } from "@/assets/images/femalepicked.svg";
import MaleGenderIcon from "@/assets/images/male.svg";
import { default as MaleGenderPickedIcon } from "@/assets/images/malepicked.svg";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ValueSlider from "@/components/ValueSlider";
import { Colors } from "@/constants/theme";
import React, { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Personalize = () => {
  const [selectedGender, setSelectedGender] = useState<"male" | "female">(
    "male"
  );
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(65);
  const isMaleSelected = selectedGender === "male";
  const isFemaleSelected = selectedGender === "female";

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
            paddingTop: 20,
            height: "100%",
            justifyContent: "flex-start",
          }}
        >
          <Spacer height={40} />
          <View style={{ width: "100%", flexDirection: "column", rowGap: 20 }}>
            {/* Title */}
            <View
              style={{
                flexDirection: "column",
                gap: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextStyle variant="h2" color="tertiary">
                Build Your Avatar Base
              </TextStyle>

              <TextStyle variant="body" color="quarternary">
                Set your starting attributes
              </TextStyle>
            </View>
            {/* End of title */}

            {/* Gender section */}
            <View
              style={{ width: "100%", flexDirection: "row", marginTop: 20 }}
            >
              {/* Choose gender section */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <TextStyle variant="h3" color="tertiary">
                  Gender
                </TextStyle>
                <Pressable
                  onPress={() => setSelectedGender("male")}
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {isMaleSelected ? (
                    <MaleGenderPickedIcon width={40} height={40} />
                  ) : (
                    <MaleGenderIcon width={40} height={40} />
                  )}
                  <TextStyle
                    variant="body"
                    color={isMaleSelected ? "quarternary" : "tertiary"}
                  >
                    Male
                  </TextStyle>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedGender("female")}
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {isFemaleSelected ? (
                    <FemaleGenderPickedIcon width={40} height={40} />
                  ) : (
                    <FemaleGenderIcon width={40} height={40} />
                  )}
                  <TextStyle
                    variant="body"
                    color={isFemaleSelected ? "quarternary" : "tertiary"}
                  >
                    Female
                  </TextStyle>
                </Pressable>
              </View>
              {/* End of choose gender section */}

              {/* Avatar gender */}
              <View
                style={{
                  width: 250,
                  height: 300,
                  borderWidth: 1,
                  borderColor: Colors.quarternary,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {selectedGender === "male" ? (
                  <Image
                    source={require("@/assets/images/maleavatar.png")}
                    width={133}
                    height={262}
                  />
                ) : (
                  <Image
                    source={require("@/assets/images/femaleavatar.png")}
                    width={133}
                    height={262}
                  />
                )}
              </View>
              {/* End of avatar gender */}
            </View>
            {/* End of gender section */}

            {/* Body metrics */}
            <View style={{ width: "100%" }}>
              <ValueSlider
                label="Height"
                value={heightCm}
                min={140}
                max={210}
                unit="cm"
                onValueChange={setHeightCm}
              />
              <ValueSlider
                label="Weight"
                value={weightKg}
                min={40}
                max={150}
                unit="kg"
                onValueChange={setWeightKg}
              />
            </View>
            {/* End of body metrics */}

            <RetroButton title="Generate My Base Stats" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Personalize;

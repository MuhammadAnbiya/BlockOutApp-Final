import InputStyle from "@/components/InputStyle";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleIcon from "../../assets/images/google-icon.svg";

const Signin = () => {
  const handleForgotPassword = React.useCallback(() => {
    router.push("/(auth)/forgotPassword");
  }, []);

  const handleSignin = React.useCallback(() => {
    router.push("/(dashboard)/blockout");
  }, []);

  const handleSignup = React.useCallback(() => {
    router.push("/(auth)/signup");
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary }}
      edges={["top", "left", "right"]}
    >
      <ViewStyle>
        <ViewStyle
          style={{
            width: "85%",
          }}
        >
          <TextStyle variant="h1" color="tertiary">
            Blockout
          </TextStyle>
          <Spacer height={10} />
          <TextStyle variant="h3" color="quarternary">
            Enter your email and password to sign in
          </TextStyle>
          <Spacer height={40} />
          <TextStyle
            style={{ alignSelf: "flex-start" }}
            variant="h3"
            color="quarternary"
          >
            Email
          </TextStyle>
          <Spacer height={10} />
          <InputStyle placeholder="blockout@gmail.com" />
          <Spacer height={20} />
          <TextStyle
            style={{ alignSelf: "flex-start" }}
            variant="h3"
            color="quarternary"
          >
            Password
          </TextStyle>
          <Spacer height={10} />
          <InputStyle placeholder="********" />
          <Spacer height={20} />
          <Pressable
            style={{ alignSelf: "flex-end" }}
            onPress={handleForgotPassword}
          >
            <TextStyle variant="body" color="tertiary">
              Forgot Password?
            </TextStyle>
          </Pressable>
          <Spacer height={20} />
          <RetroButton
            style={{ width: "100%" }}
            title="Sign In"
            onPress={handleSignin}
          />
          <Spacer height={20} />
          <TextStyle variant="body" color="quarternary">
            Or
          </TextStyle>
          <Spacer height={20} />
          <Pressable
            style={{
              width: "100%",
              borderColor: Colors.quarternary,
              borderWidth: 1.5,
              paddingVertical: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 8,
              }}
            >
              <GoogleIcon width={24} height={24} />
              <TextStyle
                style={{ textAlign: "center", marginLeft: 8 }}
                variant="h3"
                color="quarternary"
              >
                Sign In with Google
              </TextStyle>
            </View>
          </Pressable>
          <Spacer height={20} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextStyle variant="body" color="quarternary">
              Don&apos;t have an account?{" "}
            </TextStyle>
            <Pressable onPress={handleSignup}>
              <TextStyle variant="body" color="tertiary">
                Sign Up
              </TextStyle>
            </Pressable>
          </View>
          <Spacer height={20} />
          <RetroButton
            title="Personalize"
            onPress={() => router.push("/(personalize)")}
          />
        </ViewStyle>
      </ViewStyle>
    </SafeAreaView>
  );
};

export default React.memo(Signin);

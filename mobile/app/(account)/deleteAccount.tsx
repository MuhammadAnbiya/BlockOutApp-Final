import Header from "@/components/Header";
import TextStyle from "@/components/TextStyle";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarIcon from "../../assets/images/avatar.svg";

const DeleteAccount = () => {
  const handleDelete = React.useCallback(() => {
    // Handle delete account logic here
  }, []);
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
          <Header title="Delete Account" showBack={true} />

          <View>
            <View
              style={{
                marginTop: 20,
                alignItems: "center",
                gap: 10,
                flexDirection: "row",
              }}
            >
              <AvatarIcon width={40} height={40} />
              <TextStyle variant="h3">{"user123"}</TextStyle>
            </View>
            <View
              style={{ marginTop: 30, flexDirection: "column", rowGap: 10 }}
            >
              <TextStyle variant="h3" color="tertiary">
                About delete account
              </TextStyle>
              <TextStyle variant="body" color="quarternary">
                You&apos;re about start teh progress of deleting your BlockOut
                account. All your profile data and progress activities will no
                longer accessable on BlockOut application.
              </TextStyle>
            </View>
          </View>

          <View style={{ marginTop: 30, flexDirection: "column", rowGap: 10 }}>
            <TextStyle variant="h3" color="tertiary">
              Something else you should know
            </TextStyle>
            <TextStyle variant="body" color="quarternary">
              You can re-register using your email that is currently registered
              if you want to return to using BlockOut.
            </TextStyle>
          </View>

          <View style={{ flex: 1 }}></View>
          <Pressable
            onPress={handleDelete}
            style={{ alignSelf: "center", marginBottom: 30 }}
          >
            <TextStyle variant="h3" color="#FF0000">
              Continue Deleting Account
            </TextStyle>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteAccount;

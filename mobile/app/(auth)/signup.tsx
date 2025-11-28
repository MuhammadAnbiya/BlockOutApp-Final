import InputStyle from "@/components/InputStyle";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/lib/useAuth";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  const { register, loading, error } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const convertDate = useCallback((value: string) => {
    const [day, month, year] = value.split("/");
    if (
      !day ||
      !month ||
      !year ||
      day.length !== 2 ||
      month.length !== 2 ||
      year.length !== 4
    ) {
      return "";
    }
    return `${year}-${month}-${day}`;
  }, []);

  const isFormComplete = useMemo(
    () =>
      Boolean(
        firstName.trim() &&
          lastName.trim() &&
          email.trim() &&
          phoneNumber.trim() &&
          password.trim() &&
          convertDate(date)
      ),
    [convertDate, date, email, firstName, lastName, password, phoneNumber]
  );

  const handleSignup = useCallback(async () => {
    if (!isFormComplete) {
      setLocalError("Please complete all fields with valid values.");
      return;
    }

    setLocalError(null);

    try {
      await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
        phoneNumber: phoneNumber.trim(),
        birthDate: convertDate(date),
      });
      router.push("/(auth)/signin");
    } catch (err) {
      setLocalError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    }
  }, [
    convertDate,
    date,
    email,
    firstName,
    isFormComplete,
    lastName,
    password,
    phoneNumber,
    register,
  ]);

  const handleSignin = useCallback(() => {
    router.push("/(auth)/signin");
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary }}
      edges={["top", "bottom"]}
    >
      <ViewStyle>
        <ViewStyle style={{ width: "85%" }}>
          <TextStyle variant="appTitle" color="tertiary">
            Signup
          </TextStyle>

          <Spacer height={20} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextStyle variant="h3" color="quarternary">
              Already have an account?
            </TextStyle>

            <Pressable style={{ marginLeft: 5 }} onPress={handleSignin}>
              <TextStyle variant="h3" color="tertiary">
                Sign in
              </TextStyle>
            </Pressable>
          </View>

          <Spacer height={20} />

          <View style={{ width: "100%", flexDirection: "row", columnGap: 15 }}>
            <View style={{ flex: 1 }}>
              <TextStyle variant="h3" color="quarternary">
                First Name
              </TextStyle>
              <Spacer height={10} />
              <InputStyle
                placeholder="Thomas"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={{ flex: 1 }}>
              <TextStyle variant="h3" color="quarternary">
                Last Name
              </TextStyle>
              <Spacer height={10} />
              <InputStyle
                placeholder="Shelby"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <Spacer height={20} />

          <TextStyle
            style={{ alignSelf: "flex-start" }}
            variant="h3"
            color="quarternary"
          >
            Email
          </TextStyle>

          <Spacer height={10} />

          <InputStyle
            placeholder="blockout@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextStyle
            style={{ alignSelf: "flex-start", marginTop: 20 }}
            variant="h3"
            color="quarternary"
          >
            Phone Number
          </TextStyle>

          <Spacer height={10} />

          <InputStyle
            placeholder="+628123456789"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <TextStyle
            style={{ alignSelf: "flex-start", marginTop: 20 }}
            variant="h3"
            color="quarternary"
          >
            Birth of Date
          </TextStyle>

          <Spacer height={10} />

          <InputStyle
            style={{ width: "100%" }}
            placeholder="DD/MM/YYYY"
            keyboardType="numeric"
            maxLength={10}
            value={date}
            onChangeText={(text) => {
              const cleaned = text.replace(/[^0-9]/g, "");
              const day = cleaned.slice(0, 2);
              const month = cleaned.slice(2, 4);
              const year = cleaned.slice(4, 8);

              let formatted = "";

              if (cleaned.length > 0) {
                formatted = day;
              }

              if (cleaned.length >= 3) {
                formatted = `${day}/${month}`;
              }

              if (cleaned.length >= 5) {
                formatted = `${day}/${month}/${year}`;
              }

              setDate(formatted);
            }}
          />

          <TextStyle
            style={{ alignSelf: "flex-start", marginTop: 20 }}
            variant="h3"
            color="quarternary"
          >
            Set Password
          </TextStyle>

          <Spacer height={10} />

          <InputStyle
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Spacer height={30} />

          <RetroButton
            style={{ width: "100%" }}
            title={loading ? "Loading..." : "Sign up"}
            onPress={handleSignup}
          />

          {(localError || error) && (
            <TextStyle
              variant="h4"
              color="#be1a1aff"
              style={{ marginTop: 16, textAlign: "center" }}
            >
              {localError || error}
            </TextStyle>
          )}
        </ViewStyle>
      </ViewStyle>
    </SafeAreaView>
  );
};

export default React.memo(Signup);

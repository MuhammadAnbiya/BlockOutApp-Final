import { Colors } from "@/constants/theme";
import React, { useCallback, useMemo, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import TextStyle from "./TextStyle";

// 1. Kita definisikan tipe data untuk Props
interface RetroButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  buttonColor?: string;
  buttonTextColor?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>; // Supaya bisa menerima custom style dari luar
}

const RetroButton: React.FC<RetroButtonProps> = ({
  title = "Log In",
  onPress,
  buttonColor = Colors.tertiary,
  buttonTextColor = Colors.quarternary,
  borderColor = "transparent",
  style,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = useCallback(() => setIsPressed(true), []);
  const handlePressOut = useCallback(() => setIsPressed(false), []);

  const buttonStyle = useMemo(
    () => [
      styles.buttonLayer,
      { backgroundColor: buttonColor },
      // apply border only when provided
      borderColor ? { borderWidth: 1, borderColor } : {},
      isPressed && styles.buttonPressed,
    ],
    [buttonColor, buttonTextColor, isPressed]
  );

  return (
    <View style={[styles.container, style]}>
      {/* Layer Bayangan Hitam (Shadow) - visible on web and native (elevation on Android) */}
      <View style={styles.shadowLayer} />

      {/* Layer Tombol Utama */}
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={buttonStyle}
      >
        <TextStyle variant="h3" color={buttonTextColor}>
          {title}
        </TextStyle>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowLayer: {
    position: "absolute",
    top: 8,
    left: 8,
    right: -8,
    bottom: -8,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    // Make shadow visible on Android via elevation and ensure stacking
    elevation: 6,
    zIndex: 0,
    opacity: 0.25,
  },
  buttonLayer: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    zIndex: 1,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  buttonPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
  },
  container: {
    position: "relative",
    width: "100%",
  },
});

export default React.memo(RetroButton);

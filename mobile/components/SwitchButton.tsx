import { Colors } from "@/constants/theme";
import React, { useEffect, useRef, useState } from "react";
import {
  AccessibilityState,
  Animated,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  value?: boolean;
  onValueChange?: (val: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
}

const SwitchButton: React.FC<Props> = ({
  value: controlledValue,
  onValueChange,
  disabled = false,
  style,
  width = 50,
  height = 28,
}) => {
  const [internal, setInternal] = useState<boolean>(!!controlledValue);
  const isControlled = typeof controlledValue === "boolean";
  const value = isControlled ? (controlledValue as boolean) : internal;

  const knobSize = height - 6;
  const translateXOn = width - knobSize - 6; // 3px padding each side

  const animation = useRef(
    new Animated.Value(value ? translateXOn : 3)
  ).current;

  useEffect(() => {
    const toValue = value ? translateXOn : 3;
    Animated.timing(animation, {
      toValue,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [value, animation, translateXOn]);

  const toggle = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const accessibilityState: AccessibilityState = { disabled, checked: value };

  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={accessibilityState}
      style={style}
    >
      <View
        style={{
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: "#2C2C2C",
          justifyContent: "center",
          padding: 3,
        }}
      >
        <Animated.View
          style={{
            width: knobSize,
            height: knobSize,
            borderRadius: knobSize / 2,
            backgroundColor: Colors.tertiary,
            transform: [{ translateX: animation }],
            elevation: 2,
          }}
        />
      </View>
    </Pressable>
  );
};

export default React.memo(SwitchButton);

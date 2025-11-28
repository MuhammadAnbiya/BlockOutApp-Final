import Slider from "@react-native-community/slider";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import TextStyle from "@/components/TextStyle";
import { Colors } from "@/constants/theme";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  step?: number;
  onValueChange: (value: number) => void;
};

const ValueSlider = ({
  label,
  value,
  min,
  max,
  unit,
  step = 1,
  onValueChange,
}: Props) => {
  const formattedValue = useMemo(() => {
    const rounded = Math.round(value);
    return unit ? `${rounded} ${unit}` : String(rounded);
  }, [value, unit]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextStyle variant="h2" color={Colors.tertiary}>
          {label}
        </TextStyle>
        <TextStyle variant="h2" color={Colors.tertiary}>
          {formattedValue}
        </TextStyle>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          minimumTrackTintColor={Colors.tertiary}
          maximumTrackTintColor="#3A3F47"
          thumbTintColor={Colors.tertiary}
          onValueChange={onValueChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderContainer: {
    paddingVertical: 12,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});

export default React.memo(ValueSlider);

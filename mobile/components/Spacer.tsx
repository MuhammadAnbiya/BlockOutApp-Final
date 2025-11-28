import React from "react";
import { View, ViewStyle } from "react-native";

type SpacerProps = {
  width?: number | string;
  height?: number | string;
};

const Spacer = ({ width = "100%", height = 40 }: SpacerProps) => {
  return <View style={{ width, height } as ViewStyle} />;
};

export default React.memo(Spacer);

import { Colors } from "@/constants/theme";
import React from "react";
import { View, ViewProps } from "react-native";

const ViewStyle = ({ style, ...props }: ViewProps) => {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: Colors.primary,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      {...props}
    />
  );
};

export default React.memo(ViewStyle);

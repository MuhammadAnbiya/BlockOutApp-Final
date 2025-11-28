import { Colors, FontSizes, GlobalStyles } from "@/constants/theme";
import React from "react";
import { TextInput, TextInputProps } from "react-native";

const InputStyle = ({ style, ...props }: TextInputProps) => {
  return (
    <TextInput
      placeholderTextColor={Colors.secondary}
      style={[
        {
          width: "100%",
          paddingVertical: 12,
          paddingLeft: 16,
          borderWidth: 1.5,
          borderColor: Colors.quarternary,
          color: Colors.quarternary,
          fontSize: FontSizes.body,
          fontFamily: GlobalStyles.fontRegular,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default React.memo(InputStyle);

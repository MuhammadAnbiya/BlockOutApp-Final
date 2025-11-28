import { Colors, FontSizes, GlobalStyles } from "@/constants/theme";
import React, { useMemo } from "react";
import { TextStyle as RNTextStyle, Text, TextProps } from "react-native";

type Variant = "appTitle" | "h1" | "h2" | "h3" | "h4" | "body";

type ColorKey = keyof typeof Colors;

interface Props extends TextProps {
  variant?: Variant;
  /**
   * color can be either a key from `Colors` (e.g. 'button'|'text') or a raw color string like '#ff0' or 'rgba(0,0,0,0.5)'
   */
  color?: ColorKey | string;
  style?: RNTextStyle | RNTextStyle[];
}

const TextStyle = ({
  variant = "body",
  color,
  style,
  children,
  ...props
}: Props) => {
  const textStyle = useMemo(() => {
    const fontSize = (FontSizes as any)[variant] ?? FontSizes.body;

    // Resolve color: if `color` matches a Colors key use that, otherwise treat it as a raw color string.
    let colorValue: string = Colors.quarternary;
    if (color) {
      // If the provided color is one of the keys of Colors, map it
      if (
        typeof color === "string" &&
        (Colors as Record<string, string>)[color]
      ) {
        colorValue = (Colors as Record<string, string>)[color];
      } else if (typeof color === "string") {
        colorValue = color;
      }
    }

    return {
      fontFamily: GlobalStyles.fontRegular,
      color: colorValue,
      fontSize,
      lineHeight: fontSize * 1.2,
    };
  }, [variant, color]);

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export default React.memo(TextStyle);

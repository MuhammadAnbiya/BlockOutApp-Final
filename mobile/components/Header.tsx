import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import TextStyle from "./TextStyle";

interface HeaderProps {
  title?: string;
  /** show back button (defaults to true) */
  showBack?: boolean;
  style?: ViewStyle;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = "",
  showBack = true,
  style,
  onBack,
}) => {
  const router = useRouter();

  const handleBack = React.useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }
    // Prefer router.back when there is history
    if (router.canGoBack()) {
      router.back();
      return;
    }
    // Fallback: use a relative navigation to go "up" one segment.
    // This handles cases where the same route was pushed twice and router.back()
    // doesn't navigate as expected; if that fails, as a last resort replace to root.
    try {
      router.push("..");
    } catch {
      router.replace("/");
    }
  }, [onBack, router]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.side}>
        {showBack && (
          <Pressable
            onPress={handleBack}
            accessibilityLabel="Back"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            android_ripple={undefined}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Ionicons name="arrow-back" size={28} color={Colors.tertiary} />
          </Pressable>
        )}
      </View>

      <View style={styles.center}>
        <TextStyle variant="h2" color="tertiary">
          {title}
        </TextStyle>
      </View>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    backgroundColor: Colors.primary,
  },
  side: {
    width: 48,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backButton: {
    borderRadius: 20,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
});

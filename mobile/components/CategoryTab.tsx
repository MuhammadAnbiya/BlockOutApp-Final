import { FontSizes, GlobalStyles } from "@/constants/theme";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface CategoryTabProps {
  tabs?: string[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
  activeColor?: string;
  inactiveColor?: string;
  textColor?: string;
  activeTextColor?: string;
  containerStyle?: ViewStyle;
  children?: (activeTab: string) => React.ReactNode;
}

const CategoryTab: React.FC<CategoryTabProps> = ({
  tabs = ["Top", "Shirt", "Pants", "Bottom"],
  defaultTab,
  onTabChange,
  activeColor = "#00bfa5",
  inactiveColor = "#1e1e2e",
  textColor = "#fff",
  activeTextColor = "#fff",
  containerStyle,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(
    defaultTab && tabs.includes(defaultTab) ? defaultTab : tabs[0]
  );

  useEffect(() => {
    if (!defaultTab) return;
    if (tabs.includes(defaultTab)) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, tabs]);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => handleTabPress(tab)}
              style={[
                styles.btn,
                {
                  borderColor: isActive ? activeColor : textColor,
                  backgroundColor: isActive ? activeColor : inactiveColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: isActive ? activeTextColor : textColor,
                  },
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Render children langsung — tidak pakai useMemo */}
      {children && <View style={styles.content}>{children(activeTab)}</View>}
    </View>
  );
};

export default React.memo(CategoryTab);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 40,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  btn: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: GlobalStyles.fontRegular,
    fontSize: FontSizes.h4,
  },
  content: {
    width: "100%",
    marginTop: 16,
  },
});

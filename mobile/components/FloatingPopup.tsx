import React, { ReactNode, useCallback, useState } from "react";
import { Modal, Pressable, StyleSheet, View, ViewStyle } from "react-native";

import { Colors } from "@/constants/theme";

interface FloatingPopupProps {
  renderTrigger: (open: () => void) => ReactNode;
  renderContent: (close: () => void) => ReactNode;
  popupStyle?: ViewStyle;
  overlayColor?: string;
  closeOnBackdropPress?: boolean;
  animationType?: "none" | "slide" | "fade";
}

const DEFAULT_OVERLAY = "rgba(110, 115, 123, 0.5)";

const FloatingPopup = ({
  renderTrigger,
  renderContent,
  popupStyle,
  overlayColor = DEFAULT_OVERLAY,
  closeOnBackdropPress = true,
  animationType = "fade",
}: FloatingPopupProps) => {
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  return (
    <>
      {renderTrigger(open)}
      <Modal
        transparent
        visible={visible}
        animationType={animationType}
        onRequestClose={close}
      >
        <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={() => {
              if (closeOnBackdropPress) {
                close();
              }
            }}
          />
          <View style={[styles.popup, popupStyle]}>{renderContent(close)}</View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "80%",
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.quarternary,
  },
});

export default React.memo(FloatingPopup);

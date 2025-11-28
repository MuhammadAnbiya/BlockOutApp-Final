import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
// Pastikan path ini sesuai dengan lokasi icon koin Anda
import CoinIcon from "@/assets/images/coin.svg";
import { Colors, FontSizes, GlobalStyles } from "@/constants/theme";

interface ShopItemCardProps {
  name: string;
  price: number;
  /**
   * Komponen Icon/Gambar utama barang.
   * Bisa berupa SVG component atau Image tag.
   */
  icon: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

const ShopItemCard = ({
  name,
  price,
  icon,
  onPress,
  style,
}: ShopItemCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed, // Efek visual saat ditekan
        style,
      ]}
    >
      {/* Bagian Icon Barang */}
      <View style={styles.iconContainer}>{icon}</View>

      {/* Nama Barang */}
      <Text style={styles.nameText}>{name}</Text>

      {/* Bagian Harga */}
      <View style={styles.priceContainer}>
        {/* Menggunakan icon koin yang sudah Anda miliki */}
        <CoinIcon width={20} height={20} />
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </Pressable>
  );
};

export default React.memo(ShopItemCard);

const styles = StyleSheet.create({
  container: {
    width: 140, // Lebar fixed atau bisa pakai '48%' jika pakai flexWrap
    height: 160,
    backgroundColor: Colors.primary, // Warna background kartu (gelap)
    borderWidth: 1,
    borderColor: "#393E46", // Warna border sedikit lebih terang
    borderRadius: 8, // Sedikit rounded di ujung
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 8, // Jarak antar elemen vertikal
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: "#25253A",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  nameText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: FontSizes.body,
    textAlign: "center",
    fontFamily: GlobalStyles.fontRegular,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6, // Jarak antara icon koin dan angka
  },
  priceText: {
    color: "#FFFFFF",
    fontSize: FontSizes.h3,
    fontWeight: "bold",
    fontFamily: GlobalStyles.fontRegular,
  },
});

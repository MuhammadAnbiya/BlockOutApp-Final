import CategoryTab from "@/components/CategoryTab";
import HeaderDashboard from "@/components/HeaderDashboard";
import ShopItemCard from "@/components/ShopItemCard";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Shop = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary }}
      edges={["top"]}
    >
      <ViewStyle>
        <View
          style={{
            width: "85%",
            height: "100%",
            paddingTop: 60,
            paddingBottom: 60,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <HeaderDashboard />

          <Spacer height={30} />

          <CategoryTab
            tabs={["All", "Top", "Shirt", "Pants", "Bottom"]}
            defaultTab="All"
            activeColor={Colors.tertiary}
            textColor={Colors.quarternary}
          >
            {(activeTab) => (
              <View>
                <TextStyle variant="h2" color="tertiary">
                  Showing data for: {activeTab}
                </TextStyle>
                {/* Render konten sesuai tab aktif */}
                {activeTab === "All" && (
                  <ShopItemCard
                    name="Cap Hat"
                    price={1500}
                    icon={
                      <Ionicons name="book-outline" width={60} height={60} />
                    }
                    onPress={() => {}}
                  />
                )}
                {activeTab === "Top" && (
                  <TextStyle>Menampilkan data top </TextStyle>
                )}
                {activeTab === "Shirt" && (
                  <TextStyle>Menampilkan data shirt</TextStyle>
                )}
                {activeTab === "Pants" && (
                  <TextStyle>Menampilkan data pants</TextStyle>
                )}
                {activeTab === "Bottom" && (
                  <TextStyle>Menampilkan data bottom</TextStyle>
                )}
              </View>
            )}
          </CategoryTab>
        </View>
      </ViewStyle>
    </SafeAreaView>
  );
};

export default React.memo(Shop);

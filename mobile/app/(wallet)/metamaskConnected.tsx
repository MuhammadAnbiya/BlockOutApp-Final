import Header from "@/components/Header";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import { Colors } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MetamaskIcon from "../../assets/images/metamask.svg";

const WALLET_STORAGE_KEY = "metamask:walletAddress";

const MetamaskConnected = () => {
  const params = useLocalSearchParams<{ address?: string | string[] }>();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const resolveAddress = async () => {
      const paramAddress = Array.isArray(params.address)
        ? params.address[0]
        : params.address;

      if (paramAddress && isMounted) {
        setAddress(paramAddress);
        await AsyncStorage.setItem(WALLET_STORAGE_KEY, paramAddress);
        return;
      }

      const stored = await AsyncStorage.getItem(WALLET_STORAGE_KEY);
      if (stored && isMounted) {
        setAddress(stored);
      }
    };

    resolveAddress();

    return () => {
      isMounted = false;
    };
  }, [params.address]);

  const shortAddress = useMemo(() => {
    if (!address) {
      return "";
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  const handleDisconnect = useCallback(async () => {
    await AsyncStorage.removeItem(WALLET_STORAGE_KEY);
    setAddress(null);
    router.replace("/(wallet)/metamask");
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary }}
      edges={["top", "bottom"]}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "85%",
            height: "100%",
            paddingTop: 20,
          }}
        >
          <Header />

          <View
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Spacer height={100} />
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.quarternary,
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                paddingHorizontal: 100,
                paddingVertical: 10,
              }}
            >
              <MetamaskIcon width={100} height={100} />
              <TextStyle variant="h2" color="tertiary">
                Metamask
              </TextStyle>
              <TextStyle variant="body" color="quarternary">
                {address ? `Connected as ${shortAddress}` : "No wallet linked"}
              </TextStyle>
            </View>
            <RetroButton
              title="Disconnect"
              onPress={handleDisconnect}
              style={{ width: "100%" }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MetamaskConnected;

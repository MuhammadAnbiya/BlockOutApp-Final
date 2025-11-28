import "@ethersproject/shims";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import Header from "@/components/Header";
import RetroButton from "@/components/RetroButton";
import Spacer from "@/components/Spacer";
import TextStyle from "@/components/TextStyle";
import { Colors } from "@/constants/theme";
import Fontisto from "@expo/vector-icons/Fontisto";
import { MetaMaskProvider, useSDK } from "@metamask/sdk-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAddress } from "ethers";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NativeModules, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MetamaskIcon from "../../assets/images/metamask.svg";

const WALLET_STORAGE_KEY = "metamask:walletAddress";

const sdkOptions = {
  dappMetadata: {
    name: "BlockOut App",
    url: "https://blockout.app",
    iconUrl: "https://blockout.app/icon.png",
    scheme: "blockout",
  },
};

const MetamaskContent = () => {
  const [checked, setChecked] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { provider, sdk, account } = useSDK();

  const persistAddress = useCallback(async (address: string | null) => {
    if (!address) {
      await AsyncStorage.removeItem(WALLET_STORAGE_KEY);
      return;
    }
    await AsyncStorage.setItem(WALLET_STORAGE_KEY, address);
  }, []);

  const getAccounts = useCallback(async (): Promise<string[]> => {
    if (!provider) {
      return [];
    }

    try {
      const accounts = (await provider.request({
        method: "eth_accounts",
      })) as string[];
      return accounts ?? [];
    } catch (error) {
      console.warn("Failed to fetch MetaMask accounts", error);
      return [];
    }
  }, [provider]);

  const connectWallet = useCallback(async () => {
    if (!sdk) {
      setErrorMessage("MetaMask provider is unavailable");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const accounts = (await sdk.connect()) ?? [];

      if (!accounts || accounts.length === 0) {
        throw new Error("MetaMask did not return any accounts");
      }

      const normalizedAddress = getAddress(accounts[0]);
      await persistAddress(normalizedAddress);
      setWalletAddress(normalizedAddress);

      router.push({
        pathname: "/(wallet)/metamaskConnected",
        params: { address: normalizedAddress },
      });
    } catch (error: unknown) {
      console.warn("MetaMask connection failed", error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to connect wallet");
      }
    } finally {
      setIsLoading(false);
    }
  }, [sdk, persistAddress]);

  const handleConnectPress = useCallback(() => {
    if (!checked) {
      setErrorMessage("Please accept the Terms of Use first.");
      return;
    }

    if (walletAddress) {
      router.push({
        pathname: "/(wallet)/metamaskConnected",
        params: { address: walletAddress },
      });
      return;
    }

    connectWallet();
  }, [checked, connectWallet, walletAddress]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const cachedAddress = await AsyncStorage.getItem(WALLET_STORAGE_KEY);
        if (cachedAddress && isMounted) {
          setWalletAddress(cachedAddress);
        }

        if (provider) {
          const accounts = await getAccounts();
          if (accounts && accounts.length > 0 && isMounted) {
            const normalized = getAddress(accounts[0]);
            setWalletAddress(normalized);
            await persistAddress(normalized);
          }
        }
      } catch (error) {
        console.warn("Failed to load cached MetaMask address", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [getAccounts, provider, persistAddress]);

  useEffect(() => {
    if (!account) {
      setWalletAddress(null);
      persistAddress(null).catch((error) =>
        console.warn("Failed to clear stored wallet", error)
      );
      return;
    }

    try {
      const normalized = getAddress(account);
      setWalletAddress(normalized);
      persistAddress(normalized).catch((error) =>
        console.warn("Failed to persist wallet", error)
      );
    } catch (error) {
      console.warn("Failed to normalize MetaMask account", error);
    }
  }, [account, persistAddress]);

  const isConnected = Boolean(walletAddress);

  const shortAddress = useMemo(() => {
    if (!walletAddress) {
      return null;
    }

    return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  }, [walletAddress]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
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

          <Spacer height={40} />

          <View
            style={{ flexDirection: "column", alignItems: "center", gap: 20 }}
          >
            <TextStyle variant="h2" color="tertiary">
              Let&apos;s get started
            </TextStyle>
            <TextStyle
              variant="body"
              color="quarternary"
              style={{ textAlign: "center" }}
            >
              Trusted by millions, MetaMask is a secure wallet making the world
              of web3 accessible to all
            </TextStyle>
            <MetamaskIcon width={100} height={100} />
            {shortAddress ? (
              <TextStyle variant="body" color="tertiary">
                Connected as {shortAddress}
              </TextStyle>
            ) : null}
            <Pressable
              onPress={() => setChecked((c) => !c)}
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 15,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Fontisto
                  name={checked ? "checkbox-active" : "checkbox-passive"}
                  color={Colors.tertiary}
                  size={24}
                />
              </View>

              <TextStyle variant="body" color="quarternary">
                I agree to MetaMask&apos;s{" "}
                <Pressable>
                  <TextStyle variant="body" color="tertiary">
                    Terms of use
                  </TextStyle>
                </Pressable>
              </TextStyle>
            </Pressable>

            <RetroButton
              title={
                isLoading
                  ? "Connecting..."
                  : isConnected
                  ? "Open Connected Wallet"
                  : "Connect Wallet"
              }
              onPress={!checked || isLoading ? undefined : handleConnectPress}
              style={{
                width: "100%",
                opacity: !checked || isLoading ? 0.6 : 1,
              }}
            />
            <RetroButton
              title="Import an existing wallet"
              buttonTextColor="tertiary"
              buttonColor={Colors.quarternary}
              borderColor={Colors.tertiary}
            />
            {errorMessage ? (
              <TextStyle
                variant="body"
                color="tertiary"
                style={{ textAlign: "center" }}
              >
                {errorMessage}
              </TextStyle>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Metamask = () => {
  const isMetaMaskNativeModuleAvailable = Boolean(
    NativeModules?.MetaMaskSdk?.initialize
  );

  if (!isMetaMaskNativeModuleAvailable) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
          }}
        >
          <TextStyle
            variant="h3"
            color="tertiary"
            style={{ textAlign: "center" }}
          >
            MetaMask SDK native module is unavailable.
          </TextStyle>
          <Spacer height={16} />
          <TextStyle
            variant="body"
            color="quarternary"
            style={{ textAlign: "center" }}
          >
            Build a custom Expo dev client or run a prebuilt app so the MetaMask
            SDK native module is linked, then reopen this screen.
          </TextStyle>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <MetaMaskProvider sdkOptions={sdkOptions}>
      <MetamaskContent />
    </MetaMaskProvider>
  );
};

export default Metamask;

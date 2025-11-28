import TextStyle from "@/components/TextStyle";
import ViewStyle from "@/components/ViewStyle";
import { Colors } from "@/constants/theme";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/signin"); // arahkan ke halaman login
    }, 2500); // 2.5 detik

    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary }}
      edges={["top", "bottom"]}
    >
      <ViewStyle>
        <TextStyle>Percobaan</TextStyle>
        <Link href="/(auth)/signin">Signin</Link>
        <Link href="/(auth)/signup">Signup</Link>
      </ViewStyle>
    </SafeAreaView>
  );
}

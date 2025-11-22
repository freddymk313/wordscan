// app/index.tsx
import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/camera"); // redirection après splash
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Image
        source={require("../assets/logo.png")} // change avec ton logo
        className="w-40 h-40"
        resizeMode="contain"
      />
      <Text className="text-xl font-semibold mt-4 text-gray-700">
        Hand2Word
      </Text>
    </View>
  );
}

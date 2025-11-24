// app/index.tsx
import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/home"); // redirection après splash
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 items-center justify-center">
      <View className="flex-row items-center">
        <Image
          source={require("./../assets/logo/logo.png")}
          className="w-20 h-20 dark:bg-white rounded-full"
          resizeMode="contain"
        />
        <Text className="text-4xl ml-1 font-bold dark:text-white">ordscan</Text>
      </View>
    </View>
  );
}

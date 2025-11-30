import { useColorScheme } from "@/hooks/use-color-scheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="px-6 py-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={require("./../../assets/logo/logo.png")}
              className="w-14 h-14 dark:bg-white rounded-full border-none"
              resizeMode="contain"
            />
            <Text className="text-3xl ml-1 font-bold dark:text-white">ordscan</Text>
          </View>

          <AntDesign name="moon" size={22} color={isDark ? "white" : "dark"} className="mx-1" />
        </View>

        <View className="gap-6 flex-row items-center justify-around py-64">
          <Pressable onPress={() => router.push("/camera")}>
            <View className="block p-14 border border-gray-400/80 dark:border-gray-300/60 rounded-3xl items-center justify-center">
              <Entypo name="camera" size={52} color={isDark ? 'white' : 'black'} />
              <Text className="text-base mt-2 font-bold dark:text-white">Camera</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => console.log("Gallerie pressed!")}>
            <View className="block p-14 border border-gray-400/80 rounded-3xl items-center justify-center">
              <Entypo name="image" size={52} color={isDark ? 'white': 'black'} />
              <Text className="text-base mt-2 font-bold dark:text-white">Gallerie</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

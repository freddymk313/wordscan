import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function home() {
  // const colorScheme = useColorScheme()
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  // const toggleTheme = () => {
  //   const newTheme = isDark ? "light" : "dark";
  //   setColorScheme(newTheme);

  //   console.log(`theme changer a : ${newTheme}`);
  // };

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
          <Pressable onPress={() => console.log("Camera pressed!")}>
            <View className="block p-14 border border-gray-400/80 dark:border-gray-300/60 rounded-3xl items-center justify-center">
              <Entypo name="camera" size={52} color={isDark ? 'white' : 'black'} />
              <Text className="text-base mt-2 font-bold">Camera</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => console.log("Gallerie pressed!")}>
            <View className="block p-14 border border-gray-400/80 rounded-3xl items-center justify-center">
              <Entypo name="image" size={52} color="black" />
              <Text className="text-base mt-2 font-bold">Gallerie</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

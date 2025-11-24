import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function home() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={require("./../../assets/logo/logo.png")}
              className="w-14 h-14"
              resizeMode="contain"
            />
            <Text className="text-3xl ml-1 font-bold">ordscan</Text>
          </View>

          <AntDesign name="moon" size={22} color="black" className="mx-1" />
        </View>

        <View className="gap-6 flex-row items-center justify-around py-64">
          <Pressable onPress={() => console.log("Camera pressed!")}>
            <View className="block p-14 border border-gray-400/80 rounded-3xl items-center justify-center">
              <Entypo name="camera" size={52} color="black" />
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

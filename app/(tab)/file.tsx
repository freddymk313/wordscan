import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function file() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 =py-6">
        <View className="flex-row py-6 items-center justify-between">
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

        <ScrollView className="gap-6 h-full pb-8">
          <Text className="text-2xl my-2">Tous les documents</Text>

          <View className="gap-4">
            <Pressable onPress={() => console.log("doc pressed!")}>
              <View className="block py-3 px-4 flex-row items-center border gap-4 border-gray-400/80 rounded-xl">
                {/* <Image /> */}
                <View className="h-12 w-12 border border-gray-500"></View>

                <View className="flex-1">
                  <View>
                    <Text className="text-[17px] mt-2 font-bold">
                      Luna's Short formula.pdf
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm">Nov 11 00:27</Text>
                    <Text className="text-sm font-semibold">200KB</Text>
                  </View>
                </View>
              </View>
            </Pressable>

            <Pressable onPress={() => console.log("doc pressed!")}>
              <View className="block py-3 px-4 flex-row items-center border gap-4 border-gray-400/80 rounded-xl">
                {/* <Image /> */}
                <View className="h-12 w-12 border border-gray-500"></View>

                <View className="flex-1">
                  <View>
                    <Text className="text-[17px] mt-2 font-bold">
                      Luna's Short formula.pdf
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm">Nov 11 00:27</Text>
                    <Text className="text-sm font-semibold">200KB</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

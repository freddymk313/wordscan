import { View, Text } from "react-native";
import React from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from "react-native-safe-area-context";

export default function home() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-bold">Wordscan</Text>
          <AntDesign name="moon" size={22} color="black" />
        </View>

        <View>
          <View>

          </View>

          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

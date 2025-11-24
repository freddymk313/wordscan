import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function home() {
  return (
    <SafeAreaView className="bg-white">
      <View>
        <Text>home</Text>
      </View>
    </SafeAreaView>
  );
}

import { useColorScheme } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Directory, Paths, File } from "expo-file-system";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openWithExternalApp } from "./openWithExternalApp";

export default function FileList() {
  const isDark = useColorScheme() === "dark";

  const [docs, setDocs] = useState<File[]>([]);

  async function loadFiles() {
    try {
      const dir = new Directory(Paths.document);
      const items = dir.list();

      const filtered = items.filter(
        (item) =>
          item instanceof File &&
          (item.name.toLowerCase().endsWith(".pdf") ||
            item.name.toLowerCase().endsWith(".docx"))
      ) as File[];

      setDocs(filtered);
    } catch (err) {
      console.warn("Error reading document directory:", err);
      setDocs([]);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="px-6 py-6">
        <View className="flex-row py-6 items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={require("./../../assets/logo/logo.png")}
              className="w-14 h-14 dark:bg-white rounded-full"
              resizeMode="contain"
            />
            <Text className="text-3xl ml-1 font-bold dark:text-white">
              ordscan
            </Text>
          </View>

          <AntDesign name="moon" size={22} color={isDark ? "white" : "black"} />
        </View>

        <ScrollView className="gap-6 h-full pb-8">
          <Text className="text-2xl my-2 dark:text-white">Tous les documents</Text>

          <View className="gap-4">
            {docs.length === 0 ? (
              <Text className="text-sm dark:text-white">Aucun document trouvé</Text>
            ) : (
              docs.map((file, index) => (
                <Pressable key={index} onPress={() => openWithExternalApp(file.uri)}>
                  <View className="py-3 px-4 flex-row items-center border gap-4 border-gray-400/80 dark:border-gray-300/50 rounded-xl">
                    <View className="h-12 w-12 border border-gray-500 rounded-lg bg-gray-200/30 items-center justify-center">
                      <Text>{file.name.endsWith(".pdf") ? "PDF" : "DOC"}</Text>
                    </View>

                    <View className="flex-1">
                      <Text className="text-lg font-bold dark:text-white">
                        {file.name}
                      </Text>
                      <Text className="text-sm dark:text-white">Tap to open</Text>
                    </View>
                  </View>
                </Pressable>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

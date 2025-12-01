import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PreviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const imagesParam = params.images as string | undefined;

  const [uris, setUris] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!imagesParam) return;
    try {
      const parsed = JSON.parse(imagesParam);
      if (Array.isArray(parsed)) setUris(parsed);
    } catch (e) {
      console.warn('preview: invalid images param', e);
    }
  }, [imagesParam]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 items-center justify-center">
        <Pressable onPress={() => router.back()} className="absolute top-10 right-6 z-50">
          <Text className="text-white text-lg font-bold">Fermer</Text>
        </Pressable>

        {uris.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-white">Aucune image sélectionnée</Text>
          </View>
        ) : (
          <>
            <View className="flex-1 items-center justify-center w-full px-4">
              <Image
                source={{ uri: uris[currentIndex] }}
                className="w-full h-3/4 rounded-2xl border-2 border-blue-100"
                resizeMode="contain"
              />
            </View>

            <View className="h-32 w-full mb-8">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
                {uris.map((u, idx) => (
                  <TouchableOpacity key={u + idx} onPress={() => setCurrentIndex(idx)} className="mr-3">
                    <Image
                      source={{ uri: u }}
                      className={`w-20 h-[75px] rounded-md border ${idx === currentIndex ? 'border-2 border-blue-200' : ''}`}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View className="bottom-10 w-full px-6">
              <TouchableOpacity
                className="bg-blue-500 flex-row justify-center px-6 py-3.5 rounded-full items-center"
                onPress={() => {
                  // Logique pour finaliser ou partager les images
                }}
              >
                <Text className="text-white font-bold">Creer le document</Text>
                {/* <View ml-2>
                    <FontAwesome6 name="angle-right" size={13} color="white" />
                </View> */}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

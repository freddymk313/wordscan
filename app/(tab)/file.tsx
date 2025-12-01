import React, { useEffect, useState } from 'react';
import { useColorScheme, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Directory, Paths, File } from 'expo-file-system';

function openWithExternalApp(uri: string) {
  // Implement this with your preferred linking / viewer logic.
  // FileSystem docs just provide the uri; how you open it is up to your app.
}

export default function FileList() {
  const isDark = useColorScheme() === 'dark';
  const [docs, setDocs] = useState<File[]>([]);

  async function loadFiles() {
    try {
      // Directory instance pointing to the app's documents directory
      const dir = new Directory(Paths.document);

      // list() returns (File | Directory)[]
      const items = dir.list();

      // Keep only File instances that end with .pdf or .docx
      const filtered = items.filter(
        (item) =>
          item instanceof File &&
          (item.name.toLowerCase().endsWith('.pdf') ||
            item.name.toLowerCase().endsWith('.docx'))
      ) as File[];

      setDocs(filtered);
    } catch (err) {
      console.warn('Error reading document directory:', err);
      setDocs([]);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#111827' : '#ffffff' }}>
      <View style={{ paddingHorizontal: 24, paddingVertical: 24 }}>
        <View style={{ flexDirection: 'row', paddingVertical: 24, alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('./../../assets/logo/logo.png')}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: isDark ? '#ffffff' : 'transparent',
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 24,
                marginLeft: 4,
                fontWeight: 'bold',
                color: isDark ? '#ffffff' : '#000000',
              }}
            >
              ordscan
            </Text>
          </View>

          <AntDesign name="moon" size={22} color={isDark ? 'white' : 'black'} />
        </View>

        <ScrollView style={{ height: '100%', paddingBottom: 32 }}>
          <Text
            style={{
              fontSize: 20,
              marginVertical: 8,
              color: isDark ? '#ffffff' : '#000000',
            }}
          >
            Tous les documents
          </Text>

          <View style={{ gap: 16 }}>
            {docs.length === 0 ? (
              <Text style={{ fontSize: 14, color: isDark ? '#ffffff' : '#000000' }}>
                Aucun document trouvé
              </Text>
            ) : (
              docs.map((file, index) => (
                <Pressable key={index} onPress={() => openWithExternalApp(file.uri)}>
                  <View
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderRadius: 16,
                      borderColor: isDark ? 'rgba(209,213,219,0.5)' : 'rgba(156,163,175,0.8)',
                      gap: 16,
                    }}
                  >
                    <View
                      style={{
                        height: 48,
                        width: 48,
                        borderWidth: 1,
                        borderColor: '#6b7280',
                        borderRadius: 8,
                        backgroundColor: 'rgba(229,231,235,0.3)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text>
                        {file.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'DOC'}
                      </Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: isDark ? '#ffffff' : '#000000',
                        }}
                      >
                        {file.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: isDark ? '#ffffff' : '#000000',
                        }}
                      >
                        Tap to open
                      </Text>
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

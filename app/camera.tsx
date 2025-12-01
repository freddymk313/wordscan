// app/(tab)/camera.tsx
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import { Button, Platform, Text, TouchableOpacity, View } from "react-native";
import "../global.css"; // NativeWind
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

// Use the new `CameraView` + `useCameraPermissions` API from `expo-camera`.

export default function CameraScreen() {
  const cameraRef = useRef<any>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const isWeb = Platform.OS === "web";
  // UX: stay on Expo; no mute-confirm requirement.

  // expo-camera hook for permissions
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');

  const takePhoto = async () => {
    if (isWeb) {
      // On web, open the image picker (file dialog / camera if available).
      try {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
        });
        if (!result.canceled) {
          const uri = result.assets?.[0]?.uri ?? (result as any).uri;
          if (uri) {
            setCapturedPhotos([...capturedPhotos, uri]);
            console.log("Photo capturée (web) :", uri);
          }
        }
      } catch (e) {
        // Fallback to library if camera isn't available on web
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
        });
        if (!result.canceled) {
          const uri = result.assets?.[0]?.uri ?? (result as any).uri;
          if (uri) {
            setCapturedPhotos([...capturedPhotos, uri]);
            console.log("Photo sélectionnée (web) :", uri);
          }
        }
      }
      return;
    }

    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhotos([...capturedPhotos, photo.uri]);
      console.log("Photo capturée :", photo.uri);
    }
  };

  const goNext = () => {
    console.log("Toutes les images :", capturedPhotos);
    // Ici tu peux naviguer vers OCR / génération Word
  };

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">Demande d'autorisation…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900 px-6">
        <Text className="text-white mb-4 text-center">We need your permission to show the camera</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      {!isWeb ? (
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />
      ) : (
        // On web we can't rely on a native preview; show a placeholder and
        // let the capture button launch the file/camera picker.
        <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
          <Text className="text-white">Web camera not available — use the capture button</Text>
        </View>
      )}

      {/* Aperçu des photos prises en miniatures (optionnel) */}
      {/* {capturedPhotos.length > 0 && (
        <View className="absolute bottom-20 left-4 bg-black/50 px-2 py-1 rounded">
          <Text className="text-white font-bold text-lg">
            {capturedPhotos.length}
          </Text>
        </View>
      )} */}

      {/* Barre des boutons en bas */}
      <View className="absolute bottom-4 w-full flex-row justify-around items-center p-8">
        {/* Compteur en bas gauche */}
        <View className="flex items-start py-3 px-4 border border-gray-50 rounded-2xl bg-black/50">
          <Text className="text-white text-lg font-bold">
            {capturedPhotos.length}
          </Text>
        </View>

        {/* Bouton capture au centre */}
        <TouchableOpacity
          className="w-24 h-24 bg-white rounded-full items-center justify-center *border-2 border-gray-300"
          onPress={takePhoto}
        >
          {/* <Text className="text-black font-bold text-lg">📸</Text> */}
        </TouchableOpacity>

        {/* Bouton suivant / OK à droite */}
        <TouchableOpacity
          className="*flex-1 items-end bg-blue-500 px-5 py-3.5 rounded-full"
          onPress={goNext}
        >
          {/* <Text className="text-white font-bold">Suivant</Text> */}
          <FontAwesome6 name="angle-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

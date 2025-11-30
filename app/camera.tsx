// app/(tab)/camera.tsx
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import "../global.css"; // NativeWind

// Some bundlers or module resolutions can make the imported `Camera` be a module
// namespace object instead of the component itself (it may live at `.Camera` or
// `.default`). Resolve the actual component at runtime and fall back to the
// imported value. Keep types loose to avoid repeating the previous TypeScript
// conflicts.
const CameraComponent: React.ComponentType<any> =
  // (Camera as any).Camera for cases where the module exports a namespace
  // object containing the component.
  (Camera as any).Camera ??
  // (Camera as any).default for cases where the default export is provided.
  (Camera as any).default ??
  // Otherwise use the imported value directly.
  (Camera as any);

export default function CameraScreen() {
  const cameraRef = useRef<any>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
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

  if (hasPermission === null) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">Demande d'autorisation…</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">Pas d’accès à la caméra</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraComponent ref={cameraRef} type="back" className="flex-1" />

      {/* Aperçu des photos prises en miniatures (optionnel) */}
      {capturedPhotos.length > 0 && (
        <View className="absolute bottom-20 left-4 bg-black/50 px-2 py-1 rounded">
          <Text className="text-white font-bold text-lg">{capturedPhotos.length}</Text>
        </View>
      )}

      {/* Barre des boutons en bas */}
      <View className="absolute bottom-4 w-full flex-row justify-around items-center px-8">
        {/* Compteur en bas gauche */}
        <View className="flex-1 items-start">
          <Text className="text-white text-lg font-bold">{capturedPhotos.length}</Text>
        </View>

        {/* Bouton capture au centre */}
        <TouchableOpacity
          className="w-20 h-20 bg-white rounded-full items-center justify-center border-4 border-gray-300"
          onPress={takePhoto}
        >
          <Text className="text-black font-bold text-lg">📸</Text>
        </TouchableOpacity>

        {/* Bouton suivant / OK à droite */}
        <TouchableOpacity
          className="flex-1 items-end bg-blue-500 px-4 py-3 rounded-lg"
          onPress={goNext}
        >
          <Text className="text-white font-bold">Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

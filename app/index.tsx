// src/app/index.tsx
import React, { useRef, useState, useEffect } from "react";
import { View, Button, TouchableOpacity, Text, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export default function IndexScreen() {
  const cameraRef = useRef<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      console.log("Photo prise :", photo.uri);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
      console.log("Image choisie :", result.assets[0].uri);
    }
  };

  const finish = () => {
    // Ici tu peux appeler ta fonction d’OCR ou aller à l’écran suivant
    console.log("Finir avec l’image :", photoUri);
    // ex. navigation.navigate('OCR', { image: photoUri });
  };

  if (hasPermission === null) {
    return <View className="flex‑1 items‑center justify‑center"><Text>Demande d’autorisation…</Text></View>;
  }
  if (hasPermission === false) {
    return <View className="flex‑1 items‑center justify‑center"><Text>Pas d’accès à la caméra</Text></View>;
  }

  return (
    <View className="flex‑1 bg‑black">
      <Camera
        ref={cameraRef}
        type={type}
        className="flex‑1"
      />
      {/* Aperçu de la photo sélectionnée ou prise */}
      {photoUri && (
        <Image source={{ uri: photoUri }} className="absolute top‑0 left‑0 w‑full h‑full opacity‑40" />
      )}
      <View className="absolute bottom‑0 w‑full p‑4 bg‑black/50 flex‑row justify‑space‑around">
        <TouchableOpacity className="p‑4 bg‑white rounded" onPress={takePhoto}>
          <Text className="text‑black">Prendre photo</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p‑4 bg‑white rounded" onPress={pickFromGallery}>
          <Text className="text‑black">Galerie</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p‑4 bg‑blue‑500 rounded" onPress={finish}>
          <Text className="text‑white">OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

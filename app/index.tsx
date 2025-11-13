import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function IndexScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
      console.log("Image choisie :", result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // CameraView ne fournit pas takePictureAsync directement, il faudrait utiliser Camera ou un autre composant
    alert("Photo capture feature à implémenter avec expo-camera ou un autre module");
  };

  const finish = () => {
    console.log("Terminer avec l'image :", photoUri);
    // Ici tu pourrais naviguer vers OCR / Word generation
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} />
      
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.preview} />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickFromGallery}>
          <Text style={styles.text}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={finish}>
          <Text style={styles.text}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  message: { textAlign: 'center', paddingBottom: 10 },
  camera: { flex: 1 },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  button: { flex: 1, alignItems: 'center', marginHorizontal: 4 },
  text: { fontSize: 16, fontWeight: 'bold', color: 'white' },
});

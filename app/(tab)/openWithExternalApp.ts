import * as IntentLauncher from "expo-intent-launcher";
import { Platform, Linking } from "react-native";

export async function openWithExternalApp(uri: string) {
  try {
    if (Platform.OS === "android") {
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: uri,
        flags: 1,
        type: uri.endsWith(".pdf") 
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
    } else {
      // iOS : utilise le menu d'ouverture standard
      await Linking.openURL(uri);
    }
  } catch (err) {
    console.log("Erreur ouverture :", err);
  }
}

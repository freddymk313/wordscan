// app/(tab)/_layout.tsx
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // tu peux mettre false si tu ne veux pas le header
        // tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
        // tabBarStyle: { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="file"
        options={{
          title: "Documents",
          tabBarLabel: "Files",
        }}
      />
    </Tabs>
  );
}

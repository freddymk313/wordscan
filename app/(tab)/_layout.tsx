// app/(tab)/_layout.tsx
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007bff",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          height: 90,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <Octicons name="home-fill" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="file"
        options={{
          title: "Documents",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="folder" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// app/(tab)/_layout.tsx
import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0A66C0',
        // tabBarStyle: { backgroundColor: 'white', height: 60 },
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

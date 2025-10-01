import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="bike-list" options={{ title: 'Bikes' }} />
        <Stack.Screen name="bike-detail/[id]" options={{ title: 'Bike Detail' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
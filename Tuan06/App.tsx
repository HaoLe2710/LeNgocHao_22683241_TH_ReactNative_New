import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './components/DrawerNavigator';
import { FavoritesProvider } from './contexts/FavoritesContext';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <FavoritesProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <DrawerNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </FavoritesProvider>
  );
}


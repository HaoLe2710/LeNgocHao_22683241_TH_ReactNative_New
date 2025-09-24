import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductColorChoosingScreen from './pages/ProductColorChoosingScreen';
import { Product } from './models/Product';
import ProductDetailScreen from './pages/ProductDetailScreen';

export type RootProps = {
  "Home" : undefined
  "Detail": Product
}

const Stack = createNativeStackNavigator<RootProps>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ProductColorChoosingScreen}/>
          <Stack.Screen name="Detail" component={ProductDetailScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


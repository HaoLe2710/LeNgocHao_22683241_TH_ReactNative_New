import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductColorChoosingScreen from './pages/ProductColorChoosingScreen';
import { Product } from './models/Product';
import ProductDetailScreen from './pages/ProductDetailScreen';
import { ProductFetch } from './models/ProductFetch';
import ProducFetchtDetailScreen from './pages/ProductFetchDetailScreen';
import ProductFetchChoosingScreen from './pages/ProductFetchChoosingScreen';

export type RootProps = {
  "Home" : undefined
  "Detail": ProductFetch
  "DetailFetch" : ProductFetch
}

const Stack = createNativeStackNavigator<RootProps>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ProductFetchChoosingScreen}/>
          <Stack.Screen name="Detail" component={ProducFetchtDetailScreen}/>
          {/* <Stack.Screen name='DetailFetch' component={ProducFetchtDetailScreen}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


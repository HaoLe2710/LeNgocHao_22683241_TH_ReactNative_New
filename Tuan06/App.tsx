import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './components/TabNavigator';
import ProductDetailsScreen from './pages/ProductDetailsScreen2';
import { FavoritesProvider, Product } from './contexts/FavoritesContext';

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: {
    product: Product;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <FavoritesProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#007AFF',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={TabNavigator}
              options={{ 
                headerShown: false 
              }}
            />
            <Stack.Screen 
              name="ProductDetails" 
              component={ProductDetailsScreen}
              options={{ 
                title: 'Product Details',
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </FavoritesProvider>
  );
}


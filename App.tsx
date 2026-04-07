import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import { ErrorBoundary } from './components/ErrorBoundary';
import Dog from './screens/Dog';
import Home from './screens/Home';

export type RootStackParamList = {
  Home: undefined;
  Dog: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const scheme = useColorScheme();

  return (
    <ErrorBoundary>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Dog" component={Dog} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ErrorBoundary>
  );
}

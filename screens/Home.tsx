import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { useMemo } from 'react';
import { Alert, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Animated, { FadeInDown, useSharedValue } from 'react-native-reanimated';

import type { RootStackParamList } from '../App';
import { useButtonAnimStyle } from '../hooks/useButtonAnimStyle';
import type { Colors } from '../theme';
import { colors } from '../theme';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type ActiveButton = 'hello' | 'dog' | null;

export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();
  const scheme = useColorScheme() ?? 'light';
  const c = colors[scheme];
  const styles = useMemo(() => makeStyles(c), [c]);

  const activeButton = useSharedValue<ActiveButton>(null);
  const helloAnimStyle = useButtonAnimStyle<ActiveButton>('hello', activeButton);
  const dogAnimStyle = useButtonAnimStyle<ActiveButton>('dog', activeButton);

  const handleHelloPress = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Hello Metal');
  };

  const handleDogPress = () => {
    navigation.navigate('Dog');
  };

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.delay(100).springify().damping(14).stiffness(120)}
        style={helloAnimStyle}
      >
        <Pressable
          style={styles.button}
          onPressIn={() => {
            activeButton.value = 'hello';
          }}
          onPressOut={() => {
            activeButton.value = null;
          }}
          onPress={handleHelloPress}
          accessibilityLabel="Hello Metal"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Hello Metal</Text>
        </Pressable>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(250).springify().damping(14).stiffness(120)}
        style={dogAnimStyle}
      >
        <Pressable
          style={[styles.button, styles.dogButton]}
          onPressIn={() => {
            activeButton.value = 'dog';
          }}
          onPressOut={() => {
            activeButton.value = null;
          }}
          onPress={handleDogPress}
          accessibilityLabel="Navigate to dog screen"
          accessibilityRole="button"
        >
          <Text style={[styles.buttonText, styles.dogButtonText]}>DOG</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function makeStyles(c: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    },
    button: {
      backgroundColor: c.primaryButton,
      paddingVertical: 16,
      paddingHorizontal: 40,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },
    dogButton: {
      backgroundColor: c.dogButton,
    },
    buttonText: {
      color: c.primaryButtonText,
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: 1,
    },
    dogButtonText: {
      color: c.dogButtonText,
    },
  });
}

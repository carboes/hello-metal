import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { useMemo } from 'react';
import { Alert, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

import type { RootStackParamList } from '../App';
import { colors } from '../theme';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();
  const scheme = useColorScheme() ?? 'light';
  const c = colors[scheme];

  const styles = useMemo(() => makeStyles(c), [c]);

  const handleHelloPress = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Hello Metal');
  };

  const handleDogPress = () => {
    navigation.navigate('Dog');
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={handleHelloPress}
      >
        <Text style={styles.buttonText}>Hello Metal</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, styles.dogButton, pressed && styles.buttonPressed]}
        onPress={handleDogPress}
      >
        <Text style={[styles.buttonText, styles.dogButtonText]}>DOG</Text>
      </Pressable>
    </View>
  );
}

function makeStyles(c: (typeof colors)['light' | 'dark']) {
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
    buttonPressed: {
      opacity: 0.75,
      transform: [{ scale: 0.97 }],
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

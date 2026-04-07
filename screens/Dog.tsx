import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import type { RootStackParamList } from '../App';
import { useDogImage } from '../hooks/useDogImage';
import type { Colors } from '../theme';
import { colors } from '../theme';

type DogNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dog'>;

export default function Dog() {
  const navigation = useNavigation<DogNavigationProp>();
  const scheme = useColorScheme() ?? 'light';
  const c = colors[scheme];
  const styles = useMemo(() => makeStyles(c), [c]);

  const { imageUrl, loading, error, fetch } = useDogImage();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {loading && <ActivityIndicator size="large" color={c.dogButton} />}
        {!loading && error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load dog.</Text>
            <Pressable
              style={({ pressed }) => [styles.retryButton, pressed && styles.buttonPressed]}
              onPress={fetch}
              accessibilityLabel="Retry loading dog image"
              accessibilityRole="button"
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </Pressable>
          </View>
        )}
        {!loading && imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        )}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            loading && styles.buttonDisabled,
            pressed && !loading && styles.buttonPressed,
          ]}
          onPress={fetch}
          disabled={loading}
          accessibilityLabel="Load a new random dog image"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>New Dog</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back to home screen"
          accessibilityRole="button"
        >
          <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
        </Pressable>
      </View>
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
      padding: 24,
      gap: 24,
    },
    imageContainer: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: c.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    errorContainer: {
      alignItems: 'center',
      gap: 12,
    },
    errorText: {
      color: c.error,
      fontSize: 16,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: c.dogButton,
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    retryButtonText: {
      color: c.dogButtonText,
      fontSize: 14,
      fontWeight: '700',
    },
    actions: {
      flexDirection: 'row',
      gap: 12,
    },
    button: {
      backgroundColor: c.dogButton,
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 6,
    },
    backButton: {
      backgroundColor: c.backButton,
    },
    buttonDisabled: {
      opacity: 0.4,
    },
    buttonPressed: {
      opacity: 0.75,
      transform: [{ scale: 0.97 }],
    },
    buttonText: {
      color: c.dogButtonText,
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 1,
    },
    backButtonText: {
      color: c.backButtonText,
    },
  });
}

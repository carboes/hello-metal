import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { colors } from '../theme';

export default function Dog() {
  const navigation = useNavigation();
  const scheme = useColorScheme() ?? 'light';
  const c = colors[scheme];
  const styles = useMemo(() => makeStyles(c), [c]);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDog = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      setImageUrl(data.message);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDog();
  }, [fetchDog]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {loading && <ActivityIndicator size="large" color={c.dogButton} />}
        {!loading && error && <Text style={styles.errorText}>Failed to load dog. Try again!</Text>}
        {!loading && imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        )}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={fetchDog}
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
        >
          <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
        </Pressable>
      </View>
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
    errorText: {
      color: c.error,
      fontSize: 16,
      textAlign: 'center',
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

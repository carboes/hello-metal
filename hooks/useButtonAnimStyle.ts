import type { SharedValue } from 'react-native-reanimated';
import { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

export function useButtonAnimStyle<TButton>(key: TButton, activeButton: SharedValue<TButton>) {
  return useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(activeButton.value === key ? 1.1 : 1, {
          damping: 12,
          stiffness: 200,
        }),
      },
    ],
    opacity: withTiming(activeButton.value !== null && activeButton.value !== key ? 0.2 : 1, {
      duration: 180,
    }),
  }));
}

export const colors = {
  light: {
    background: '#ffffff',
    surface: '#f0f0f0',
    text: '#1a1a1a',
    error: '#ef4444',
    primaryButton: '#1a1a1a',
    primaryButtonText: '#ffffff',
    dogButton: '#b45309',
    dogButtonText: '#ffffff',
    backButton: '#3a3a3a',
    backButtonText: '#ffffff',
  },
  dark: {
    background: '#0f0f0f',
    surface: '#1c1c1e',
    text: '#f5f5f5',
    error: '#f87171',
    primaryButton: '#f5f5f5',
    primaryButtonText: '#0f0f0f',
    dogButton: '#d97706',
    dogButtonText: '#ffffff',
    backButton: '#2c2c2e',
    backButtonText: '#f5f5f5',
  },
} as const;

export type Colors = { [K in keyof typeof colors.light]: string };

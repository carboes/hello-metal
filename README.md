# Hello Metal

A minimal React Native app built with Expo. Features a Hello Metal button with haptic feedback, stagger/press animations, and a random dog image screen.

## Assesment Deliverables

### Android — Preview Build

A pre-built Android APK is available to install directly:

**[Download Android Preview Build](https://expo.dev/accounts/carboes/projects/hello-metal/builds/739d795c-6a60-48c8-afd7-a7c53d3f8a95)**

Or scan the QR code to open the build page on your device:

![Android Preview Build QR Code](./qrcode.png)

### Video showing development

**[Google Drive Folder Link](https://drive.google.com/drive/folders/1XF6ik5rEGvLyPMVAI4H8PJQhJ1rqapEd?usp=drive_link)**

### Bonus work done

- iOS working on simulator
- App Icon
- Light + Dark mode (according to System settings)
- Simple animations for Buttons on home screen
- Linting/prettier
- Future work in [TODO.md](./TODO.md)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (included with Node)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — install globally if you don't have it:
  ```bash
  npm install -g expo-cli
  ```

---

## Option 1 — Development Build (recommended)

A development build is the preferred way to run this app. It includes all native modules (Reanimated 4, haptics) and gives you the full experience.

### Build from source

```bash
npm install
npx expo run:android
```

Requires Android Studio with at least one AVD (emulator) set up, or a physical device connected via USB with developer mode enabled.

**iOS**

```bash
npm install
npx expo run:ios
```

This installs CocoaPods and builds the app automatically. On first run it may take a few minutes. To target a specific simulator or device:

```bash
npx expo run:ios --device
```

**Android**

**EAS cloud build**

```bash
eas build --profile development --platform ios
# or
eas build --profile development --platform android
```

---

## Option 2 — Expo Go

Works on both **iOS and Android**. The app runs fully in Expo Go — navigation, haptics, dog images, and light/dark mode all work.

> **Note:** Button animations (Reanimated 4) are not supported in Expo Go and will be skipped. Use a development build for the full animated experience.

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the dev server**

   ```bash
   npx expo start
   ```

3. **Open on your device**
   - Install **Expo Go** on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
   - Scan the QR code shown in the terminal with your camera (iOS) or the Expo Go app (Android)

---

## Project structure

```
├── App.tsx              # Root component — navigation container + stack
├── index.ts             # Entry point
├── theme.ts             # Light/dark color tokens
├── babel.config.js      # Babel config with react-native-worklets plugin
├── screens/
│   ├── Home.tsx         # Hello Metal button + DOG button with animations
│   └── Dog.tsx          # Random dog image fetched from dog.ceo API
├── app.json             # Expo app config
└── package.json
```

## Screens

| Screen   | Description                                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Home** | Hello Metal button (haptic + alert) and a DOG button. Buttons stagger in on load; pressing one scales it up and fades the other. |
| **Dog**  | Fetches and displays a random dog image from [dog.ceo](https://dog.ceo/dog-api/). Tap "New Dog" for another one.                 |

---

## Notes

- **Haptics** only work on physical devices. Calls are silently ignored on simulators/emulators.
- The app supports **light and dark mode** automatically from system settings.
- The app uses React Navigation native stack, so iOS users get native header transitions out of the box.
- New Architecture (`newArchEnabled: true`) is enabled in `app.json`.

# Hello Metal

A minimal React Native app built with Expo. Features a Hello Metal button with haptic feedback and a random dog image screen.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (included with Node)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — install globally if you don't have it:
  ```bash
  npm install -g expo-cli
  ```

---

## Option 1 — Expo Go (quickest)

> Haptics require a real device. The simulator will run the app but won't vibrate.

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

## Option 2 — Development Build (full native)

A development build gives you a fully native binary with all native modules. Required if you want to run on a simulator/emulator or need features beyond what Expo Go supports.

### iOS

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Install CocoaPods**

   ```bash
   npx expo run:ios
   ```

   This will install pods and build the app automatically. On first run it may take a few minutes.

3. To target a specific simulator:
   ```bash
   npx expo run:ios --device
   ```
   Then select your simulator or connected device from the list.

### Android

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Build and launch**
   ```bash
   npx expo run:android
   ```
   Make sure you have Android Studio installed with at least one AVD (emulator) set up, or a physical device connected via USB with developer mode enabled.

---

## Project structure

```
├── App.tsx              # Root component — navigation container + stack
├── index.ts             # Entry point
├── screens/
│   ├── Home.tsx         # Hello Metal button + DOG button
│   └── Dog.tsx          # Random dog image fetched from dog.ceo API
├── app.json             # Expo app config
└── package.json
```

## Screens

| Screen   | Description                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| **Home** | Hello Metal button (haptic + alert) and a DOG button that navigates to the dog screen                           |
| **Dog**  | Fetches and displays a random dog image from [dog.ceo](https://dog.ceo/dog-api/). Tap "New Dog" for another one |

---

## Notes

- **Haptics** only work on physical devices. Calls are silently ignored on simulators/emulators.
- The app uses React Navigation native stack, so iOS users get native header transitions out of the box.
- New Architecture (`newArchEnabled: true`) is enabled in `app.json`.

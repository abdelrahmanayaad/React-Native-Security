# ReactNativeSecurity

A robust React Native application focused on implementing industry-standard security practices to protect data, communication, and source code.

## 🚀 Key Features

### 🔐 Security & Integrity
- **SSL Public Key Pinning**: Prevents Man-in-the-Middle (MITM) attacks by validating the server's public key hash against predefined pins.
- **Root & Jailbreak Detection**: Comprehensive device integrity checks to ensure the application runs on a secure environment.
- **JavaScript Obfuscation**: Advanced source code protection using control flow flattening and string array transformations to deter reverse engineering.
- **Secure Storage**: Sensitive credentials (tokens, keys) are stored securely using the device's Keychain/Keystore.

### 🛠 Tech Stack
- **Framework**: React Native (0.83.0)
- **State Management**: Zustand
- **Programming Language**: TypeScript
- **Storage**: React Native Keychain (Secure storage)
- **Security Tools**: JailMonkey, Obfuscator-io, SSL Pinning

## 🛡 Security Implementation Details

### SSL Pinning
The app uses `react-native-ssl-public-key-pinning` to ensure secure communication with fixed domains.
- **Configuration**: Managed in `src/apis/apiClient.ts`.
- **Primary Pin**: `6yQC8kUf8B+PnZaf/9D+UJ1nsKYvprTKUhbjV3LUTf0=`
- **Backup Pin**: Integrated for reliability during certificate rotations.
- **Usage**: Automatically handled by a custom `secureFetch` wrapper.

### Device Integrity (Root Detection)
Powered by `jail-monkey`, the app monitors:
- Jailbroken/Rooted status.
- Mock location usage.
- Debug mode activation.
- External storage presence.
Security state is globally available via `useSecurityStore`.

### Code Obfuscation
JS bundle is obfuscated during the build process via `obfuscator-io-metro-plugin`.
- **Techniques**: Control flow flattening, numbers to expressions, string shuffling, and more.
- **Config**: Defined in `metro.config.js`.

### Secure Storage
Tokens are managed via `src/services/Storage.ts` using `react-native-keychain`, providing hardware-level security for sensitive data.

## 📦 Getting Started

### Prerequisites
- Node.js >= 20
- Ruby (for CocoaPods)
- Android Studio / Xcode

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/abdelrahmanayaad/React-Native-Security
   cd ReactNativeSecurity
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install iOS dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App
- **Android**: `npm run android`
- **iOS**: `npm run ios`

## 🧪 Testing Security
The project includes a `SslPinningTester` component that allows interactive testing of:
- Secure GET/POST requests with SSL pinning.
- Bypassing/Disabling pinning for comparison.
- Real-time security status monitoring.

---
*Built with security in mind.*

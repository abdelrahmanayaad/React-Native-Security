import {
  initializeSslPinning,
  disableSslPinning,
} from 'react-native-ssl-public-key-pinning';

export interface PinningConfig {
  [domain: string]: string[];
}

/**
 * Dynamically enables SSL Pinning for the specified domains and their pins.
 * @param config A record mapping domain names to arrays of base64-encoded SHA-256 hashes.
 */
export const enableSslPinning = async (
  config: PinningConfig,
): Promise<void> => {
  const options: Record<string, any> = {};
  for (const domain in config) {
    if (config.hasOwnProperty(domain)) {
      options[domain] = {
        includeSubdomains: true,
        publicKeyHashes: config[domain],
      };
    }
  }

  await initializeSslPinning(options);
};

/**
 * Disables all SSL public key pinning for the app.
 */
export const disableAllSslPinning = async (): Promise<void> => {
  await disableSslPinning();
};

import { create } from 'zustand';
import JailMonkey from 'jail-monkey';

interface SecurityState {
  isJailBroken: boolean;
  canMockLocation: boolean;
  isOnExternalStorage: boolean;
  isDebugged: boolean;
  isDeviceCompromised: boolean;
  checkSecurity: () => Promise<void>;
}

export const useSecurityStore = create<SecurityState>()(set => ({
  isJailBroken: false,
  canMockLocation: false,
  isOnExternalStorage: false,
  isDebugged: false,
  isDeviceCompromised: false,
  checkSecurity: async () => {
    const [jailBroken, mockLocation, externalStorage, debugged] =
      await Promise.all([
        Promise.resolve(JailMonkey.isJailBroken()),
        Promise.resolve(JailMonkey.canMockLocation()),
        Promise.resolve(JailMonkey.isOnExternalStorage()),
        Promise.resolve(JailMonkey.isDebuggedMode()),
      ]);

    const compromised =
      jailBroken || !mockLocation || externalStorage || debugged;

    set({
      isJailBroken: jailBroken,
      canMockLocation: mockLocation,
      isOnExternalStorage: externalStorage,
      isDebugged: debugged,
      isDeviceCompromised: compromised,
    });
  },
}));

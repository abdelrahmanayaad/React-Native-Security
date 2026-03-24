import React, { Fragment, PropsWithChildren, useEffect } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import { useSecurityStore } from '../store/securityStore';

const SecurityBlockedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security Alert</Text>
      <Text style={styles.text}>
        This device is not secure (rooted, debugged, or compromised). The app
        cannot run for security reasons.
      </Text>
    </View>
  );
};

const SecurityProvider = ({ children }: PropsWithChildren) => {
  const { isDeviceCompromised, checkSecurity } = useSecurityStore();

  useEffect(() => {
    checkSecurity();
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        checkSecurity();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [checkSecurity]);

  if (isDeviceCompromised) {
    return <SecurityBlockedScreen />;
  }

  return <Fragment>{children}</Fragment>;
};

export default SecurityProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 12,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});

import React, { Fragment, PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SecurityProvider from './SecurityProvider';

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaProvider>
      <SecurityProvider>
        <AppContainer>{children}</AppContainer>
      </SecurityProvider>
    </SafeAreaProvider>
  );
};

export default Provider;

const AppContainer = ({ children }: PropsWithChildren) => {
  return <Fragment>{children}</Fragment>;
};

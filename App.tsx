import React from 'react';
import { StyleSheet, View } from 'react-native';
import SslPinningTester from './src/components/SslPinningTester';
import Provider from './src/provider';

const App = () => {
  return (
    <Provider>
      <View style={styles.container}>
        <SslPinningTester />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
  },
});

export default App;

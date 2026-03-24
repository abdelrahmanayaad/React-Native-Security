import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { apiClient, DOMAIN } from '../apis/apiClient';

const LOCAL_PINS = {
  DEFAULT_PIN: '6yQC8kUf8B+PnZaf/9D+UJ1nsKYvprTKUhbjV3LUTf0=',
  BACKUP_PIN: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
};

const LOCAL_DOMAIN = 'dummyjson.com';

const SslPinningTester = () => {
  const [localPins, setLocalPins] = useState<string>(
    `${LOCAL_PINS.DEFAULT_PIN},${LOCAL_PINS.BACKUP_PIN}`,
  );
  const [apiUrl, setApiUrl] = useState<string>(
    'https://dummyjson.com/products/1',
  );
  const [domain, setDomain] = useState<string>(DOMAIN);
  const [result, setResult] = useState<string>(
    'Enter API details and press a button to test.',
  );
  const [loading, setLoading] = useState<boolean>(false);

  const testWithPinning = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get(apiUrl, true, {
        domain: LOCAL_DOMAIN,
        pins: localPins.split(','),
      });
      setResult(`✅ Success:\n${JSON.stringify(data, null, 2)}`);
    } catch (e: any) {
      setResult(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testWithoutPinning = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get(apiUrl, false);
      setResult(`✅ Success:\n${JSON.stringify(data, null, 2)}`);
    } catch (e: any) {
      setResult(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dynamic SSL Pinning Tester</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>API URL:</Text>
        <TextInput
          style={styles.input}
          value={apiUrl}
          onChangeText={setApiUrl}
          autoCapitalize="none"
          keyboardType="url"
        />

        <Text style={styles.label}>Domain to Pin:</Text>
        <TextInput
          style={styles.input}
          value={domain}
          onChangeText={setDomain}
          autoCapitalize="none"
        />

        <Text style={styles.label}>SSL Pins (Comma-separated):</Text>
        <TextInput
          style={styles.input}
          value={localPins}
          onChangeText={setLocalPins}
          autoCapitalize="none"
          multiline
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.btnNeutral]}
          onPress={testWithoutPinning}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Fetch Without Pinning</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.btnSuccess]}
          onPress={testWithPinning}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Fetch With Pinning Config</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView style={styles.scroll}>
            <Text style={styles.resultText}>{result}</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#000',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnNeutral: { backgroundColor: '#6c757d' },
  btnSuccess: { backgroundColor: '#28a745' },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Courier',
  },
});

export default SslPinningTester;

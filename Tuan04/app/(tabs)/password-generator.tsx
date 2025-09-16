import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';

export default function PasswordGenerator() {
  const [length, setLength] = useState('8');
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(false);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>PASSWORD GENERATOR</Text>
        <View style={styles.passwordBox}>
          <Text style={styles.passwordText}>{password}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Password length</Text>
          <TextInput
            style={styles.input}
            value={length}
            onChangeText={setLength}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Include lower case letters</Text>
          <Switch value={lower} onValueChange={setLower} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Include upcase letters</Text>
          <Switch value={upper} onValueChange={setUpper} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Include number</Text>
          <Switch value={number} onValueChange={setNumber} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Include special symbol</Text>
          <Switch value={symbol} onValueChange={setSymbol} />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>GENERATE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#bfc8e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#23225a',
    borderRadius: 18,
    padding: 24,
    width: 320,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 18,
  },
  passwordBox: {
    backgroundColor: '#18183a',
    borderRadius: 4,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  passwordText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    justifyContent: 'space-between',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    width: 60,
    height: 36,
    paddingHorizontal: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4b4fcf',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

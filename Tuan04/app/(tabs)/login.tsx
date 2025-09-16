import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient}from 'expo-linear-gradient';

function SafeImage({ source, style }: { source: any; style?: any }) {
  try {
    return <Image source={source} style={style} />;
  } catch (e) {
    return <View style={[style, { backgroundColor: '#ccc' }]} />;
  }
}

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#FFD600', '#C9A800']} style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <SafeImage source={require('../../assets/images/user.png')} style={styles.icon} />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#222"
            style={styles.input}
          />
        </View>

        <View style={styles.inputBox}>
          <SafeImage source={require('../../assets/images/lock.png')} style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#222"
            secureTextEntry={!passwordVisible}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <SafeImage source={require('../../assets/images/icon.png')} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot your password?</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 32,
    color: '#111',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 32,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    height: 48,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#111',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 32,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forgotText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
});

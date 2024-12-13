import { StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { View } from '@/components/Themed';
import axios from 'axios';
import { API_URL } from '../../config'; // Ensure this file is correctly exporting API_URL
import Toast from 'react-native-toast-message';

export default function RegisterForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  // Handle the registration logic
  const handleRegister = async () => {
    try {
      // Send data to the backend via POST request
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        phoneNumber,
        password,
      });

        // Show success toast
        Toast.show({
          type: 'success',
          text1: 'Register Successful',
          text2: 'You can now login',
        });
      // Handle success
      console.log('Registration Success:', response.data);

    
      // You can redirect the user or show a success message here
    } catch (error) {
      // Handle error
      if (axios.isAxiosError(error)) {
        console.error('Registration Error:', error.response ? error.response.data : error.message);
      } else {
        console.error('Unknown Error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        onChangeText={setName}
        value={name}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#888"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.link}>Login</Text>
      </Text>
       <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

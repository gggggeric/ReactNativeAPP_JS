import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation
import { useSelector } from 'react-redux'; // To access Redux state
import { RootState } from '../../redux/auth/store'; // Adjust this import based on your Redux store structure

export default function Home() {
  const router = useRouter(); // Initialize the router

  // Access the JWT token from Redux store using useSelector
  const jwtToken = useSelector((state: RootState) => state.auth.jwtToken);

  // Navigate to login page
  const goToLogin = () => {
    router.push('/(tabs)/login');
  };

  // Navigate to signup page
  const goToSignup = () => {
    router.push('/(tabs)/signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App!</Text>
      <Text style={styles.description}>An awesome app for all your needs. Please login or register to continue.</Text>

      {/* Show the token if it exists */}
      {jwtToken ? (
        <Text style={styles.tokenText}>Your JWT Token: {jwtToken}</Text>
      ) : (
        <Text style={styles.tokenText}>No JWT token found.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={goToLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToSignup}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  tokenText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#007BFF',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

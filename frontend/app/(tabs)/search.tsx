import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, Button, View, Pressable } from 'react-native';
import { logout } from '../../redux/auth/actions'; // Import logout action
import { useRouter } from 'expo-router';  // Import useRouter for navigation

export default function Search() {
  const { isLoggedIn, jwtToken } = useSelector((state: any) => state.auth); // Access state using useSelector
  const dispatch = useDispatch();
  const router = useRouter();  // Initialize router for navigation

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  // Redirect to login page if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      // Delay the navigation to avoid attempting it before Root Layout is mounted
      const timer = setTimeout(() => {
        router.push('../screens/login'); // Redirect to login screen
      }, 0);

      return () => clearTimeout(timer); // Cleanup the timeout on unmount
    }
  }, [isLoggedIn, router]);

  const handleGoToLogin = () => {
    router.push('../screens/login'); // Navigate to login screen on press
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLoggedIn ? 'Welcome, you are logged in!' : 'Please log in'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

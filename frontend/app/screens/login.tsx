import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';  // Import useDispatch
import Toast from 'react-native-toast-message';
import { setJwtToken } from '../../redux/auth/actions'; // Import the action
import { View } from '@/components/Themed';
import { API_URL } from '../../config';
import { useRouter } from 'expo-router';  // Import useRouter for navigation

export default function LoginForm() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const dispatch = useDispatch();  // Initialize useDispatch to dispatch actions
    const router = useRouter();  // Initialize useRouter to handle navigation

    const handleLogin = async () => {
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password,
            });

            console.log('Login Success:', response.data);

            // Dispatch the token to Redux store
            dispatch(setJwtToken(response.data.token)); // Dispatch action to store JWT token

            // Show success toast
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text2: 'Welcome back!',
            });


            router.push('/(tabs)');



        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error('Login Error:', err.response?.data || err.message);

                // Show error toast
                Toast.show({
                    type: 'error',
                    text1: 'Login Failed',
                    text2: err.response?.data?.message || 'Failed to login. Please check your credentials.',
                });
            } else {
                console.error('Unexpected Error:', err);

                // Show generic error toast
                Toast.show({
                    type: 'error',
                    text1: 'Unexpected Error',
                    text2: 'An unexpected error occurred. Please try again.',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

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
                placeholder="Password"
                placeholderTextColor="#888"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
            
            <View style={styles.footerText}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('./signup')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>



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

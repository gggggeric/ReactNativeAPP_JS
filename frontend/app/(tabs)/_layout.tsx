import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import store from '../../redux/auth/store'; // Import your Redux store
import { Provider } from 'react-redux'; // Import Provider from redux
import Toast from 'react-native-toast-message'; // Import Toast for notifications

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}


export default function TabLayout() {
  return (
    <Provider store={store}> 
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#000',
          headerShown: false, 
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="login"
          options={{
            title: 'Login',
            tabBarIcon: ({ color }) => <AntDesign name="login" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="signup"
          options={{
            title: 'Register',
            tabBarIcon: ({ color }) => <TabBarIcon name="sign-in" color={color} />,
          }}
        />
      </Tabs>
      <Toast /> 
    </Provider>
  );
}

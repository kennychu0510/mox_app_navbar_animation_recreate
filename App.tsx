import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import CustomTabBarButton from './CustomTabBarButton';
import Page from './Page';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        }}
      >
        <Tab.Screen
          name='Home'
          component={Page}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='home' color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name='Accounts'
          component={Page}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='account' color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name='Actions'
          component={Page}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name='Credit'
          component={Page}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='credit-card' color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name='Spending'
          component={Page}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='cash' color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

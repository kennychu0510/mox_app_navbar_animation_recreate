import React, {useRef, useState, type PropsWithChildren} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Accounts from './Page';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Page from './Page';

import { BlurView, VibrancyView } from "@react-native-community/blur";


const Tab = createBottomTabNavigator();
const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const easingType = Easing.bezier(0.42, 0, 0.58, 1);
const duration = 500;

const actionButtonList = [
  {value: 'Exchange', top: -180, left: -100},
  {value: 'Pay bills', top: -180},
  {value: 'Instant Loan', top: -180, right: -100},
  {value: 'Transfer', top: -90, left: -100},
  {value: 'Add money', top: -90},
  {value: 'Request', top: -90, right: -100},
];

const CustomTabBarButton = (props: BottomTabBarButtonProps) => {
  const {children} = props;

  const [open, setOpen] = useState(false);
  const buttonAnimNative = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const expandNative = () => {
    Animated.timing(buttonAnimNative, {
      toValue: 2,
      duration: duration,
      useNativeDriver: true,
      easing: easingType,
    }).start();
  };

  const collapseNative = () => {
    Animated.timing(buttonAnimNative, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
      easing: easingType,
    }).start();
  };

  function onPress() {
    if (open) {
      expandNative();
    } else {
      collapseNative();
    }
    setOpen(!open);
  }

  const ActionButton = ({
    value,
    top,
    left,
    right,
    delay,
  }: {
    value: string;
    top: number;
    left?: number;
    right?: number;
    delay: number;
  }) => {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          width: 120,
          opacity: buttonAnimNative.interpolate({
            inputRange: [0, delay, 2],
            outputRange: [0, 0, 1],
          }),
          transform: [
            {
              scale: buttonAnimNative.interpolate({
                inputRange: [0, delay, 2],
                outputRange: [0, 0, 1],
              }),
            },
            {
              translateY: buttonAnimNative.interpolate({
                inputRange: [0, delay, 2],
                outputRange: [0, 0, top],
              }),
            },
            {
              translateX: buttonAnimNative.interpolate({
                inputRange: [0, delay, 2],
                outputRange: [0, delay, left ? left : right ? -right : 0],
              }),
            },
          ],
        }}>
        <View
          style={{
            height: 40,
            aspectRatio: 1,
            backgroundColor: 'black',
            borderRadius: 50,
            marginBottom: 5,
          }}
        />
        <Text>{value}</Text>
      </Animated.View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          top: -10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          height: 70,
          aspectRatio: 1,
          zIndex: 2,
        }}>
        <AnimatedBlurView
          blurType={'dark'}
          blurAmount={2}
          style={{
            position: 'absolute',
            top: -1000,
            left: -1000,
            right: -1000,
            bottom: -1000,
            opacity: buttonAnimNative.interpolate({
              inputRange: [0, 2],
              outputRange: [0, 1],
            }),
          }}
        />
        <Animated.View
          style={{
            height: 70,
            aspectRatio: 1,
            backgroundColor: 'black',
            opacity: buttonAnimNative.interpolate({
              inputRange: [0, 2],
              outputRange: [1, 0.2],
            }),
            position: 'absolute',
            borderRadius: 100,
            transform: [
              {
                scale: buttonAnimNative.interpolate({
                  inputRange: [0, 2],
                  outputRange: [1, 8],
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            height: 70,
            aspectRatio: 1,
            backgroundColor: 'white',
            opacity: buttonAnimNative.interpolate({
              inputRange: [0, 2],
              outputRange: [0, 1],
            }),
            position: 'absolute',
            borderRadius: 100,
            transform: [
              {
                scale: buttonAnimNative.interpolate({
                  inputRange: [0, 2],
                  outputRange: [1, 8],
                }),
              },
            ],
          }}
        />

        <Animated.View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
              {
                rotate: buttonAnimNative.interpolate({
                  inputRange: [0, 2],
                  outputRange: ['0deg', '720deg'],
                }),
              },
            ],
          }}>
          <AnimatedIcon
            name="sword-cross"
            size={30}
            color={'black'}
            style={{
              position: 'absolute',
              opacity: buttonAnimNative.interpolate({
                inputRange: [0, 2],
                outputRange: [0, 1],
              }),
            }}
          />

          <AnimatedIcon
            name="sword-cross"
            size={30}
            color={'white'}
            style={{
              opacity: buttonAnimNative.interpolate({
                inputRange: [0, 2],
                outputRange: [1, 0],
              }),
            }}
          />
        </Animated.View>
        <Animated.Text
          style={{
            color: 'white',
            fontSize: 10,
            opacity: buttonAnimNative.interpolate({
              inputRange: [0, 2],
              outputRange: [1, 0],
            }),
          }}>
          Actions
        </Animated.Text>
        {actionButtonList
          .map((item, idx) => ({
            ...item,
            delay: (idx / actionButtonList.length) * 2 * 0.8,
          }))
          .map(item => (
            <ActionButton key={item.value} {...item} />
          ))}
      </View>
    </TouchableWithoutFeedback>
  );
};

const App = () => {
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
        }}>
        <Tab.Screen
          name="Home"
          component={Page}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Accounts"
          component={Page}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Actions"
          component={Page}
          options={{
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Credit"
          component={Page}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="credit-card"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Spending"
          component={Page}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="cash" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

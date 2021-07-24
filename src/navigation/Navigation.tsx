import React, {useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
// Screens
import LoginScreen from '../containers/LoginScreen/LoginScreen';

const Stack = createStackNavigator();

const Navigation = (): JSX.Element => {
  const navigationRef = useRef<NavigationContainerRef | null>(null);
  const routeNameRef = useRef<string | null | undefined>(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // @ts-ignore
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        RNBootSplash.hide();
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        // @ts-ignore
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            gestureEnabled: false,
            headerShown: false,
            animationEnabled: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

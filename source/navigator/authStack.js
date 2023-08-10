import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../modules/common/screens/home";
import Login from "../modules/common/screens/login";
import SplashScreen from '../modules/common/screens/splashScreen';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SplashScreen">
      {/* <Stack.Screen component={Home} name="Home" /> */}
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={SplashScreen} name="SplashScreen" />
    </Stack.Navigator>
  );
};
const AuthStack = () => {
  return (
    <>
      <StackNavigator />
    </>
  );
};

export default AuthStack;

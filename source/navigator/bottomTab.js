import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Circulars from "../modules/circular/screens/circulars";
import Home from "../modules/common/screens/home";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import CircularFy from "../modules/circular/screens/circularFy";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  console.log(routeName);
  if (routeName == "Circulars") {
    return 'flex';
  } else {
    return 'none';
  }
};

const Stack = createStackNavigator();

const CircularNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Circulars"
    >
      <Stack.Screen component={Circulars} name="Circulars" />
      <Stack.Screen component={CircularFy} name="CircularFy" />
    </Stack.Navigator>
  );
};
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "lightgreen" },
        tabBarInactiveTintColor: "red",
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tab.Screen
        name="Hometab"
        component={Home}
        options={{
          tabBarIcon: (color, size) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CircularNav"
        component={CircularNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: "lightgreen",
          },
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: "yellow" },
          tabBarIcon: (color, size) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

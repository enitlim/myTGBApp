import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";

import Circulars from "../modules/circular/screens/circulars";
import Tasks from "../modules/workschedule/screens/tasks";
import Home from "../modules/common/screens/home";
import CustomDrawer from "../components/customDrawer";
import CircularFy from "../modules/circular/screens/circularFy";
import CircularList from "../modules/circular/screens/circularList";
import BottomTab from "./bottomTab";
import CircularDetail from "../modules/circular/screens/circularDetail";

const Stack = createStackNavigator();

const CircularNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Circulars">
      <Stack.Screen
        component={Circulars}
        name="Circulars Home"
        screenOptions={{headerShown: false}}
      />
      <Stack.Screen
        component={CircularFy}
        name="Circular FY"
        options={{headerShown: true}}
      />
      <Stack.Screen
        component={CircularList}
        name="Circular List"
        options={{headerShown: true}}
      />
      <Stack.Screen
        component={CircularDetail}
        name="Circular Detail"
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};
const Drawer = createDrawerNavigator();
const AppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#0071bc',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: 10,
          fontSize: 15,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        // options={{
        //   drawerIcon: ({ color }) => (
        //     <Ionicons name="home-outline" size={22} color={color} />
        //   ),
        // }}
      />
      <Drawer.Screen
        name="Circulars"
        component={CircularNavigator}
        // options={{
        //   drawerIcon: ({ color }) => (
        //     <Ionicons name="document-text-outline" size={22} color={color} />
        //   ),
        // }}
      />
      {/* <Drawer.Screen
        // name="Tasks"
        // component={Tasks}
        // options={{
        //   drawerIcon: ({ color }) => (
        //     <Ionicons name="hourglass-outline" size={22} color={color} />
        //   ),
        // }}
      /> */}
    </Drawer.Navigator>
  );
};

export default AppStack;

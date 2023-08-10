import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Center,
  Avatar,
  Pressable,
  StatusBar,
  Heading,
  Input,
} from "native-base";
import AppBar from "../../../components/appBar";

import { SafeAreaView } from "react-native-safe-area-context";

const Tasks = ({ navigation }) => {
  return (
    <>
      <Box bg="coolGray.100" rounded="lg" height="100%">
        <AppBar header={"Tasks"} subHeader={"Perform"} nav={navigation} />
        <Text fontSize="xs">Work Schedule</Text>
       
      </Box>
    </>
  );
};

export default Tasks;

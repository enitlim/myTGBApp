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
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const AppBar = (props) => {
  const [screenwidth, setWidth] = useState(null);
  const [screenheight, setHeight] = useState(null);
  useEffect(() => {
    setWidth(Dimensions.get("window").width);
    setHeight(Dimensions.get("window").height);
  }, [screenwidth, screenheight]);

  return (
    <SafeAreaView>
      <Box p="2" width="100%" height={screenheight / 10}>
        <HStack space="5" justifyContent="space-between">
            <Box height="10" width="70%" pl="5">
              <Text style={{ color: "grey", fontWeight: "bold", fontSize: 18 }}>
                {props.subHeader}
              </Text>
              <Heading size="lg">{props.header.split(" ")[0]}</Heading>
            </Box>
          <Center size="16" pr="3">
            <Pressable
              p="2"
              onPress={() => {
                props.nav.openDrawer();
              }}
            >
              <Avatar
                source={require("../../assets/profile_pic.png")}
                alignSelf="center"
                size="lg"
              >
                Image
              </Avatar>
            </Pressable>
          </Center>
        </HStack>
      </Box>
    </SafeAreaView>
  );
};

export default AppBar;

import { View, Text, Dimensions, Touchable } from "react-native";
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
  Icon,
  ScrollView,
  Stack,
} from "native-base";
import AppBar from "../../../components/appBar";

import { SafeAreaView } from "react-native-safe-area-context";
import SectionHeader from "../../../components/sectionHeader";
import {FlatGrid, SectionGrid} from 'react-native-super-grid';

const fy=[
  {year:"2023-2024"},
  {year:"2022-2023"},
  {year:"2021-2022"},
  {year:"2020-2021"},
  {year:"2019-2020"},
  {year:"2018-2019"}
];
const MenuList=(props)=>{
  return (
    <Pressable
      onPress={() => {
        props.nav.navigate('Circular List', {
          fy: props.fy,
          dept: props.dept,
        });
      }}>
      <Center
        h="20"
        w="140"
        bg="#0094f7"
        rounded="sm"
        _text={{
          color: 'warmGray.50',
          fontWeight: 'medium',
        }}
        shadow={'3'}>
        {props.fy}
      </Center>
    </Pressable>
  );
}
const CircularFy = ({ navigation, route }) => {
  const [screenwidth, setWidth] = useState(null);
  const [screenheight, setHeight] = useState(null);

  useEffect(() => {
    setWidth(Dimensions.get("window").width);
    setHeight(Dimensions.get("window").height);
  }, [screenwidth, screenheight]);

  const search = () => {
    console.log("Search Pressed");
  };

  return (
    <>
      <Box bg="coolGray.100" rounded="lg" height="100%">
        {/* <AppBar header={"Circulars"} subHeader={"View"} nav={navigation} /> */}
        <Box pl="5" pr="5" mt="5" width="100%">
          <VStack p="2">
            <SectionHeader name="Choose FY" />
            <View>
              <FlatGrid
                itemDimension={130}
                data={fy}
                renderItem={({item}) => (
                  <>
                    <MenuList
                      fy={item.year}
                      nav={navigation}
                      dept={route.params.dept}
                    />
                  </>
                )}
              />
            </View>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default CircularFy;

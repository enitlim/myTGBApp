import { View, Text, Dimensions, Touchable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Center,
  FlatList,
  Pressable,
  StatusBar,
  Heading,
  Input,
  Icon,
  ScrollView,
  Stack,
} from "native-base";
import AppBar from "../../../components/appBar";
import SectionHeader from '../../../components/sectionHeader';
import { SafeAreaView } from "react-native-safe-area-context";
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
const dept = [
  {deptName: 'IT Services'},
  {deptName: 'Planning'},
  {deptName: 'Advances'},
  {deptName: 'Vigilance'},
  {deptName: 'Law'},
  {deptName: 'Recovery'},
  {deptName: 'Personnel'},
  {deptName: 'Financial Inclusion'},
  {deptName: 'Foreign Exchange'},
  {deptName: 'General Banking'},

];

const DeptView = (props) => {
  return (
    <View>
      <Pressable
        style={{justifyContent: 'center', alignItems: 'center', height: 100}}
        onPress={() => {
          props.nav.navigate('Circular FY', {dept: props.deptname});
        }}>
        <Center
          h="20"
          w="140"
          bg="#f5fbff"
          rounded="sm"
          _text={{
            color: '#00538b',
            fontWeight: 'medium',
          }}
          shadow={'3'}>
          {props.deptname}
        </Center>
      </Pressable>
    </View>
  );
};
const Smallbutton=(props)=>{
  return (
    <Pressable
      onPress={() => {
        props.nav.navigate('Circular List', {
          dept: props.name,
        });
      }}>
      <Center
        bg="#0094f7"
        w="120"
        h="35"
        rounded="lg"
        borderColor="#e1dfdd"
        borderWidth="1">
        <Text style={{color: '#f5fbff'}}>{props.name}</Text>
      </Center>
    </Pressable>
  );
}

const Circulars = ({ navigation }) => {
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
        <AppBar header={'Circulars'} subHeader={'View'} nav={navigation} />
        <Box pl="5" pr="5" mt="5" width="100%">
          <VStack p="2">
            {/* <Input
              w={{
                base: '100%',
                md: '100%',
              }}
              InputRightElement={
                <Pressable
                  onPress={() => {
                    search();
                  }}></Pressable>
              }
              placeholder="Search Circular"
            /> */}
            <Box pt="3" pr="2" pl="2">
              <ScrollView
                w="100%"
                h="50"
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <HStack space="3" alignItems="center">
                  <Smallbutton name="Today" nav={navigation} />
                  <Smallbutton name="This Month" nav={navigation} />
                  <Smallbutton name="This Year" nav={navigation} />
                  {/* <Smallbutton name="Favourite" nav={navigation} /> */}
                </HStack>
              </ScrollView>
            </Box>
            <SectionHeader name="Department" />
            {/* <ScrollView w="100%"> */}
              <FlatGrid
                itemDimension={130}
                data={dept}
                renderItem={({item}) => (
                  <>
                    <DeptView deptname={item.deptName} nav={navigation} />
                  </>
                )}
              />
            {/* </ScrollView> */}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default Circulars;
